// LIBRARY
import React, { useState } from "react";
import _ from "lodash";
import { css } from "styled-components";

// ELEMENTS
import { Text, Title, Input, Grid, Button } from "../elements";

// HISTORY
import { history } from "../redux/configStore";

// REDUX-ACTION & REACT-HOOK
import { userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

// VALIDATION
import { idVal, pwdVal, nameVal } from "../common/validation";

const SignUp = (props) => {
  const dispatch = useDispatch();
  const debounce = _.debounce((value, setValue) => setValue(value), 300);
  const signupNext = () => {
    // if (id === ""|| pwd === ""|| name === "") 
    //   return window.alert(
    //     "입력하지 않은 항목이 있습니다."
    //     );
    
    const userInfo = {id, pwd, name}
    dispatch(userActions.tempSave(userInfo))
    history.push("/signup/info");
  }
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  const [idConfirm, setIdConfirm] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [pwdCheckConfirm, setPwdCheckConfirm] = useState("");
  const [idWarning, setIdWarColor] = useState("red");
  const [pwdWarning, setPwdWarColor] = useState("red");
  const [pwdCheckWarning, setPwdCheckWarColor] = useState("red");
  const [name, setName] = useState("");
  const [nameConfirm, setNameConfirm] = useState("");
  const [nameWarning, setNameWarColor] = useState("red");
  const checkID = (val) => {
    if (val === "") {
      setIdWarColor("red");
      setIdConfirm("이메일이 입력되지 않았습니다.");
      return;
    }
    if (!idVal(val)) {
      setIdWarColor("red");
      setIdConfirm("이메일이 형식에 맞지 않습니다.(영어, 알파벳 4~20자)");
      return;
    }

    setIdWarColor("green");
    setIdConfirm("중복 검사를 해주세요.");
  };

  const checkPWD = (val) => {
    if (val === "") {
      setPwdWarColor("red");
      setPwdConfirm("비밀번호가 입력되지 않았습니다.");
      return;
    }
    if (!pwdVal(val)) {
      setPwdWarColor("red");
      setPwdConfirm("영문과 숫자, 특수문자 각 1자 이상 포함해주세요.(8~20자) ");
      return;
    }
    setPwdWarColor("green");
    setPwdConfirm("사용가능한 비밀번호 입니다.");
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

  const checkName = (val) => {
    if (val === "") {
      setNameWarColor("red");
      setNameConfirm("성함이 입력되지 않았습니다.");
      return;
    }
    if (!nameVal(val)) {
      setNameWarColor("red");
      setNameConfirm("성함을 정확히 입력해주세요.");
      return;
    }
    setNameWarColor("green");
    setNameConfirm("해당 성함으로 저장됩니다.");
  };

  const nickname = () => {
    if (id === "") {
      window.alert("이메일이 입력되지 않았습니다.");
      return;
    }
    dispatch(userActions.emailCheck(id));
    setIdConfirm("");
  };

  return (
    <React.Fragment>
      {/* <div style={{ paddingTop: "110px" }} /> */}
      <Grid
        width="360px"
        margin="0px auto"
        padding="5px 40px 41.2px"
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
        <Title fontSize="25px" textAlign="left" margin="50px 0px 50px 10px">
          <span style={{ cursor: "pointer" }}>회원가입</span>
        </Title>
        <Grid>
          <Grid padding="5px 0px 0px">
            <Text
              fontSize="12px"
              margin="0px"
              color={nameWarning}
              lineHeight="2"
              // textIndent="3px"
            >
              {nameConfirm}
            </Text>
            <Input
              placeholder="성함을 입력해주세요."
              changeEvent={(e) => {
                setName(e.target.value);
              }}
              keyUp={(event) => {
                debounce(event.target.value, checkName);
              }}
              padding="14px 7px"
            />
          </Grid>
          <Grid padding="16px 0px 0px">
            <Text
              fontSize="12px"
              margin="0px"
              color={idWarning}
              lineHeight="2"
              // textIndent="3px"
              >
              {idConfirm}
            </Text>
          </Grid>
          <Grid is_flex padding="0px 0px 8px">
            <Input
              placeholder="이메일을 입력해주세요."
              changeEvent={(event) => {
                setId(event.target.value);
              }}
              keyUp={(event) => {
                debounce(event.target.value, checkID);
              }}
              padding="14px 7px"
            />
            <Button
              margin="0px 0px 0px 6px"
              width="40%"
              height="auto"
              padding="16px 0"
              fontSize="13px"
              bg="#A7AAAD"
              color="#FFFFFF"
              className="custom_transition"
              style={{ cursor: "pointer",
                      border: "none",
                      fontWeight: "bold" }}
              clickEvent={nickname}
            >
              중복 확인
            </Button>
          </Grid>
          
          <Grid padding="5px 0px 8px">
            <Text
              fontSize="12px"
              margin="0px"
              color={pwdWarning}
              lineHeight="2"
              // textIndent="3px"
            >
              {pwdConfirm}
            </Text>
            <Input
              placeholder="비밀번호를 입력해주세요."
              type="password"
              changeEvent={(e) => {
                setPwd(e.target.value);
              }}
              keyUp={(event) => {
                debounce(event.target.value, checkPWD);
              }}
              padding="14px 7px"
            />
          </Grid>
          <Grid padding="5px 0px 8px"
                margin="0px 0px 30px 0px">
            <Text
              fontSize="12px"
              margin="0px"
              color={pwdCheckWarning}
              lineHeight="2"
              // textIndent="3px"
            >
              {pwdCheckConfirm}
            </Text>
            <Input
              placeholder="비밀번호를 한번 더 입력해주세요."
              type="password"
              changeEvent={(e) => {
                setPwdCheck(e.target.value);
              }}
              keyUp={(event) => {
                debounce(event.target.value, checkPWD2nd);
              }}
              padding="14px 7px"
            />
          </Grid>
          <Grid padding="5px 0px"
                margin="0px 0px 50px 0px">
            <Button
              width="100%"
              height="auto"
              padding="12px 0"
              fontSize="18px"
              bg="#16C59B"
              radius="5px"
              color="#FFFFFF"
              className="custom_transition"
              style={{ fontWeight: "bold",
                       border: "none" }}
              hoverColor="#16C59B"  
              clickEvent={signupNext}
              disabled={!id || !pwd || !name || !(pwd===pwdCheck)}
            >
              다음
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

SignUp.defaultProps = {};

export default SignUp;
