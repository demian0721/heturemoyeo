//LIBRARY
import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

//Redux
import { chatActions } from "../redux/modules/chat";

//UTILS
import { formattedDate } from "../utils";

//ELEMENTS
import { Grid, Image, Text, Title, Button } from "../elements/index";
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import PersonIcon from '@material-ui/icons/Person';

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
  const date = formattedDate(postDetails.startDate);
  const dispatch = useDispatch();

  return (
    <Grid height="32vh" width="30%" minWidth="360px" margin="auto">
      <PlaceImageComponent img={postDetails?.postImg} />
      <Grid width="100px" height="100px" style={{zIndex:"50",position:"absolute",top:"33%",left:"40%",transform:"translateX(-50%)"}}>
          <img src={postDetails.profileImg? postDetails.profileImg : "/assets/profile.png" }></img>
      </Grid>
      <Grid
        padding="18px"
        width="30%"
        minWidth="360px"
        margin="auto"
        height="61vh"
        bg="white"
        position="fixed"
        style={{
          borderRadius: "10px 10px 0px 0px",
          bottom: "0px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Grid
          width="100%"
          height=""
          id="detailCardTop"
          padding="30px 10px 5px 10px"
          style={{ borderBottom: "1px solid #E2E2E2" }}
        >
          <Grid is_flex>
            <Title color="black" fontWeight="800" fontSize="20px">
              {postDetails?.title}
            </Title>
            <Text color="#16C59B" margin="0px 0px 0px 10px" fontSize="14px" fontWeight="bold" style={{minWidth:"45px"}}>{postDetails?.currentMember}/{postDetails?.maxMember}명</Text>
          </Grid>
          <Text color="black" margin="10px auto" fontSize="medium" style={{minHeight:"100px"}}>
            {postDetails?.content}
          </Text>

          <Grid is_flex id="tag">
            {postDetails?.tag?.map((l, index) => {
              return (
                <div
                  key={index}
                  style={{width:"fit-content", margin: "10px 5px 10px 0px", backgroundColor: "#white", color: "#767676", borderRadius: "5px", padding: "3px 5px", fontSize:"10px", border:"0.6px solid #767676"}}
                >
                  {l}
                </div>
              );
            })}
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
        <Grid id="bottomcard" margin="10px 10px" height=""  style={{minHeight:"150px"}}>
          <Grid is_flex margin="15px 0px" width="" height="" >
            <EventAvailableOutlinedIcon style={{
              width: "19px",
              height: "19px", 
              float: "left",
              color: "#7B7B7B",
              // marginLeft:"10px"
            }}/>
            <Text color="#808080" margin="0px 5px" fontSize="12px" fontWeight="bold">
              {date}
            </Text>
            <AccessTimeOutlinedIcon style={{
              width: "19px",
              height: "19px", 
              float: "left",
              color: "#7B7B7B",
              marginLeft:"10px"
            }}/>
            <Text color="#808080" margin="0px 5px" fontSize="12px" fontWeight="bold">
              00:00~00:00
            </Text>
          </Grid>
          <Grid id="pplndate" is_flex margin="15px 0px" width="" height="">
            <PersonIcon style={{
              width: "19px",
              height: "19px", 
              float: "left",
              color: "#7B7B7B",
              // marginLeft:"10px"
            }}/>
            <Text color="#808080" margin="0px 10px 0px 5px" fontSize="12px" fontWeight="bold">
              {postDetails?.maxMember}명
            </Text>
            <Image src="/assets/Bring.svg"  style={{
              width: "19px",
              height: "19px", 
              float: "left",
              color: "#7B7B7B",
            }}/>
            <Text color="#808080" margin="0px 10px 0px 5px" fontSize="12px" fontWeight="bold">
            {postDetails?.bring}
            </Text>
          </Grid>
          <Grid id="place" is_flex margin="10px 0px" width="" height="">
            <RoomOutlinedIcon style={{
              width: "19px",
              height: "19px", 
              float: "left",
              color: "#7B7B7B",
              // marginLeft:"10px"
            }}/>
            <Text color="#808080" margin="0px 5px" fontSize="12px" fontWeight="bold">
              {postDetails?.place}
            </Text>
          </Grid>
        </Grid>

        <Grid
          id="chatRoom"
          margin="10px auto"
        >
          <Button
            className="custom_transition"
            bg="#16C59B"
            width="90%"
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
