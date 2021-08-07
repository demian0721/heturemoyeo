/* global kakao */
// LIBRARY
import React, { useEffect, useState, useRef, Fragment } from "react";
import _ from "lodash";
import { Transition } from "@headlessui/react";
import { geolocated, geoPropTypes } from "react-geolocated";
import { useSelector, useDispatch } from "react-redux";

// REDUX
import { markerActions } from "../redux/modules/marker";

// COMMON
import socket from "../common/socket";

// COMPONENTS
import Header from "../components/Header";
import UserOverlay from "../components/UserOverlay";
import Footer from "../components/Footer";

// ELEMENTS
import { Grid, Button, Input } from "../elements/index";

// HOOKS
import useOutsideClick from "../hooks/useOutsideClick";

// MATERIAL-UI
import MyLocationIcon from "@material-ui/icons/MyLocation";

const Main = (props) => {
  const dispatch = useDispatch();
  const [geolocationMarker, setGeolocationMarker] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [myUserId, setMyUserId] = useState(null);
  const [userData, setUserData] = useState({});
  // const [callUserData, setCallUserData] = useState({})
  const debounce = _.debounce((value, setValue) => setValue(value), 300);
  const ref = useRef();

  const markerImageObj = {
    me: "https://cdn.discordapp.com/emojis/636204464809836546.png?v=1",
    sameSchedule: "https://cdn.discordapp.com/emojis/636204456345862204.png?v=1",
    friend: "https://cdn.discordapp.com/emojis/686639764023017501.png?v=1",
    anonymous: "https://cdn.discordapp.com/emojis/686639764023017501.png?v=1",
  };

  // 로그인 후, 유저 데이터
  const getUserData = useSelector((state) => state.user);
  const myFriends = useSelector((state) => state.user.friendUsers);
  const mySchedules = useSelector((state) => state.user.scheduleUsers);
  const getMarkerData = useSelector((state) => state.marker);
  useEffect(() => {
    setUserData(getMarkerData);
  }, [getMarkerData]);

  // 마커 클릭 이벤트 (바깥 영역 클릭 시 오버레이 닫기)
  useOutsideClick(ref, () => setIsOpen(false));

  const getUserDataFromAPI = (userId, isFriend, isSameSchedule, isMe) => {
    if (isMe) return getUserData;
    if (isFriend && !isSameSchedule && !isMe)
      dispatch(markerActions.targetFriendDB(userId));
    if (!isFriend && isSameSchedule && !isMe)
      dispatch(markerActions.targetPostDB(userId));
    if (isFriend && isSameSchedule && !isMe)
      dispatch(markerActions.targetPostDB(userId));
    if (!isFriend && !isSameSchedule && !isMe)
      dispatch(markerActions.targetAllDB(userId));
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
      markerData.setImage(
        new kakao.maps.MarkerImage(
          markerData.markerImage.url,
          new kakao.maps.Size(32, 32),
          new kakao.maps.Point(30, 31)
        )
      );
      const result = getUserDataFromAPI(
        markerData.userId,
        markerData.isFriend,
        markerData.isSameSchedule,
        markerData.isMe
      );
      setUserData(result);
      // setUserData(data)
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
  const addMarker = (map, markerUserId, position) => {
    let isFriend, isSameSchedule, isMe, isMarkerImage;
    // markerUserId = Number(markerUserId)
    markerUserId = String(markerUserId);
    if (
      myFriends?.includes(markerUserId) &&
      mySchedules?.includes(markerUserId) &&
      String(myUserId) !== markerUserId
    ) {
      // isFriend: true | isSameSchedules: true | isMe: false
      isFriend = true;
      isSameSchedule = true;
      isMe = false;
      isMarkerImage = markerImageObj.sameSchedule;
    } else if (
      myFriends?.includes(markerUserId) &&
      !mySchedules?.includes(markerUserId) &&
      String(myUserId) !== markerUserId
    ) {
      // isFriend: true | isSameSchedules: false | isMe: false
      isFriend = true;
      isSameSchedule = false;
      isMe = false;
      isMarkerImage = markerImageObj.friend;
    } else if (
      !myFriends?.includes(markerUserId) &&
      mySchedules?.includes(markerUserId) &&
      String(myUserId) !== markerUserId
    ) {
      // isFriend: false | isSameSchedules: true | isMe: false
      isFriend = false;
      isSameSchedule = true;
      isMe = false;
      isMarkerImage = markerImageObj.sameSchedule;
    } else if (
      !myFriends?.includes(markerUserId) &&
      !mySchedules?.includes(markerUserId) &&
      String(myUserId) === markerUserId
    ) {
      // isFriend: false | isSameSchedules: false | isMe: true
      isFriend = false;
      isSameSchedule = false;
      isMe = true;
      isMarkerImage = markerImageObj.me;
    } else {
      // isFriend: false | isSameSchedules: false | isMe: false
      isFriend = false;
      isSameSchedule = false;
      isMe = false;
      isMarkerImage = markerImageObj.anonymous;
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
      userId: markerUserId,
      isFriend,
      isSameSchedule,
      isMe,
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
    markers.push(marker);
    return marker;
  };

  // 내 위치를 소켓으로 전송하는 부분
  const sendUserLocation = (userId, lat, lng) =>
    socket.emit("latlng", { userId, lat, lng });

  // 인풋박스에서 임의의 마커 추가해보기. (소켓통신)
  const submitAddMarker = () => {
    const userId = document.getElementById("input__userId");
    const locationLat = document.getElementById("input__location--lat");
    const locationLng = document.getElementById("input__location--lng");
    if (!userId?.value || !locationLat?.value || !locationLng?.value)
      return alert("모든 데이터를 입력해 주세요");
    if (
      markers.filter((el) => el.markerUserId === Number(userId?.value))
        .length >= 1
    )
      return alert(
        `중복되는 아이디가 있습니다. (중복되는 아이디: ${userId?.value})`
      );
    addMarker(
      global.map,
      userId?.value,
      new kakao.maps.LatLng(
        Number(locationLat?.value),
        Number(locationLng?.value)
      )
    );
    sendUserLocation(
      Number(userId.value),
      Number(locationLat.value),
      Number(locationLng.value)
    );
    alert(`마커가 생성되었습니다. (생성된 마커 아이디: ${userId?.value})`);
    userId.value = "";
    locationLat.value = "";
    locationLng.value = "";
  };

  // 카카오맵 생성하기
  useEffect(() => {
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
      console.log("clearing markers click events...");
      markers.map((marker) =>
        kakao.maps.event.removeListener(marker, "click", () =>
          markerEventListener()
        )
      );
    };
  }, [props]);

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
    sendUserLocation(
      getUserData.userId,
      props.coords.latitude,
      props.coords.longitude
    );
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

  useEffect(() => {
    if (!geolocationMarker) return;
    socket.on("userLocation", userLocationListener);
    return () => {
      console.log("clearing socket.io events...");
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
            <div
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
            </div>
            {/* kakao 맵 생성 */}
            <div
              id="map"
              className="h-auto w-auto"
              style={{
                minWidth: "100vw",
                maxWidth: "100vw",
                minHeight: "93vh",
                maxHeight: "94vh",
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
                  <UserOverlay
                    isOpen={isOpen}
                    // isMe={userData?.isMe}
                    // name={userData?.name}
                    nickname={userData?.nickname}
                    userStatusMessage={userData?.statusMessage}
                    userLikeItem={userData?.likeItem}
                    userSchedule={userData?.scheduleTitle}
                    profileImage={
                      userData?.profileImg ??
                      "/assets/unknownProfile.jpg"
                    }
                    scheduleCount={userData?.scheduleCount}
                    userRating={userData?.rating}
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
              padding="12px"
              margin="0 0 10px"
              radius="100%"
              clickEvent={() =>
                panTo(props?.coords?.latitude, props?.coords?.longitude)
              }
            >
              <MyLocationIcon />
            </Button>
          </Grid>
          <Footer />
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
