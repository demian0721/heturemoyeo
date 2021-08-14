import React, { useEffect, useState, useRef, Fragment } from "react";
import socket from "socket.io-client";
import Chat, { Bubble, useMessages } from "@chatui/core";
// eslint-disable-next-line import/no-webpack-loader-syntax
import ChatUICSS from "!!raw-loader!@chatui/core/dist/index.css";

import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../redux/modules/chat";

import Header from "../components/Header";
import Footer from "../components/Footer";

import Logger from "../utils/Logger";

/**
 * ChatRoom:
 * 채팅 UI 모듈을 사용하여, 제작하였습니다. "@chatui/core"
 * css를 import 하기 위해서 raw-loader를 사용하여 해당 페이지에만 import 할 수 있도록 하였습니다.
 */
const ChatRoom = (props) => {
  const dispatch = useDispatch();
  const myUserId = useSelector((state) => state.user.userId);
  const getChatDatas = useSelector((state) => state.chat.chatList);
  const [init, setInit] = useState(false);
  const { messages, appendMsg } = useMessages([]); // @chatui/core 에 있는 훅을 사용하였씁니다.

  /**
   * SocketClientEvents:
   * Socket.io 에 연결한 후, 이벤트를 선언하는 함수입니다.
   */
  const socketClientEvents = (socket) => {
    socket
      .on("connect", (data) => {
        Logger.info(`[Socket.io:Connect] Connected to Socket.io server!`);
      })
      /**
       * Socket.io Event: Join
       * 해당 이벤트는 유저가 채팅방에 들어왔을때 실행하는 이벤트입니다.
       */
      .on("join", (data) =>
        appendMsg({ type: "system", content: { text: data.chat } })
      )
      /**
       * Socket.io Event: exit
       * 해당 이벤트는 유저가 채팅방에 퇴장했을때 실행하는 이벤트입니다.
       */
      .on("exit", (data) =>
        appendMsg({ type: "system", content: { text: data.chat } })
      )
      /**
       * Socket.io Event: Chat
       * 해당 이벤트는 채팅이 생성될때 실행하는 이벤트입니다.
       * 하지만 내가 보낸 메세지는 핸들링하지 않습니다.
       */
      .on("chat", (data) => {
        if (myUserId !== data.userId)
          appendMsg({
            type: "text",
            content: { text: `${data.nickname}: ${data.message}` },
            position: "left",
            user: {
              avatar:
                "https://cdn.discordapp.com/attachments/869177664479567903/871045228159705088/profileBlank.png",
            },
          });
      })
      .on("disconnect", (socket) =>
        Logger.error(
          `[Socket.io:Disconnect] Disconnected to Socket.io Server (Reason: ${socket})`
        )
      );

    socket.on("error", (error) =>
      Logger.error(`[Socket.io:Error] Socket.io error occurred!\n${error}`)
    );
  };

  //getChatDatas의 데이터가 없는데 userId가 먼저 받아왔을 때
  //userId가 있는데 getChatDatas의 배열은 무조건 True로 반환하기 때문에 발생
  /**
   * 채팅 데이터를 불러오기 위한 변수입니다.
   * 돔이 로드 되고 실행되기 때문에, 조건을 걸어, 실행할 수 있도록 하였습니다.
   * 이것은 useEffect로 옮길 예정입니다.
   * InfiniteScroll을 구현하기 위해, 배열을 reverse 하여 처리합니다.
   */
  if (!init && myUserId && getChatDatas.length) {
    if (getChatDatas?.length >= 1) {
      getChatDatas.reverse();
      Logger.debug(`[GetChatDatas] Get ChatDatas: ${getChatDatas.length}`);
      getChatDatas.map((el) => {
        const data = {
          type: "text",
          content: {
            text:
              el.userId !== myUserId
                ? `${el.nickname}: ${el.message}`
                : el.message,
          },
          position: el.userId === myUserId ? "right" : "left",
        };
        if (el.userId !== myUserId)
          Object.assign(data, {
            user: {
              avatar:
                "https://cdn.discordapp.com/attachments/869177664479567903/871045228159705088/profileBlank.png",
            },
          });
        if (el.userId) appendMsg(data);
        return data;
      });
    }
    appendMsg({
      type: "system",
      content: { text: "채팅방에 입장하셨습니다." },
    });
    setInit(true);
  }

  /**
   * 페이지가 로드됐을때 사용하는 useEffect 입니다.
   * 소켓을 연결하고, 소켓 이벤트를 설정하고 기본적인 준비를 하는 곳입니다.
   */
  useEffect(() => {
    const io = socket("astraios.shop:4001/chat", {
      path: "/socket.io",
      query: {
        postId: props.match.params.id,
      },
    });
    socketClientEvents(io);
    dispatch(chatActions.getChatDB(props.match.params.id, 1000));
    return () => {
      Logger.warn(
        "[Socket.io:Disconnect] Disconnecting to Socket.io server..."
      );
      io.removeAllListeners();
      io.disconnect();
    };
  }, [myUserId]);

  const sendMessage = () => {
    const result = document.getElementById("messageInput").value;
    if (!result || result.lenght === 0) return alert("메세지를 입력해주세요!");
    dispatch(chatActions.sendChatDB(props.match.params.id, result));
    document.getElementById("messageInput").value = "";
  };

  const handleMessageContent = (data) => {
    return (
      <>
        <Bubble type="text">{data.content.text}</Bubble>
      </>
    );
  };

  const handleSendMessage = (type, val) => {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
      });
      dispatch(chatActions.sendChatDB(props.match.params.id, val)); // 채팅 메세지를 api에게 post 해줍니다.
    }
  };

  return (
    <Fragment>
      <div id="message-table" className="container mx-auto h-full w-full">
        <Header />
        {/* ChatUI, 채팅 UI를 생성해줍니다. */}
        <div id="message_chat-ui" style={{ height: '91vh' }}>
          <Chat
            locale="en-US"
            messages={messages}
            renderMessageContent={handleMessageContent}
            onSend={handleSendMessage}
            placeholder="메세지를 입력해주세요."
          />
          <style>{ChatUICSS}</style>
        </div>
      </div>
    </Fragment>
  );
};

export default ChatRoom;
