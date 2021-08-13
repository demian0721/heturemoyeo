// LIBRARY
import React from "react";
import styled from "styled-components";

// ELEMENTS
import { Grid, Text } from "../elements/index";
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import PersonIcon from '@material-ui/icons/Person';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';

// HISTORY
import { history } from "../redux/configStore";

const PostListCard = (props) => {
  const formattedDate = (date) => {
    const dateNow = new Date(date);
    const year = dateNow.getFullYear();
    const month =
      String(dateNow.getMonth() + 1).length === 1
        ? `0${dateNow.getMonth() + 1}`
        : dateNow.getMonth() + 1;
    const day =
      String(dateNow.getDay()).length === 1
        ? `0${dateNow.getDay()}`
        : dateNow.getDay();
    return `${year}. ${month}. ${day}`;};

  const date = formattedDate(props.startDate)
  return (
    <PostCard
      onClick={() => {
        history.push("/postdetail/" + props.postId);
      }}
      style={{ width: "100%"}}
      className="items-center self-center"
    >
      <PlaceImageComponent img={props.postImg}/>
      <Grid margin="auto auto auto 14px" width="fit-content" align="left" >
        <Text fontSize="17px" fontWeight="bold" color="black" marginTop="5px">
          {props.title}
        </Text>
        <Grid is_flex>
          <ListInfo id="member">
          <PersonIcon style={{
            width: "15px",
            height: "15px", 
            float: "left",
            color:"#7B7B7B"
          }}/>
          {/* 인원 */}
          <span style={{ fontWeight: "normal", marginLeft: "3px", float: "left", }}>
            {props.currentMember} / {props.maxMember} 명
          </span>
          </ListInfo>
          <ListInfo id="date">
          <EventAvailableOutlinedIcon style={{
              width: "15px",
              height: "15px", 
              float: "left",
              color: "#7B7B7B",
              marginLeft:"10px"
            }}/>
            <span style={{ fontWeight: "normal", marginLeft: "3px"  }}>
            {date}
            </span>
          </ListInfo>
        </Grid>
        <ListInfo id="place">
        <RoomOutlinedIcon style={{
            width: "17px",
            height: "17px", 
            float: "left",
            color:"7B7B7B"
          }}/>
        {/* <Text fontSize="12px" fontWeight="bold" color="black" marginTop="5px"> */}
          {/* 장소 */}
          <span style={{ fontWeight: "normal", marginLeft: "1px" }}>
            {props.place}
          </span>
        {/* </Text> */}
        </ListInfo>
        <ListInfo>
        <div key='Tag' style={{width:"fit-content", margin: "10px 0px", backgroundColor: "#white", color: "#", borderRadius: "5px", padding: "3px 5px", fontSize:"10px", border:"0.6px solid #767676"}}>Tag</div>
        </ListInfo>
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
            !props?.img || String(props.img).length === 0
              ? "/assets/unknownChatRoomImg.gif"
              : props.img
          }')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          float: "center",
          borderRadius:"0px"
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
const PlaceImage = styled.img`
  width: 85px;
  height: 85px;
  background-color: white;
`;

const PostCard = styled.button`
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 15px;
  font-size: 12px;
  border-top: 0.4px solid rgba(118, 118, 118, 0.3);
`;

export default PostListCard;
