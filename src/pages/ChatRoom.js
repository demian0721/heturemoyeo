import React, { useEffect, useState, useRef, Fragment } from "react";
import socket from "socket.io-client";
import Chat, { Bubble, useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";

import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../redux/modules/chat";

const ChatRoom = (props) => {
  const dispatch = useDispatch();
  const myUserId = useSelector((state) => state.user.userId);
  const getChatDatas = useSelector((state) => state.chat.chatList);
  const [init, setInit] = useState(false);
  const { messages, appendMsg } = useMessages([]);
  if (getChatDatas?.length >= 1 && !init) {
    getChatDatas.map((el) => messages.push({ type: "text", content: { text: el.message, }, position: el.userId === myUserId ? 'right' : 'left'}));
    setInit(true);
  }
  useEffect(() => {
    const io = socket.connect(
      `astraios.shop:4001/chat?postId=${props.match.params.id}`,
      { path: "/socket.io" }
    );
    dispatch(chatActions.getChatDB(props.match.params.id, 1000));
    io.on("connect", () => console.log("Connected Socket.io server!"));
    io.on("join", (data) => {
      Object.assign(data, { isSystem: true });
    });
    io.on("exit", (data) => {
      Object.assign(data, { isSystem: true });
    });
    io.on("chat", (data) => {
      Object.assign(data, { isSystem: false });
    });
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
  const createMessageCard = (data) => {
    return (
      <div
        key={data.messageId}
        className={`rounded-md chatBoxShadow px-2 py-2 lg:mx-48 mx-4 my-4 ${
          data.isSystem
            ? "bg-gray-500 bg-opacity-25 text-gray-900"
            : myUserId === data.userId
            ? "bg-yellow-300 bg-opacity-25 text-yellow-900"
            : "bg-blue-300 bg-opacity-25 text-blue-900"
        }`}
      >
        {data.isSystem
          ? `System - ${data.chat}`
          : `${data.nickname} - ${data.message}`}
      </div>
    );
  };

  return (
    <Fragment>
      <div id="message-table" className="container mx-auto">
        <Chat />
      </div>
      <div className="container mx-auto mb-4">
        <div className="flex items-center justify-center">
          <div className="inline-flex">
            <input
              id="messageInput"
              type="text"
              name="messageInput"
              required
              placeholder="메세지를 입력해주세요."
              className="rounded-md px-4 py-2 chatBoxShadow border border-gray-300 placeholder-gray-500 w-56"
            />
            <div
              onClick={() => {
                sendMessage();
              }}
              className="ml-2 bg-blue-300 text-blue-900 font-semibold hover:text-white hover:bg-blue-900 rounded-md text-white px-2 py-2 transition chatBoxShadow border border-gray-300 cursor-pointer"
            >
              <p>전송</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ChatRoom;
