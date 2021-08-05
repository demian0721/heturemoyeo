// LIBRARY
import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

// REDUX
import { postActions } from "../redux/modules/post";

// ELEMENTS
import { Button, Grid, Image, Input, Text, Title } from "../elements/index";

// COMPONENTS
import Header from "../components/Header";

const PostDetail = (props) => {
  const postId = props.match.params.postid;
  const dispatch = useDispatch();
  
  useEffect(() => {dispatch(postActions.postDetailInfo(postId)); }, [   ]);

  const [postDetails, setDetails] = React.useState({
    title: "방탈출 카페 인원 급구중 마이크필수?",
    postImg: "https://wwww.mmmmmm",
    content: "안녕하세요 방입니다. 이니셜 스테이트",
    nickname: "닉네임",
    rating: 70,
    statusMessage: "나는 게임이 하고싶다.",
    currentMember: 2,
    maxMember: 5,
    startDate: "2021-03-21 00:00:00",
    endDate: "2021-03-21 00:00:00",
    place: "강원도 둔둔리 둔둔초등학교",
    bring: "3등분",
    tag: ["방탈출", "마이크필수", "대구시"],
  });

  // const postDetails = useSelector((state) => state.post.postDetail);

  // setDetails(useSelector((state) => state.post.postDetail));
  // const Detail = useSelector((state) => state.post.postDetail);
  // console.log('디테일',Detail.title);
  // useEffect(() => {setDetails({...postDetails,title: Detail.title}); }, []);

  return (
    <React.Fragment>
      <Header />

      <Grid width="360px" margin="50px auto">
        <Grid padding="18px" bg="#EFEFEF">
          <PostCard>
            <Title fontSize="small">제목</Title>
            <Text color="black" margin="0px 10px" fontSize="smaller">
              {postDetails.title}
            </Text>
          </PostCard>
          <PostCard>
            <Grid name="groupImg" width="80px" height="80px" bg="white">
              <Image src={postDetails.postImg} />
            </Grid>
            <Grid width="60%" margin="0px 10px">
              <Title fontSize="small">방장 프로필</Title>
              <Text color="black" fontSize="smaller">
                [{postDetails.nickname}, {postDetails.statusMessage},{" "}
                {postDetails.rating}]
              </Text>
            </Grid>
          </PostCard>
          <PostCard>
            <Title fontSize="small">내용</Title>
            <Text color="black" margin="0px 10px" fontSize="smaller">
              {postDetails.content}
            </Text>
          </PostCard>
          <PostCard>
            <Title fontSize="small">구성인원</Title>
            <Text color="black" margin="0px 10px" fontSize="smaller">
              {postDetails.maxMember}명
            </Text>
          </PostCard>
          <PostCard>
            <Title fontSize="small">시작시간</Title>
            <Text color="black" margin="0px 10px" fontSize="smaller">
              {postDetails.startDate}
            </Text>
          </PostCard>
          <PostCard>
            <Title fontSize="small">종료시간</Title>
            <Text color="black" margin="0px 10px" fontSize="smaller">
              {postDetails.endDate}
            </Text>
          </PostCard>
          <PostCard>
            <Title fontSize="small">장소(한글 주소로 출력)</Title>
            <Text color="black" margin="0px 10px" fontSize="smaller">
              {postDetails.place}
            </Text>
          </PostCard>
          <PostCard>
            <Title fontSize="small">지참금(문자로 적기)</Title>
            <Text color="black" margin="0px 10px" fontSize="smaller">
              {postDetails.bring}
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
              {postDetails.tag?.map((l) => {
                return (
                  <div
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
          <PostCard>
            <Title fontSize="small">대화방(참가 인원수)참여</Title>
            <Text color="black" margin="0px 10px" fontSize="smaller">
              {postDetails.currentMember}명
            </Text>
          </PostCard>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const Td = styled.td`
  padding-left: 5px;
`;
const Th = styled.th`
  padding-right: 5px;
`;
const Table = styled.table`
  margin: 5px;
`;

const PostCard = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #a7aaad;
  padding: 10px;
  margin: 15px auto;
  font-size: 12px;
`;

export default PostDetail;
