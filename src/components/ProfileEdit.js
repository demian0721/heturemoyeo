//Library
import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from "styled-components";
import _ from "lodash";

//Elements
import { AddButton, Button, Dropdown, Grid, Image, Input, Text, Title } from "../elements/index";

//History
import { history } from "../redux/configStore";
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from '../common/token';

//DB
import { userActions } from '../redux/modules/user';
import { imgActions } from "../redux/modules/image";
import { idVal, pwdVal, nickVal } from "../common/validation"; 

//Components
import Footer from "./Footer";
import { concat } from 'lodash';

import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from "@material-ui/icons/Close";

//임포트 사용 항목 외 삭제요망

const ProfileEdit = (props) => {

  const dispatch = useDispatch();
  const debounce = _.debounce((value, setValue) => setValue(value), 300);
  const fileInput = useRef();
  
  useEffect(() => { if (!getToken()) { history.replace('/login'); } }, []);    

  const [editInfo, setInfos] = useState({
    nickname: props.userinfo.nickname,
    password: "",
    newpassword: "",
    confirm: "",
    profileImg: props.userinfo.profileImg,
    likeItem: props.userinfo.likeItem,
  });
  
  const [show, setShow] = React.useState(false);
  const [nicknameNotice, setNicknameNotice] = React.useState("");
  const [nicknameWarning, setNicknameWarColor] = React.useState("red");

  const [pwdNotice, setPwdNotice] = React.useState("");
  const [pwdWarning, setPwdWarColor] = React.useState("red");

  const [npwd1Notice, setNPwd1Notice] = React.useState("");
  const [npwd1Warning, setNPwd1WarColor] = React.useState("red");

  const [npwd2Notice, setNPwd2Notice] = React.useState("");
  const [npwd2Warning, setNPwd2WarColor] = React.useState("red");
  const [tags, setTags] = useState(props.userinfo.likeItem);

  const changeNickname = (e) => {setInfos({ ...editInfo, nickname: e.target.value}); console.log(e.target.value)}
  const changePassword = (e) => {setInfos({ ...editInfo, password: e.target.value});}
  const changeNewpassword = (e) => {setInfos({ ...editInfo, newpassword: e.target.value});}
  const changeConfirm = (e) => {setInfos({ ...editInfo, confirm: e.target.value});}
  const changeProfileImg = (e) => {setInfos({ ...editInfo, profileImg: e});}
  const changeLikeItem = (e) => {setInfos({ ...editInfo, likeItem: e.target.value.split(',')}); console.log(e.target.value)}

  const image = useSelector((state) => state.image);
  const preview = !image.preview && props ? props.userinfo.profileImg : image.preview;

  if (editInfo.profileImg==preview){
    var img = editInfo.profileImg;
  }else{
    var img = fileInput.current.files[0];
  };

  const [complite,setComplite] = useState(false);

  const [is_check_nickname,setCheckNick] = useState(true);

  const [buttonColor,setButton] = React.useState({
    color: "white",
    bg: "#B9B9B9",
    hoverColor: "white",
    hoverBg: "#B9B9B9",
  });

  const editInfos = () => {
    // setInfos({...editInfo,likeItem:tags});
    // console.log('라이크아이템',editInfo.likeItem);
    // console.log('태그',tags);
    dispatch(userActions.editInfos(img,editInfo));
    setTimeout(() => {
      dispatch(imgActions.setPreview(null));
    }, 3000);
  };

    //닉네임 확인파트
  const checkNickname = (val) => {
    if (val === "") {
      setNicknameWarColor("red");
      setNicknameNotice("닉네임이 입력되지 않았습니다.");
      return;
    }
    if (!nickVal(val)) {
      setNicknameWarColor("red");
      setNicknameNotice("닉네임이 형식에 맞지 않습니다.");
      return;
    }

    setNicknameWarColor("green");
    setNicknameNotice("중복 검사를 해주세요");
    setCheckNick(false);
    //닉네임 확인 후 닉네임 변경시 is_check_nickname이 false가 되게
  };

  const nickname = () => {
    if (editInfo.nickname === "") {
      window.alert("닉네임이 입력되지 않았습니다.");
      return;
    }
    if (editInfo.nickname.length < 3) {
      window.alert("닉네임은 3글자 이상, 최대 20글자까지 작성할 수 있습니다.");
      return;
    }
    if (editInfo.nickname.length > 20) {
      window.alert("닉네임은 3글자 이상, 최대 20글자까지 작성할 수 있습니다.");
      return;
    }
    dispatch(userActions.nickCheck(editInfo.nickname));
    setCheckNick(nickCk);
    setNicknameNotice("");
  };

  const nickCk = useSelector((state) => state.user.is_check_nickname);

  //기존 비밀번호 확인파트 (기존 비밀번호 가져와서 대조해야함)
  const checkPWD = (val) => {
    if (val === "") {
      setPwdWarColor("red");
      setPwdNotice("비밀번호가 입력되지 않았습니다.");
      return;
    }
    if (!pwdVal(val)) {
      setPwdWarColor("red");
      setPwdNotice(
        "비밀번호는 영문과 숫자, 특수문자를 각 1자 이상 포함해주세요.(8~20자)"  //양식 체크임
      );
      return;
    }
    setPwdWarColor("green");
    setPwdNotice(null);
  }

  //새 비밀번호 확인파트
  const checkNPWD1 = (val) => {
    if (val === "") {
      setNPwd1WarColor("red");
      setNPwd1Notice("새 비밀번호가 입력되지 않았습니다.");
      return;
    }
    if (!pwdVal(val)) {
      setNPwd1WarColor("red");
      setNPwd1Notice("비밀번호는 영문과 숫자, 특수문자를 각 1자 이상 포함해주세요.(8~20자) ");
      return;
    }
    setNPwd1WarColor("green");
    setNPwd1Notice("사용가능한 비밀번호 입니다.");
  };

    //새 비밀번호 재확인파트
  const checkNPWD2 = (val) => {
    if (val === "") {
      setNPwd2WarColor("red");
      setNPwd2Notice("새 비밀번호 확인란이 입력되지 않았습니다.");
      return;
    }
    
    // if (val.length < 6) {
    //   setNPwd2WarColor("red");
    //   setNPwd2Notice("비밀번호");
    //   return;
    // }
    if (val !== editInfo.newpassword) {
      setNPwd2WarColor("red");
      setNPwd2Notice("입력된 비밀번호가 서로 다릅니다.");
      return;
    }
    // if (!pwdVal(val)) {
    //   setNPwd2WarColor("red");
    //   setNPwd2Notice("비밀번호는 영문과 숫자, 특수문자를 각 1자 이상 포함해주세요.(8~20자) ");
    //   return;
    // }
    setNPwd2WarColor("green");
    setNPwd2Notice("새 비밀번호가 올바르게 입력되었습니다.");
  };

  const selectFile = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0]

    if (file) {
      reader.readAsDataURL(file);

      reader.onload = () => {
        dispatch(imgActions.setPreview(reader.result));
      };
    }
  };

  if(editInfo.nickname && editInfo.password&&is_check_nickname&&!complite){
    setComplite(true);
    setButton({
    color: "white",
    bg: "#16C59B",
    hoverColor: "#16C59B",
    hoverBg: "white",});
  }

  if((!editInfo.nickname || !editInfo.password || !is_check_nickname ) && complite){
    setComplite(false);
    setButton({
    color: "white",
    bg: "#B9B9B9",
    hoverColor: "white",
    hoverBg: "#B9B9B9",});
  }
    
    return (
        <Style>
          <Grid  width="100vw" height=""  maxWidth="540px" margin="auto" style={{}}>
            <Grid id="profile" bg="white" padding="20px 30px" >
              {/* 높이 고정이라 Ref 안쓰는듯? */}
              <Grid width="15vw" maxWidth="150px" minWidth="100px" height="15vw" maxHeight="150px" minHeight="100px" margin="auto auto 30px" style={{position:"block"}}>
                <Grid id="profileImage" 
                  bg="#EFEFEF"
                  radius="50%"
                  width="15vw" maxWidth="150px" minWidth="100px" height="15vw" maxHeight="150px" minHeight="100px"
                  margin="auto auto 30px" 
                  style={{ position: "block" }}
                >
                  <img src={!preview ? "/assets/profile.png" : preview} style={{position:'absolute',zIndex:2,borderRadius:"50%",width:"15vw", maxWidth:"150px", minWidth:"100px" ,height: "15vw",maxHeight:"150px", minHeight:"100px", margin:"auto"}}/>
                  <LabelStyle htmlFor="input--file">
                    {!preview ? null : null}
                  </LabelStyle>
                  <InputFile
                    type="file"
                    id="input--file"
                    ref={fileInput}
                    accept="image/png, image/jpeg"
                    onChange={selectFile}
                  />
                </Grid>
                <img src="/assets/profile_image_camera_only.png" style={{position:"relative", zIndex:5, top:"75%", left:"75%"}}/>
              </Grid>
              {/* <Text margin="20px 0px 0px 0px" fontSize='small'>비밀번호</Text> */}
              <Grid is_flex style={{justifyContent:"center"}}>
                {/* <Input keyUp={(event) => {debounce(event.target.value, checkNickname);}} changeEvent={changeNickname} placeholder="닉네임 수정" width="fit-content(20em)" padding="0px" style={{display:"block", color:"#767676", fontWeight:"bold", textAlign:"center", border:"0px",outlineStyle:"none",boxShadow:"0px"}} value={editInfo.nickname}/> */}
                {/* <input onKeyUp={(event) => {debounce(event.target.value, checkNickname);}} onChange={changeNickname} placeholder="닉네임 수정" value={editInfo.nickname} style={{ width:"25%" ,display:"block", color:"#767676", fontWeight:"bold", textAlign:"center", borderBottom:"1px solid #767676",outlineStyle:"none", placeholder:{}}} /> */}
                <Nick onKeyUp={(event) => {debounce(event.target.value, checkNickname);}} onChange={changeNickname} placeholder="닉네임 수정" value={editInfo.nickname} style={{ width:"25%" ,display:"block", color:"#767676", fontWeight:"bold", textAlign:"center", borderBottom:"1px solid #767676",outlineStyle:"none"}}/>
                <CreateIcon onClick={nickname} style={{margin:"0px 0px 0px 6px", color:"#767676"}}/>
                {/* <Button margin="0px 0px 0px 6px" width="20%" height="40px" padding="5px 0" fontSize="13px" bg="#A7AAAD" clickEvent={nickname}>중복 확인</Button> */}
              </Grid>
              <Text fontSize="12px" margin="5px 0px" color={nicknameWarning} lineHeight="1" textIndent="0px" style={{textAlign:"center"}}>{nicknameNotice}</Text>
              <Text
                color="#767676"
                fontWeight="bold"
                fontSize="small"
                margin="10px 0px"
              >
                취향 (스페이스바로 나눌 수 있습니다.)
              </Text>
              {tags.length !== 0 && (
                <div className="flex flex-wrap mb-2">
                  {tags
                    .filter((el) => el.length !== 0)
                    .map((el, index) => {
                      return (
                        <div
                          key={index}
                          className="flex justify-start bottom-0 rounded-md bg-main listBtn transition duration-300 ease-in-out px-2 py-1 self-center text-white my-1 mx-1"
                        >
                          <span className="flex">{el.trim()}</span>
                          <div
                            className="flex cursor-pointer"
                            style={{ marginTop: "-0.1rem" }}
                            onClick={() =>
                              setTags((state) => {
                                const result = state.filter((el, idx) => idx !== index)
                                setInfos({ ...editInfo, likeItem: result })
                                return result
                              })
                            }
                          >
                            <CloseIcon />
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
              <div className="flex self-center">
                <Input
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  style={{
                    width: "100%",
                    border: "1.5px solid #white",
                  }}
                  placeholder="태그를 설정하세요"
                  type="text"
                  onChange={(e) => {
                    // e.preventDefault()
                    setInfos({
                      ...editInfo,
                      likeItem: tags,
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode === 32) {
                      if (String(e.target.value).length >= 2)
                        setTags([...tags,e.target.value]);
                      e.target.value = "";
                    }
                  }}
                />
                {tags.length !== 0 && (
                  <div
                    className="px-1 h-full py-2 border-r border-t border-b border-gray-400 mr-1 bg-green-300 cursor-pointer"
                    onClick={() => {
                      setTags([])
                      setInfos({ ...editInfo, likeItem: [] })
                    }}
                  >
                    <CloseIcon />
                  </div>
                )}
              </div>
            </Grid>
            
            <Grid id="emailpass" margin="10px auto" bg="white" padding="20px 30px">
              <Title fontSize="small" style={{color:"#767676"}}>기존 비밀번호</Title>
              <Input type="password" keyUp={(event) => {debounce(event.target.value, checkPWD);}} changeEvent={changePassword} value={editInfo.password} placeholder="기존 비밀번호" width="100%" margin="auto" style={{display:"block"}}></Input>
              <Text fontSize="12px" margin="5px 0px 0px 0px" color={pwdWarning} lineHeight="1" textIndent="0px">{pwdNotice}</Text>

              <Text fontSize="small" color="blue" margin="10px 0px" style={{cursor:"pointer"}} clickEvent={() => { if(show==true){setShow(false);}else{setShow(true); setNPwd2Notice(""); setNPwd1Notice(""); setInfos({...editInfo,newpassword:"", confirm:""}); } }}>(비밀번호 변경)</Text>
              { show ? <Title fontSize="small" style={{color:"#767676"}}>새 비밀번호</Title> : null }
              { show ? <Input margin="0px" keyUp={(event) => {debounce(event.target.value, checkNPWD1);}}  changeEvent={changeNewpassword} value={editInfo.newpassword} placeholder="새 비밀번호" width="100%" style={{display:"block"}}/> : null }
              { show ? <Text fontSize="12px" margin="5px 0px 0px 0px" color={npwd1Warning} lineHeight="1" textIndent="0px">{npwd1Notice}</Text> : null }
              { show ? <Title fontSize="small" style={{color:"#767676"}} margin="10px 0px 0px 0px">새 비밀번호 확인</Title> : null }
              { show ? <Input margin="0px" keyUp={(event) => {debounce(event.target.value, checkNPWD2);}}  changeEvent={changeConfirm} value={editInfo.confirm} placeholder="새 비밀번호 확인" width="100%" style={{display:"block"}}/> : null }
              { show ? <Text fontSize="12px" margin="5px 0px 0px 0px" color={npwd2Warning} lineHeight="1" textIndent="0px">{npwd2Notice}</Text> : null }

              <Button className="custom_transition"
              bg={buttonColor.bg}
              hoverBg={buttonColor.hoverBg}
              width="100%" padding="15px"
              margin="20px auto" display="block"
              color={buttonColor.color} style={{fontWeight:"bold", border: "none"}}
              hoverColor={buttonColor.hoverColor} clickEvent={editInfos}
              disabled={!complite}>수정 완료</Button>
            </Grid>
          </Grid>
        </Style>
        )
};


const Style = styled.div`
    align-items: center;
    width: 100vw;
    margin-top:75px;
    height: calc(100vh - 130px);
    background-color: #EFEFEF;
    //styled component use
`;

const Nick = styled.input`
  ::placeholder {
  font-size: 11px;
}`;

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
  cursor: pointer;
  box-sizing: border-box;
  ${PosAbs()};
  z-index: 3;
  
  /* background-color: skyblue; */
  border-radius:50%;
  width:15vw;
  max-Width:150px;
  min-width:100px;
  height:15vw;
  max-height:150px;
  min-height:100px;
  margin:auto auto 30px;
  left: 50%;
  top:95px;
  transform: translateX(-50%);
`;

const InputFile = styled.input`
  width: 1px;
  height: 1px;
  overflow: hidden;
  ${PosAbs()};
`;

const InputBox = styled.input`
  width: 100%;
  border: solid 1.5px #a7aaad;
  padding: 14px 2px;
  ::placeholder {
    font-size: 16px;
  }
`;
export default ProfileEdit;