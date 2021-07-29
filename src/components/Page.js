//Library
import React, { useState } from 'react';
import styled from "styled-components";

//Material-Ui
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

//Elements
import { AddButton, Button, Dropdown, Grid, LazyImage, Input, Text, Title } from "../elements/index";

//History
import { history } from "../redux/configStore";

//Components
import Footer from "../components/Footer";
import SimpleModal from "./modaltest";

//임포트 사용 항목 외 삭제요망

const Page = () => {
    
    
    return (
        <Style>
          <Grid  width="50vw" height="100%" maxWidth="500px" minWidth="250px" margin="auto" style={{}}>
            <Grid id="profile" is_flex>
              <Grid width="20vw" maxWidth="150px" minWidth="30px" margin="auto auto 30px" style={{display:"block", borderRadius:"50%"}}>
                  <LazyImage src="https://i.imgur.com/ViFAD8Z.png"/>
              </Grid>
              <Grid padding="20px">
                <Grid is_flex>
                  <Title>닉네임</Title>
                  <ArrowForwardIosIcon/>
                </Grid>
                <Text>상태 메세지</Text>
              </Grid>
            </Grid>
            
            {/* <Text margin="20px 0px 0px 0px">비밀번호</Text> */}
            {/* <Input placeholder="비밀번호" width="100%" margin="10px auto" style={{display:"block"}}></Input> */}          
            <div style={{alignItems:"center"}}>
              <Button width="100%" padding="10px" margin="5px auto" display="block" style={{minWidth:"100px"}}>내 모임들</Button>
              <Button width="100%" padding="10px" margin="5px auto" display="block" hoverColor="false" hoverBg="false" style={{minWidth:"100px"}}>취향1, 취향2</Button>
              <Button width="100%" padding="10px" margin="5px auto" display="block" style={{minWidth:"100px"}}>설정</Button>
              <Button width="100%" padding="10px" margin="5px auto" display="block" style={{minWidth:"100px"}}>로그아웃</Button>
            </div>
          </Grid>
          <SimpleModal />

        </Style>
        )
};


const Style = styled.div`
    align-items: center;
    margin-top: 15vh;
    width: 100vw;
    //styled component use
`;

export default Page;