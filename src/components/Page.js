//Library
import React, { useState } from 'react';
import styled from "styled-components";

//Elements
import { AddButton, Button, Dropdown, Grid, LazyImage, Input, Text, Title } from "../elements/index";

//History
import { history } from "../redux/configStore";

//Components
import Footer from "../components/Footer";

//임포트 사용 항목 외 삭제요망

const Page = () => {
    
    
    return (
        <Style>
            <Grid  width="50vw" height="100%" maxWidth="500px" minWidth="300px" margin="auto" style={{}}>
              <Grid width="30vw" maxWidth="250px" minWidth="50px" margin="auto auto 30px" style={{display:"block", borderRadius:"50%"}}>
                  <LazyImage src="https://i.imgur.com/ViFAD8Z.png"/>
              </Grid>
              {/* <Text margin="20px 0px 0px 0px">비밀번호</Text> */}
              <Input placeholder="비밀번호" width="100%" margin="10px auto" style={{display:"block"}}></Input>
              <Input placeholder="새 비밀번호" width="100%" margin="10px auto" style={{display:"block"}}></Input>
              <Input placeholder="취향" width="100%" margin="10px auto" style={{display:"block"}}></Input>
              <Input placeholder="상태 메세지" width="100%" margin="10px auto" style={{display:"block"}}></Input>
              <div style={{alignItems:"center"}}>
                <Button width="40%" padding="10px" margin="auto" display="block" style={{minWidth:"100px"}}>로그아웃</Button>
                <Button width="40%" padding="10px" margin="5px auto" display="block" style={{minWidth:"100px"}}>확인</Button>
              </div>
            </Grid>
        </Style>
        )
};


const Style = styled.div`
    padding-top:100px;
    align-items: center;
    margin-top: 10vh;
    width: 100vw;
    //styled component use
`;

export default Page;