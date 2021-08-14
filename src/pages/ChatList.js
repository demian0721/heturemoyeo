import React, { useEffect, useState, Fragment } from "react";
import socket from "socket.io-client";

import { useSelector, useDispatch } from "react-redux";
import { postActions } from "../redux/modules/post";

import { Grid } from "../elements/index";
import Header from "../components/Header";
import Footer from "../components/Footer";

import Logger from "../utils/Logger";
import { formattedDate } from "../utils";

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
    io.on("connect", () =>
      Logger.info(`[Socket.io:Connect] Connected to Socket.io server!`)
    );
    io.on("newRoom", (data) => rooms.push(data));
    io.on("removeRoom", (data) => {
      const result = rooms.filter((el) => el.postId !== data.postId);
      setRooms(result);
    });
    io.on("disconnect", (socket) =>
      Logger.error(`[Socket.io:Disconnect] Disconnected to Socket.io Server (Reason: ${socket})`)
    );
    return () => {
      Logger.warn("[Socket.io:Disconnect] Disconnecting to Socket.io server...");
      io.removeAllListeners();
      io.disconnect();
    };
  }, []);

  return (
    <Fragment>
      <Grid className='block'>
        <Header />
      </Grid>
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
