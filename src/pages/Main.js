/* global kakao */
// LIBRARY
import React, { useEffect, useState, useRef, Fragment } from "react";
import { Transition } from "@headlessui/react";
import { geolocated, geoPropTypes } from "react-geolocated";
import { useSelector, useDispatch } from "react-redux";

// REDUX
// import { userActions } from "../redux/modules/user";
import { markerActions } from "../redux/modules/marker";
import { postActions } from "../redux/modules/post";

// COMMON
import socket from "../common/socket";

// COMPONENTS
import Header from "../components/Header";
import Overlay from "../components/Overlay";
import Footer from "../components/Footer";

// ELEMENTS
import { Grid, Button } from "../elements/index";

// HOOKS
import useOutsideClick from "../hooks/useOutsideClick";

// MATERIAL-UI
import MyLocationIcon from "@material-ui/icons/MyLocation";

// ETC
import Logger from "../utils/Logger";
import MarkerImageObject from "../assets/markerImageObject";

const Main = (props) => {
  if (!props.isGeolocationAvailable)
    alert("해당 기기는 GeoLocation을 지원하지 않습니다!");
  if (!props.isGeolocationEnabled)
    alert("해당 기기에서 GeoLocation이 활성화 되어있지 않습니다!");

  const dispatch = useDispatch();
  const [geolocationMarker, setGeolocationMarker] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [posts, setPosts] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [myUserId, setMyUserId] = useState(null);
  const [markerData, setMarkerData] = useState({});
  // const [callUserData, setCallUserData] = useState({})
  const ref = useRef();

  // 로그인 후, 유저 데이터
  const getUserData = useSelector((state) => state.user);
  const myFriends = useSelector((state) => state.user.friendUsers);
  const mySchedules = useSelector((state) => state.user.scheduleUsers);
  const getMarkerData = useSelector((state) => state.marker);
  const getPostDetailData = useSelector((state) => state.post.postDetail);
  const getPostLocationsData = useSelector((state) => state.post.list);

  // 마커 클릭 이벤트 (바깥 영역 클릭 시 오버레이 닫기)
  useOutsideClick(ref, () => setIsOpen(false));
  useEffect(() => setMarkerData(getMarkerData), [getMarkerData]); // 상수에 저장되어 있던 오버레이 정보(유저)를 표시함
  useEffect(() => setMarkerData(getPostDetailData), [getPostDetailData]); // 상수에 저장되어 있던 오버레이 정보(일정)를 표시함

  /**
   * getDataFromAPI:
   * 마커 를릭 이벤트를 실행할때 Redux Action 을 실행하기 위한 함수입니다.
   * 해당 마커에 대한 Redux Action을 실행하기 위한, 인자와 변수입니다.
   * 인자 값 같은 것들은, id 와 isFriend, isSameSchedule, isMe, isSchedule 입니다.
   * 해당 인자값의 뜻대로 이해하시면 됩니다 :)
   * 아래 조건에 맞춰, Redux Action 을 실행하고, 위에 있는 useEffect 에 데이터를 지정합니다.
   */
  const getDataFromAPI = (id, isFriend, isSameSchedule, isMe, isSchedule) => {
    if (isMe) return getUserData;
    if (isFriend && !isSameSchedule && !isMe && !isSchedule)
      dispatch(markerActions.targetFriendDB(id));
    if (!isFriend && isSameSchedule && !isMe && !isSchedule)
      dispatch(markerActions.targetPostDB(id));
    if (isFriend && isSameSchedule && !isMe && !isSchedule)
      dispatch(markerActions.targetPostDB(id));
    if (!isFriend && !isSameSchedule && !isMe && !isSchedule)
      dispatch(markerActions.targetAllDB(id));
    if (!isFriend && !isSameSchedule && !isMe && isSchedule)
      dispatch(postActions.postDetailInfo(id));
    return {};
  };

  // My Location 버튼 (내위치 찾기)
  const panTo = (lat, lng) =>
    global?.map?.panTo(new kakao.maps.LatLng(lat, lng));

  // 마커 클릭 이벤트 (마커 클릭 시 오버레이 열기)
  /**
   * markerEventListener:
   * 지도에 있는 마커를 클릭했을때 발생하는 이벤트를 핸들링 하는 핸들러입니다.
   * 해당 마커를 클릭했을때 안에 있는 이벤트를 실행합니다.
   */
  const markerEventListener = (markerData) => {
    // markerData 안에 postId, userId 등 값을 assign 하여, 넘겨받음.
    if (!isOpen) {
      setIsOpen(true);
      panTo(markerData.position.getLat(), markerData.position.getLng());
      // Resize Marker, disabled
      // markerData.setImage(
      //   new kakao.maps.MarkerImage(
      //     markerData.markerImage.url,
      //     new kakao.maps.Size(32, 32),
      //     new kakao.maps.Point(30, 31)
      //   )
      // );
      const result = getDataFromAPI(
        markerData.isSchedule ? markerData.postId : markerData.userId,
        markerData.isFriend,
        markerData.isSameSchedule,
        markerData.isMe,
        markerData.isSchedule
      );
      setMarkerData(result);
    }
  };

  // 마커 생성 및 생성되는 마커에 클릭이벤트 부여하기
  /**
   * AddMarker 함수:
   * 지도 위에 마커를 생성하기 위한 함수입니다.
   * 유저 마커 또는, 일정 마커를 생성하기 위해선, 해당 마커의 정보와 마커 이미지가 다르기 때문에, 해당 함수를 만들어서 작업하게 되었습니다.
   * 해당 함수 안에 넘겨주는 인자값이 다양하고, 해당 마커가 유저인지 일정인지 구별하기 위해, Redux 안에서 api 에게 request 를 걸때,
   * 데이터 안에 type을 넣어 구별하도록 하였습니다.
   *
   * myFriends 와 mySchedules 라는 Redux Action 을 만들어, Relation 이라고 정의하고, 해당 Action을 실행시켜, 나와 친구인지, 나와 같은 일정인지에 대해
   * 구별하고 마커를 생성할 수 있도록 하였습니다.
   * 해당 데이터를 이용하여, addMarker 함수 안의 조건문을 걸어, 카카오맵 마커 데이터안에, 배치하여 다른 이벤트에서도 사용할 수 있도록 하였습니다.
   */
  const addMarker = (map, setMarkerId, position, post = false) => {
    let isFriend, isSameSchedule, isMe, isSchedule, isMarkerImage;
    setMarkerId = String(setMarkerId);
    if (Number(setMarkerId) >= 100) return;
    if (!post) {
      if (
        myFriends?.includes(setMarkerId) &&
        mySchedules?.includes(setMarkerId) &&
        String(myUserId) !== setMarkerId
      ) {
        // isFriend: true | isSameSchedules: true | isMe: false | schedule: false
        isFriend = true;
        isSameSchedule = true;
        isMe = false;
        isSchedule = false;
        isMarkerImage = MarkerImageObject.sameSchedule;
      } else if (
        myFriends?.includes(setMarkerId) &&
        !mySchedules?.includes(setMarkerId) &&
        String(myUserId) !== setMarkerId
      ) {
        // isFriend: true | isSameSchedules: false | isMe: false | schedule: false
        isFriend = true;
        isSameSchedule = false;
        isMe = false;
        isSchedule = false;
        isMarkerImage = MarkerImageObject.friend;
      } else if (
        !myFriends?.includes(setMarkerId) &&
        mySchedules?.includes(setMarkerId) &&
        String(myUserId) !== setMarkerId
      ) {
        // isFriend: false | isSameSchedules: true | isMe: false | schedule: false
        isFriend = false;
        isSameSchedule = true;
        isMe = false;
        isSchedule = false;
        isMarkerImage = MarkerImageObject.sameSchedule;
      } else if (
        !myFriends?.includes(setMarkerId) &&
        !mySchedules?.includes(setMarkerId) &&
        String(myUserId) === setMarkerId
      ) {
        // isFriend: false | isSameSchedules: false | isMe: true | schedule: false
        isFriend = false;
        isSameSchedule = false;
        isMe = true;
        isSchedule = false;
        isMarkerImage = MarkerImageObject.me;
      } else {
        // isFriend: false | isSameSchedules: false | isMe: false | schedule: false
        isFriend = false;
        isSameSchedule = false;
        isMe = false;
        isSchedule = false;
        isMarkerImage = MarkerImageObject.anonymous;
      }
    } else if (post) {
      // isFriend: false | isSameSchedules: false | isMe: false | schedule: true
      isFriend = false;
      isSameSchedule = false;
      isMe = false;
      isSchedule = true;
      isMarkerImage = MarkerImageObject.schedule;
    }
    // Logger.verbose(`[AddMarker] ${post ? `Schedule, SchedulePostId` : `User, UserId`}: ${setMarkerId}`)
    const markerSize = new kakao.maps.Size(24, 24);
    const markerImageOptions = { offset: new kakao.maps.Point(23, 23) };
    const markerImage = new kakao.maps.MarkerImage(
      isMarkerImage,
      markerSize,
      markerImageOptions
    );
    const marker = new kakao.maps.Marker({ position, image: markerImage });
    marker.setMap(map);
    Object.assign(marker, {
      [post ? "postId" : "userId"]: setMarkerId,
      isFriend,
      isSameSchedule,
      isMe,
      isSchedule,
      position,
      markerImage: {
        url: isMarkerImage,
        size: markerSize,
        options: markerImageOptions,
      },
    });
    kakao.maps.event.addListener(marker, "click", () =>
      markerEventListener(marker)
    );
    if (post) posts[setMarkerId] = marker;
    else markers.push(marker);
    return marker;
  };

  // 내 위치를 소켓으로 전송하는 부분
  const sendUserLocation = (userId, lat, lng) =>
    socket.emit("latlng", { userId, lat, lng });

  // Socket.io Event Handler -----------------------------------
  const userLocationListener = (data) => {
    markers.map((el) => el.setMap(null));
    markers.splice(0, markers.length);
    setMarkers([]);
    for (const key in data) {
      if (key !== null) {
        addMarker(
          global.map,
          key,
          new kakao.maps.LatLng(data[key].lat, data[key].lng),
          false
        );
      }
    }
  };

  const postLocationListener = (data) => {
    for (const obj of data) {
      if (obj?.postId !== null) {
        addMarker(
          global.map,
          obj.postId,
          new kakao.maps.LatLng(
            obj.lat > 100 ? obj.lng : obj.lat,
            obj.lng < 100 ? obj.lat : obj.lng
          ),
          true
        );
      }
    }
  };

  const postLocationRemoveListener = (obj) => {
    if (posts[obj.postId]) {
      posts[obj.postId]?.setMap(null);
      delete posts[obj.postId];
    }
  };
  // ------------------------------------------------------------------

  useEffect(() => {
    /*
     * Socket.io 와 ReactJS 의 통신:
     * userLocation: 유저 마커 이벤트 안에 데이터를 받아, useLocationListener 라는 이벤트 핸들러를 실행하여, 마커를 수정함.
     * postList: 모임 마커 이벤트 안에 데이터를 받아, postLocationListener 라는 이벤트 핸들러를 실행하여, 마커를 수정함.
     * newPost: 새로운 모임이 생겼을때, 데이터를 받아 postLocationListener 라는 이벤트 핸들러를 실행하여, 마커를 생성하고, 그 외 마커들은 수정함.
     * removePost: 원래 있던 모임이 삭제됐을때 해당 모임의 아이디를 받아와 postLocationRemoveListener 라는 이벤트 핸들러를 실행하여, 지도에서 마커를 삭제함.
     */
    // if (myFriends?.length === 0 && mySchedules?.length === 0) return;
    if (!geolocationMarker) return;
    socket.on("userLocation", userLocationListener);
    socket.on("postList", postLocationListener);
    socket.on("newPost", postLocationListener);
    socket.on("removePost", postLocationRemoveListener);
    return () => {
      Logger.debug(
        "[Socket.io:RemoveAllListener] Clearing All EventListener to Socket.io Client and Removing UserLocation Markers"
      );
      socket.removeAllListeners();
      markers.map((marker) => {
        kakao.maps.event.removeListener(marker, "click", () =>
          markerEventListener()
        );
        // return marker.setMap(null);
      });
    };
  }, [myFriends, mySchedules, geolocationMarker]);

  useEffect(() => {
    if (!geolocationMarker) return;
    if (getPostLocationsData?.length !== 0 && Object.keys(posts).length === 0)
      getPostLocationsData?.map((el) =>
        addMarker(
          global.map,
          el.postId,
          new kakao.maps.LatLng(
            el.lat > 100 ? el.lng : el.lat,
            el.lng < 100 ? el.lat : el.lng
          ),
          true
        )
      );
  }, [geolocationMarker, getPostLocationsData]);

  // 카카오맵 생성하기
  useEffect(() => {
    if (!geolocationMarker) return;
    Logger.info('[KakaoMap:LoadMap] Loaded KakaoMap, render to "div#map"');
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(
        props?.coords?.latitude,
        props?.coords?.longitude
      ),
      level: 3,
    };
    global.map = new kakao.maps.Map(container, options);
    // duplicate login, socket.on('closeEvent', (event) => { ... })
    return () => {};
  }, [geolocationMarker, setGeolocationMarker]);

  if (
    props.isGeolocationAvailable &&
    props.isGeolocationEnabled &&
    props?.coords &&
    !!getUserData?.userId &&
    !geolocationMarker
  ) {
    setGeolocationMarker(true);
    setMyUserId(getUserData.userId);
    dispatch(postActions.getPostLocationDB());
    setInterval(() => {
      sendUserLocation(
        getUserData.userId,
        props.coords.latitude,
        props.coords.longitude
      );
      // socket.emit("getPostList");
    }, 2000);
  }

  return (
    <Fragment>
      {sessionStorage.token && (
        <>
          <Header />
          <div className="container">
            {/* kakao 맵 생성 */}
            <div
              id="map"
              className="h-auto w-auto"
              style={{
                minWidth: "100vw",
                maxWidth: "100vw",
                minHeight: "95vh",
                maxHeight: "95vh",
              }}
            />
            {/* 오버레이 */}
            <Transition
              show={isOpen}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0"
              enterTo="transform opacity-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100"
              leaveTo="transform opacity-0"
              className="absolute left-0 right-0 bottom-0 border border-gray-300 rounded-t-lg bg-white py-4 topDropShadow"
              style={{ zIndex: 3 }}
            >
              <div ref={ref} className="container mx-auto px-4">
                <div id="overlay--author__status" className="block">
                  <Overlay
                    isOpen={isOpen}
                    image={
                      markerData?.type === "post"
                        ? !markerData?.postImg ??
                          String(markerData?.postImg).length === 0
                          ? "/assets/unknownChatRoomImg.gif"
                          : markerData?.postImg
                        : markerData?.type === "user"
                        ? !markerData?.profileImg ??
                          String(markerData?.profileImg).length === 0
                          ? "/assets/unknownProfile.jpg"
                          : markerData?.profileImg
                        : "/assets/unknownProfile.jpg"
                    }
                    rating={markerData?.rating}
                    isSchedule={markerData?.type === "post"}
                    id={markerData?.userId ?? markerData?.postId}
                    {...markerData}
                  />
                </div>
              </div>
            </Transition>
          </div>
          <Grid
            style={{ position: "fixed", top: "10%", left: "3%", zIndex: 99 }}
            width="auto"
            height="auto"
            overflow="visible"
          >
            <Button
              shadow="rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;"
              bg="rgba(255, 255, 255, 1)"
              hoverBg="#16C59B"
              color="#16C59B"
              hoverColor="#fcfcfc"
              padding="12px"
              margin="0 0 10px"
              radius="100%"
              className="custom_transition"
              clickEvent={() =>
                panTo(props?.coords?.latitude, props?.coords?.longitude)
              }
            >
              <MyLocationIcon />
            </Button>
          </Grid>
          <Footer>home</Footer>
        </>
      )}
    </Fragment>
  );
};

Main.propTypes = { ...Main.propTypes, ...geoPropTypes };

export default geolocated({
  positionOptions: { enableHighAccuracy: false },
  userDecisionTimeout: 500,
})(Main);
