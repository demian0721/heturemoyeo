//LIBRARY
import React from "react";
import styled from "styled-components";
import { css } from "styled-components";
import TodayIcon from '@material-ui/icons/Today';

//ELEMENTS
import { Grid, Input, Button } from "../elements/index";

//COMPONENTS
import Footer from "../components/Footer";
import Header from "../components/Header";

const PostList = () => {
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
          <Grid padding="8px 0px" style={{display:"flex"}}>
            <Input placeholder="제목, 내용, 태그, 또는 날짜" />
            <TodayIcon color="action"/>
          </Grid>
          <Buttonset>
            <Grid padding="5px 0px 0px 0px">
              <Button
                width="100%"
                height="auto"
                padding="12px 0"
                margin="0px 0px 10px"
                fontSize="15px"
                bg="#A7AAAD"
                hoverColor="#ccc"
              >
                전체 모임 글(구인중!)
              </Button>
            </Grid>
            <Grid padding="5px 0px">
              <Button
                width="100%"
                height="auto"
                padding="12px 0"
                bg="#A7AAAD"
                hoverColor="#ccc"
                fontSize="15px"
              >
                나의 모임들
              </Button>
            </Grid>
          </Buttonset>
          <PostCard>
              <Table>
                  <tr>
                      <Th>제목</Th>
                      <Td>함께 뛸 러너 모집!</Td>
                  </tr>
                  <tr>
                      <Th>인원</Th>
                      <Td>4명</Td>
                  </tr>
                  <tr>
                      <Th>날짜</Th>
                      <Td>2021년 8월 2일</Td>
                  </tr>
                  <tr>
                      <Th>장소</Th>
                      <Td>잠실역 3번 출구</Td>
                  </tr>
              </Table>
              <PlaceImg />
          </PostCard>
          <PostCard>
              <Table>
                  <tr>
                      <Th>제목</Th>
                      <Td>함께 뛸 러너 모집!</Td>
                  </tr>
                  <tr>
                      <Th>인원</Th>
                      <Td>4명</Td>
                  </tr>
                  <tr>
                      <Th>날짜</Th>
                      <Td>2021년 8월 2일</Td>
                  </tr>
                  <tr>
                      <Th>장소</Th>
                      <Td>잠실역 3번 출구</Td>
                  </tr>
              </Table>
              <PlaceImg />
          </PostCard>
          <PostCard>
              <Table>
                  <tr>
                      <Th>제목</Th>
                      <Td>함께 뛸 러너 모집!</Td>
                  </tr>
                  <tr>
                      <Th>인원</Th>
                      <Td>4명</Td>
                  </tr>
                  <tr>
                      <Th>날짜</Th>
                      <Td>2021년 8월 2일</Td>
                  </tr>
                  <tr>
                      <Th>장소</Th>
                      <Td>잠실역 3번 출구</Td>
                  </tr>
              </Table>
              <PlaceImg />
          </PostCard>
          <AddButton>
            추가하기 <br/> (글쓰기버튼) 
          </AddButton>
        </Grid>
      </Grid>
      <Grid>
        <Footer />
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

const AddButton = styled.button`
  width: 60px;
  height: 60px;
  background-color: #A7AAAD;
  border-radius: 50px;
  border: 1px solid black;
  float: right;
  font-size: 10px;
`;

const Buttonset = styled.div`
  margin: 0 auto;
  text-align: center;
  display: flex;
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

export default PostList;
