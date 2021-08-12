/* global kakao */
// LIBRARY
import React, { useEffect, useState, useRef, Fragment } from "react";
import _ from "lodash";
import { Transition } from "@headlessui/react";
import { geolocated, geoPropTypes } from "react-geolocated";
import { useSelector, useDispatch } from "react-redux";

// REDUX
import { markerActions } from "../redux/modules/marker";
import { postActions } from "../redux/modules/post";

// COMMON
import socket from "../common/socket";

// COMPONENTS
import Header from "../components/Header";
import Overlay from "../components/Overlay";
import Footer from "../components/Footer";

// ELEMENTS
import { Grid, Button, Input } from "../elements/index";

// HOOKS
import useOutsideClick from "../hooks/useOutsideClick";

// MATERIAL-UI
import MyLocationIcon from "@material-ui/icons/MyLocation";

import Logger from "../utils/Logger";

const Main = (props) => {
  const dispatch = useDispatch();
  const [geolocationMarker, setGeolocationMarker] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [myUserId, setMyUserId] = useState(null);
  const [markerData, setMarkerData] = useState({});
  // const [callUserData, setCallUserData] = useState({})
  const debounce = _.debounce((value, setValue) => setValue(value), 300);
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
  const getMarkerData = useSelector((state) => state.marker);
  const getPostDetailData = useSelector((state) => state.post.postDetail);

  // 마커 클릭 이벤트 (바깥 영역 클릭 시 오버레이 닫기)
  useOutsideClick(ref, () => setIsOpen(false));
  useEffect(() => setMarkerData(getMarkerData), [getMarkerData]);
  useEffect(() => setMarkerData(getPostDetailData), [getPostDetailData]);

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
    if (!isOpen) {
      setIsOpen(true);
      // console.log(markerData)
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
    } else setIsOpen(false);
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
    if (!post) markers.push(marker);
    return marker;
  };

  // 내 위치를 소켓으로 전송하는 부분
  const sendUserLocation = (userId, lat, lng) =>
    socket.emit("latlng", { userId, lat, lng });

  // 인풋박스에서 임의의 마커 추가해보기. (소켓통신)
  // const submitAddMarker = () => {
  //   const userId = document.getElementById("input__userId");
  //   const locationLat = document.getElementById("input__location--lat");
  //   const locationLng = document.getElementById("input__location--lng");
  //   if (!userId?.value || !locationLat?.value || !locationLng?.value)
  //     return alert("모든 데이터를 입력해 주세요");
  //   if (
  //     markers.filter((el) => el.markerUserId === Number(userId?.value))
  //       .length >= 1
  //   )
  //     return alert(
  //       `중복되는 아이디가 있습니다. (중복되는 아이디: ${userId?.value})`
  //     );
  //   addMarker(
  //     global.map,
  //     userId?.value,
  //     new kakao.maps.LatLng(
  //       Number(locationLat?.value),
  //       Number(locationLng?.value)
  //     )
  //   );
  //   sendUserLocation(
  //     Number(userId.value),
  //     Number(locationLat.value),
  //     Number(locationLng.value)
  //   );
  //   alert(`마커가 생성되었습니다. (생성된 마커 아이디: ${userId?.value})`);
  //   userId.value = "";
  //   locationLat.value = "";
  //   locationLng.value = "";
  // };

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
          markerEventListener()
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
    setGeolocationMarker(true);
    setMyUserId(getUserData.userId);
    setInterval(() => {
      sendUserLocation(
        getUserData.userId,
        props.coords.latitude,
        props.coords.longitude
      );
      socket.emit("getPostList");
    }, 2000);
  }

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

  const postLocationListener = (data) => {
    posts.map((el) => el.setMap(null));
    posts.splice(0, posts.length);
    setPosts([]);
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

  useEffect(() => {
    if (!geolocationMarker) return;
    socket.on("userLocation", userLocationListener);
    socket.on("postList", postLocationListener);
    // setMarkerToSchedule();
    return () => {
      Logger.debug(
        "[Socket.io:UserLocation:Event:Clear] Clearing All EventListener to Socket.io Client"
      );
      socket.removeAllListeners();
      // socket.disconnect()
    };
  }, [myFriends, mySchedules, geolocationMarker]);

  return (
    <Fragment>
      {sessionStorage.token && (
        <>
          <Header />
          <div className="container">
            {/* <div
              className="absolute left-0 right-0 inline-flex"
              style={{ zIndex: 20 }}
            >
              <Input id="input__userId" placeholder="userId" />
              <Input id="input__location--lat" placeholder="Lat" />
              <Input id="input__location--lng" placeholder="Lng" />
              <div
                onClick={() => submitAddMarker()}
                className="bg-blue-500 hover:bg-blue-700 transition text-white rounded-lg text-center px-4 py-2 cursor-pointer"
              >
                Add Marker
              </div>
            </div> */}
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
