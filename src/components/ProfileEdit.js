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
  
  const [show, setShow] = React.useState(false);
  const [nicknameNotice, setNicknameNotice] = React.useState("");
  const [nicknameWarning, setNicknameWarColor] = React.useState("red");

  const [pwdNotice, setPwdNotice] = React.useState("");
  const [pwdWarning, setPwdWarColor] = React.useState("red");

  const [npwd1Notice, setNPwd1Notice] = React.useState("");
  const [npwd1Warning, setNPwd1WarColor] = React.useState("red");

  const [npwd2Notice, setNPwd2Notice] = React.useState("");
  const [npwd2Warning, setNPwd2WarColor] = React.useState("red");

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

    //닉네임 확인파트
  const checkNickname = (val) => {
    if (val === "") {
      setNicknameWarColor("red");
      setNicknameNotice("닉네임이 입력되지 않았습니다.");
      return;
    }
    if (!nickVal(val)) {
      setNicknameWarColor("red");
      setNicknameNotice("닉네임이 형식에 맞지 않습니다.");
      return;
    }

    setNicknameWarColor("green");
    setNicknameNotice("중복 검사를 해주세요");
  };

  const nickname = () => {
    if (editInfo.nickname === "") {
      window.alert("닉네임이 입력되지 않았습니다.");
      return;
    }
    dispatch(userActions.nickCheck(editInfo.nickname));
    setNicknameNotice("");
  };

  //기존 비밀번호 확인파트 (기존 비밀번호 가져와서 대조해야함)

  const checkPWD = (val) => {
    if (val === "") {
      setPwdWarColor("red");
      setPwdNotice("비밀번호가 입력되지 않았습니다.");
      return;
    }
    if (!pwdVal(val)) {
      setPwdWarColor("red");
      setPwdNotice(
        "기존 비밀번호와 일치하지 않습니다."  //양식 체크임
      );
      return;
    }
    setPwdWarColor("green");
    setPwdNotice("비밀번호가 일치합니다.");
  }


  
  // {editInfo.password}

  //기존 비밀번호 확인파트 (기존 비밀번호 가져와서 대조해야함)
  const checkNPWD1 = (val) => {
    if (val === "") {
      setNPwd1WarColor("red");
      setNPwd1Notice("새 비밀번호가 입력되지 않았습니다.");
      return;
    }
    if (!pwdVal(val)) {
      setNPwd1WarColor("red");
      setNPwd1Notice("비밀번호는 영문과 숫자, 특수문자를 각 1자 이상 포함해주세요.(8~20자) ");
      return;
    }
    setNPwd1WarColor("green");
    setNPwd1Notice("사용가능한 비밀번호 입니다.");
  };

    //기존 비밀번호 확인파트 (기존 비밀번호 가져와서 대조해야함)

  const checkNPWD2 = (val) => {
    if (val === "") {
      setNPwd2WarColor("red");
      setNPwd2Notice("비밀번호 확인란이 입력되지 않았습니다.");
      return;
    }
    if (val.length < 6) {
      setNPwd2WarColor("red");
      setNPwd2Notice("");
      return;
    }
    if (val !== editInfo.newpassword) {
      setNPwd2WarColor("red");
      setNPwd2Notice("입력된 비밀번호가 서로 다릅니다.");
      return;
    }
    setNPwd2WarColor("green");
    setNPwd2Notice("비밀번호가 올바르게 입력되었습니다.");
  };
    
    return (
        <Style>
          <Grid  width="50vw" height="100%" maxWidth="500px" minWidth="250px" margin="auto" style={{}}>
            <Grid id="profile"></Grid>
            <Grid width="15vw" maxWidth="150px" minWidth="50px" margin="auto auto 30px" style={{display:"block", borderRadius:"50%"}}>
                <Image src="https://i.imgur.com/ViFAD8Z.png" style={{position:'absolute',zIndex:1}}/>
                <Text style={{position:'relative',zIndex:2}}>이미지 수정</Text>
            </Grid>
            {/* <Text margin="20px 0px 0px 0px" fontSize='small'>비밀번호</Text> */}
            <Text fontSize="12px" margin="0px" color={nicknameWarning} lineHeight="1" textIndent="0px">{nicknameNotice}</Text>
            <Grid is_flex>
              <Input keyUp={(event) => {debounce(event.target.value, checkNickname);}} changeEvent={changeNickname} placeholder="닉네임 수정" width="100%" margin="10px auto" style={{display:"block"}} value={editInfo.nickname}></Input>
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
            
            <Text fontSize="12px" margin="0px" color={pwdWarning} lineHeight="1" textIndent="0px">{pwdNotice}</Text>
            <Input keyUp={(event) => {debounce(event.target.value, checkPWD);}} changeEvent={changePassword} value={editInfo.password} placeholder="기존 비밀번호" width="100%" margin="10px auto" style={{display:"block"}}></Input>
            <Text fontSize="small" color="blue" clickEvent={() => { if(show==true){setShow(false);}else{setShow(true);} }}>(비밀번호 변경)</Text>
            { show ? <Text fontSize="12px" margin="0px" color={npwd1Warning} lineHeight="1" textIndent="0px">{npwd1Notice}</Text> : null }
            { show ? <Input margin="0px" keyUp={(event) => {debounce(event.target.value, checkNPWD1);}}  changeEvent={changeNewpassword} value={editInfo.newpassword} placeholder="새 비밀번호" width="100%" margin="10px auto" style={{display:"block"}}/> : null }
            { show ? <Text fontSize="12px" margin="0px" color={npwd2Warning} lineHeight="1" textIndent="0px">{npwd2Notice}</Text> : null }
            { show ? <Input margin="0px" keyUp={(event) => {debounce(event.target.value, checkNPWD2);}}  changeEvent={changeConfirm} value={editInfo.confirm} placeholder="새 비밀번호 확인" width="100%" margin="10px auto" style={{display:"block"}}/> : null }
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