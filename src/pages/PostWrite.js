//LIBRARY
import React from "react";
import styled from "styled-components";
import { css } from "styled-components";

//ELEMENTS
import { Grid } from "../elements/index";

//COMPONENTS
import Header from "../components/Header";

const PostWrite = () => {
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
            <EnterButton>
            <tr>
                <Th>모임 대표 이미지 추가 버튼</Th>
                <Td></Td>
            </tr> 
            </EnterButton>
            <PostCard>
            <Table>
                    <tr>
                        <Th>제목</Th>
                        <Td></Td>
                    </tr>
            </Table>
            </PostCard>
            <PostCard>
            <Table>
                    <tr>
                        <Th>내용</Th>
                        <Td></Td>
                    </tr>
            </Table>
            </PostCard>
            <PostCard>
            <Table>
                    <tr>
                        <Th>구성인원</Th>
                        <Td></Td>
                    </tr>
            </Table>
            </PostCard>
            <PostCard>
            <Table>
                    <tr>
                        <Th>시작시간</Th>
                        <Td></Td>
                    </tr>
            </Table>
            </PostCard>
            <PostCard>
            <Table>
                    <tr>
                        <Th>종료시간</Th>
                        <Td></Td>
                    </tr>
            </Table>
            </PostCard>
            <EnterButton style={{display:"block"}}>
                    <tr>
                        <Th>장소(한글 주소로 출력)</Th>
                        <Td></Td>
                    </tr>
            </EnterButton>
            <PostCard>
            <Table>
                    <tr>
                        <Th>지참금(문자로 적기)</Th>
                        <Td></Td>
                    </tr>
            </Table>
            </PostCard>
            <PostCard>
            <Table>
                    <tr>
                        <Th>공개여부(전체, 잠금)</Th>
                        <Td></Td>
                    </tr>
            </Table>
            </PostCard>
            <PostCard>
            <Table>
                    <tr>
                        <Th>태그</Th>
                        <Td></Td>
                    </tr>
            </Table>
            </PostCard>
           
            <EnterButton>
            <tr>
                <Th>완료</Th>
                <Td></Td>
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
    display: flex;
    justify-content: center;
  `;
  
  const PostCard = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #A7AAAD;
    padding: 5px;
    margin: 15px auto;
    font-size: 12px;
  `;
  
  export default PostWrite;