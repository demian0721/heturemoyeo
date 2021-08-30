// LIBRARY
import React, { useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import _ from "lodash";

// Elements
import { Text, Title, Input, Grid, Button, Image } from "../elements";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

// HISTORY
import { history } from "../redux/configStore";
import { getToken } from '../common/token';

// REDUX-ACTION & REACT-HOOK
import { userActions } from "../redux/modules/user";
import { imgActions } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";

// VALIDATION
import { nickVal } from "../common/validation";

const SignupInfo = (props) => {
  const dispatch = useDispatch();

  useEffect(() => { if (getToken()) { window.alert("이미 로그인되어 있습니다."); window.location.href ='/'; } }, []);
  
  const debounce = _.debounce((value, setValue) => setValue(value), 0);
  const fileInput = useRef();
  const image = useSelector((state) => state.image);
  const preview = !image.preview ? "/assets/profile_image_avatar_only.png" : image.preview;

  const [nickname, setNickname] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);
  const [nicknameConfirm, setNicknameConfirm] = useState("");
  const [nicknameWarning, setNicknameWarColor] = useState("red");

  const [likeItem, setLikeItem] = useState([]);
  const tempInfo = useSelector((state) => state.user.tempInfo);
  const id = tempInfo?.id;
  const pwd = tempInfo?.pwd;
  const name = tempInfo?.name;

  const [complite,setComplite] = useState(false);

  const is_check_nickname = useSelector((state) => state.user.is_check_nickname);
  const [nickCk,setNickCk] = useState(false);
  const [firstNick,setFirstCk] = useState(false);

  const [buttonColor,setButton] = React.useState({
    color: "white",
    bg: "#B9B9B9",
    hoverColor: "white",
    hoverBg: "#B9B9B9",
  });

  useEffect(() => {
    if (!tempInfo) {
      history.push("/signup");
    }
  }, []);
  const checkNickname = (val) => {
    if (val === "") {
      setNicknameWarColor("red");
      setNicknameConfirm("닉네임이 입력되지 않았습니다.");
      return;
    }
    if (!nickVal(val)) {
      setNicknameWarColor("red");
      setNicknameConfirm("닉네임이 형식에 맞지 않습니다.");
      return;
    }

    setNicknameWarColor("green");
    setNicknameConfirm("중복 검사를 해주세요.");

    if(is_check_nickname && !firstNick){
      setFirstCk(true);
    };
    setNickCk(false);
    //닉네임 확인 후 닉네임 변경시 is_check_nickname이 false가 되게

  };

  const signup = () => {
    dispatch(
      userActions.signupDB(
        id,
        name,
        nickname,
        pwd,
        pwd,
        fileInput.current.files[0],
        statusMessage,
        likeItem
      )
    );
    dispatch(imgActions.setPreview(null));


  };

  const selectFile = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    if (file) {
      reader.readAsDataURL(file);

      reader.onload = () => {
        dispatch(imgActions.setPreview(reader.result));
      };
    }
  };

  const nicknamedup = () => {
    if (nickname === "") {
      window.alert("닉네임이 입력되지 않았습니다.");
      return;
    }
    if (nickname.length < 1) {
      window.alert("닉네임은 1글자 이상, 최대 20글자까지 작성할 수 있습니다.");
      return;
    }
    if (nickname.length > 20) {
      window.alert("닉네임은 1글자 이상, 최대 20글자까지 작성할 수 있습니다.");
      return;
    }
    dispatch(userActions.nickCheck(nickname));
    setNickCk(is_check_nickname);
    setNicknameConfirm("");
  };

  //확인용

  if(nickname && (is_check_nickname&&!firstNick||is_check_nickname&&nickCk&&firstNick)&&!complite){
    setComplite(true);
    setButton({
    color: "white",
    bg: "#16C59B",
    hoverColor: "#16C59B",
    hoverBg: "white",});
  }

  if((!nickname || !is_check_nickname || (firstNick&&!nickCk) ) && complite){
    setComplite(false);
    setButton({
    color: "white",
    bg: "#B9B9B9",
    hoverColor: "white",
    hoverBg: "#B9B9B9",});
  }
  //조건에 따른 버튼 색 변화

  return (
    <Style>
      <Grid
        minWidth="280px"
        maxWidth="300px"
        margin="0px auto"
        padding="18px"
    
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
        <Title fontSize="25px" textAlign="left" margin="50px 0px 25px 0px">
          <span>회원정보 입력</span>
        </Title>
        <Grid height="">
          <Grid
            padding="5px 0px 8px"
            margin="0px 0px 150px 0px"
          >
            <Grid
              bg="#EFEFEF"
              radius="50%"
              width="150px"
              height="150px"
              margin="auto"
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <LabelStyle htmlFor="input--file">
                <img
                    src={preview}
                    style={{
                      width: "150px",
                      height: "150px",
                      display: "block",
                      margin: "auto",
                    }}
                    alt=""
                  />
              </LabelStyle>

              <InputFile
                type="file"
                id="input--file"
                ref={fileInput}
                accept="image/png, image/jpeg"
                onChange={selectFile}
              />
            </Grid>
          </Grid>
          <Grid padding="16px 0px 0px">
            <Text
              fontSize="12px"
              margin="0px"
              color={nicknameWarning}
              lineHeight="2"
            >
              {nicknameConfirm}
            </Text>
          </Grid>
          <Grid is_flex padding="0px 0px 8px">
            <InputBox
              placeholder="닉네임을 입력하세요"
              onChange={(event) => {
                setNickname(event.target.value);
              }}
              onKeyUp={(event) => {
                debounce(event.target.value, checkNickname);
              }}
            />
            
            {is_check_nickname && nickCk && firstNick ? <Button
            margin="0px 0px 0px 6px"  width="40%"  height="auto"  padding="17px 0"  fontSize="13px"  bg="#A7AAAD" hoverBg="#A7AAAD" color="white" hoverColor="white" className="custom_transition"
              style={{ cursor: "default", border: "none", fontWeight: "bold" }}>
              중복 확인</Button> : null }

            {is_check_nickname && !nickCk && !firstNick ? <Button
            margin="0px 0px 0px 6px"  width="40%"  height="auto"  padding="17px 0"  fontSize="13px"  bg="#A7AAAD" hoverBg="#A7AAAD" color="white" hoverColor="white" className="custom_transition"
              style={{ cursor: "default", border: "none", fontWeight: "bold" }}>
              중복 확인</Button> : null }

            {is_check_nickname && !nickCk && firstNick ?  <Button
            margin="0px 0px 0px 6px"  width="40%"  height="auto"  padding="17px 0"  fontSize="13px"  bg="#16C59B"  hoverBg="white"  color="white"  hoverColor="#16C59B"  className="custom_transition"
            style={{ cursor: "pointer", border: "none", fontWeight: "bold" }}  clickEvent={nicknamedup}>
            중복 확인</Button> : null }
            
            {!is_check_nickname && !nickCk && !firstNick ?  <Button
              margin="0px 0px 0px 6px"  width="40%"  height="auto"  padding="17px 0"  fontSize="13px"  bg="#16C59B"  hoverBg="white"  color="white"  hoverColor="#16C59B"  className="custom_transition"
              style={{ cursor: "pointer", border: "none", fontWeight: "bold" }}  clickEvent={nicknamedup}>
              중복 확인</Button> : null }

          </Grid>
          <Grid padding="5px 0px 8px">
            <InputBox
              placeholder="상태메세지를 입력하세요"
              value={statusMessage}
              onChange={(event) => {
                setStatusMessage(event.target.value);
              }}
              // onKeyUp={(event) => {
              //   if(event.target.value!=""){setCheckNick(nickCk);}
              // }}
            />
          </Grid>
          <Grid padding="5px 0px 8px"
                margin="0px 0px 20px 0px">
            <InputBox
              placeholder="관심사를 입력하세요(예시: 런닝, 산책)"
              margin="0px 0px 30px 0px"
              onChange={(e) => {
                setLikeItem(e.target.value.split(","));
              }}
            />
          </Grid>
          <Grid padding="5px 0px" margin="0px 0px 50px 0px">
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
              style={{ fontWeight: "bold", border: "none" }}
              hoverColor={buttonColor.hoverColor}
              clickEvent={signup}
              disabled={!complite}
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

const PosAbs = () => {
  return css`
    position: absolute;
    top: 0;
    left: 0;
  `;
};

const LabelStyle = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  font-size: 20px;
  box-sizing: border-box;
  ${PosAbs()};
  z-index: 3;
`;

const InputFile = styled.input`
  width: 1px;
  height: 1px;
  overflow: hidden;
  ${PosAbs()};
`;

SignupInfo.defaultProps = {};

export default SignupInfo;
