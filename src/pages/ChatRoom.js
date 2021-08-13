import React, { useEffect, useState, useRef, Fragment } from "react";
import socket from "socket.io-client";
import Chat, { Bubble, useMessages } from "@chatui/core";
// eslint-disable-next-line import/no-webpack-loader-syntax
import ChatUICSS from "!!raw-loader!@chatui/core/dist/index.css";

import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../redux/modules/chat";

import Logger from "../utils/Logger";

// const initSocketEvents = (socket) => {
//   socket.on()
// }

const ChatRoom = (props) => {
  const dispatch = useDispatch();
  const myUserId = useSelector((state) => state.user.userId);
  const getChatDatas = useSelector((state) => state.chat.chatList.reverse());
  const [init, setInit] = useState(false);
  const { messages, appendMsg } = useMessages([]);

  const socketClientEvents = (socket) => {
    socket
      .on("connect", (data) => {
        Logger.info(`[Socket.io:Connect] Connected to Socket.io server!`);
      })
      .on("join", (data) =>
        appendMsg({ type: "system", content: { text: data.chat } })
      )
      .on("exit", (data) =>
        appendMsg({ type: "system", content: { text: data.chat } })
      )
      .on("chat", (data) => {
        if (myUserId !== data.userId)
          appendMsg({
            type: "text",
            content: { text: `${data.nickname}: ${data.message}` },
            position: "left",
            user: { avatar: "https://cdn.discordapp.com/attachments/869177664479567903/871045228159705088/profileBlank.png" },
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

  if (!init && myUserId && getChatDatas) {
    if (getChatDatas?.length >= 1) {
      Logger.debug(`[GetChatDatas] Get ChatDatas: ${getChatDatas.length}`)  
      getChatDatas.map((el) => {
        console.log(el)
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
        if (!!el.userId) appendMsg(data);
        return data;
      });
    }
    appendMsg({
      type: "system",
      content: { text: "채팅방에 입장하셨습니다." },
    });
    setInit(true);
  }

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
      dispatch(chatActions.sendChatDB(props.match.params.id, val));
    }
  };

  return (
    <Fragment>
      <div id="message-table" className="container mx-auto h-full w-full">
        <Chat
          locale="en-US"
          messages={messages}
          renderMessageContent={handleMessageContent}
          onSend={handleSendMessage}
          placeholder="메세지를 입력해주세요."
        />
        <style>{ChatUICSS}</style>
      </div>
    </Fragment>
  );
};

export default ChatRoom;
