// LIBRARY
import React, { useState } from "react";
import styled, { css } from "styled-components";

// ELEMENTS
import { Text, Title, Input, Grid, Button } from "../elements";

// REDUX-ACTION & REACT-HOOK
import { userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import { BorderBottom } from "@material-ui/icons";

const LogIn = (props) => {
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [warningText, setWarningText] = useState("");

  const login = () => {
    if (!userInfo.email) {
      setWarningText("이메일이 입력되지 않았습니다.");
      return;
    }

    if (!userInfo.password) {
      setWarningText("패스워드가 입력되지 않았습니다.");
      return;
    }

    dispatch(userActions.loginAction(userInfo));
  };

  return (
    <React.Fragment>
      <div style={{ paddingTop: "110px" }} />
      <Grid
        width="360px"
        margin="50px auto"
        padding="55px 40px 100.2px"
        shadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        tabletStyle={() => {
          return css`
            width: 95%;
          `;
        }}
        mobileStyle={() => {
          return css`
            padding: 15px 20px;
            width: 100%;
          `;
        }}
      >
        <Title fontSize="35px" textAlign="center" marginBottom="15px">
          <img
            src="/assets/logo_login.png"
            style={{
              width: "70px",
              height: "70px",
              display: "block",
              margin: "auto",
            }}
          />
        </Title>

        <Grid padding="18px" margin="50px 0px 0px 0px">
          {/* <Title fontSize="18px" margin="5px">
            로그인
          </Title> */}
          <Grid padding="8px 0px">
            <Text color="#495057"
                  fontSize="15px">이메일</Text>
            <Input
              placeholder=""
              style={{
                borderLeft: "none",
                borderRight: "none",
                borderTop: "none",
                borderBottom: "solid 2px #A7AAAD",
                boxShadow: "none"
              }}
              // focus={outLine:"solid 2px #16C59B"}
              changeEvent={(event) => {
                setUserInfo({ ...userInfo, email: event.target.value });
              }}
              padding="4px 4px"
              keyPress={(event) => {
                if (event.key === "Enter") {
                  login();
                }
              }}
            />
          </Grid>

          <Grid padding="18px 0px 5px 0px">
            <Text color="#495057"
                  fontSize="15px">비밀번호</Text>
            <Input
              placeholder=""
              style={{
                borderLeft: "none",
                borderRight: "none",
                borderTop: "none",
                borderBottom: "solid 2px #A7AAAD",
                boxShadow: "none"
              }}
              type="password"
              changeEvent={(event) => {
                setUserInfo({ ...userInfo, password: event.target.value });
              }}
              padding="4px 4px"
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
              style={{ fontWeight: "bold",
                       border: "none" }}
              hoverColor="#16C59B"         
              clickEvent={login}
            >
              로그인
            </Button>
          </Grid>
          <Grid padding="5px 0px">
            <Text
              textAlign="center"
              fontSize="12px">
              계정이 없으신가요?
              <span
              style={{ cursor: "pointer",
                      color: "#16C59B",
                      fontWeight: "bold"}}
              onClick={() => window.location.href = "/terms"}        
                      > 회원가입</span>
            </Text>
            {/* <Button
              width="100%"
              height="auto"
              padding="12px 0"
              bg="#A7AAAD"
              hoverColor="#ccc"
              fontSize="15px"
              clickEvent={() => {
                window.location.href = "/terms";
              }}
            >
              회원가입
            </Button> */}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

LogIn.defaultProps = {};

export default LogIn;
