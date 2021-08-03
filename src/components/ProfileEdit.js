//Library
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import _ from "lodash";

//Elements
import { AddButton, Button, Dropdown, Grid, Image, Input, Text, Title } from "../elements/index";

//History
import { history } from "../redux/configStore";
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from '../common/token';

//DB
import { userActions } from '../redux/modules/user';
import { idVal, pwdVal, nickVal } from "../common/validation"; 

//Components
import Footer from "./Footer";
import { concat } from 'lodash';

//임포트 사용 항목 외 삭제요망

const ProfileEdit = () => {

  const dispatch = useDispatch();
  const debounce = _.debounce((value, setValue) => setValue(value), 300);


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
    password: "",
    newpassword: "",
    confirm: "",
    profileImg: userlist.profileImg,
    likeItem: userlist.likeItem,
  });

  const [pwd, setPwd] = React.useState("");
  const [pwdCheck, setPwdCheck] = React.useState("");
  const [pwdConfirm, setPwdConfirm] = React.useState("");
  const [pwdCheckConfirm, setPwdCheckConfirm] = React.useState("");
  const [pwdWarning, setPwdWarColor] = React.useState("red");
  const [pwdCheckWarning, setPwdCheckWarColor] = React.useState("red");
  const [show, setShow] = React.useState(false);
  const [nicknameConfirm, setNicknameConfirm] = React.useState("");
  const [nicknameWarning, setNicknameWarColor] = React.useState("red");



  const changeNickname = (e) => {setInfos({ ...editInfo, nickname: e.target.value}); console.log(e.target.value)}
  const changePassword = (e) => {setInfos({ ...editInfo, password: e.target.value});}
  const changeNewpassword = (e) => {setInfos({ ...editInfo, newpassword: e.target.value});}
  const changeConfirm = (e) => {setInfos({ ...editInfo, confirm: e.target.value});}
  const changeProfileImg = (e) => {setInfos({ ...editInfo, profileImg: e.target.value});}
  const changeLikeItem = (e) => {setInfos({ ...editInfo, likeItem: e.target.value.split(',')}); console.log(e.target.value)}

  const editInfos = () => {
    dispatch(userActions.editInfos(editInfo));
    window.alert('프로필 수정이 완료되었습니다')
    history.push('/mypageedit');
  }

  const checkPWD = (val) => {
    if (val === "") {
      setPwdWarColor("red");
      setPwdConfirm("비밀번호가 입력되지 않았습니다.");
      return;
    }
    if (!pwdVal(val)) {
      setPwdWarColor("red");
      setPwdConfirm(
        "기존 비밀번호와 일치하지 않습니다."
      );
      return;
    }
    setPwdWarColor("green");
    setPwdConfirm("비밀번호가 일치합니다.");
  }


  const checkNickname = (val) => {
    if (val === "") {
      setNicknameWarColor("red");
      setNicknameConfirm("닉네임이 입력되지 않았습니다.");
      return;
    }
    if (!nickVal(val)) {
      setNicknameWarColor("red");
      setNicknameConfirm("닉네임이 형식에 맞지 않습니다.");
      return;
    }

    setNicknameWarColor("green");
    setNicknameConfirm("중복 검사를 해주세요");
  };


  const nickname = () => {
    if (editInfo.nickname === "") {
      window.alert("닉네임이 입력되지 않았습니다.");
      return;
    }
    dispatch(userActions.nickCheck(editInfo.nickname));
    setNicknameConfirm("");
  };

  // {editInfo.password}
  // const checkPWD = (val) => {
  //   if (val === "") {
  //     setPwdWarColor("red");
  //     setPwdConfirm("비밀번호가 입력되지 않았습니다.");
  //     return;
  //   }
  //   if (!pwdVal(val)) {
  //     setPwdWarColor("red");
  //     setPwdConfirm("비밀번호는 영문과 숫자, 특수문자를 각 1자 이상 포함해주세요.(8~20자) ");
  //     return;
  //   }
  //   setPwdWarColor("green");
  //   setPwdConfirm("사용가능한 비밀번호 입니다.");
  // };

  // const checkPWD2nd = (val) => {
  //   if (val === "") {
  //     setPwdCheckWarColor("red");
  //     setPwdCheckConfirm("비밀번호 확인란이 입력되지 않았습니다.");
  //     return;
  //   }
  //   if (val.length < 6) {
  //     setPwdCheckWarColor("red");
  //     setPwdCheckConfirm("");
  //     return;
  //   }
  //   if (val !== pwd) {
  //     setPwdCheckWarColor("red");
  //     setPwdCheckConfirm("입력된 비밀번호가 서로 다릅니다.");
  //     return;
  //   }
  //   setPwdCheckWarColor("green");
  //   setPwdCheckConfirm("비밀번호가 올바르게 입력되었습니다.");
  // };
    
    return (
        <Style>
          <Grid  width="50vw" height="100%" maxWidth="500px" minWidth="250px" margin="auto" style={{}}>
            <Grid id="profile"></Grid>
            <Grid width="15vw" maxWidth="150px" minWidth="50px" margin="auto auto 30px" style={{display:"block", borderRadius:"50%"}}>
                <Image src="https://i.imgur.com/ViFAD8Z.png" style={{position:'absolute',zIndex:1}}/>
                <Text style={{position:'relative',zIndex:2}}>이미지 수정</Text>
            </Grid>
            {/* <Text margin="20px 0px 0px 0px" fontSize='small'>비밀번호</Text> */}
            <Text fontSize="12px" margin="0px" color={nicknameWarning} lineHeight="1" textIndent="0px">{nicknameConfirm}</Text>
            <Grid is_flex>
              <Input keyUp={(event) => {
                debounce(event.target.value, checkNickname);
              }} changeEvent={changeNickname} placeholder="닉네임 수정" width="100%" margin="10px auto" style={{display:"block"}} value={editInfo.nickname}></Input>
              <Button
                margin="0px 0px 0px 6px"
                width="20%"
                height="40px"
                padding="5px 0"
                fontSize="13px"
                bg="#A7AAAD"
                clickEvent={nickname}
              >
                중복 확인
              </Button>
            </Grid>
            
            <Input changeEvent={changePassword} value={editInfo.password} placeholder="기존 비밀번호" width="100%" margin="10px auto" style={{display:"block"}}></Input>
            <Text fontSize="small" color="blue" 
            keyUp={(event) => {
              debounce(event.target.value, checkPWD);
            }}
            clickEvent={() => { if(show==true){setShow(false);}else{setShow(true);} }}>(비밀번호 변경)</Text>
            { show ? <Input changeEvent={changeNewpassword} value={editInfo.newpassword} placeholder="새 비밀번호" width="100%" margin="10px auto" style={{display:"block"}}/> : null }
            { show ? <Input changeEvent={changeConfirm} value={editInfo.confirm} placeholder="새 비밀번호 확인" width="100%" margin="10px auto" style={{display:"block"}}/> : null }
            <Input changeEvent={changeLikeItem} value={editInfo.likeItem} placeholder="취향" width="100%" margin="10px auto" style={{display:"block"}}/>
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