// LIBRARY
import React from "react";
import _ from "lodash";
import { css } from "styled-components";

//Elements
import { Text, Title, Input, Grid, Button, Image } from "../elements";

//HISTORY
import { history } from "../redux/configStore";

//REDUX-ACTION & REACT-HOOK
import { userActions } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";

//VALIDATION
import { nickVal } from "../common/validation";

const SignupInfo = (props) => {
  const dispatch = useDispatch();

  const dupState = useSelector((state) => state.user.is_check);

  const debounce = _.debounce((value, setValue) => setValue(value), 300);

  const [nickname, setNickname] = React.useState("");
  const [statusMessage, setStatusMessage] = React.useState("");
  const [nicknameConfirm, setNicknameConfirm] = React.useState("");
  const [nicknameWarning, setNicknameWarColor] = React.useState("red");
  console.log(nickname);
  console.log(statusMessage);
  const tempInfo = useSelector((state) => state.user.tempInfo);
  // const {id, pwd, name} = tempInfo;
  const id = tempInfo?.id;
  const pwd = tempInfo?.pwd;
  const name = tempInfo?.name;
  const profileImg = "";
  const likeItem = ["",""];

  console.log(tempInfo);

  console.log(id, pwd, name);
  React.useEffect(() => {
    if (!tempInfo){
      history.push("/signup");
    }
  }, [])
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
    // if (
    //   !(
    //     dupState &&
    //     nicknameWarning === "green" 
    //   )
    // )
    //   return window.alert(
    //     "입력되지 않은 항목이 있습니다. 다시 확인하여 주세요."
    //   );

  userActions.signupDB(id, name, nickname, pwd, pwd, profileImg, statusMessage, likeItem); 

    window.alert("회원가입이 완료되었습니다. 다시 로그인해 주세요.");
    history.push("/login");
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
      <div style={{ paddingTop: "110px" }} />
      <Grid
        width="360px"
        margin="50px auto"
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
        <Title fontSize="35px" textAlign="center" margin="30px 0px 15px 0px">
        <span style={{ cursor: "pointer" }}>LOGO</span>
        </Title>
        <Grid padding="16px" bg="#EFEFEF">
          <Title 
                fontSize="18px" 
                margin="5px"
                textAlign="center">
                회원정보 입력</Title>
          <Grid padding="5px 0px 8px"
                width="10vw"
                margin="auto">
          <Image src="https://i.imgur.com/ViFAD8Z.png"/>
          </Grid>
          <Grid padding="16px 0px 0px">
            <Text
              fontSize="12px"
              margin="0px"
              color={nicknameWarning}
              lineHeight="2"
              textIndent="15px"
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
              padding="14px 17px"
            />
            <Button
              margin="0px 0px 0px 6px"
              width="30%"
              height="auto"
              padding="16px 0"
              fontSize="13px"
              bg="#A7AAAD"
              clickEvent={nicknamedup}
            >
              중복 확인
            </Button>
          </Grid>
          <Grid padding="5px 0px 8px">
            <Input
              placeholder="상태메세지를 입력해주세요."
              padding="14px 17px"
              changeEvent={(event) => {
                setStatusMessage(event.target.value);
              }}
            />
          </Grid>
          <Grid padding="5px 0px 8px">
            <Input
              placeholder="#관심사1 #관심사2 ..."
              padding="14px 17px"
              margin="0px 0px 30px 0px"
            />
          </Grid>
          <Grid padding="5px 0px">
            <Button
              width="100%"
              height="auto"
              padding="12px 0"
              bg="#A7AAAD"
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

SignupInfo.defaultProps = {};

export default SignupInfo;
