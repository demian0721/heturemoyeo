// LIBRARY
import React from "react";
import styled from "styled-components";

// ELEMENTS
import { Grid, Text } from "../elements/index";

// HISTORY
import { history } from "../redux/configStore";

const PostListCard = (props) => {
  return (
    <PostCard
      onClick={() => {
        history.push("/postdetail/" + props.postId);
      }}
      style={{ width: "325px" }}
      className="items-center self-center"
    >
      <PlaceImageComponent img={props.postImg} />
      <Grid margin="5px" width="65%" align="left">
        <Text fontSize="17px" fontWeight="bold" color="black" marginTop="5px">
          {props.title}
          {/* <span style={{ fontWeight: "normal", marginLeft: "10px" }}>
              
            </span> */}
        </Text>
        <Text fontSize="12px" fontWeight="bold" color="black" marginTop="5px">
          인원
          <span style={{ fontWeight: "normal", marginLeft: "10px" }}>
            현재 {props.currentMember} 명/총 {props.maxMember} 명
          </span>
        </Text>
        <Text fontSize="12px" fontWeight="bold" color="black" marginTop="5px">
          날짜
          <span style={{ fontWeight: "normal", marginLeft: "10px" }}>
            {props.startDate}
          </span>
        </Text>
        <Text fontSize="12px" fontWeight="bold" color="black" marginTop="5px">
          장소
          <span style={{ fontWeight: "normal", marginLeft: "10px" }}>
            {props.place}
          </span>
        </Text>
      </Grid>
    </PostCard>
  );
};

function PlaceImageComponent(props) {
  return (
    <div className="inline-flex items-center">
      <div
        className="block rounded-md w-24 h-24"
        style={{
          textAlign: "center",
          backgroundImage: `url('${
            !props?.img || String(props.img).length === 0 ? "/assets/unknownChatRoomImg.gif" : props.img
          }')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          float: "center",
        }}
      >
        <span className="sr-only">X</span>
      </div>
    </div>
  );
}

const PlaceImage = styled.img`
  width: 85px;
  height: 85px;
  margin: 5px;
  background-color: white;
`;

const PostCard = styled.button`
  display: flex;
  justify-content: space-between;
  background-color: #a7aaad;
  padding: 5px;
  margin: 15px 0px;
  font-size: 12px;
`;

export default PostListCard;
