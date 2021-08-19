// LIBRARY
import React, { useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import _ from "lodash";

// Elements
import { Text, Title, Input, Grid, Button, Image } from "../elements";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

// HISTORY
import { history } from "../redux/configStore";

// REDUX-ACTION & REACT-HOOK
import { userActions } from "../redux/modules/user";
import { imgActions } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";

// VALIDATION
import { nickVal } from "../common/validation";

const SignupInfo = (props) => {
  const dispatch = useDispatch();
  const debounce = _.debounce((value, setValue) => setValue(value), 300);

  const fileInput = useRef();
  const image = useSelector((state) => state.image);
  const preview = !image.preview ? "/assets/profile_image_avatar_only.png" : image.preview;
  // const [height, setHeight] = useState(preview ? "auto" : "100px");
  // const userlist = useSelector(state => state.user)

  const [nickname, setNickname] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [nicknameConfirm, setNicknameConfirm] = useState("");
  const [nicknameWarning, setNicknameWarColor] = useState("red");

  const [likeItem, setLikeItem] = useState(["", ""]);
  const tempInfo = useSelector((state) => state.user.tempInfo);
  const id = tempInfo?.id;
  const pwd = tempInfo?.pwd;
  const name = tempInfo?.name;
  // const profileImg = userlist.profileImg;

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
    setNicknameConfirm("중복 검사를 해주세요");
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

    window.alert("회원가입이 완료되었습니다. 다시 로그인해 주세요.");
    history.push("/login");
  };

  const selectFile = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    if (file) {
      reader.readAsDataURL(file);

      reader.onload = () => {
        dispatch(imgActions.setPreview(reader.result));
        // setHeight("auto");
      };
    }
  };

  const nicknamedup = () => {
    if (nickname === "") {
      window.alert("닉네임이 입력되지 않았습니다.");
      return;
    }
    dispatch(userActions.nickCheck(nickname));
    setNicknameConfirm("");
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
        <Title fontSize="25px" textAlign="left" margin="50px 0px 30px 10px">
          <span style={{ cursor: "pointer" }}>회원정보 입력</span>
        </Title>
        <Grid>
          <Grid
            padding="5px 0px 8px"
            // width="10vw"
            // margin="auto"
            margin="0px 0px 140px 0px"
          >
            <Grid
              bg="#EFEFEF"
              radius="50%"
              width="15vw"
              maxWidth="150px"
              minWidth="120px"
              height="15vw"
              maxHeight="150px"
              minHeight="120px"
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
                        minWidth: "120px",
                        height: "15vw",
                        maxHeight: "150px",
                        minHeight: "120px",
                        width: "15vw",
                        maxWidth: "150px",
                        display: "block",
                        margin: "auto",
                      }}
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
              // textIndent="3px"
            >
              {nicknameConfirm}
            </Text>
          </Grid>
          <Grid is_flex padding="0px 0px 8px">
            <Input
              placeholder="닉네임을 입력해주세요."
              changeEvent={(event) => {
                setNickname(event.target.value);
              }}
              keyUp={(event) => {
                debounce(event.target.value, checkNickname);
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
              style={{ cursor: "pointer", border: "none", fontWeight: "bold" }}
              clickEvent={nicknamedup}
            >
              중복 확인
            </Button>
          </Grid>
          <Grid padding="5px 0px 8px">
            <Input
              placeholder="상태메세지를 입력해주세요."
              padding="14px 7px"
              changeEvent={(event) => {
                setStatusMessage(event.target.value);
              }}
            />
          </Grid>
          <Grid padding="5px 0px 8px">
            <Input
              placeholder="관심사를 입력해주세요.(예시: 배드민턴)"
              padding="14px 7px"
              margin="0px 0px 30px 0px"
              changeEvent={(e) => {
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
              bg="#16C59B"
              radius="5px"
              color="#FFFFFF"
              className="custom_transition"
              style={{ fontWeight: "bold", border: "none" }}
              hoverColor="#16C59B"
              clickEvent={signup}
              disabled={!nickname || !statusMessage}
            >
              완료
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

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
