//LIBRARY
import React, { useEffect } from 'react';
import styled, {css} from "styled-components";
import { useSelector, useDispatch } from 'react-redux';

//Redux
import {postActions} from '../redux/modules/post';

//ELEMENTS
import { Button, Grid, LazyImage, Input, Text, Title } from "../elements/index";

//COMPONENTS
import Header from "../components/Header";

const PostDetail = (props) => {
  const postId = props.match.params.postid;
  const dispatch = useDispatch();
  
  useEffect(() => {dispatch(postActions.postDetailInfo({"postId":postId})) }, [])


  return (
    <React.Fragment>
      <Grid>
        <Header />
      </Grid>

      <Grid
        width="360px"
        margin="50px auto"
        // padding="55px 40px 100.2px"
        // shadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        tabletStyle={() => {
          return css`
            width: 95%;
          `;
        }}
        mobileStyle={() => {
          return css`
            padding: 15px 20px;
            width: 100%;
          `;
        }}
      >
        <Grid padding="18px" bg="#EFEFEF">
          <PostCard>
          <Table>
                  <tr>
                      <Th>제목</Th>
                      <Td>함께 뛸 러너 모집!</Td>
                  </tr>
          </Table>
          </PostCard>
          <PostCard>
              <PlaceImg />
              <Table style={{marginRight:"50px"}}>
                  <tr>
                      <Th>방장 프로필</Th>
                  </tr>
                  <tr>
                        <Td>[닉네임, 상태메세지, 온도]</Td>
                  </tr>
          </Table>
          </PostCard>
          <PostCard>
          <Table>
                  <tr>
                      <Th>내용</Th>
                      <Td>한강 잠실철교에서 잠수교까지 non-stop running</Td>
                  </tr>
          </Table>
          </PostCard>
          <PostCard>
          <Table>
                  <tr>
                      <Th>구성인원</Th>
                      <Td>4명</Td>
                  </tr>
          </Table>
          </PostCard>
          <PostCard>
          <Table>
                  <tr>
                      <Th>시작시간</Th>
                      <Td>2021년 8월 2일 19시 00분</Td>
                  </tr>
          </Table>
          </PostCard>
          <PostCard>
          <Table>
                  <tr>
                      <Th>종료시간</Th>
                      <Td>2021년 8월 2일 22시 00분</Td>
                  </tr>
          </Table>
          </PostCard>
          <EnterButton>
                  <tr>
                      <Th>장소(한글 주소로 출력)</Th>
                      <Td>서울특별시 송파구 올림픽로 지하 265 (잠실동) 잠실역 3번 출구</Td>
                  </tr>
          </EnterButton>
          <PostCard>
          <Table>
                  <tr>
                      <Th>지참금(문자로 적기)</Th>
                      <Td>일만원</Td>
                  </tr>
          </Table>
          </PostCard>
          <PostCard>
          <Table>
                  <tr>
                      <Th>태그</Th>
                      <Td>#러닝 #런닝맨 #다이어트 #친목</Td>
                  </tr>
          </Table>
          </PostCard>
          
          <EnterButton>
          <tr>
              <Th>대화방(참가 인원수)참여</Th>
              <Td>2명</Td>
          </tr> 
          </EnterButton>
          
      
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
  
  const EnterButton = styled.button`
    width: 100%;
    background-color: #A7AAAD;
    padding: 10px;
    margin: 15px auto;
    font-size: 12px;
    display: block;
  `;
  
  const PlaceImg = styled.img`
    width: 80px;
    height: 80px;
    margin: 10px;
    background-color: white;
  `;
  
  const PostCard = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #A7AAAD;
    padding: 5px;
    margin: 15px auto;
    font-size: 12px;
  `;
  
  export default PostDetail;