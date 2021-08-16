import React, { Fragment, useState, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { useRecoilState } from "recoil";
import { ActiveInviteModal } from "../utils/recoil";

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

const UserOverlay = ({ children, ...props }) => {
  const [showModal, setShowModal] = useRecoilState(ActiveInviteModal);
  return (
    <>
      <div className="flex justify-start">
        {props?.image && (
          <div className="relative justify-center">
            <div id="userProfile-Image">
              <div
                className={`${
                  props?.rating ? "fixed" : "block"
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
              {props?.rating && (
                <CircularProgressbar
                  className="w-20 h-20"
                  value={props?.rating}
                  strokeWidth={5}
                  styles={buildStyles({
                    pathColor: rowRatingColor(props.rating),
                    trailColor: "#e9e9e9",
                  })}
                />
              )}
            </div>
            {props?.rating && (
              <div className="flex text-xs lg:text-base justify-center pt-1">
                <div className="inline-flex">
                  <p>Rating:</p>
                  <p className="font-semibold ml-1">{props?.rating}</p>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="flex-grow ml-4">
          <div className="font-bold text-lg lg:text-2xl">
            {props?.nickname ?? "Anonymous"}
          </div>
          {props?.likeItem && (
            <>
              <div className="font-normal text-xs py-1 lg:text-sm space-x-1">
                {props.likeItem.map((el, index) => {
                  return (
                    <div
                      key={index}
                      className="tagItem transition duration-300 ease-in-out cursor-pointer inline-flex rounded-md px-2"
                    >
                      #{el}
                    </div>
                  );
                })}
              </div>
              <div
                className={`flex border border-gary-500 rounded-full ${
                  props?.likeItem?.length === 0 ? "mb-1" : "my-1"
                } w-full`}
              >
                <div className="sr-only">divide</div>
              </div>
            </>
          )}
          {props?.statusMessage && (
            <div className="font-medium text-sm lg:text-base">
              {props.statusMessage}
            </div>
          )}
          {props?.scheduleTitle && (
            <div className="font-semibold text-sm lg:text-base">
              {props.scheduleTitle}
            </div>
          )}
          {props.myId !== props.id && (
            <div
              id="button"
              className="flex mt-2 py-4 font-bold tagItem transition duration-300 ease-in-out cursor-pointer rounded-md text-center justify-center"
              onClick={() => {
                setShowModal(true);
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
          window.location.href = `/postdetail/${props.id}`;
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
