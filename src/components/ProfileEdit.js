//Library
import React, { useState } from 'react';
import styled from "styled-components";

//Elements
import { AddButton, Button, Dropdown, Grid, Image, Input, Text, Title } from "../elements/index";

//History
import { history } from "../redux/configStore";

//Components
import Footer from "./Footer";

//임포트 사용 항목 외 삭제요망

const ProfileEdit = () => {
    
    
    return (
        <Style>
          <Grid  width="50vw" height="100%" maxWidth="500px" minWidth="250px" margin="auto" style={{}}>
            <Grid id="profile"></Grid>
            <Grid width="15vw" maxWidth="150px" minWidth="50px" margin="auto auto 30px" style={{display:"block", borderRadius:"50%"}}>
                <Image src="https://i.imgur.com/ViFAD8Z.png" style={{position:'absolute',zIndex:1}}/>
                <Text style={{position:'relative',zIndex:2}}>이미지 수정</Text>
            </Grid>
            {/* <Text margin="20px 0px 0px 0px">비밀번호</Text> */}
            <Input placeholder="닉네임 수정" width="100%" margin="10px auto" style={{display:"block"}}></Input>
            <Input placeholder="기존 비밀번호" width="100%" margin="10px auto" style={{display:"block"}}></Input>
            <Input placeholder="새 비밀번호" width="100%" margin="10px auto" style={{display:"block"}}></Input>
            <Input placeholder="새 비밀번호 확인" width="100%" margin="10px auto" style={{display:"block"}}></Input>
            <Input placeholder="취향" width="100%" margin="10px auto" style={{display:"block"}}></Input>
            <Button width="40%" padding="10px" margin="25px auto" display="block" style={{minWidth:"100px"}}>확인</Button>
          </Grid>
        </Style>
        )
};


const Style = styled.div`
    align-items: center;
    margin-top: 15vh;
    width: 100vw;
    //styled component use
`;

export default ProfileEdit;