import React, { useEffect, useState, useRef } from "react";
import { Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import useOutsideClick from "../hooks/useOutsideClick";

import socket from "socket.io-client";

const ChatList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const io = socket.connect("astraios.shop:4001/room", {
      path: "/socket.io",
    });
    io.on("connect", () => console.log("Connected Socket.io server!"));
    io.on("newRoom", (data) => rooms.push(data));
    io.on("removeRoom", (data) => {
      const result = rooms.filter(el => el.postId !== data.postId)
      setRooms(result)
    });
    return () => {
      io.close()
    }
  }, []);

  return (
    <>
      <div className="container mx-auto">{}</div>
    </>
  );
};

export default ChatList;
