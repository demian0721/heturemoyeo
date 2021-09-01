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

const SendPhoneNumAuth = (props) => {
  const dispatch = useDispatch();

  useEffect(() => { if (getToken()) { window.alert("이미 로그인되어 있습니다."); window.location.href ='/'; } }, []);

  const debounce = _.debounce((value, setValue) => setValue(value), 0);
  const mobileInfo = useSelector((state) => state.user.mobileInfo);
  const id = mobileInfo?.id;

  const [authData, setAuthData] = useState("");
  const [authWarning, setAuthWarColor] = useState("red");
  const [authConfirm, setAuthConfirm] = useState("");
  const [Next, setNext] = useState(false);

  const [buttonColor,setButton] = React.useState({
    color: "white",
    bg: "#B9B9B9",
    hoverColor: "white",
    hoverBg: "#B9B9B9",
  });

  const checkAuth = (val) => {
    if (val === "") {
      setAuthWarColor("red");
      setAuthConfirm("인증번호가 입력되지 않았습니다.");
      return;
    }
  }

  const authnumber = () => {
    if (authData === "") {
      window.alert("인증번호가 입력되지 않았습니다.");
      return;
    }
    const authInfo = {phone: id, authData}
    dispatch(userActions.authNumConfirm(authInfo));
    setAuthConfirm("");
  }
  //인증 확인 유무
  const is_check_auth = useSelector((state) => state.user.is_confirm_auth);
  const is_check_phone = useSelector((state) => state.user.is_check_phone);

  //조건에 따른 버튼 색 변화
  if(is_check_auth && !Next){
    setNext(true);
    setButton({
    color: "white",
    bg: "#16C59B",
    hoverColor: "#16C59B",
    hoverBg: "white",});
  }
  if((!is_check_auth) && Next){
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
          <span>핸드폰 번호 인증</span>
        </Title>
        <Grid height="">
          <Grid padding="5px 0px 0px">
            <Text
              fontSize="9px"
              lineHeight="1.5"
              textIndent="15px"
              textAlign="left"
              margin="100px 0px 10px 0px"
            >
            <br/>  
            입력하신 {id}로 인증번호가 발송되었습니다.<br/>
            </Text>
          </Grid>

            <Grid padding="8px 0px 0px">
              <Text
                fontSize="12px"
                margin="0px"
                color={authWarning}
                lineHeight="2"
                >
                {authConfirm}
              </Text>
            </Grid>
            <Grid padding="0px 0px 8px">
              <InputBox
                value={authData}
                placeholder="인증번호(6자리)를 입력하세요"
                onChange={(event) => {
                  setAuthData(event.target.value);
                }}
                onKeyUp={(event) => {
                  debounce(event.target.value, checkAuth);
                }}
              />
              <Text
              fontSize="12px"
              lineHeight="1"
              textIndent="15px"
              textAlign="right"
              margin="0px 0px 30px 0px"
            >
              인증번호를 받지 못하셨다면? 
              <span 
                // onClick={() => (window.location.href = "/findpassword")}
                style={{cursor:"pointer", fontWeight:"bold"}}
              >&nbsp;[인증번호 재전송]</span>
            </Text>
              <Button
                width="100%"
                height="auto"
                padding="16px 0"
                fontSize="18px"
                color={buttonColor.color}
                bg={buttonColor.bg}
                hoverBg={buttonColor.hoverBg}
                className="custom_transition"
                disabled={is_check_auth}
                style={{ cursor: "default",
                        border: "none",
                        fontWeight: "bold" }}
                clickEvent={authnumber}
              >
                확인
              </Button>
            </Grid>
            <Text
              fontSize="12px"
              lineHeight="1"
              textIndent="15px"
              textAlign="right"
              margin="20px 0px 20px 0px"
              clickEvent={() => (window.location.href = "/findpassword")}
              style={{cursor:"pointer", textDecoration:"underline"}}
            >
              뒤로가기
            </Text>
        </Grid>
      </Grid>
      </Style>
  );
};
const InputBox = styled.input`
  width: 100%;
  margin-bottom: 10px;
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

SendPhoneNumAuth.defaultProps = {};

export default SendPhoneNumAuth;
