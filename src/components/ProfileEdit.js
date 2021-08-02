//Library
import React, { useState, useEffect } from 'react';
import styled from "styled-components";

//Elements
import { AddButton, Button, Dropdown, Grid, Image, Input, Text, Title } from "../elements/index";

//History
import { history } from "../redux/configStore";
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from '../common/token';

//DB
import { userActions } from '../redux/modules/user';

//Components
import Footer from "./Footer";
import { concat } from 'lodash';

//임포트 사용 항목 외 삭제요망

const ProfileEdit = () => {

  const dispatch = useDispatch();

  useEffect(() => {dispatch(userActions.myInfoDB()) }, [])

  useEffect(() => { if (!getToken()) { history.replace('/login'); } }, []);    
  // const is_login = useSelector((state)=>state.user.is_login);
  
  // if(!is_login){
  //   <Grid>
  //     <Text>로그인 후, 글을 작성할 수 있습니다.</Text>
  //     <Button clickEvent={() => { history.replace('/login'); }}>로그인하러 가기</Button>
  //   </Grid>
  // }
  
  const userlist = useSelector(state => state.user)
  let link = `http://astraios.shop:4001/${userlist.profileImg}`;

  const [editInfo, setInfos] = React.useState({
    nickname: userlist.nickname,
    password: userlist.password,
    newpassword: "",
    confirm: "",
    profileImg: userlist.profileImg,
    likeItem: userlist.likeItem,
  });

  const changeNickname = (e) => {setInfos({ ...editInfo, nickname: e.target.value}); console.log(e.target.value)}
  const changePassword = (e) => {setInfos({ ...editInfo, password: e.target.value});}
  const changeNewpassword = (e) => {setInfos({ ...editInfo, newpassword: e.target.value});}
  const changeConfirm = (e) => {setInfos({ ...editInfo, confirm: e.target.value});}
  const changeProfileImg = (e) => {setInfos({ ...editInfo, profileImg: e.target.value});}
  const changeLikeItem = (e) => {setInfos({ ...editInfo, likeItem: e.target.value.split(',')}); console.log(e.target.value)}

  const editInfos = () => {
    dispatch(userActions.editInfos(editInfo));
  }
    
    return (
        <Style>
          <Grid  width="50vw" height="100%" maxWidth="500px" minWidth="250px" margin="auto" style={{}}>
            <Grid id="profile"></Grid>
            <Grid width="15vw" maxWidth="150px" minWidth="50px" margin="auto auto 30px" style={{display:"block", borderRadius:"50%"}}>
                <Image src="https://i.imgur.com/ViFAD8Z.png" style={{position:'absolute',zIndex:1}}/>
                <Text style={{position:'relative',zIndex:2}}>이미지 수정</Text>
            </Grid>
            {/* <Text margin="20px 0px 0px 0px" fontSize='small'>비밀번호</Text> */}
            <Input changeEvent={changeNickname} placeholder="닉네임 수정" width="100%" margin="10px auto" style={{display:"block"}} value={editInfo.nickname}></Input>
            <Input changeEvent={changePassword} value={editInfo.password} placeholder="기존 비밀번호" width="100%" margin="10px auto" style={{display:"block"}}></Input>
            <Input changeEvent={changeNewpassword} value={editInfo.newpassword} placeholder="새 비밀번호" width="100%" margin="10px auto" style={{display:"block"}}></Input>
            <Input changeEvent={changeConfirm} value={editInfo.confirm} placeholder="새 비밀번호 확인" width="100%" margin="10px auto" style={{display:"block"}}></Input>
            <Input changeEvent={changeLikeItem} value={editInfo.likeItem} placeholder="취향" width="100%" margin="10px auto" style={{display:"block"}}></Input>
            <Button width="40%" padding="10px" margin="25px auto" display="block" style={{minWidth:"100px"}} clickEvent={editInfos}>확인</Button>
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