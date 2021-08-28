// LIBRARY
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// ELEMENTS
import { Grid, Text } from "../elements/index";
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined";
import PersonIcon from "@material-ui/icons/Person";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";

// HISTORY
import { history } from "../redux/configStore";

import { formattedDate } from "../utils";
import axios from "../common/axios";
import Logger from "../utils/Logger";

const PostListCard = ({ children, ...props }) => {
  const tagItems = props.tag?.map((l, index) => {
    return (
      <div
        key={index}
        style={{ margin: "3px", backgroundColor: "#white", color: "#767676", borderRadius: "5px", padding: "3px 5px", fontSize:"x-small", border:"1px solid #767676"}} className="inline-flex"
      >
        {l}
      </div>
    );
  });

  return (
    <div key={props.key}>
      <Link to={`/postdetail/${props.postId}`}>
        <PostCard
          style={{ width: "100%" }}
          className="items-center self-center cursor-pointer"
        >
          <PlaceImageComponent img={props.postImg} />
          <Grid
            margin="auto auto auto 14px"
            width="fit-content"
            height=""
            align="left"
          >
            <Text
              fontSize="17px"
              fontWeight="bold"
              color="black"
              marginTop="5px"
            >
              {props.title}
            </Text>
            <div className="font-normal text-xs py-1 lg:text-sm space-x-1" className="inline-flex">
              <ListInfo id="member"  style={{display: "contents",}}>
                <PersonIcon
                  style={{
                    width: "15px",
                    height: "15px",
                    float: "left",
                    color: "#7B7B7B",
                  }}
                />
                {/* 인원 */}
                <span
                  style={{
                    fontWeight: "normal",
                    marginLeft: "3px",
                    float: "left",
                  }}
                >
                  {props.currentMember} / {props.maxMember} 명
                </span>
              </ListInfo>
              <ListInfo id="date"  style={{display: "contents",}}>
                <EventAvailableOutlinedIcon
                  style={{
                    width: "15px",
                    height: "15px",
                    float: "left",
                    color: "#7B7B7B",
                    marginLeft: "10px",
                  }}
                />
                <span style={{ fontWeight: "normal", marginLeft: "3px" }}>
                  {formattedDate(props.startDate)}
                </span>
              </ListInfo>
            </div>
            <ListInfo id="place">
              <RoomOutlinedIcon
                style={{
                  width: "17px",
                  height: "17px",
                  float: "left",
                  color: "7B7B7B",
                }}
              />
              {/* <Text fontSize="12px" fontWeight="bold" color="black" marginTop="5px"> */}
              {/* 장소 */}
              <span style={{ fontWeight: "normal", marginLeft: "1px" }}>
                {props.place}
              </span>
              {/* </Text> */}
            </ListInfo>
            <ListInfo>
              <div className="font-normal text-xs py-1 lg:text-sm space-x-1">{tagItems}</div>
            </ListInfo>
          </Grid>
        </PostCard>
      </Link>
    </div>
  );
};

const InvitedListCard = ({ children, ...props }) => {
  const handleButtonClick = async ({ type, props }) => {
    if (!type || !["accept", "reject"].includes(type))
      return Logger.error(
        `[HandleButtonClick] type is not provided! (accept, reject)`
      );
    const prefix =
      type === "accept" ? "수락" : type === "reject" ? "거절" : "알 수 없음";
    try {
      await axios.post(
        `/api/room/invite/${
          type === "accept"
            ? "accept"
            : type === "reject"
            ? "reject"
            : undefined
        }`,
        { inviteId: props?.inviteId ?? props?.InviteId }
      );
      alert(`성공적으로 ${prefix}하였어요!`);
      props?.deleteCardFunction(props?.idx);
    } catch (e) {
      alert(`${prefix}하는 도중, 오류가 발생하였습니다!`);
      console.log(e);
    }
  };

  const tagItems = props.tagItem?.map((l, index) => {
    return (
      <div
        key={index}
        className="inline-flex"
        style={{
          width: "max-content",
          margin: "5px 3px 5px 0px",
          backgroundColor: "#white",
          color: "#767676",
          borderRadius: "5px",
          padding: "3px 5px",
          fontSize: "10px",
          border: "0.6px solid #767676",
        }}
      >
        {l}
      </div>
    );
  });

  return (
    <>
      <div key={props.key}>
        <PostCard
          style={{ width: "100%" }}
          className="items-center self-center flex lg:flex-row flex-col"
        >
          <div className="flex lg:mb-0 mb-4 lg:float-none float-left">
            <PlaceImageComponent img={props.postImg} />
            <Grid
              margin="auto auto auto 14px"
              width=""
              height=""
              align="left"
            >
              <Text
                fontSize="17px"
                fontWeight="bold"
                color="black"
                marginTop="5px"
              >
                {props.title}
              </Text>
              <div className="font-normal text-xs py-1 lg:text-sm space-x-1" className="inline-flex">
                <ListInfo id="member"  style={{display: "contents",}}>
                  <PersonIcon
                    style={{
                      width: "15px",
                      height: "15px",
                      float: "left",
                      color: "#7B7B7B",
                    }}
                  />
                  {/* 인원 */}
                  <span
                    style={{
                      fontWeight: "normal",
                      marginLeft: "3px",
                      float: "left",
                    }}
                  >
                    {props.currentMember} / {props.maxMember} 명
                  </span>
                </ListInfo>
                <ListInfo id="date"  style={{display: "contents",}}>
                  <EventAvailableOutlinedIcon
                    style={{
                      width: "15px",
                      height: "15px",
                      float: "left",
                      color: "#7B7B7B",
                      marginLeft: "10px",
                    }}
                  />
                  <span style={{ fontWeight: "normal", marginLeft: "3px" }}>
                    {formattedDate(props.startDate)}
                  </span>
                </ListInfo>
              </div>


              <ListInfo id="place">
                <RoomOutlinedIcon
                  style={{
                    width: "17px",
                    height: "17px",
                    float: "left",
                    color: "7B7B7B",
                  }}
                />
                {/* <Text fontSize="12px" fontWeight="bold" color="black" marginTop="5px"> */}
                {/* 장소 */}
                <span style={{ fontWeight: "normal", marginLeft: "1px" }}>
                  {props.place}
                </span>
                {/* </Text> */}
              </ListInfo>
              <ListInfo>
                <div  className="font-normal text-xs py-1 lg:text-sm space-x-1" >{tagItems}</div>
              </ListInfo>
            </Grid>
          </div>
          <div className="flex">
            <div className="lg:block flex self-center lg:space-x-0 lg:space-y-2 space-x-2">
              <div
                onClick={() => handleButtonClick({ type: "accept", props })}
                className="text-center bg-green-100 text-green-600 hover:bg-green-300 hover:text-green-900 transition-colors duration-300 ease-in-out rounded-md lg:px-7 px-5 py-2 block lg:text-sm text-xs font-normal cursor-pointer"
              >
                수락
              </div>
              <div
                onClick={() => handleButtonClick({ type: "reject", props })}
                className="text-center bg-red-100 text-red-600 hover:bg-red-300 hover:text-red-900 transition-colors duration-300 ease-in-out rounded-md lg:px-7 px-5 py-2 block lg:text-sm text-xs font-normal cursor-pointer"
              >
                거절
              </div>
              <div className="cursor-pointer">
                <Link to={`/postdetail/${props.postId}`}>
                  <div className="text-center bg-blue-100 text-blue-600 hover:bg-blue-300 hover:text-blue-900 transition-colors duration-300 ease-in-out rounded-md lg:px-7 px-5 py-2 block lg:text-sm text-xs font-normal">
                    자세히 보기
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </PostCard>
      </div>
    </>
  );
};

const ListCardRouter = ({ children, ...props }) => {
  switch (props.type) {
    case "invited":
      return <InvitedListCard {...props} />;
    default:
      return <PostListCard {...props} />;
  }
};

function PlaceImageComponent(props) {
  return (
    <div className="inline-flex items-center">
      <div
        className="block rounded-md w-24 h-24"
        style={{
          textAlign: "center",
          backgroundImage: `url('${
            !props?.img || String(props.img).length === 0
              ? "/assets/unknownChatRoomImg.gif"
              : props.img
          }')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          float: "center",
          borderRadius: "0px",
        }}
      >
        <span className="sr-only">X</span>
      </div>
    </div>
  );
}
const ListInfo = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: black;
  margin-top: 5px;
`;

const PostCard = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 15px;
  font-size: 12px;
  border-top: 0.4px solid rgba(118, 118, 118, 0.3);
`;

export default ListCardRouter;
