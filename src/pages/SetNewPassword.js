// LIBRARY
import React, { useState, useEffect } from "react";
import _ from "lodash";
import styled from "styled-components";

// ELEMENTS
import { Text, Title, Grid, Button } from "../elements";

// HISTORY
import { history } from "../redux/configStore";
import { useSelector } from 'react-redux';
import { getToken } from '../common/token';

// REDUX-ACTION & REACT-HOOK
import { userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

// VALIDATION
import {  pwdVal } from "../common/validation";

const SetNewPassword = (props) => {
  const dispatch = useDispatch();

  useEffect(() => { if (getToken()) { window.alert("이미 로그인되어 있습니다."); window.location.href ='/'; } }, []);

  const debounce = _.debounce((value, setValue) => setValue(value), 0);
  const mobileInfo = useSelector((state) => state.user.mobileInfo);
  const id = mobileInfo?.id;
  const authId = useSelector((state) => state.user.authId);

  const renewPWD = () => {
    
    // authId도 받아야함
    const userInfo = {authId: authId, phone: id, password: pwd, confirm: pwdCheck}
    dispatch(userActions.renewPWDDB(userInfo))
  };

  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [pwdCheckConfirm, setPwdCheckConfirm] = useState("");
  const [pwdWarning, setPwdWarColor] = useState("red");
  const [pwdCheckWarning, setPwdCheckWarColor] = useState("red");

  const [Next, setNext] = useState(false);
  const [passCheck,setPassCk] = useState(false);

  const [buttonColor,setButton] = React.useState({
    color: "white",
    bg: "#B9B9B9",
    hoverColor: "white",
    hoverBg: "#B9B9B9",
  });

  const checkPWD = (val) => {
    if (val === "") {
      setPwdWarColor("red");
      setPwdConfirm("비밀번호가 입력되지 않았습니다.");
      setPassCk(false);
      return;
    }
    if (!pwdVal(val)) {
      setPwdWarColor("red");
      setPwdConfirm("영문, 숫자, 특수문자 1자 이상 포함해주세요.(8~20자) ");
      setPassCk(false);
      return;
    }
    setPwdWarColor("green");
    setPwdConfirm("사용가능한 비밀번호 입니다.");
    setPassCk(true);
  };

  const checkPWD2nd = (val) => {
    if (val === "") {
      setPwdCheckWarColor("red");
      setPwdCheckConfirm("비밀번호 확인란이 입력되지 않았습니다.");
      return;
    }
    if (val.length < 6) {
      setPwdCheckWarColor("red");
      setPwdCheckConfirm("");
      return;
    }
    if (val !== pwd) {
      setPwdCheckWarColor("red");
      setPwdCheckConfirm("입력된 비밀번호가 서로 다릅니다.");
      return;
    }
    setPwdCheckWarColor("green");
    setPwdCheckConfirm("비밀번호가 올바르게 입력되었습니다.");
  };

  //인증 확인 유무
  const is_confirm_auth = useSelector((state) => state.user.is_confirm_auth);
  const is_check_phone = useSelector((state) => state.user.is_check_phone);

  const states = useSelector((state) => state);

  //조건에 따른 버튼 색 변화
  if( passCheck && (pwd===pwdCheck)&&is_confirm_auth && !Next){
    setNext(true);
    setButton({
    color: "white",
    bg: "#16C59B",
    hoverColor: "#16C59B",
    hoverBg: "white",});
  }
  if(( !passCheck || !(pwd===pwdCheck) || !is_confirm_auth) && Next){
    setNext(false);
    setButton({
    color: "white",
    bg: "#B9B9B9",
    hoverColor: "white",
    hoverBg: "#B9B9B9",});
  }

  return (
    <Style>
      <Grid
        minWidth="280px"
        maxWidth="300px"
        margin="0px auto"
        padding="18px"
      >
        <Title fontSize="25px" textAlign="left" margin="50px 0px 25px 0px">
          <span>비밀번호 설정</span>
        </Title>
        <Grid height="">
        

          <Grid padding="5px 0px 8px" margin="0px 0px 0px 0px">
            <Text
              fontSize="12px"
              margin="0px"
              color={pwdWarning}
              lineHeight="2"
            >
              {pwdConfirm} 
            </Text>
            <InputBox
              placeholder="새 비밀번호를 입력하세요"
              type="password"
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              onKeyUp={(event) => {
                debounce(event.target.value, checkPWD);
              }}
            />
          </Grid>
          <Grid padding="5px 0px 8px"
                margin="0px 0px 20px 0px">
            <Text
              fontSize="12px"
              margin="0px"
              color={pwdCheckWarning}
              lineHeight="2"
            >
              {pwdCheckConfirm}
            </Text>
            <InputBox
              placeholder="새 비밀번호를 한번 더 입력하세요"
              type="password"
              onChange={(e) => {
                setPwdCheck(e.target.value);
              }}
              onKeyUp={(event) => {
                debounce(event.target.value, checkPWD2nd);
              }}
            />
          </Grid>
          <Grid padding="5px 0px"
                margin="0px 0px 50px 0px">
            <Button
              width="100%"
              height="auto"
              padding="12px 0"
              fontSize="18px"
              bg={buttonColor.bg}
              hoverBg={buttonColor.hoverBg}
              radius="5px"
              color={buttonColor.color}
              className="custom_transition"
              style={{ fontWeight: "bold",
                       border: "none" }}
              hoverColor={buttonColor.hoverColor}
              clickEvent={renewPWD}
              disabled={!Next}
            >
              완료
            </Button>
          </Grid>
        </Grid>
      </Grid>
      </Style>
  );
};
const InputBox = styled.input`
  width: 100%;
  border: solid 2px #A7AAAD;
  padding: 14px 7px;
  ::placeholder {
    font-size: 14px;
  }
`;
const Style = styled.div`
  top: 10%;
  position: absolute;
  margin: auto;
  width: 100vw;
`;

SetNewPassword.defaultProps = {};

export default SetNewPassword;
