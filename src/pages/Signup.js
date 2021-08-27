// LIBRARY
import React, { useState } from "react";
import _ from "lodash";
import styled from "styled-components";

// ELEMENTS
import { Text, Title, Grid, Button } from "../elements";

// HISTORY
import { history } from "../redux/configStore";
import { useSelector } from 'react-redux';

// REDUX-ACTION & REACT-HOOK
import { userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

// VALIDATION
import { idVal, pwdVal, nameVal } from "../common/validation";

const SignUp = (props) => {
  const dispatch = useDispatch();
  const debounce = _.debounce((value, setValue) => setValue(value), 300);
  const signupNext = () => {
    
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

  const [authData, setAuthData] = useState("");
  const [authWarning, setAuthWarColor] = useState("red");
  const [authConfirm, setAuthConfirm] = useState("");

  const [Next,setNext] = useState(false);
  const [nameCheck,setNameCk] = useState(false);
  const [passCheck,setPassCk] = useState(false);

  const [buttonColor,setButton] = React.useState({
    color: "white",
    bg: "#B9B9B9",
    hoverColor: "white",
    hoverBg: "#B9B9B9",
  });

  const checkID = (val) => {
    if (val === "") {
      setIdWarColor("red");
      setIdConfirm("핸드폰 번호가 입력되지 않았습니다.");
      return;
    }
    if (!idVal(val)) {
      setIdWarColor("red");
      setIdConfirm("핸드폰 번호가 형식에 맞지 않습니다.");
      return;
    }

    setIdWarColor("green");
    setIdConfirm("'인증번호 받기'를 해주세요.");
  };

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

  const checkName = (val) => {
    if (val === "") {
      setNameWarColor("red");
      setNameConfirm("성함이 입력되지 않았습니다.");
      setNameCk(false);
      return;
    }
    if (!nameVal(val)) {
      setNameWarColor("red");
      setNameConfirm("성함을 정확히 입력해주세요.");
      setNameCk(false);
      return;
    }
    setNameWarColor("green");
    setNameConfirm("해당 성함으로 저장됩니다.");
    setNameCk(true);
  };

  const nickname = () => {
    if (id === "") {
      window.alert("핸드폰 번호가 입력되지 않았습니다.");
      return;
    }
    dispatch(userActions.receiveAuthNum(id));
    setIdConfirm("");
  };

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
    dispatch(userActions.authNumCheck(authInfo));
    setAuthConfirm("");
  }
  //인증 확인 유무
  const is_check_auth = useSelector((state) => state.user.is_check_auth);
  const is_check_phone = useSelector((state) => state.user.is_check_phone);

  //조건에 따른 버튼 색 변화
  if(id && passCheck && nameCheck && (pwd===pwdCheck)&&is_check_auth && !Next){
    setNext(true);
    setButton({
    color: "white",
    bg: "#16C59B",
    hoverColor: "#16C59B",
    hoverBg: "white",});
  }
  if((!id || !passCheck || !nameCheck || !(pwd===pwdCheck) || !is_check_auth) && Next){
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
          <span>회원가입</span>
        </Title>
        <Grid height="">
          <Grid padding="5px 0px 0px">
            <Text
              fontSize="12px"
              margin="0px"
              color={nameWarning}
              lineHeight="2"
            >
              {nameConfirm}
            </Text>
            <InputBox 
              placeholder="성함을 입력하세요"
              onChange={(e) => {
                setName(e.target.value);
              }}
              onKeyUp={(event) => {
                debounce(event.target.value, checkName);
              }}
            />
          </Grid>

          <Grid padding="16px 0px 0px">
            <Text
              fontSize="12px"
              margin="0px"
              color={idWarning}
              lineHeight="2"
              >
              {idConfirm}
            </Text>
          </Grid>

          { is_check_phone ? <Grid is_flex padding="0px 0px 8px">
            <InputBox
              placeholder="핸드폰번호를 '-'&nbsp;없이 입력하세요"
              value={id}
            />
            <Button
              margin="0px 0px 0px 6px"
              width="30%"
              height="auto"
              padding="10px 0"
              fontSize="13px"
              bg="#A7AAAD"
              color="#FFFFFF"
              hoverBg= ""
              hoverColor= ""
              className="custom_transition"
              style={{ cursor: "default",
                      border: "none",
                      fontWeight: "bold" }}
              disabled={is_check_phone}
            >
              인증번호 <br/> 받기
            </Button>
          </Grid> : <Grid is_flex padding="0px 0px 8px">
            <InputBox
              placeholder="핸드폰번호를 '-'&nbsp;없이 입력하세요"
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
              onKeyUp={(event) => {
                debounce(event.target.value, checkID);
              }}
            />
            <Button
              margin="0px 0px 0px 6px"
              width="30%"
              height="auto"
              padding="10px 0"
              fontSize="13px"
              bg="#16C59B"
              color="white"
              hoverBg= "white"
              hoverColor= "#16C59B"
              className="custom_transition"
              style={{ cursor: "pointer",
                      border: "none",
                      fontWeight: "bold" }}
              disabled={is_check_phone}
              clickEvent={(e) => {
                nickname();
                e.preventDefault();  
              }}
            >
              인증번호 <br/> 받기
            </Button>
          </Grid> }
          
          { is_check_phone ? <div>
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
            <Grid is_flex padding="0px 0px 8px">
              { is_check_auth ? <InputBox
                placeholder="인증번호(6자리)를 입력하세요"
                value={authData}
              /> : <InputBox
                value={authData}
                placeholder="인증번호(6자리)를 입력하세요"
                onChange={(event) => {
                  setAuthData(event.target.value);
                }}
                onKeyUp={(event) => {
                  debounce(event.target.value, checkAuth);
                }}
              />}
              { is_check_auth ? <Button
                margin="0px 0px 0px 6px"
                width="30%"
                height="auto"
                padding="16px 0"
                fontSize="13px"
                bg="#A7AAAD"
                color="#FFFFFF"
                hoverBg= ""
                hoverColor= ""
                className="custom_transition"
                disabled={is_check_auth}
                style={{ cursor: "default",
                        border: "none",
                        fontWeight: "bold" }}
                clickEvent={authnumber}
              >
                확인
              </Button> : <Button
                margin="0px 0px 0px 6px"
                width="30%"
                height="auto"
                padding="16px 0"
                fontSize="13px"
                bg="#16C59B"
                color="white"
                hoverBg= "white"
                hoverColor= "#16C59B"
                className="custom_transition"
                disabled={is_check_auth}
                style={{ cursor: "pointer",
                        border: "none",
                        fontWeight: "bold" }}
                clickEvent={authnumber}
              >
                확인
              </Button> }
            </Grid>
          </div> : null }

          <Grid padding="5px 0px 8px">
            <Text
              fontSize="12px"
              margin="0px"
              color={pwdWarning}
              lineHeight="2"
            >
              {pwdConfirm} 
            </Text>
            <InputBox
              placeholder="비밀번호를 입력하세요"
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
              placeholder="비밀번호를 한번 더 입력하세요"
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
              clickEvent={signupNext}
              disabled={!Next}
              // disabled={!id || !pwd || !name || !(pwd===pwdCheck)}
            >
              다음
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

SignUp.defaultProps = {};

export default SignUp;
