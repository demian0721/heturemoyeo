/* global kakao */

// LIBRARY
import React, { useRef, useState, useEffect, Fragment } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { geolocated, geoPropTypes } from "react-geolocated";
import _ from "lodash";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import "../react-datepicker.css";
import { addDays } from "date-fns";
import moment from "moment";

// TOKEN
import { getToken } from "../common/token";

// HISTORY
import { history } from "../redux/configStore";

// REDUX
import { imgActions } from "../redux/modules/image";
import { postActions } from "../redux/modules/post";

// COMPONENTS
import Header from "../components/Header";
import Footer from "../components/Footer";
import Permit from "../components/Permit";

// ELEMENTS
import { Grid, Input, Image, Title, Text, Button } from "../elements/index";

// ICON
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import RoomIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

import useOutsideClick from "../hooks/useOutsideClick";
import { Today } from "@material-ui/icons";

const PostWrite = (props) => {
  let { postInfo } = props;

  const dispatch = useDispatch();

  const fileInput = useRef();
  const modalRef = useRef();

  const image = useSelector((state) => state.image);
  const preview = !image.preview && props ? props.postImg : image.preview;

  const [height, setHeight] = useState(preview ? "auto" : "228px");
  const [width, setWidth] = useState(preview ? "fit-content" : "auto");

  const [location, setLocation] = useState({});
  const [locationCoords, setLocationCoords] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [loadMap, setLoadMap] = useState(false);
  const [inputValue, setInputValue] = useState("");
  // const [tags, setTags] = useState([]);

  const [beginDate, setBeginDate] = useState(null);
  const [finishDate, setFinishDate] = useState(null);

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const getDayName = (date) => {
    return date.toLocaleDateString("ko-KR", { weekday: "long" }).substr(0, 1);
  };
  const createDate = (date) => {
    return new Date(
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
    );
  };

  useOutsideClick(modalRef, () => {
    setViewModal(false);
    setIsOpen(false);
  });

  const [postingContents, setPostingContents] = useState({
    title: postInfo ? postInfo.title : "",
    content: postInfo ? postInfo.content : "",
    maxMember: postInfo ? postInfo.maxMember : "",
    startDate: postInfo ? postInfo.startDate : "",
    endDate: postInfo ? postInfo.endDate : "",
    place: postInfo ? postInfo.place : "",
    bring: postInfo ? postInfo.bring : "",
    tag: postInfo ? postInfo.tag : [],
    // tag: postInfo ? postInfo.tag.length !== 0 ? postInfo.tag : tags.length !== 0 ? tags : [] : [],
    lat: postInfo ? postInfo.lat : 0,
    lng: postInfo ? postInfo.lng : 0,
  });

  const isItPossibleToAdd = () => {
    if (
      preview &&
      postingContents.title &&
      postingContents.content &&
      postingContents.maxMember &&
      postingContents.startDate &&
      postingContents.endDate &&
      postingContents.place &&
      postingContents.bring &&
      postingContents.tag.length >= 1
    )
      return true;
    return false;
  };

  const selectFile = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    if (file) {
      reader.readAsDataURL(file);

      reader.onload = () => {
        dispatch(imgActions.setPreview(reader.result));
        setHeight("auto");
        setWidth("fit-content");
      };
    }
  };

  const addPost = () => {
    const isAvailable = isItPossibleToAdd();
    if (!isAvailable) return window.alert("각 항목은 필수 입력사항 입니다.");
    dispatch(
      postActions.addPostDB(fileInput.current.files[0], postingContents)
    );
    dispatch(imgActions.setPreview(null));
    setTimeout(() => {
      // dispatch -> addPostDB 액션 후, alert 를 띄우는 과정이 생략되고, 액션을 실행하지 못하는 것 떄문에, setTimeout을 넣어 3초를 기다린 후, 페이지를 이동하게 하였습니다.
      window.location.href = "/postlist";
    }, 3000);
  };

  useEffect(() => {
    if (!getToken()) {
      history.replace("/login");
    }
  }, []);

  let kakaoMap, geocoder, marker;
  const getAddressFromCoords = (coords, cb) => {
    geocoder.coord2RegionCode(coords?.getLng(), coords?.getLat(), cb);
  };
  const getAddressDetailFromCoords = (coords, cb) => {
    geocoder.coord2Address(coords?.getLng(), coords?.getLat(), cb);
  };
  const markerFromCenter = () => {
    marker.setPosition(kakaoMap.getCenter());
    marker.setMap(kakaoMap);
    const getMapCenter = kakaoMap.getCenter();
    setLocationCoords({
      lat: getMapCenter.getLat(),
      lng: getMapCenter.getLng(),
    });
    getAddressDetailFromCoords(getMapCenter, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const data = result?.[0];
        setLocation({
          도로명: data?.road_address?.address_name,
          지번: data?.address?.address_name,
        });
      }
    });
  };
  const mapEventListener = _.debounce(() => markerFromCenter(), 200);
  useEffect(() => {
    const container = document.getElementById("map");
    if (!container) return;
    const position = new kakao.maps.LatLng(
      props?.coords?.latitude,
      props?.coords?.longitude
    );
    const options = {
      center: position,
      level: 3,
    };
    kakaoMap = new kakao.maps.Map(container, options);
    geocoder = new kakao.maps.services.Geocoder();
    const markerSize = new kakao.maps.Size(24, 24);
    const markerImageOptions = { offset: new kakao.maps.Point(23, 23) };
    const markerImage = new kakao.maps.MarkerImage(
      "/assets/map_select_place.png",
      markerSize,
      markerImageOptions
    );
    marker = new kakao.maps.Marker({ position, image: markerImage });
    markerFromCenter();
    kakao.maps.event.addListener(kakaoMap, "drag", mapEventListener);
    kakao.maps.event.addListener(kakaoMap, "idle", mapEventListener);
    return () => {
      kakao.maps.event.removeListener(kakaoMap, "drag", mapEventListener);
      kakao.maps.event.removeListener(kakaoMap, "idle", mapEventListener);
    };
  }, [props, isOpen, setIsOpen, viewModal, setViewModal, loadMap, setLoadMap]);

  // if (!props.isGeolocationAvailable)
  //   alert("해당 기기는 GeoLocation을 지원하지 않습니다!");
  // if (!props.isGeolocationEnabled)
  //   alert("해당 기기에서 GeoLocation이 활성화 되어있지 않습니다!");

  useEffect(() => {
    console.log(moment(beginDate).format("YYYY-MM-DD HH:mm:ss"));
    // console.log(postingContents);
  }, [beginDate, postingContents]);

  const [checked, setChecked] = useState(false);

  return (
    <Style>
      <Permit height="">
        <Grid height="">
          <Header id="write">게시글 작성</Header>
        </Grid>
        <Grid
          width="100%"
          height=""
          margin="75px auto 55px auto"
          maxWidth="480px"
        >
          <Grid padding="15px" bg="#FFFFFF" height="" margin="auto">
            <Grid
              width="calc(100% - 10px)"
              height=""
              margin="0 15px 0 5px"
              tabletStyle={() => {
                return css`
                  margin: 0 auto;
                `;
              }}
            >
              <Title
                fontSize="14px"
                margin="30px 0px 15px 0px"
                style={{ color: "#535353" }}
              >
                대표 이미지
              </Title>
              <Grid
                id="image"
                bg="#D4D4D4"
                radius="10px"
                margin="5px auto"
                width=""
                height=""
                style={{
                  height: `${height}`,
                  width: `${width}`,
                  position: "relative",
                }}
              >
                <LabelStyle htmlFor="input--file">
                  {!preview ? (
                    <>
                      <AddAPhotoOutlinedIcon color="action" />
                      <Text color="#646970" fontSize="15px" marginLeft="10px">
                        모임 대표 이미지 추가
                      </Text>
                    </>
                  ) : null}
                </LabelStyle>

                <InputFile
                  type="file"
                  id="input--file"
                  ref={fileInput}
                  accept="image/png, image/jpeg"
                  onChange={selectFile}
                />

                <Image
                  style={{ position: "absolute", left: 0, top: 0 }}
                  src={preview}
                />
              </Grid>
            </Grid>
            <Grid
              is_flex
              margin="20px 0 0 0"
              style={{ justifyContent: "space-between" }}
              width="100%"
            >
              <div
                className="block"
                style={{ margin: "15px 5px", width: "50%" }}
              >
                <Text
                  fontSize="14px"
                  color="#535353"
                  fontWeight="bold"
                  margin="0px 0px 14px 0px"
                >
                  시작
                </Text>
                <DatePicker
                  locale={ko}
                  dateFormat="yyyy-MM-dd H:mm"
                  className="input-datepicker"
                  minDate={new Date()}
                  maxDate={addDays(new Date(), 7)}
                  // closeOnScroll={true}
                  placeholderText="시작을 설정하세요"
                  selected={beginDate}
                  startDate={beginDate}
                  // endDate={finishDate}
                  selectsStart
                  filterTime={filterPassedTime}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="헤쳐"
                  // withPortal
                  popperModifiers={{ preventOverflow: { enabled: true } }}
                  popperPlacement="bottom"
                  dayClassName={(date) =>
                    getDayName(createDate(date)) === "토"
                      ? "saturday"
                      : getDayName(createDate(date)) === "일"
                      ? "sunday"
                      : undefined
                  }
                  onChange={(date) => {
                    setPostingContents({
                      ...postingContents,
                      startDate: date,
                    });
                    setBeginDate(date);
                  }}
                />
              </div>

              <div
                className="block"
                style={{ margin: "15px 5px", width: "50%" }}
              >
                <Text
                  fontSize="14px"
                  color="#535353"
                  fontWeight="bold"
                  margin="0px 0px 14px 0px"
                >
                  종료
                </Text>
                <DatePicker
                  locale={ko}
                  dateFormat="yyyy-MM-dd H:mm"
                  className="input-datepicker"
                  minDate={beginDate}
                  maxDate={addDays(new Date(), 14)}
                  // closeOnScroll={true}
                  placeholderText="종료를 설정하세요"
                  selected={finishDate}
                  startDate={beginDate}
                  endDate={finishDate}
                  selectsEnd
                  filterTime={filterPassedTime}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="모여"
                  // withPortal
                  popperModifiers={{ preventOverflow: { enabled: true } }}
                  popperPlacement="bottom"
                  dayClassName={(date) =>
                    getDayName(createDate(date)) === "토"
                      ? "saturday"
                      : getDayName(createDate(date)) === "일"
                      ? "sunday"
                      : undefined
                  }
                  onChange={(date) => {
                    setPostingContents({
                      ...postingContents,
                      endDate: date,
                    });
                    setFinishDate(date);
                  }}
                />
              </div>
            </Grid>
            <div
              className="block"
              style={{ margin: "10px 5px", width: "100%" }}
            >
              <Text fontSize="14px" color="#535353" fontWeight="bold">
                장소
              </Text>
              <div className="flex justify-between">
                <div
                  className={`self-center items-center ${
                    checked
                      ? "cursor-default bg-gray-300"
                      : "bg-green-300 cursor-pointer"
                  }`}
                  style={{
                    paddingTop: "6.5px",
                    paddingBottom: "6.5px",
                    paddingRight: "3px",
                    paddingLeft: "3px",
                  }}
                  value={postingContents.place}
                  onClick={() => {
                    if (checked) return;
                    setViewModal(true);
                    setIsOpen(true);
                  }}
                >
                  <RoomIcon />
                </div>
                <div className="self-center">
                  <InputBox
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    id="locationInput"
                    style={{
                      width: "400px",
                      margin: "7px 5px 7px 5px",
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      borderBottom: "solid 2px #E5E5E5",
                      boxShadow: "none",
                    }}
                    placeholder="장소(한글 주소로 출력)"
                    type="text"
                    value={checked ? "온라인 모임" : inputValue}
                    // onChange={(e) => {
                    //   setPostingContents({
                    //     ...postingContents,
                    //     place: e.target.value,
                    //   });
                    // }}
                    onClick={() => {
                      setViewModal(true);
                      setIsOpen(true);
                    }}
                  />
                </div>
              </div>
              <div className="flex ml-10 self-center">
                <input
                  id="online-schedule"
                  type="checkbox"
                  name="온라인모임"
                  defaultChecked={checked}
                  onChange={() => {
                    setChecked((state) => {
                      setPostingContents({
                        ...postingContents,
                        place: !state ? "온라인 모임" : "",
                        lat: null,
                        lng: null,
                      });
                      return !state;
                    });
                  }}
                  // ref='checkbox'
                />
                <span className="inline-flex ml-1">온라인 모임 여부</span>
              </div>
            </div>
            <Grid is_flex style={{ justifyContent: "space-between" }}>
              <div style={{ margin: "10px 5px", width: "22%" }}>
                <Text fontSize="14px" color="#535353" fontWeight="bold">
                  정원
                </Text>
                <InputBox
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  type="number"
                  min="2"
                  style={{
                    width: "100%",
                    borderLeft: "none",
                    borderRight: "none",
                    borderTop: "none",
                    borderBottom: "solid 2px #E5E5E5",
                    boxShadow: "none",
                  }}
                  padding="8px 0px"
                  placeholder="인원수"
                  value={postingContents.maxMember}
                  onChange={(e) => {
                    setPostingContents({
                      ...postingContents,
                      maxMember: e.target.value,
                    });
                  }}
                />
              </div>
              <div style={{ margin: "15px 5px", width: "100%" }}>
                <Text fontSize="14px" color="#535353" fontWeight="bold">
                  지참금
                </Text>
                <InputBox
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  style={{
                    width: "100%",
                    borderLeft: "none",
                    borderRight: "none",
                    borderTop: "none",
                    borderBottom: "2px solid #E5E5E5",
                    boxShadow: "none",
                  }}
                  padding="8px 0px"
                  placeholder="문자로 작성하세요"
                  type="text"
                  value={postingContents.bring}
                  onChange={(e) => {
                    setPostingContents({
                      ...postingContents,
                      bring: e.target.value,
                    });
                  }}
                />
              </div>
            </Grid>
            {/* <Text
              margin="10px 5px"
              color="#888888"
              fontWeight="bold"
              fontSize="small"
            >
              공개설정
            </Text> */}

            <Grid style={{ border: "1px solid #B2B2B2", margin: "10px 0px" }} />
            <div style={{ margin: "10px 15px 10px 5px" }}>
              <div>
                <Text
                  color="#535353"
                  fontWeight="bold"
                  fontSize="14px"
                  margin="10px 0px"
                >
                  제목
                </Text>
                <InputBox
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  style={{
                    border: "1.5px solid #white",
                    // margin: "7px auto",
                    borderLeft: "none",
                    borderRight: "none",
                    borderTop: "none",
                    borderBottom: "solid 2px #E5E5E5",
                    boxShadow: "none",
                  }}
                  placeholder="제목을 입력하세요"
                  type="text"
                  value={postingContents.title}
                  onChange={(e) => {
                    setPostingContents({
                      ...postingContents,
                      title: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <Text
                  color="#535353"
                  fontWeight="bold"
                  fontSize="14px"
                  margin="30px 0px 17px 0px"
                >
                  내용
                </Text>
                <Textarea
                  rows="10"
                  placeholder="내용을 입력하세요"
                  type="text"
                  value={postingContents.content}
                  onChange={(e) => {
                    setPostingContents({
                      ...postingContents,
                      content: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <Grid style={{ border: "1px solid #B2B2B2", margin: "10px 0px" }} />

            <div style={{ margin: "15px 0px" }}>
              <Text
                color="#535353"
                fontWeight="bold"
                fontSize="14px"
                margin="10px 0px"
              >
                태그입력
              </Text>
              <InputBox
                style={{
                  width: "100%",
                  border: "1.5px solid #white",
                }}
                placeholder="태그를 설정하세요(예시단어: 걷기, 산책)"
                type="text"
                value={postingContents.tag}
                onChange={(e) => {
                  setPostingContents({
                    ...postingContents,
                    tag: String(e.target.value).includes(",")
                      ? e.target.value.split(",")
                      : [e.target.value],
                  });
                }}
              />
              {/* {tags.length !== 0 && (
                <div className="flex flex-wrap mb-2">
                  {tags
                    .filter((el) => el.length !== 0)
                    .map((el, index) => {
                      return (
                        <div
                          key={index}
                          className="flex justify-start bottom-0 rounded-md bg-main listBtn transition duration-300 ease-in-out px-2 py-1 self-center text-white my-1 mx-1"
                        >
                          <span className="flex">{el.trim()}</span>
                          <div
                            className="flex cursor-pointer"
                            style={{ marginTop: "-0.1rem" }}
                            onClick={() =>
                              setTags((state) =>
                                state.filter((el, idx) => idx !== index)
                              )
                            }
                          >
                            <CloseIcon />
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
              <div className="flex self-center">
                <InputBox
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  style={{
                    width: "100%",
                    border: "1.5px solid #white",
                  }}
                  placeholder="태그를 설정하세요"
                  type="text"
                  onChange={(e) => {
                    // e.preventDefault()
                    setPostingContents({
                      ...postingContents,
                      tag: tags,
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode === 32) {
                      if (String(e.target.value).length >= 2) {
                        tags.push(e.target.value);
                      }
                      e.target.value = "";
                    }
                  }}
                />
                {tags.length !== 0 && (
                  <div
                    className="px-2 h-full py-4 border-r border-t border-b border-gray-400 mr-1 bg-green-300 cursor-pointer"
                    onClick={() => setTags([])}
                  >
                    <CloseIcon />
                  </div>
                )}
              </div> */}
            </div>
            <Button
              width="100%"
              height="auto"
              padding="12px 0"
              margin="20px 0px 30px 0px"
              fontSize="18px"
              bg="#16C59B"
              radius="5px"
              color="#FFFFFF"
              className="custom_transition"
              style={{ fontWeight: "bold", border: "none" }}
              hoverColor="#16C59B"
              onClick={addPost}
            >
              완료
            </Button>
          </Grid>
        </Grid>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 overflow-y-auto z-10"
            onClose={() => setViewModal(false)}
            ref={modalRef}
          >
            <div ref={modalRef} className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div
                  ref={modalRef}
                  className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl self-center items-center"
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    위치 찾기
                  </Dialog.Title>
                  <div className="mt-2 mb-2">
                    <p className="text-sm text-gray-500">
                      지도를 움직여 위치를 찾아주세요.
                    </p>
                  </div>

                  {!loadMap ? (
                    <div
                      onClick={() => setLoadMap(true)}
                      className="cursor-pointer inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500 transition duration-300 ease-in-out"
                    >
                      지도 로드하기
                    </div>
                  ) : (
                    <div
                      id="map"
                      className="h-auto w-auto flex rounded-md"
                      style={{
                        minWidth: "15.5vw",
                        maxWidth: "100vw",
                        minHeight: "30vh",
                        maxHeight: "30vh",
                      }}
                    />
                  )}

                  {loadMap && (
                    <div className="my-2">
                      {Object.keys(location).length <= 0 ? (
                        <div className="font-bold">
                          지도를 움직여 위치를 찾아주세요!
                        </div>
                      ) : (
                        <div id="locationInfo" className="block">
                          지번 주소: {location?.["지번"] ?? "찾을 수 없음"}
                          <br />
                          도로명 주소: {location?.["도로명"] ?? "찾을 수 없음"}
                          <br />
                          <br />
                          Latitude: {locationCoords.lat}
                          <br />
                          Longitude: {locationCoords.lng}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-4 space-x-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition duration-300 ease-in-out"
                      onClick={() => {
                        setViewModal(false);
                        setIsOpen(false);
                        setLoadMap(false);
                        setInputValue(
                          location?.["도로명"] ??
                            location?.["지번"] ??
                            "찾을 수 없음"
                        );
                        setPostingContents({
                          ...postingContents,
                          ...locationCoords,
                          place:
                            location?.["도로명"] ??
                            location?.["지번"] ??
                            "없음",
                        });
                      }}
                    >
                      확인
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 transition duration-300 ease-in-out"
                      onClick={() => {
                        setViewModal(false);
                        setIsOpen(false);
                        setLoadMap(false);
                        setLocation({});
                      }}
                    >
                      취소
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
        <Footer />
      </Permit>
    </Style>
  );
};
const Textarea = styled.textarea`
  width: 100%;
  padding: 0px 2px;
  border: none;
  margin: 7px auto;
  outline: none;
  resize: none;
  ::placeholder {
    font-size: 16px;
  }
`;

const InputBox = styled.input`
  width: 100%;
  border: solid 1.5px #a7aaad;
  padding: 14px 2px;
  ::placeholder {
    font-size: 16px;
  }
`;

// const CalendarContainer = styled.div``;

// const EnterButton = styled.button`
//   width: 100%;
//   background-color: #a7aaad;
//   padding: 10px;
//   margin: 10px auto;
//   font-size: 12px;
//   display: flex;
//   justify-content: center;
// `;

const PosAbs = () => {
  return css`
    position: absolute;
    top: 0;
    left: 0;
  `;
};

const LabelStyle = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  font-size: 20px;
  box-sizing: border-box;
  ${PosAbs()};
  z-index: 3;
`;

const InputFile = styled.input`
  width: 1px;
  height: 1px;
  overflow: hidden;
  ${PosAbs()};
`;

const InputArea = styled.textarea`
  --lightcolor: #6c757d;

  width: 100%;
  height: 158px;
  resize: none;
  padding: 8px 15px;
  margin-bottom: 30px;
  border-radius: 20px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 16px;

  &:focus {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px inset;
    outline: none;
    border: none;
  }

  &::placeholder {
    color: var(--lightcolor);
  }

  &::-webkit-input-placeholder {
    color: var(--lightcolor);
  }

  &:-ms-input-placeholder {
    color: var(--lightcolor);
  }
`;

const Style = styled.div`
  align-items: center;
  /* position: absolute; */
  width: 100vw;
  height: 100%;
  background-color: #efefef;
`;

PostWrite.propTypes = { ...PostWrite.propTypes, ...geoPropTypes };

export default geolocated({
  positionOptions: { enableHighAccuracy: false },
  userDecisionTimeout: 500,
})(PostWrite);
