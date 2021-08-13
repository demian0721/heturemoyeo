/* global kakao */
// LIBRARY
import React, { useEffect, useState, useRef, Fragment } from "react";
import _ from "lodash";
import { Transition } from "@headlessui/react";
import { geolocated, geoPropTypes } from "react-geolocated";
import { useSelector, useDispatch } from "react-redux";

// REDUX
import { userActions } from "../redux/modules/user";
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

import Logger from "../utils/Logger";
import { sleep } from "../utils";

const Main = (props) => {
  const dispatch = useDispatch();
  const [geolocationMarker, setGeolocationMarker] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [posts] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [myUserId, setMyUserId] = useState(null);
  const [markerData, setMarkerData] = useState({});
  const [init, setInit] = useState(false);
  // const [callUserData, setCallUserData] = useState({})
  const ref = useRef();

  const markerImageObj = {
    me: "/assets/map_icon_me.png",
    sameSchedule: "/assets/map_icon_same_group.png",
    friend: "/assets/map_icon_friend.png",
    anonymous: "/assets/map_icon_Frame1.png",
    schedule: "/assets/map_icon_place.png",
  };

  // 로그인 후, 유저 데이터
  const getUserData = useSelector((state) => state.user);
  const myFriends = useSelector((state) => state.user.friendUsers);
  const mySchedules = useSelector((state) => state.user.scheduleUsers);
  const getMarkerData = useSelector((state) => state.marker); // 리덕스에서 유저 오버레이 정보를 저장해두는 상수
  const getPostDetailData = useSelector((state) => state.post.postDetail); // 리덕스에서 일정 오버레이 정보를 저장해두는 상수
  const getPostLocationData = useSelector((state) => state.post.list); // 일정 마커의 좌표 정보를 저장해두는 상수

  // 마커 클릭 이벤트 (바깥 영역 클릭 시 오버레이 닫기)
  useOutsideClick(ref, () => setIsOpen(false));
  useEffect(() => setMarkerData(getMarkerData), [getMarkerData]); // 상수에 저장되어 있던 오버레이 정보(유저)를 표시함
  useEffect(() => setMarkerData(getPostDetailData), [getPostDetailData]); // 상수에 저장되어 있던 오버레이 정보(일정)를 표시함

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
      if (result) setMarkerData(result);
    }
  };

  /**
   * Marker Color set
   * - Red: Me
   * - Blue: Friend
   * - Yellow: Same schedule
   * - Gray: Anonymous
   */
  // 마커 생성 및 생성되는 마커에 클릭이벤트 부여하기
  const addMarker = (map, setMarkerId, position, post = false) => {
    let isFriend, isSameSchedule, isMe, isSchedule, isMarkerImage;
    setMarkerId = String(setMarkerId);
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
        isMarkerImage = markerImageObj.sameSchedule;
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
        isMarkerImage = markerImageObj.friend;
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
        isMarkerImage = markerImageObj.sameSchedule;
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
        isMarkerImage = markerImageObj.me;
      } else {
        // isFriend: false | isSameSchedules: false | isMe: false | schedule: false
        isFriend = false;
        isSameSchedule = false;
        isMe = false;
        isSchedule = false;
        isMarkerImage = markerImageObj.anonymous;
      }
    } else if (post) {
      // isFriend: false | isSameSchedules: false | isMe: false | schedule: true
      isFriend = false;
      isSameSchedule = false;
      isMe = false;
      isSchedule = true;
      isMarkerImage = markerImageObj.schedule;
    }
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

  // 카카오맵 생성하기
  useEffect(() => {
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
    return () => {
      Logger.debug(
        "[KakaoMap:Marker:Event:Clear] Clearing Click EventListener to markers"
      );
      markers.map((marker) =>
        kakao.maps.event.removeListener(marker, "click", () =>
          markerEventListener(marker)
        )
      );
    };
  }, [geolocationMarker, setGeolocationMarker]);

  if (!props.isGeolocationAvailable)
    alert("해당 기기는 GeoLocation을 지원하지 않습니다!");
  if (!props.isGeolocationEnabled)
    alert("해당 기기에서 GeoLocation이 활성화 되어있지 않습니다!");
  if (
    props.isGeolocationAvailable &&
    props.isGeolocationEnabled &&
    props?.coords &&
    !!getUserData?.userId &&
    !geolocationMarker
  ) {
    console.log("마커 생성할겝!");
    setGeolocationMarker(true);
    setMyUserId(getUserData.userId);
    setInterval(() => {
      sendUserLocation(
        getUserData.userId,
        props.coords.latitude,
        props.coords.longitude
      );
    }, 2000);
  }

  // GET /api/post/posts/Location 받아오기
  if (getPostLocationData?.length !== 0 && !init) {
    getPostLocationData.map((el) =>
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
    setInit(true);
  }

  // useEffect(() => {
  //   if (getPostLocationData?.list?.length !== 0 && !init) {
  //     getPostLocationData.list.map((el) =>
  //     addMarker(
  //       global.map,
  //       el.postId,
  //       new kakao.maps.LatLng(
  //         el.lat > 100 ? el.lng : el.lat,
  //         el.lng < 100 ? el.lat : el.lng
  //       ),
  //       true
  //     )
  //   );
  //   setInit(true);
  //   }
  // }, [init, setInit, getPostLocationData?.list]);

  // useEffect(() => {
  //   // Logger.debug(`[PostLocation] Get PostLocation...`)
  //   getPostLocationData?.list?.map((el) => {
  //     // Logger.info(`[PostLocation] Loaded PostLocation via postId: ${el.postId} (Lat: ${el.lat > 100 ? el.lng : el.lat} | Lng: ${el.lng < 100 ? el.lat : el.lng})`)
  //     return addMarker(
  //       global.map,
  //       el.postId,
  //       new kakao.maps.LatLng(
  //         el.lat > 100 ? el.lng : el.lat,
  //         el.lng < 100 ? el.lat : el.lng
  //       ),
  //       true
  //     );
  //   });
  // }, [getPostLocationData]);

  const userLocationListener = (data) => {
    // console.log(markers.map(el => ({ userId: el.userId, position: el.position })))
    markers.map((el) => el.setMap(null));
    markers.splice(0, markers.length);
    setMarkers([]);
    for (const key in data) {
      if (key !== null) {
        addMarker(
          global.map,
          key,
          new kakao.maps.LatLng(data[key].lat, data[key].lng)
        );
      }
    }
  };

  const postLocationListener = (obj) => {
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
  };
  const postLocationRemoveListener = (obj) => {
    posts[obj.postId]?.setMap(null);
    delete posts[obj.postId];
  };

  useEffect(() => {
    if (!geolocationMarker) return;
    socket.on("userLocation", userLocationListener);
    socket.on("newPost", postLocationListener);
    socket.on("removePost", postLocationRemoveListener);
    socket.on("closeEvent", (event) => {
      sessionStorage.removeItem("token");
      alert("중복 로그인입니다. 로그인 페이지로 돌아갑니다.");
      window.location.href = "/login";
    });
    // setMarkerToSchedule();
    return () => {
      Logger.debug(
        "[Socket.io:UserLocation:Event:Clear] Clearing All EventListener to Socket.io Client"
      );
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [myFriends, mySchedules, geolocationMarker]);

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
