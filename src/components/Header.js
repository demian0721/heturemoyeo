//Library
import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

//Elements
import { Grid, Text, Image } from "../elements/index";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import { postActions } from "../redux/modules/post";
import { chatActions } from "../redux/modules/chat";
import { userActions } from "../redux/modules/user";

//History
import { history } from "../redux/configStore";

//Image
// import logo_header from '../../public/assets/logo_header';

//임포트 사용 항목 외 삭제요망

const Header = (props) => {
  const dispatch = useDispatch();

  const title = props.children;
  const id = props.id;
  const width = props.width;
  const postId = parseInt(props.postId);
  const chatId = parseInt(props.chatId);
  const writer = props.writer;

  useEffect(() => {
    dispatch(userActions.myInfoDB());
  }, []);
  const owner = useSelector((state) => state.user.nickname);

  const deletepost = () => {
    dispatch(postActions.deleteAPost(postId));
  };

  const exitchat = () => {
    dispatch(chatActions.exitAChat({ postId: chatId }));
  };

  const confirmchat = () => {
    dispatch(chatActions.confirmAChat({ postId: chatId }));
  };

  return (
    <React.Fragment>
      <Grid
        is_flex="center"
        minWidth="280px"
        height="75px"
        bg="#16C59B"
        padding="20px"
        width={width}
        style={
          id === "chatroom"
            ? { position: "flex", zIndex: 4, justifyContent: "space-between" }
            : {
                position: "fixed",
                top: 0,
                zIndex: 4,
                justifyContent: "space-between",
              }
        }
        // style={{ position: "flex", zIndex: 4, justifyContent: "space-between" }}
      >
        {(id == "chatroom"||id == "detail") ? (
          <ArrowBackOutlinedIcon
            style={{ color: "white" ,cursor:"Pointer"}}
            onClick={() => {
              history.goBack();
            }}
          />
        ) : (
          <div></div>
        )}
        
        {title == "" ? (
          <Grid height="" width=""
            id="header"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <Image src="/assets/logo_header.png" />
          </Grid>
        ) : (
          <TitleBox style={{ cursor: "default" }}>{title}</TitleBox>
        )}

        <Grid width="">
          {id == "chatroom" ? (
            <Grid is_flex>
              <Text
                color="white"
                clickEvent={confirmchat}
                style={{ marginRight: "5px",cursor:"Pointer" }}
              >
                확정
              </Text>
              <Text color="white" clickEvent={exitchat} style={{cursor:"Pointer"}}>
                탈퇴
              </Text>
            </Grid>
          ) : null}
          {/* {id == "chatroom" ? <MoreHorizIcon style={{color:"white"}}/> : null } */}
          {id == "detail" && owner == writer ? (
            <Grid is_flex>
              <Text color="white" clickEvent={() => {
              window.location.href = `/postdetail/edit/${postId}`;
            }} style={{cursor:"Pointer"}}>수정</Text>
            <Text color="white" clickEvent={deletepost} margin="0px 0px 0px 5px" style={{cursor:"Pointer"}}>
              삭제
            </Text>
            </Grid>
          ) : null}
          {id == "write" ? <Text color="white" style={{cursor:"Pointer"}}>게시</Text> : null}
          {id == "" ? <div></div> : null}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const TitleBox = styled.text`
  font-weight: bold;
  color: white;
  /* cursor: pointer; */
  font-size: 16px;
  &:hover {
    font-weight: bolder;
  }
`;

Header.defaultProps = {
  children: "",
  id: "",
  width: "100%",
  postId: "",
  chatId: "",
  writer: "",
  // clickEvent: () => {history.push('/');},
};

export default Header;
