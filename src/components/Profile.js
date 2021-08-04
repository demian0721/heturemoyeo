//Library
import React, { useState } from 'react';
import styled from "styled-components";

//Elements
import { AddButton, Button, Dropdown, Grid, Image, Input, Text, Title } from "../elements/index";

//History
import { history } from "../redux/configStore";
import { useSelector, useDispatch } from 'react-redux';

//DB
import { userActions } from '../redux/modules/user';

//Components
import Footer from "../components/Footer";

//임포트 사용 항목 외 삭제요망

const Profile = () => {
    const dispatch = useDispatch();
    
    return (
        <Style>
      <Grid width="50vw" height="100%" maxWidth="500px" minWidth="250px" margin="auto" style={{}}>
          <Grid width="20vw" maxWidth="150px" minWidth="30px" margin="auto auto 30px" style={{ display: "block", borderRadius: "50%" }}>
            {/* <Image src={userlist.profileImg} /> */}
            <Image src="https://i.imgur.com/ViFAD8Z.png"/>
        </Grid>
        <div style={{ alignItems: "center" }}>
          <Button width="100%" padding="10px" margin="5px auto" display="block" style={{ minWidth: "100px" }}>닉네임</Button>
          <Button width="100%" padding="10px" margin="5px auto" display="block" style={{ minWidth: "100px" }}>상태메세지</Button>
          <Button width="100%" padding="10px" margin="5px auto" display="block" hoverColor="false" hoverBg="false" style={{ minWidth: "100px" }}>
            {/* <div style={{ display: "flex", justifyContent: "center" }}>
              {userlist.likeItem?.map((l) => {
                return <div style={{ margin: "0px 5px", backgroundColor: "#0055FF", color: "white", borderRadius: "5px", padding: "5px" }}>{l}</div>
              })}
            </div> */}
          </Button>
          <Button width="100%" padding="10px" margin="15px auto" display="block" style={{ minWidth: "100px" }} clickEvent={() => {
            dispatch(userActions.logOut());
            window.location.href = '/login'
          }}>친구추가</Button>
        </div>
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

export default Profile;