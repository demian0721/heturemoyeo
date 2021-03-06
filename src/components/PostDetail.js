//LIBRARY
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//Redux
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
          position: "fixed",
          zIndex:"0",
          top:"75px",
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
    type === "accept" ? "??????" : type === "reject" ? "??????" : "??? ??? ??????";
  try {
    await axios.post(
      `/api/room/invite/${
        type === "accept" ? "accept" : type === "reject" ? "reject" : undefined
      }`,
      { inviteId: props?.inviteId ?? props?.InviteId }
    );
    alert(`??????????????? ${prefix}????????????!`);
    window.location.href = "/postlist/";
  } catch (e) {
    alert(`${prefix}?????? ??????, ????????? ?????????????????????!`);
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
    <Grid height="100%"   width="100vw" maxWidth="540px" minWidth="280px" margin="auto" >
      <PlaceImageComponent img={postDetails?.postImg}/>
      <Grid
        padding="18px"
        width="100%"
        minWidth="280px"
        maxWidth="540px"
        margin="28vh 0px 0px 0px"
        height="100%"
        bg="white"
        style={{
          zIndex:"5",
          position: "relative",
          borderRadius: "10px 10px 0px 0px",
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
              <Grid is_flex style={{justifyContent:"space-between"}}>
                <div>
                <Title color="black" fontWeight="800" fontSize="20px" margin="0px 0px 10px 0px">
                  {postDetails?.title}
                </Title>
                <Text
                  color="#16C59B"
                  margin="0px 0px 10px 0px"
                  fontSize="14px"
                  fontWeight="bold"
                  style={{ minWidth: "45px" }}
                >
                  {postDetails?.currentMember}/{postDetails?.maxMember}???
                </Text></div>
                <UserProfileImageComponent img={postDetails?.profileImg} />
              </Grid>
              <text
                style={{ Height: "100%", color:"black",fontSize:"medium", lineHeight:"1.5"}}
              >
                {postDetails?.content}
              </text>

              <div is_flex id="tag" className="font-normal text-xs py-1 lg:text-sm space-x-1" style={{marginTop:"10px"}}>
                {postDetails?.tag?.map((l, index) => {
                  return (
                    <div
                      key={index}
                      style={{ margin: "3px", backgroundColor: "#white", color: "#767676", borderRadius: "5px", padding: "3px 5px", fontSize:"small", border:"1px solid #767676"}} className="inline-flex"
                    >
                      {l}
                    </div>
                  );
                })}
              </div>
            </Grid>
            
          </Grid>
        </Grid>
        <Grid
          id="bottomcard"
          margin="10px 10px"
          height=""
        >
          <Grid is_flex margin="10px 0px" width="" height="">
            <EventAvailableOutlinedIcon
              style={{
                width: "19px",
                height: "19px",
                float: "left",
                color: "#7B7B7B",
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
              }}
            />
            <Text
              color="#808080"
              margin="0px 10px 0px 5px"
              fontSize="12px"
              fontWeight="bold"
            >
              {postDetails?.maxMember}???
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
              ??????
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
              ??????
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
              fontWeight: "bold", border: "none" }}
              hoverColor="#16C59B"
              onClick={() =>
                JoinToChatRoomFromPostId(postDetails?.isExist, props?.postId)
              }
            >
              ????????? ??????
            </Button>
          </Grid>
        )}
      </Grid>
      <div style={{position:"fixed",backgroundColor:"#efefef",zIndex:"1",width:"100vw",height:"100vh",left:"0px"}}/>
    </Grid>
  );
};

export default Details;
