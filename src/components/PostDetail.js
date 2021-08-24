//LIBRARY
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

//Redux
import { chatActions } from "../redux/modules/chat";
import { postActions } from "../redux/modules/post";

//UTILS
import { formattedDate } from "../utils";

//ELEMENTS
import { Grid, Image, Text, Title, Button } from "../elements/index";
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import PersonIcon from "@material-ui/icons/Person";

// HISTORY
import { history } from "../redux/configStore";
import axios from "../common/axios";
import Logger from "../utils/Logger";

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
          width: "100vw",
          maxWidth:"540px",
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

function UserProfileImageComponent(props) {
  return (
    <div 
    // className=//"fixed z-1 top-4 left-2/3 right-1/4 mr-6"
    >
      <div
        className="w-24 h-24"
        style={{
          textAlign: "center",
          backgroundImage: `url('${
            !props?.img || String(props.img).length === 0
              ? "/assets/profile.png"
              : props.img
          }')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          float: "center",
          borderRadius: "999px",
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
        type === "accept" ? "accept" : type === "reject" ? "reject" : undefined
      }`,
      { inviteId: props?.inviteId ?? props?.InviteId }
    );
    alert(`성공적으로 ${prefix}하였어요!`);
    window.location.href = "/postlist/";
  } catch (e) {
    alert(`${prefix}하는 도중, 오류가 발생하였습니다!`);
    console.log(e);
  }
};

const Details = (props) => {
  const postDetails = props.Details;
  const sthr = "0" + new Date(postDetails.startDate).getHours();
  const stmt = "0" + new Date(postDetails.startDate).getMinutes();
  const sthour = sthr.slice(-2)+":"+stmt.slice(-2);
  const edhr = "0" + new Date(postDetails.endDate).getHours();
  const edmt = "0" + new Date(postDetails.endDate).getMinutes();
  const edhour = edhr.slice(-2)+":"+edmt.slice(-2);
  const stdate = formattedDate(postDetails.startDate);
  const eddate = formattedDate(postDetails.endDate);
  const dispatch = useDispatch();

  const PostList = useSelector((state) => state.post.list);
  const [loaded, setLoaded] = useState(false);
  const [invitedPosts, setInvitedPosts] = useState([]);

  useEffect(() => dispatch(postActions.getInvitedPostsDB()), []);
  useEffect(() => {
    setInvitedPosts(PostList);
    setLoaded(true);
  }, [PostList]);

  return (
    <Grid height="calc(100vh - 75px)"   width="100vw" maxWidth="540px" minWidth="280px" margin="auto">
      <PlaceImageComponent img={postDetails?.postImg}/>
      {/* <Grid>test</Grid> */}
      <Grid
        padding="18px"
        width="100%"
        minWidth="280px"
        maxWidth="540px"
        margin="auto"
        height="calc(68vh - 65px)"
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
          padding="5px 10px 5px 10px"
          style={{ borderBottom: "1px solid #E2E2E2" }}
        >
          <Grid is_flex>
            <Grid>
              <Grid is_flex>
                {/* <UserProfileImageComponent img={postDetails?.profileImg} /> */}
                <Title color="black" fontWeight="800" fontSize="20px">
                  {postDetails?.title}
                </Title>
                <Text
                  color="#16C59B"
                  margin="0px 0px 0px 10px"
                  fontSize="14px"
                  fontWeight="bold"
                  // style={{ minWidth: "45px" }}
                >
                  {postDetails?.currentMember}/{postDetails?.maxMember}명
                </Text>
              </Grid>
              <Text
                color="black"
                margin="10px auto"
                fontSize="medium"
                // style={{ minHeight: "50px" }}
              >
                {postDetails?.content}
              </Text>

              <Grid is_flex id="tag">
                {postDetails?.tag?.map((l, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        width: "fit-content",
                        margin: "10px 5px 10px 0px",
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
                })}
              </Grid>
            </Grid>
            <UserProfileImageComponent img={postDetails?.profileImg} />
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
        <Grid
          id="bottomcard"
          margin="10px 10px"
          height=""
          // style={{ minHeight: "150px" }}
        >
          <Grid is_flex margin="10px 0px" width="" height="">
            <EventAvailableOutlinedIcon
              style={{
                width: "19px",
                height: "19px",
                float: "left",
                color: "#7B7B7B",
                // marginLeft:"10px"
              }}
            />
            {stdate==eddate ? <Text
                color="#808080"
                margin="0px 5px"
                fontSize="12px"
                fontWeight="bold"
              >
                {stdate}
              </Text> : <Text
                color="#808080"
                margin="0px 5px"
                fontSize="12px"
                fontWeight="bold"
              >
                {stdate}-&nbsp;{eddate}
              </Text> }
            
            <AccessTimeOutlinedIcon
              style={{
                width: "19px",
                height: "19px",
                float: "left",
                color: "#7B7B7B",
                marginLeft: "10px",
              }}
            />
            
              {sthour==edhour ? <Text
                  color="#808080"
                  margin="0px 5px"
                  fontSize="12px"
                  fontWeight="bold"
                >{sthour}</Text> : <Text
                color="#808080"
                margin="0px 5px"
                fontSize="12px"
                fontWeight="bold"
                >{sthour}&nbsp;-&nbsp;{edhour}
              </Text>}
            
          </Grid>
          <Grid id="pplndate" is_flex margin="15px 0px" width="" height="">
            <PersonIcon
              style={{
                width: "19px",
                height: "19px",
                float: "left",
                color: "#7B7B7B",
                // marginLeft:"10px"
              }}
            />
            <Text
              color="#808080"
              margin="0px 10px 0px 5px"
              fontSize="12px"
              fontWeight="bold"
            >
              {postDetails?.maxMember}명
            </Text>
            <Image
              src="/assets/Bring.svg"
              style={{
                width: "19px",
                height: "19px",
                float: "left",
                color: "#7B7B7B",
              }}
            />
            <Text
              color="#808080"
              margin="0px 10px 0px 5px"
              fontSize="12px"
              fontWeight="bold"
            >
              {postDetails?.bring}
            </Text>
          </Grid>
          <Grid id="place" is_flex margin="10px 0px" width="" height="">
            <RoomOutlinedIcon
              style={{
                width: "19px",
                height: "19px",
                float: "left",
                color: "#7B7B7B",
                // marginLeft:"10px"
              }}
            />
            <Text
              color="#808080"
              margin="0px 5px"
              fontSize="12px"
              fontWeight="bold"
            >
              {postDetails?.place}
            </Text>
          </Grid>
        </Grid>

        {invitedPosts.filter(
          (el) => Number(el.postId) === Number(postDetails?.postId)
        )?.length !== 0 ? (
          <div className="flex space-x-4 self-center align-center justify-center w-full">
            <div
              onClick={() =>
                handleButtonClick({
                  type: "accept",
                  props: invitedPosts.filter(
                    (el) => Number(el.postId) === Number(postDetails?.postId)
                  )?.[0],
                })
              }
              className="text-center bg-green-100 text-green-600 hover:bg-green-300 hover:text-green-900 transition-colors duration-300 ease-in-out rounded-md px-7 py-2 block text-sm font-normal cursor-pointer"
            >
              수락
            </div>
            <div
              onClick={() =>
                handleButtonClick({
                  type: "reject",
                  props: invitedPosts.filter(
                    (el) => Number(el.postId) === Number(postDetails?.postId)
                  )?.[0],
                })
              }
              className="text-center bg-red-100 text-red-600 hover:bg-red-300 hover:text-red-900 transition-colors duration-300 ease-in-out rounded-md px-7 py-2 block text-sm font-normal cursor-pointer"
            >
              거절
            </div>
          </div>
        ) : (
          <Grid id="chatRoom" margin="10px auto" height="">
            <Button
              className="custom_transition"
              bg="#16C59B"
              width="90%"
              padding="15px"
              margin="auto"
              display="block"
              color="white"
              style={{ 
                // minWidth: "100px", 
              fontWeight: "bold", border: "none" }}
              hoverColor="#16C59B"
              onClick={() =>
                JoinToChatRoomFromPostId(postDetails?.isExist, props?.postId)
              }
            >
              대화방 참여
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Details;
