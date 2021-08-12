import React, { useEffect, useState, useRef, Fragment } from "react";
import { Transition } from "@headlessui/react";
import socket from "socket.io-client";

import useOutsideClick from "../hooks/useOutsideClick";

import { useSelector, useDispatch } from "react-redux";
import { postActions } from "../redux/modules/post";

import { Grid } from "../elements/index";
import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  People as PeopleIcon,
  Place as PlaceIcon,
  Event as EventIcon,
} from "@material-ui/icons";

const ChatList = () => {
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState([]);
  const posts = useSelector((state) => state.post.list);
  useEffect(() => setRooms(posts), [posts]);
  useEffect(() => {
    dispatch(postActions.getMyPostsDB());
    const io = socket.connect("astraios.shop:4001/room", {
      path: "/socket.io",
    });
    io.on("connect", () => console.log("Connected Socket.io server!"));
    io.on("newRoom", (data) => rooms.push(data));
    io.on("removeRoom", (data) => {
      const result = rooms.filter((el) => el.postId !== data.postId);
      setRooms(result);
    });
    io.on("disconnect", (socket) =>
      console.log(`Disconnected to Socket.io Server (Reason: ${socket})`)
    );
    return () => {
      console.log("Disconnecting to Socket.io server...");
      io.removeAllListeners();
      io.disconnect();
    };
  }, []);

  return (
    <Fragment>
      {/* <Grid className='block'>
        <Header />
      </Grid> */}
      <div className="container lg:mx-auto mx-4">
        {rooms?.length >= 1 ? (
          rooms?.map(ChatListCardComponent)
        ) : (
          <div className="text-center font-bold text-lg">
            참여 중인 대화방이 존재하지 않아요!
          </div>
        )}
      </div>
      <Grid className="block">
        <Footer>chat</Footer>
      </Grid>
    </Fragment>
  );
};

function ChatListCardComponent(props) {
  const formattedDate = (date) => {
    const dateNow = new Date(date)
    const year = dateNow.getFullYear()
    const month = String(dateNow.getMonth() + 1).length === 1 ? `0${dateNow.getMonth() + 1}` : dateNow.getMonth() + 1
    const day = String(dateNow.getDay()).length === 1 ? `0${dateNow.getDay()}` : dateNow.getDay()
    return `${year}. ${month}. ${day}`
  };

  return (
    <div
      key={props.postId}
      className="rounded-lg px-5 py-4 my-4 mx-4 border border-gray-500 border-opacity-20 chatBoxShadow bg-gray-100 hover:bg-white transition cursor-pointer"
      onClick={() => (window.location.href = `/chat/${props.postId}`)}
    >
      <div key={props.postId} className="inline-flex items-center">
        <div
          className="block rounded-md w-24 h-24"
          style={{
            textAlign: "center",
            backgroundImage: `url('${
              !props?.postImg || String(props.postImg).length === 0
                ? "/assets/unknownChatRoomImg.gif"
                : props.postImg
            }')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            float: "center",
          }}
        >
          <span className="sr-only">X</span>
        </div>
        <div className="block ml-4">
          <div className="text-black font-semibold">{props.title}</div>
          <div className="font-normal text-sm text-gray-500">
            <div className="inline-flex">
              <PeopleIcon fontSize="small" />
              <p className="ml-1">
                {props.currentMember}/{props.maxMember}
              </p>
            </div>
          </div>
          <div className="font-normal text-sm text-gray-500">
            <div className="inline-flex">
              <PlaceIcon fontSize="small" />
              <p className="ml-1">{props.place}</p>
            </div>
          </div>
          <div className="font-normal text-sm text-gray-500">
            <div className="inline-flex">
              <EventIcon fontSize="small" />
              <p className="ml-1">{formattedDate(props.startDate)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatList;
