//LIBRARY
import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";


//ELEMENTS
import {Grid, Image,Text, Title } from "../elements/index";

// HISTORY
import { history } from "../redux/configStore";

const Details = (props) => {

  const postDetails = props.Details

  return (
  <Grid padding="18px" bg="#EFEFEF">
    <PostCard>
      <Title fontSize="small">제목</Title>
      <Text color="black" margin="0px 10px" fontSize="smaller">
        {postDetails?.title}
      </Text>
    </PostCard>
    <PostCard>
      <Grid name="groupImg" width="80px" height="80px" bg="white">
        <Image src={postDetails?.postImg} />
      </Grid>
      <Grid width="60%" margin="0px 10px">
        <Title fontSize="small">방장 프로필</Title>
        <Text color="black" fontSize="smaller">
          [{postDetails?.nickname}, {postDetails?.statusMessage},{" "}
          {postDetails?.rating}]
        </Text>
      </Grid>
    </PostCard>
    <PostCard>
      <Title fontSize="small">내용</Title>
      <Text color="black" margin="0px 10px" fontSize="smaller">
        {postDetails?.content}
      </Text>
    </PostCard>
    <PostCard>
      <Title fontSize="small">구성인원</Title>
      <Text color="black" margin="0px 10px" fontSize="smaller">
        {postDetails?.maxMember}명
      </Text>
    </PostCard>
    <PostCard>
      <Title fontSize="small">시작시간</Title>
      <Text color="black" margin="0px 10px" fontSize="smaller">
        {postDetails?.startDate}
      </Text>
    </PostCard>
    <PostCard>
      <Title fontSize="small">종료시간</Title>
      <Text color="black" margin="0px 10px" fontSize="smaller">
        {postDetails?.endDate}
      </Text>
    </PostCard>
    <PostCard>
      <Title fontSize="small">장소(한글 주소로 출력)</Title>
      <Text color="black" margin="0px 10px" fontSize="smaller">
        {postDetails?.place}
      </Text>
    </PostCard>
    <PostCard>
      <Title fontSize="small">지참금(문자로 적기)</Title>
      <Text color="black" margin="0px 10px" fontSize="smaller">
        {postDetails?.bring}
      </Text>
    </PostCard>
    <PostCard>
      <Title fontSize="small">태그</Title>
      <div
        style={{
          marginLeft: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {postDetails?.tag?.map((l, index) => {
          return (
            <div
              key={index}
              style={{
                margin: "0px 5px",
                backgroundColor: "#0055FF",
                color: "white",
                borderRadius: "5px",
                padding: "5px",
              }}
            >
              {l}
            </div>
          );
        })}
      </div>
    </PostCard>
    <Grid is_flex style={{justifyContent:"space-between"}}>
      <button style={{width:"40%", backgroundColor:"#a7aaad"}} onClick={() => {history.push("/chat/"+props.postId);}}>
        <Title fontSize="small">대화방 참여</Title>
        <Text color="black" margin="0px 10px" fontSize="smaller">
          {postDetails?.currentMember}명
        </Text>
      </button>
      <button style={{width:"40%", backgroundColor:"#a7aaad", height:"35px"}}  onClick={() => {history.push("/postlist");}}>
        <Title fontSize="small">닫기</Title>
      </button>
    </Grid>
    
  </Grid>
  );
};

const PostCard = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #a7aaad;
  padding: 10px;
  margin: 15px auto;
  font-size: 12px;
`;

export default Details;
