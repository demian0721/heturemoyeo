//LIBRARY
import React, { useState } from "react";
import { css } from "styled-components";

//ELEMENTS
import { Text, Title, Input, Grid, Button } from "../elements";

//HISTORY
import { history } from "../redux/configStore";

//REDUX-ACTION & REACT-HOOK
import { userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

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
          <span style={{ cursor: "pointer" }}>LOGO</span>
        </Title>
        
        <Grid padding="18px" bg="#EFEFEF">
          <Title fontSize="18px" margin="5px">
            로그인
          </Title>
          <Grid padding="8px 0px">
            <Input
              placeholder="이메일"
              changeEvent={(event) => {
                setUserInfo({ ...userInfo, email: event.target.value });
              }}
              padding="14px 17px"
              keyPress={(event) => {
                if (event.key === "Enter") {
                  login();
                }
              }}
            />
          </Grid>

          <Grid padding="8px 0px 5px 0px">
            <Input
              placeholder="비밀번호"
              type="password"
              changeEvent={(event) => {
                setUserInfo({ ...userInfo, password: event.target.value });
              }}
              padding="14px 17px"
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
              margin="0px 0px 10px"
              fontSize="15px"
              bg="#A7AAAD"
              clickEvent={login}
            >
              로그인
            </Button>
          </Grid>
          <Grid padding="5px 0px">
            <Button
              width="100%"
              height="auto"
              padding="12px 0"
              bg="#A7AAAD"
              hoverColor="#ccc"
              // color="inherit"
              fontSize="15px"
              clickEvent={() => {
                history.push("/terms");
              }}
            >
              회원가입
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

LogIn.defaultProps = {};

export default LogIn;
