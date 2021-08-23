//Library
import React, { useRef, useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//Elements
import { Grid, Text, Image } from "../elements/index";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { Transition } from "@headlessui/react";
import useOutsideClick from "../hooks/useOutsideClick";

import { postActions } from "../redux/modules/post";
import { chatActions } from "../redux/modules/chat";
import { userActions } from "../redux/modules/user";

import axios from "../common/axios";

//History
import { history } from "../redux/configStore";

//Image
// import logo_header from '../../public/assets/logo_header';

//임포트 사용 항목 외 삭제요망

// 목록 UI 내 유저프로필 객체
const UserProfileComponent = ({ key, myData, ...props }) => {
  return (
    <div
      key={key}
      className="flex rounded-md self-center p-2 listBtn transition duration-300 ease-in-out"
    >
      {props?.confirm && (
        <>
          <div className="absolute p-1 rounded-full bg-main z-10 animate-ping">
            <span className="sr-only">ping</span>
          </div>
          <div className="absolute p-1 rounded-full bg-main z-10">
            <span className="sr-only">ping</span>
          </div>
        </>
      )}
      <div
        className="flex rounded-full w-10 h-10"
        style={{
          zIndex: 1,
          textAlign: "center",
          backgroundImage: `url('${
            !props?.profileImg ?? String(props?.profileImg).length === 0
              ? "https://cdn.discordapp.com/attachments/869177664479567903/871045228159705088/profileBlank.png"
              : props?.profileImg
          }')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          float: "center",
        }}
      >
        <span className="sr-only">profile image</span>
      </div>
      <div className="flex ml-2 self-center font-medium text-base">
        {props?.nickname}
      </div>
    </div>
  );
};

const Header = (props) => {
  const dispatch = useDispatch();

  const title = props.title ?? props.children;
  const id = props.id;
  const width = props.width;
  const postId = parseInt(props.postId);
  const chatId = parseInt(props.chatId);
  const writer = props.writer;

  useEffect(() => dispatch(userActions.myInfoDB()), []);
  const userData = useSelector((state) => state.user);
  const owner = userData.nickname;
  const deletepost = () => dispatch(postActions.deleteAPost(postId));
  const exitchat = () => dispatch(chatActions.exitAChat({ postId: chatId }));
  const confirmchat = () =>
    dispatch(chatActions.confirmAChat({ postId: chatId }));

  const [show, setShow] = useState(false);
  const [menuIsShow, setMenuIsShow] = useState(false);
  const [myData, setMyData] = useState({});
  const menuRef = useRef();
  useOutsideClick(menuRef, () => {
    setMenuIsShow(false);
  });

  const [memberList, setMemberList] = useState([]);
  // useEffect(() => {
  // }, []);

  const getMemberList = async () => {
    try {
      const result = await axios.get("/api/room/info", {
        params: { postId: chatId },
      });
      const MemberListData = result.data;
      setMyData(
        MemberListData.filter((el) => el.userId === userData.userId).length !==
          0
          ? MemberListData.filter((el) => el.userId === userData.userId)[0]
          : {}
      );
      setMemberList(MemberListData);
      setShow(true);
    } catch (e) {
      console.error(e);
    }
  };

  // const [sideIsShow, setSideIsShow] = useState(false);
  // const sideRef = useRef();
  // useOutsideClick(sideRef, () => setSideIsShow(false));

  return (
    <Fragment>
      <Grid
        is_flex="center"
        minWidth="280px"
        height="75px"
        bg="#16C59B"
        padding="20px"
        width={width}
        style={
          id === "chatroom"
            ? {
                position: "flex",
                zIndex: 4,
                justifyContent: "space-between",
              }
            : {
                position: "fixed",
                top: 0,
                zIndex: 4,
                justifyContent: "space-between",
              }
        }
        // style={{ position: "flex", zIndex: 4, justifyContent: "space-between" }}
      >
        {id === "chatroom" || id === "detail" ? (
          <ArrowBackOutlinedIcon
            style={{ color: "white", cursor: "Pointer" }}
            onClick={() => {
              history.goBack();
            }}
          />
        ) : (
          <div></div>
        )}

        {!title || title.length === 0 ? (
          <Grid
            height=""
            width=""
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
          {id === "chatroom" ? (
            <Grid is_flex>
              {/* <Text
                color="white"
                clickEvent={confirmchat}
                style={{ marginRight: "5px",cursor:"Pointer" }}
              >
                확정
              </Text>
              <Text color="white" clickEvent={exitchat} style={{cursor:"Pointer"}}>
                탈퇴
              </Text> */}
              <div
                className="text-white cursor-pointer"
                onClick={() => {
                  setMenuIsShow(true);
                  getMemberList();
                  // Get chat member list data from api via https://astraios.shop/api/room/info?postId={postId}
                }}
              >
                <MoreHorizIcon className="w-4 h-4" />
              </div>
              <Transition
                show={show && menuIsShow}
                enter="transition ease-out duration-300"
                enterFrom="transform opacity-0 translate-x-full"
                enterTo="transform opacity-100 -translate-x-0"
                leave="transition ease-in duration-300"
                leaveFrom="transform opacity-100 -translate-x-0"
                leaveTo="transform opacity-0 translate-x-full"
                className="absolute top-0 right-0 h-full w-auto transform-gpu"
                style={{ zIndex: 3 }}
              >
                <div
                  ref={menuRef}
                  className="flex flex-col rounded-l-lg bg-white h-full w-64 p-4 sideMenuShadow"
                >
                  <div className="block">
                    <div className="flex font-bold text-lg self-center">
                      <div
                        className="flex self-center cursor-pointer"
                        onClick={() => setMenuIsShow(false)}
                      >
                        <ArrowBackIosIcon className="w-5 h-5" />
                      </div>
                      <span className="flex self-center">참여자 목록</span>
                    </div>
                    <div className="my-2 ml-4">
                      {show &&
                        menuIsShow &&
                        memberList.map((el, index) => (
                          <UserProfileComponent
                            key={index}
                            myData={myData}
                            {...el}
                          />
                        ))}
                    </div>
                    <div className="flex border border-gary-500 rounded-full my-1 w-full">
                      <div className="sr-only">divide</div>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="sr-only">flex grow</div>
                  </div>
                  <div className="flex border border-gary-500 rounded-full my-1 w-full">
                    <div className="sr-only">divide</div>
                  </div>
                  {!myData?.confirm ? (
                    <div className="flex justify-end mx-auto mt-2">
                      <div className="flex justify-between space-x-4">
                        <button
                          onClick={() => {
                            confirmchat();
                            getMemberList();
                          }}
                          className="flex-grow flex-shrink flex-basis-0 px-8 py-2 rounded-md bg-blue-200 text-blue-600 hover:bg-blue-300 hover:text-blue-900 transition duration-300 ease-in-out"
                        >
                          확정
                        </button>
                        <button
                          onClick={() => {
                            exitchat();
                            <Link to="/" />;
                          }}
                          className="flex-grow flex-shrink flex-basis-0 px-8 py-2 rounded-md bg-red-200 text-red-600 hover:bg-red-300 hover:text-red-900 transition duration-300 ease-in-out"
                        >
                          탈퇴
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="tagItem transition duration-300 ease-in-out px-8 py-2 rounded-md mt-2 mx-auto">
                      확정된 모임입니다!
                    </div>
                  )}
                </div>
              </Transition>
            </Grid>
          ) : null}
          {/* {id === "chatroom" ? <MoreHorizIcon style={{color:"white"}}/> : null } */}
          {id === "detail" && owner === writer ? (
            <Grid is_flex>
              <Text
                color="white"
                clickEvent={() => {
                  window.location.href = `/postdetail/edit/${postId}`;
                }}
                style={{ cursor: "Pointer" }}
              >
                수정
              </Text>
              <Text
                color="white"
                clickEvent={deletepost}
                margin="0px 0px 0px 5px"
                style={{ cursor: "Pointer" }}
              >
                삭제
              </Text>
            </Grid>
          ) : null}
          {id === "write" ? (
            <Text color="white" style={{ cursor: "Pointer" }}>
              게시
            </Text>
          ) : null}
          {id === "" ? <div></div> : null}
        </Grid>
      </Grid>
    </Fragment>
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
