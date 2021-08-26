import React, { Fragment, useState, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { useRecoilState } from "recoil";
import { ActiveInviteModal, MyScheduleList } from "../utils/recoil";
import axios from "../common/axios";
import Logger from "../utils/Logger";

import {
  People as PeopleIcon,
  PlaceOutlined as PlaceIcon,
  Event as EventIcon,
} from "@material-ui/icons";

import { formattedDate } from "../utils";

const rowRatingColor = (rating) => {
  if (rating <= 30) return "#e00000";
  else return "#009de0";
};

const getMyScheduleList = async ({
  start = 0,
  limit = 1000,
  setFunction = () => {},
}) => {
  try {
    const result = await axios.get(
      `/api/post/posts/master?start=${start}&limit=${limit}`
    );
    Logger.info(
      `[Component:Overlay:GetMYScheduleList] Loaded data from api to myScheduleList`
    );
    const resultData = result.data;
    setFunction?.(resultData);
    return resultData;
  } catch (e) {
    Logger.error(
      `[Component:Overlay:GetMyScheduleList] Failed to data from api (${e.name})`
    );
  }
};

const UserOverlayDivideComponent = ({ force = false, ...props }) => {
  /**
   * UserOverlayDivideComponent: (유저 오버레이 디바이더 컴포넌트)
   * 말 그대로 figma에 디자인 되어 있는 우저 닉네임, 유저가 설정한 태그, 상태 메세지 등을 분활하기 위한 디바이더이다.
   * 아래 있는 조건 연산자 같은 경우, 모든 경우를 대비하여 만들게 되었다.
   * 강제로 집어 넣을 경우, force 변수를 true로 값을 주면 강제로 넣을 수 있다.
   * 그러지 않으면, props 로 받아온 값을 토대로, 조건 연산자를 거쳐 디바이더를 표시할지 않할지 결정한다.
   * div 엘리먼트가 있는 곳이 디바이더를 표시하는 조건 연산자 안의 리턴 값이다.
   * 그 외 div 엘리먼트 대신 "" 스트링 문자열이 있다면, 디바이더를 표시하지 않는 것이다.
   */
  return force ? (
    <div
      className={`flex border border-gary-500 rounded-full ${
        props?.likeItem?.length === 0 ? "mb-1" : "my-1"
      } w-full`}
    >
      <div className="sr-only">divide</div>
    </div>
  ) : props?.nickname && props?.likeItem && props?.statusMessage ? (
    <div
      className={`flex border border-gary-500 rounded-full ${
        props?.likeItem?.length === 0 ? "mb-1" : "my-1"
      } w-full`}
    >
      <div className="sr-only">divide</div>
    </div>
  ) : props?.nickname && !props?.likeItem && props?.statusMessage ? (
    <div
      className={`flex border border-gary-500 rounded-full ${
        props?.likeItem?.length === 0 ? "mb-1" : "my-1"
      } w-full`}
    >
      <div className="sr-only">divide</div>
    </div>
  ) : "" 
  // props?.nickname && !props?.likeItem && !props?.statusMessage ? (
  //   ""
  // ) : !props?.nickname && !props?.likeItem && !props?.statusMessage ? (
  //   ""
  // ) : props?.nickname && props?.likeItem && !props?.statusMessage ? (
  //   ""
  // ) : !props?.nickname && props?.likeItem && !props?.statusMessage ? (
  //   ""
  // ) : (
  //   ""
  // );
};

const UserOverlay = ({ children, ...props }) => {
  const [showModal, setShowModal] = useRecoilState(ActiveInviteModal);
  const [myScheduleList, setMyScheduleList] = useRecoilState(MyScheduleList);
  return (
    <>
      <div data-userid={props.id} className="flex justify-start">
        {props?.image && (
          <div className="relative justify-center">
            <div id="userProfile-Image">
              <div
                className={`${
                  props?.rating ? "block" : "block"
                } rounded-full container mx-auto w-20 h-20`}
                style={{
                  zIndex: -1,
                  textAlign: "center",
                  backgroundImage: `url('${props.image}')`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  float: "center",
                }}
              >
                <span className="sr-only">profile image</span>
              </div>
            </div>
            {/* {props?.rating && (
              <>
                <CircularProgressbar
                  className="w-20 h-20"
                  value={props?.rating}
                  strokeWidth={5}
                  styles={buildStyles({
                    pathColor: rowRatingColor(props.rating),
                    trailColor: "#e9e9e9",
                  })}
                />
                <div className="flex text-xs lg:text-base justify-center pt-1">
                  <div className="inline-flex">
                    <p>Rating:</p>
                    <p className="font-semibold ml-1">{props?.rating}</p>
                  </div>
                </div>
              </>
            )} */}
          </div>
        )}
        <div className="flex-grow ml-4">
          <div className="font-bold text-lg lg:text-2xl">
            {/* {props?.nickname ?? "Anonymous"} */}
            {props?.nickname ?? ""}
          </div>
          {props?.likeItem && (
            <>
              <div className="font-normal text-xs py-1 lg:text-sm space-x-1">
                {props.likeItem.map((el, index) => {
                  return (
                    <div
                      key={index}
                      className="tagItem transition duration-300 ease-in-out cursor-pointer inline-flex rounded-md px-2 mb-1"
                      style={{marginLeft:"0px",marginRight:"2px"}}
                    >
                      #{el}
                    </div>
                  );
                })}
              </div>
            </>
          )}
          <UserOverlayDivideComponent {...props} />
          {props?.statusMessage && (
            <div className="font-medium text-sm lg:text-base">
              {props.statusMessage}
            </div>
          )}
          {props?.scheduleTitle && (
            <div className="font-semibold text-sm lg:text-base">
              <span>{props.scheduleTitle}</span>
              {props?.scheduleCount &&
              Number(props?.scheduleCount - 1) !== 0 ? (
                <span className="ml-2 text-main inline-flex rounded-md lg:text-sm text-xs">
                  외 {Number(props.scheduleCount) - 1}개
                </span>
              ) : (
                ""
              )}
            </div>
          )}
          {props.myId !== props.id && (
            <div
              id="button"
              className="flex mt-2 py-4 font-bold tagItem transition duration-300 ease-in-out cursor-pointer rounded-md text-center justify-center"
              onClick={() => {
                setShowModal(true);
                getMyScheduleList({ setFunction: setMyScheduleList });
              }}
            >
              <p>모임 초대하기</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const PostOverlay = ({ children, ...props }) => {
  return (
    <Fragment>
      <div className="flex justify-start">
        {props?.image && (
          <div className="relative justify-center">
            <div id="userProfile-Image">
              <div
                className={`block rounded-md container mx-auto w-28 h-28 shadow-md border border-gray-300`}
                style={{
                  zIndex: -1,
                  textAlign: "center",
                  backgroundImage: `url('${props.image}')`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  float: "center",
                }}
              >
                <span className="sr-only">post image</span>
              </div>
            </div>
          </div>
        )}
        <div className="flex-grow ml-4">
          {props?.title && (
            <div className="font-bold text-lg lg:text-2xl">{props.title}</div>
          )}
          <div id="schedule-detail" className="flex space-x-1 mt-2">
            <div className="flex self-center">
              <PeopleIcon />
              <span className="ml-1">
                {props.currentMember}/{props.maxMember}
              </span>
            </div>
            <div className="flex self-center">
              <EventIcon />
              <span className="ml-1">{formattedDate(props.startDate)}</span>
            </div>
          </div>
          <div className="flex border border-gary-500 rounded-full my-1 w-full">
            <div className="sr-only">divide</div>
          </div>
          {props?.place && (
            <div className="flex font-medium text-sm lg:text-base self-center">
              <PlaceIcon />
              <span className="ml-1">{props.place}</span>
            </div>
          )}
        </div>
      </div>
      <div
        id="button"
        className="flex mt-2 py-4 font-bold tagItem transition duration-300 ease-in-out cursor-pointer rounded-md text-center justify-center"
        onClick={() => {
          window.location.href = `/postdetail/${props?.id}`;
        }}
      >
        <p>참여하기</p>
      </div>
    </Fragment>
  );
};

const Overlay = ({ children, ...props }) => {
  if (props?.isType === "post") return <PostOverlay {...props} />;
  else return <UserOverlay {...props} />;
};

export default Overlay;
