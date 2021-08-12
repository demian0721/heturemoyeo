//LIBRARY
import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

//ELEMENTS
import { Grid, Image, Text, Title, Button } from "../elements/index";

// HISTORY
import { history } from "../redux/configStore";

import axios from "../common/axios";

function PlaceImageComponent(props) {
  return (
    <div className="inline-flex items-center">
      <div
        className="block w-24 h-24"
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
          width: "30vw",
          minWidth: "360px",
          height: "32vh",
          borderRadius: "0px",
        }}
      >
        <span className="sr-only">X</span>
      </div>
    </div>
  );
}

const JoinToChatRoomFromPostId = (isExist, postId) => {
  if (isExist) window.location.href = "/chat/" + postId;
  else {
    axios
      .post(`/api/room/join`, { postId })
      .then((res) => {
        window.location.href = `/chat/${postId}`;
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

const Details = (props) => {
  const postDetails = props.Details;
  return (
    <Grid height="32vh" width="30%" minWidth="360px" margin="auto">
      <PlaceImageComponent img={postDetails?.postImg} />
      <Grid
        padding="18px"
        width="30%"
        minWidth="360px"
        margin="auto"
        height=""
        bg="white"
        position="fixed"
        style={{
          borderRadius: "30px 30px 0px 0px",
          bottom: "0px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Grid
          width=""
          height=""
          id="detailCardTop"
          padding="30px 0px"
          style={{ borderBottom: "1px solid black" }}
        >
          <Title color="black" fontWeight="800" fontSize="20px">
            {postDetails?.title}
          </Title>
          <Grid id="place" is_flex margin="10px 0px" width="" height="">
            <Image src="/assets/postlist_card_place.png" />
            <Text color="black" margin="0px 10px" fontSize="13px">
              {postDetails?.place}
            </Text>
          </Grid>
          <Grid id="pplndate" is_flex margin="15px 0px" width="" height="">
            <Image src="/assets/postlist_card_people.png" />
            <Text color="#808080" margin="0px 10px" fontSize="14px">
              {postDetails?.maxMember}명
            </Text>
            <Image src="/assets/postlist_card_calendar.png" />
            <Text color="#808080" margin="0px 10px" fontSize="14px">
              {postDetails?.startDate}
            </Text>
          </Grid>
        </Grid>

        {/* 필요없어진 방장 프로필n종료시각n닫기 */}
        {/* <Grid width="60%" margin="0px 10px">
            <Title fontSize="small">방장 프로필</Title>
            <Text color="black" fontSize="smaller">
              [{postDetails?.nickname}, {postDetails?.statusMessage},{" "}
              {postDetails?.rating}]
            </Text>
          </Grid> */}
        {/* <Text color="black" margin="0px 10px" fontSize="smaller">
            {postDetails?.endDate}
          </Text> */}
        {/* <button style={{ width: "40%", backgroundColor: "#a7aaad", height: "35px" }} onClick={() => {history.push("/postlist");}}>
            <Title fontSize="small">닫기</Title>
          </button> */}
        <Grid margin="10px 10px" height="30vh">
          <Text color="black" margin="10px auto" fontSize="medium">
            {postDetails?.content}
          </Text>
          <Text color="black" margin="10px auto" fontSize="smaller">
            {postDetails?.bring}
          </Text>
          <Grid is_flex>
            {postDetails?.tag?.map((l, index) => {
              return (
                <div
                  key={index}
                  style={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    margin: "0px 10px 0px 0px",
                    backgroundColor: "#E0F6EC",
                    color: "#9AC1AF",
                    borderRadius: "5px",
                    padding: "3px 5px",
                  }}
                >
                  {l}
                </div>
              );
            })}
          </Grid>
        </Grid>

        <Grid
          id="chatRoom"
          margin="10px auto"
          style={{ borderTop: "1px solid #E2E2E2" }}
        >
          <Text
            color="#8DDAB6"
            margin="10px auto"
            fontSize="14px"
            fontWeight="bold"
            style={{ textAlign: "center" }}
          >
            {postDetails?.currentMember}/{postDetails?.maxMember}명
          </Text>
          <Button
            className="custom_transition"
            bg="#16C59B"
            width="80%"
            padding="15px"
            margin="auto"
            display="block"
            color="white"
            style={{ minWidth: "100px", fontWeight: "bold", border: "none" }}
            hoverColor="#16C59B"
            onClick={() =>
              JoinToChatRoomFromPostId(postDetails?.isExist, props?.postId)
            }
          >
            대화방 참여
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Details;
