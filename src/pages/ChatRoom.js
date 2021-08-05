import React, { useEffect, useState, useRef, Fragment } from "react";
import socket from "socket.io-client";
import Chat, { Bubble, useMessages } from "@chatui/core";
// eslint-disable-next-line import/no-webpack-loader-syntax
import ChatUICSS from "!!raw-loader!@chatui/core/dist/index.css";

import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../redux/modules/chat";

const ChatRoom = (props) => {
  const dispatch = useDispatch();
  const myUserId = useSelector((state) => state.user.userId);
  const getChatDatas = useSelector((state) => state.chat.chatList);
  const [init, setInit] = useState(false);
  const { messages, appendMsg } = useMessages([]);
  if (getChatDatas?.length >= 1 && myUserId && !init) {
    getChatDatas.map((el) => {
      const data = {
        type: "text",
        content: { text: el.message },
        position: el.userId === myUserId ? "right" : "left",
      };
      if (el.userId !== myUserId)
        Object.assign(data, {
          user: {
            avatar:
              "https://cdn.discordapp.com/attachments/869177664479567903/871045228159705088/profileBlank.png",
          },
        });
      // appendMsg(data);
      return data;
    });
    setInit(true);
  }
  useEffect(() => {
    const io = socket("http://astraios.shop:4001/chat?postId=1");
    io.on("connect", () => console.log("Connected Socket.io server!"))
      .on("join", (data) => {
        appendMsg({
          type: "system",
          content: { text: data.chat },
        });
      })
      .on("exit", (data) => {
        appendMsg({
          type: "system",
          content: { text: data.chat },
        });
      })
      .on("chat", (data) => {
        appendMsg({
          type: "text",
          content: { text: data.message },
          position: "left",
          user: {
            avatar:
              "https://cdn.discordapp.com/attachments/869177664479567903/871045228159705088/profileBlank.png",
          },
        });
      });
    dispatch(chatActions.getChatDB(props.match.params.id, 1000));
    return () => {
      console.log("Disconnecting to Socket.io server...");
      io.close();
    };
  }, []);
  const sendMessage = () => {
    const result = document.getElementById("messageInput").value;
    if (!result || result.lenght === 0) return alert("메세지를 입력해주세요!");
    dispatch(chatActions.sendChatDB(props.match.params.id, result));
    document.getElementById("messageInput").value = "";
  };
  // const createMessageCard = (data) => {
  //   return (
  //     <div
  //       key={data.messageId}
  //       className={`rounded-md chatBoxShadow px-2 py-2 lg:mx-48 mx-4 my-4 ${
  //         data.isSystem
  //           ? "bg-gray-500 bg-opacity-25 text-gray-900"
  //           : myUserId === data.userId
  //           ? "bg-yellow-300 bg-opacity-25 text-yellow-900"
  //           : "bg-blue-300 bg-opacity-25 text-blue-900"
  //       }`}
  //     >
  //       {data.isSystem
  //         ? `System - ${data.chat}`
  //         : `${data.nickname} - ${data.message}`}
  //     </div>
  //   );
  // };

  const handleMessageContent = (data) => {
    return (
      <Bubble
        content={data.content.text}
        style={{
          backgroundColor: data.position === "right" ? "#0084ff" : "#eee",
        }}
      />
    );
  };

  const handleSendMessage = (type, val) => {
    if (type === "text" && val.trim()) {
      dispatch(chatActions.sendChatDB(props.match.params.id, val));
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
      });
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
