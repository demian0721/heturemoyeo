// LIBRARY
import React, { useState, useEffect } from "react";
import styled from "styled-components";

//history
import { getToken } from '../common/token';

// ELEMENTS
import { Text, Title, Input, Grid, Button } from "../elements";

// REDUX-ACTION & REACT-HOOK
import { userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

const LogIn = (props) => {
  const dispatch = useDispatch();

  // useEffect Hook을 사용하여 컴포넌트가 렌더링 되었을 때 세션스토리지에 Token을 이미 가져왔다면 메인페이지로 이동
  useEffect(() => { if (getToken()) { window.alert("이미 로그인되어 있습니다."); window.location.href ='/'; } }, []);

  const [userInfo, setUserInfo] = useState({ phone: "", password: "" });
  const [warningText, setWarningText] = useState("");

  const login = () => {
    if (!userInfo.phone) {
      setWarningText("번호가 입력되지 않았습니다.");
      return;
    }

    if (!userInfo.password) {
      setWarningText("패스워드가 입력되지 않았습니다.");
      return;
    }

    dispatch(userActions.loginAction(userInfo));
  };

  return (
    <Style>
      <Grid
        minWidth="280px"
        maxWidth="300px"
        margin="0px auto"
      >
        <Title fontSize="35px"  marginBottom="15px">
          <img
            src="/assets/logo_login.png"
            style={{
              width: "70px",
              height: "70px",
              display: "block",
              margin: "auto",
            }}
            alt=""
          />
          <img
            src="/assets/textlogo_green.svg"
            style={{
              width: "78.4px",
              height: "20px",
              display: "block",
              margin: "12px auto",
            }}
            alt=""
          />
        </Title>

        <Grid padding="18px" margin="50px 0px 0px 0px" height="">
          <Grid padding="8px 0px">
            <Text color="#495057" fontSize="15px">
              핸드폰 번호
            </Text>
            <Input
              placeholder=""
              style={{
                borderLeft: "none",
                borderRight: "none",
                borderTop: "none",
                borderBottom: "solid 2px #A7AAAD",
                boxShadow: "none",
              }}
              changeEvent={(event) => {
                setUserInfo({ ...userInfo, phone: event.target.value });
              }}
              padding="8px 0px 4px 0px"
              keyPress={(event) => {
                if (event.key === "Enter") {
                  login();
                }
              }}
            />
          </Grid>

          <Grid padding="18px 0px 5px 0px">
            <Text color="#495057" fontSize="15px">
              비밀번호
            </Text>
            <Input
              placeholder=""
              style={{
                borderLeft: "none",
                borderRight: "none",
                borderTop: "none",
                borderBottom: "solid 2px #A7AAAD",
                boxShadow: "none",
              }}
              type="password"
              changeEvent={(event) => {
                setUserInfo({ ...userInfo, password: event.target.value });
              }}
              padding="8px 0px 4px 0px"
              keyPress={(event) => {
                if (event.key === "Enter") {
                  login();
                }
              }}
            />
            <Text
              fontSize="12px"
              lineHeight="1"
              textIndent="15px"
              textAlign="right"
              margin="10px 0px 20px 0px"
              clickEvent={() => (window.location.href = "/findpassword")}
              style={{cursor:"pointer"}}
            >
              비밀번호 찾기
            </Text>
          </Grid>
          <Text
            textAlign="center"
            fontSize="12px"
            lineHeight="1"
            textIndent="15px"
            color="red"
          >
            {warningText}
          </Text>
          <Grid padding="5px 0px 0px 0px">
            <Button
              width="100%"
              height="auto"
              padding="12px 0"
              margin="0px 0px 20px"
              fontSize="18px"
              bg="#16C59B"
              radius="5px"
              color="#FFFFFF"
              className="custom_transition"
              style={{ fontWeight: "bold", border: "none" }}
              hoverColor="#16C59B"
              clickEvent={login}
            >
              로그인
            </Button>
          </Grid>
          <Grid padding="5px 0px">
            <Text textAlign="center" fontSize="12px">
              계정이 없으신가요? 
              <span
                style={{
                  cursor: "pointer",
                  color: "#16C59B",
                  fontWeight: "bold",
                }}
                onClick={() => (window.location.href = "/terms")}
              >
                &nbsp;회원가입
              </span>
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </Style>
  );
};

const Style = styled.div`
  align-items: center;
  position: fixed;
  top: 18%;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

LogIn.defaultProps = {};

export default LogIn;
