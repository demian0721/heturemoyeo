import React, { Fragment } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {
  People as PeopleIcon,
  PlaceOutlined as PlaceIcon,
  Event as EventIcon,
} from "@material-ui/icons";

import { formattedDate } from '../utils'

const rowRatingColor = (rating) => {
  if (rating <= 30) return "#e00000";
  else return "#009de0";
};

const UserOverlay = ({ children, ...props }) => {
  return (
    <div className="flex justify-start">
      {props?.profileImage && (
        <div className="relative justify-center">
          <div id="userProfile-Image">
            <div
              className={`${
                props?.userRating ? "fixed" : "block"
              } rounded-full container mx-auto w-20 h-20`}
              style={{
                zIndex: -1,
                textAlign: "center",
                backgroundImage: `url('${props.profileImage}')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                float: "center",
              }}
            >
              <span className="sr-only">profile image</span>
            </div>
            {props?.userRating && (
              <CircularProgressbar
                className="w-20 h-20"
                value={props?.userRating}
                strokeWidth={5}
                styles={buildStyles({
                  pathColor: rowRatingColor(props.userRating),
                  trailColor: "#e9e9e9",
                })}
              />
            )}
          </div>
          {props?.userRating && (
            <div className="flex text-xs lg:text-base justify-center pt-1">
              <div className="inline-flex">
                <p>Rating:</p>
                <p className="font-semibold ml-1">{props?.userRating}</p>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex-grow ml-4">
        {props?.nickname && (
          <div className="font-bold text-lg lg:text-2xl">{props.nickname}</div>
        )}
        {/* { props?.isMe && props?.name && <div className='font-semibold text-sm lg:text-base'>{props?.name}</div> } */}
        {props?.userStatusMessage && (
          <div className="font-medium text-sm lg:text-base">
            {props.userStatusMessage}
          </div>
        )}
        {props?.userSchedule && (
          <div className="font-semibold text-sm lg:text-base">
            {props.userSchedule}
          </div>
        )}
        {props?.userLikeItem && (
          <>
            <div className="flex border border-gary-500 rounded-full my-1 w-full">
              <div className="sr-only">divide</div>
            </div>
            <div className="font-normal text-xs py-1 lg:text-sm space-x-1">
              {props.userLikeItem.map((el, index) => {
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
          </>
        )}
      </div>
    </div>
  );
};

const PostOverlay = ({ children, ...props }) => {
  return (
    <Fragment>
      <div className="flex justify-start">
        {props?.postImg && (
          <div className="relative justify-center">
            <div id="userProfile-Image">
              <div
                className={`block rounded-md container mx-auto w-28 h-28 shadow-md border border-gray-300`}
                style={{
                  zIndex: -1,
                  textAlign: "center",
                  backgroundImage: `url('${props.postImg}')`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  float: "center",
                }}
              >
                <span className="sr-only">post image</span>
              </div>
              {/* {props?.rating && (
              <CircularProgressbar
                className="w-20 h-20"
                value={props?.userRating}
                strokeWidth={5}
                styles={buildStyles({
                  pathColor: rowRatingColor(props.rating),
                  trailColor: "#e9e9e9",
                })}
              />
            )} */}
            </div>
            {/* {props?.rating && (
            <div className="flex text-xs lg:text-base justify-center pt-1">
              <div className="inline-flex">
                <p>Rating:</p>
                <p className="font-semibold ml-1">{props?.rating}</p>
              </div>
            </div>
          )} */}
          </div>
        )}
        <div className="flex-grow ml-4">
          {props?.title && (
            <div className="font-bold text-lg lg:text-2xl">{props.title}</div>
          )}
          {/* { props?.isMe && props?.name && <div className='font-semibold text-sm lg:text-base'>{props?.name}</div> } */}
          {/* {props?.content && (
            <div className="font-medium text-sm lg:text-base">
              {props.content}
            </div>
          )} */}
          <div id="schedule-detail" className="flex space-x-4 mt-2">
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
          {/* {props?.tag && (
            <div className="font-normal text-xs py-1 lg:text-sm space-x-1">
              {props.tag.map((el, index) => {
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
          )} */}
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
  if (props?.isSchedule) {
    return <PostOverlay {...props} />;
  } else {
    return <UserOverlay {...props} />;
  }
};

export default Overlay;
