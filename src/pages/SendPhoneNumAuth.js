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

  // useEffect Hook을 사용하여 컴포넌트가 렌더링 되었을 때 세션스토리지에 Token을 이미 가져왔다면 메인페이지로 이동
  useEffect(() => { if (getToken()) { window.alert("이미 로그인되어 있습니다."); window.location.href ='/'; } }, []);

  const debounce = _.debounce((value, setValue) => setValue(value), 0);
  // user 모듈에 임시저장되어 있는 id(phone)를 가져온다
  const mobileInfo = useSelector((state) => state.user.mobileInfo);
  const id = mobileInfo?.id;

  const [authData, setAuthData] = useState("");
  const [authWarning, setAuthWarColor] = useState("red");
  const [authConfirm, setAuthConfirm] = useState("");
  const [Next, setNext] = useState(false);

  const [buttonColor, setButton] = React.useState({
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

  // 인증번호 확인시 서버로 phone, authData를 보내기 위해 authNumConfirm라는 action creator를 dispatch 실행
  const authnumber = () => {
    if (authData === "") {
      window.alert("인증번호가 입력되지 않았습니다.");
      return;
    }
    const authInfo = {phone: id, authData}
    dispatch(userActions.authNumConfirm(authInfo));
    setAuthConfirm("");
  }
  // is_check_auth는 '인증번호 확인'에 관한 변수
  const is_check_auth = useSelector((state) => state.user.is_confirm_auth);

  // 조건에 따른 버튼 색 변화
  if(authData && !Next){
    setNext(true);
    setButton({
    color: "white",
    bg: "#16C59B",
    hoverColor: "#16C59B",
    hoverBg: "white",});
  }
  if((!authData) && Next){
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
              fontSize="11px"
              lineHeight="1.5"
              textIndent="15px"
              textAlign="left"
              margin="0px 0px 10px 0px"
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
  margin-bottom: 20px;
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
