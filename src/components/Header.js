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
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CloseIcon from "@material-ui/icons/Close";

import { Transition } from "@headlessui/react";
import useOutsideClick from "../hooks/useOutsideClick";

import { useRecoilState } from "recoil";
import { ChatRoomSideBar } from "../utils/recoil";

import { postActions } from "../redux/modules/post";
import { chatActions } from "../redux/modules/chat";
import { userActions } from "../redux/modules/user";

import axios from "../common/axios";

//History
import { history } from "../redux/configStore";

//Image
// import logo_header from '../../public/assets/logo_header';

// 목록 UI 내 유저프로필 객체
const UserProfileComponent = ({ myData, postData, ...props }) => {
  const UserProfileBtnOrIconComponent = ({ myData, postData, ...props }) => {
    const UserProfileModeratorComponent = () => {
      return (
        <>
          <div className="flex flex-grow">
            <span className="sr-only">MODERATOR_ICON</span>
          </div>
          <div className="flex self-center justify-end flex-shrink flex-basis-0 text-yellow-300">
            <img
              alt="moderator-crown"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Font_Awesome_5_solid_crown.svg/1279px-Font_Awesome_5_solid_crown.svg.png"
              width={25}
              height={30}
              style={{
                WebkitFilter: "opacity(.4) drop-shadow(0 0 0 #ffb300)",
                filter: "opacity(.4) drop-shadow(0 0 0 #ffb300)",
              }}
            />
          </div>
        </>
      );
    };
    const ref = useRef();
    const [kickMember, setKickMember] = useState({});
    const [showConfirm, setShowConfirm] = useState(false);
    const [menuIsShow, setMenuIsShow] = useRecoilState(ChatRoomSideBar);
    useOutsideClick(ref, () => setShowConfirm(false));
    return (
      <>
        {postData?.userId === myData?.userId &&
        postData?.userId !== props?.userId ? (
          <>
            {!postData?.isConfirm && (
              <>
                <div className="flex flex-grow">
                  <span className="sr-only">KICK_BTN</span>
                </div>
                <div
                  onClick={() => {
                    setShowConfirm(true);
                    setKickMember(props);
                  }}
                  className="flex self-center justify-end flex-shrink flex-basis-0 px-2 py-2 rounded-full bg-red-200 text-red-600 hover:bg-red-300 hover:text-red-900 transition duration-300 ease-in-out cursor-pointer"
                >
                  <ExitToAppIcon style={{ fontSize: "15px" }} />
                </div>
              </>
            )}
          </>
        ) : postData?.userId !== myData?.userId &&
          postData?.userId === props?.userId ? (
          <UserProfileModeratorComponent />
        ) : postData?.userId === myData?.userId &&
          postData?.userId === props?.userId ? (
          <UserProfileModeratorComponent />
        ) : (
          ""
        )}
        <Transition
          show={showConfirm}
          enter="transition ease-in-out duration-300"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in-out duration-300"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          className="absolute left-0 right-0 transform-gpu bg-white"
          style={{ zIndex: 3 }}
        >
          <div
            ref={ref}
            className="block rounded-md border border-gray-300 border-opacity-75 px-3 py-2 mx-2 bg-whtie bg-opacity-100 shadow-md"
          >
            <div className="flex font-bold text-base self-center">
              <div
                onClick={() => setShowConfirm(false)}
                className="inline-flex cursor-pointer hoverText transition duration-300 ease-in-out self-center"
              >
                <CloseIcon />
              </div>
              유저 추방 확인
            </div>
            <div className="text-sm">
              해당 유저
              <span className="tagItem px-1 text-xs mx-1 rounded-md inline-flex transition duration-300 ease-in-out self-center">
                ({kickMember?.nickname})
              </span>
              를(을) 대화방에서 내보내시겠습니까?
            </div>
            <div className="flex border border-gary-500 rounded-full my-1 w-full">
              <div className="sr-only">divide</div>
            </div>
            <div className="flex justify-between space-x-4 mt-2 text-sm">
              <button
                onClick={async () => {
                  try {
                    await axios.post("/api/room/kick", {
                      userId: Number(kickMember.userId),
                      postId: Number(postData?.postId),
                    });
                    alert(
                      `유저 ${kickMember.nickname} 을(를) 추방하였어요!`
                    );
                    setShowConfirm(false);
                    setMenuIsShow(false);
                  } catch (e) {
                    console.error(e);
                    alert(
                      `유저 ${kickMember.nickname} 을(를) 추방하는 도중 오류가 발생하였어요!`
                    );
                    setShowConfirm(false);
                    setMenuIsShow(false);
                  }
                }}
                className="flex-grow flex-shrink flex-basis-0 px-4 py-1 rounded-md bg-blue-200 text-blue-600 hover:bg-blue-300 hover:text-blue-900 transition duration-300 ease-in-out"
              >
                추방
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setMenuIsShow(false);
                }}
                className="flex-grow flex-shrink flex-basis-0 px-4 py-1 rounded-md bg-red-200 text-red-600 hover:bg-red-300 hover:text-red-900 transition duration-300 ease-in-out"
              >
                취소
              </button>
            </div>
          </div>
        </Transition>
      </>
    );
  };
  return (
    <div key={props.key} className="flex rounded-md self-center p-2">
      {props?.confirm && (
        <>
          <div
            className="absolute p-1 rounded-full bg-main animate-ping"
            style={{ zIndex: 2 }}
          >
            <span className="sr-only">ping</span>
          </div>
          <div
            className="absolute p-1 rounded-full bg-main"
            style={{ zIndex: 2 }}
          >
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
      <UserProfileBtnOrIconComponent
        myData={myData}
        postData={postData}
        {...props}
      />
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

  useEffect(() => {
    dispatch(userActions.myInfoDB());
    dispatch(postActions.postDetailInfo(chatId));
  }, []);
  const userData = useSelector((state) => state.user);
  const getPostData = useSelector((state) => state.post.postDetail);
  const owner = userData.nickname;

  const useConfirm = (message = null, onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      return;
    }
    if (onCancel && typeof onCancel !== "function") {
      return;
    }
  
    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      } else {
        onCancel();
      }
    };
  
    return confirmAction;
  }; 

  const deleteConfirm = () => {dispatch(postActions.deleteAPost(postId));};
  const cancelConfirm = () => console.log("취소했습니다.")

  const confirmDelete = useConfirm(
    "삭제하시겠습니까?",
    deleteConfirm,
    cancelConfirm
  );

  const exitchat = () => dispatch(chatActions.exitAChat({ postId: chatId }));
  const confirmchat = () =>
    dispatch(chatActions.confirmAChat({ postId: chatId }));

  const [show, setShow] = useState(false);
  const [menuIsShow, setMenuIsShow] = useRecoilState(ChatRoomSideBar);
  const [myData, setMyData] = useState({});
  const menuRef = useRef();
  useOutsideClick(menuRef, () => setMenuIsShow(false));

  const [postData, setPostData] = useState({});
  useEffect(() => setPostData(getPostData), [getPostData]);

  const [memberList, setMemberList] = useState([]);
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
        {id === "chatroom" ? (
          <ArrowBackOutlinedIcon
            style={{ color: "white", cursor: "Pointer" }}
            onClick={() => {
              window.location.href = "/chat";
            }}
          />
        ) : (
          null
        )}

        {id === "detail" ? (
          <ArrowBackOutlinedIcon
            style={{ color: "white", cursor: "Pointer" }}
            onClick={() => {
              history.goBack();
            }}
          />
        ) : (
          null
        )}

        {id != "chatroom" && id != "detail" ? (
          <div></div>
        ):(
          null
        )}

        {!title || title.length === 0 ? (
          <Link to="/">
            <div style={{display:"flex"}}>
              <Image src="/assets/logo_header.png" />
              <img src="/assets/textlogo_white.svg"
                  style={{width:"78.4px", height:"20px", margin: "2px 10px 0px 10px", cursor: "pointer"}} alt="" />
            </div>
          </Link>
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
                            postData={postData}
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
                            setMenuIsShow(false);
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
                      확정한 모임입니다!
                    </div>
                  )}
                </div>
              </Transition>
            </Grid>
          ) : null}
          {/* {id === "chatroom" ? <MoreHorizIcon style={{color:"white"}}/> : null } */}
          {id === "detail" && owner === writer ? (
            <Grid is_flex>
              <Link to={`/postdetail/edit/${postId}`}><Text
                color="white"
                style={{ cursor: "Pointer" }}
              >
                수정
              </Text></Link>
              <Text
                color="white"
                clickEvent={confirmDelete}
                margin="0px 0px 0px 5px"
                style={{ cursor: "Pointer" }}
              >
                삭제
              </Text>
            </Grid>
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
