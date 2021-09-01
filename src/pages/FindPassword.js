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
import { idVal } from "../common/validation";

const FindPassword = (props) => {
  const dispatch = useDispatch();

  useEffect(() => { if (getToken()) { window.alert("이미 로그인되어 있습니다."); window.location.href ='/'; } }, []);

  const debounce = _.debounce((value, setValue) => setValue(value), 0);

  const [id, setId] = useState("");
  const [idConfirm, setIdConfirm] = useState("");
  const [idWarning, setIdWarColor] = useState("red");
  const [Next,setNext] = useState(false);
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

  const nickname = () => {
    if (id === "") {
      window.alert("핸드폰 번호가 입력되지 않았습니다.");
      return;
    }
    const userInfo = {id}
    dispatch(userActions.tempGet(userInfo));

    dispatch(userActions.getAuthNum(id));
    setIdConfirm("");
  };

  //인증 확인 유무
  const is_check_auth = useSelector((state) => state.user.is_check_auth);
  const is_check_phone = useSelector((state) => state.user.is_check_phone);

  //조건에 따른 버튼 색 변화
  if(id && !Next){
    setNext(true);
    setButton({
    color: "white",
    bg: "#16C59B",
    hoverColor: "#16C59B",
    hoverBg: "white",});
  }
  if((!id) && Next){
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
          <span>비밀번호 찾기</span>
        </Title>
        <Grid height="">
          <Grid padding="5px 0px 0px">
            <Text
              fontSize="9px"
              lineHeight="1.5"
              textIndent="15px"
              textAlign="left"
              margin="0px 0px 10px 0px"
            >
            <br/>  
            가입하신 핸드폰 번호를 입력해주세요.<br/>
            핸드폰 번호로 비밀번호를 재설정할 수 있는 인증번호를 보내드립니다.<br/>
            전송량이 많은 경우 인증번호 전송이 지연될 수 있습니다.
            </Text>
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

          <Grid padding="0px 0px 8px">
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
              width="100%"
              height="auto"
              padding="12px 0"
              fontSize="18px"
              color={buttonColor.color}
              bg={buttonColor.bg}
              hoverBg={buttonColor.hoverBg}
              className="custom_transition"
              style={{ cursor: "pointer",
                      border: "none",
                      fontWeight: "bold" }}
              disabled={!Next}
              clickEvent={(e) => {
                nickname();
                e.preventDefault();  
              }}
            >
              인증번호 받기
            </Button>
            <Text
              fontSize="12px"
              lineHeight="1"
              textIndent="15px"
              textAlign="right"
              margin="20px 0px 20px 0px"
              clickEvent={() => (window.location.href = "/login")}
              style={{cursor:"pointer", textDecoration:"underline"}}
            >
              뒤로가기
            </Text>
          </Grid> 
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

FindPassword.defaultProps = {};

export default FindPassword;
