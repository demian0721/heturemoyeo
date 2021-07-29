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
import { idVal, pwdVal } from "../common/validation";

const SignupInfo = (props) => {
  const dispatch = useDispatch();

  const dupState = useSelector((state) => state.user.is_check);

  const debounce = _.debounce((value, setValue) => setValue(value), 300);

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwdCheck, setPwdCheck] = React.useState("");
  const [idConfirm, setIdConfirm] = React.useState("");
  const [pwdConfirm, setPwdConfirm] = React.useState("");
  const [pwdCheckConfirm, setPwdCheckConfirm] = React.useState("");
  const [idWarning, setIdWarColor] = React.useState("red");
  const [pwdWarning, setPwdWarColor] = React.useState("red");
  const [pwdCheckWarning, setPwdCheckWarColor] = React.useState("red");
  const [name, setName] = React.useState("");
  const [nameConfirm, setNameConfirm] = React.useState("");
  const [nameWarning, setNameWarColor] = React.useState("red");
  const [address, setAddress] = React.useState("");
  const [addressConfirm, setAddressConfirm] = React.useState("");
  const [addressWarning, setAddressWarColor] = React.useState("red");

  const checkID = (val) => {
    if (val === "") {
      setIdWarColor("red");
      setIdConfirm("아이디가 입력되지 않았습니다.");
      return;
    }
    if (!idVal(val)) {
      setIdWarColor("red");
      setIdConfirm("아이디가 형식에 맞지 않습니다. (영어, 알파벳 4~20자)");
      return;
    }

    setIdWarColor("green");
    setIdConfirm("중복 검사를 해주세요");
  };

  const checkPWD = (val) => {
    if (val === "") {
      setPwdWarColor("red");
      setPwdConfirm("패스워드가 입력되지 않았습니다.");
      return;
    }
    if (!pwdVal(val)) {
      setPwdWarColor("red");
      setPwdConfirm("패스워드가 형식에 맞지 않습니다. (영어, 알파벳 6~30자)");
      return;
    }
    setPwdWarColor("green");
    setPwdConfirm("사용가능한 패스워드 입니다.");
  };

  const checkPWD2nd = (val) => {
    if (val === "") {
      setPwdCheckWarColor("red");
      setPwdCheckConfirm("패스워드 확인란이 입력되지 않았습니다.");
      return;
    }
    if (val.length < 6) {
      setPwdCheckWarColor("red");
      setPwdCheckConfirm("");
      return;
    }
    if (val !== pwd) {
      setPwdCheckWarColor("red");
      setPwdCheckConfirm("입력된 패스워드가 서로 다릅니다.");
      return;
    }
    setPwdCheckWarColor("green");
    setPwdCheckConfirm("패스워드가 올바르게 입력되었습니다.");
  };

  const checkName = (val) => {
    if (val === "") {
      setNameWarColor("red");
      setNameConfirm("성함이 입력되지 않았습니다.");
      return;
    }
    setNameWarColor("green");
    setNameConfirm("해당 성함으로 주문됩니다.");
  };

  const signup = () => {
    if (
      !(
        dupState &&
        idWarning === "green" &&
        pwdWarning === "green" &&
        pwdCheckWarning === "green" &&
        nameWarning === "green" &&
        addressWarning === "green"
      )
    )
      return window.alert(
        "입력되지 않은 항목이 있습니다. 다시 확인하여 주세요."
      );

    dispatch(userActions.signupDB(id, pwd, pwdCheck, name, address));

    window.alert("회원가입이 완료되었습니다. 다시 로그인해 주세요.");
    history.push("/login");
  };

  const nickname = () => {
    dispatch(userActions.nickCheck(id));
    setIdConfirm("");
  };

  return (
    <React.Fragment>
      <div style={{ paddingTop: "110px" }} />
      <Grid
        width="360px"
        // is_flex="space-between"
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
              color={idWarning}
              lineHeight="2"
              textIndent="15px"
            >
              {idConfirm}
            </Text>
          </Grid>
          <Grid is_flex padding="0px 0px 8px">
            <Input
              placeholder="닉네임을 입력해주세요."
              changeEvent={(event) => {
                setId(event.target.value);
              }}
              keyUp={(event) => {
                debounce(event.target.value, checkID);
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
              clickEvent={nickname}
            >
              중복 확인
            </Button>
          </Grid>
          <Grid padding="5px 0px 8px">
            <Input
              placeholder="상태메세지를 입력해주세요."
              padding="14px 17px"
            />
          </Grid>
          <Grid padding="5px 0px 8px">
            <Input
              placeholder="#관심사1 #관심사2 ..."
              padding="14px 17px"
            />
          </Grid>
          <Grid padding="16px 0px">
            <Button
              width="100%"
              height="auto"
              padding="12px 0"
              bg="#A7AAAD"
              clickEvent={signup}
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
