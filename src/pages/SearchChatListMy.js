// LIBRARY
import React, { useRef, useEffect, useState, Fragment } from "react";
import socket from "socket.io-client";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

// REDUX
import { postActions } from "../redux/modules/post";
import { searchActions } from "../redux/modules/search";

// COMPONENTS
import { Grid } from "../elements/index";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ELEMENTS
import Logger from "../utils/Logger";
import { formattedDate } from "../utils";
import {
  People as PeopleIcon,
  Place as PlaceIcon,
  Event as EventIcon,
  Smartphone,
} from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";

// HISTORY
import { history } from "../redux/configStore";

const SearchChatListMy = () => {
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState([]);
  const posts = useSelector((state) => state.post.list);
  /**
   * useEffect 를 이용하여, useState 에 Redux Action dispatch 데이터 저장하기
   */
  useEffect(() => setRooms(posts), [posts]);
  /**
   * 페이지를 처음 로드 했을때, 실행하는 부분입니다.
   */
  useEffect(() => {
    dispatch(postActions.getMyPostsDB()); // Redux Post Action 안에 Reducer 를 이용하여 API 요청을 합니다. 그 다음 데이터를 받아옵니다.
    /**
     * Socket 서버에 연결합니다.
     * 그 후, 이벤트를 선언합니다.
     */
    const io = socket.connect("astraios.shop:4001/room", {
      path: "/socket.io",
    });
    io.on("connect", () =>
      Logger.info(`[Socket.io:Connect] Connected to Socket.io server!`)
    );
    io.on("newRoom", (data) => rooms.push(data));
    io.on("removeRoom", (data) => {
      /**
       * 현재 state 안에 있는 postData 중에서 postId 와 socket.io 에서 data로 받아오는 postData의 postId 와 같지 않은 data만 빼와서 state 에 설정합니다.
       * 왜냐하면, removeRoom 이라는 이벤트이기 때문에 state 안에서의 해당 postData가 없어져야, 페이지에서도 안 보이기 때문입니다.ㅈ
       */
      const result = rooms.filter((el) => el.postId !== data.postId);
      setRooms(result);
    });
    io.on("disconnect", (socket) =>
      Logger.error(
        `[Socket.io:Disconnect] Disconnected to Socket.io Server (Reason: ${socket})`
      )
    );
    return () => {
      Logger.warn(
        "[Socket.io:Disconnect] Disconnecting to Socket.io server..."
      );
      io.removeAllListeners();
      io.disconnect();
    };
  }, []);

  const inputword = useRef();
  // const searchDate = null;

  // useEffect(() => {
  //   dispatch(searchActions.searchRoomDB(keyword));

  //   return () => {
  //     dispatch(searchActions.getSearchRoom([], 0));
  //   };
  // }, [keyword]);

  const search = () => {
    console.log(inputword.current.value);
    dispatch(searchActions.searchChatDB(inputword.current.value));
    history.push(`/chatlist/search/${inputword.current.value}`);
  };
  const onKeyPress = (event) => {
    if (event.key == "Enter") {
      search();
    }
  };

  return (
    <Fragment>
      <Grid>
      <Header>대화방</Header>
      </Grid>
      <Grid width="100%" height="" margin="75px 0 55px 0">

      <Grid is_flex padding="18px">
            <Grid
              is_flex
              padding="8px 8px"
              height=""
              bg="#EFEFEF"
              style={{ margin: "auto" }}
            >
              <SearchIcon style={{ color: "#7B7B7B" }} />
              <input
                type="text"
                placeholder="제목, 내용, 태그 또는 날짜"
                style={{
                  padding: "0px 5px",
                  width: "100%",
                  backgroundColor: "#EFEFEF",
                }}
                ref={inputword}
                onKeyPress={onKeyPress}
              />
            </Grid>
            <DateRangeOutlinedIcon
              style={{ marginLeft: "5px", color: "#7B7B7B" }}
            />
          </Grid>

      <Grid margin="10px 10px 50px 10px">
      <SmallTitle
        style={{margin: "10px 20px 20px 10px"}}
      >확정된 대화방</SmallTitle>
      <Wrap>
        <Decided/>
        <Decided/>
        <Decided/>
        <Decided/>
        <Decided/>
        <Decided/>
        <Decided/>
        <Decided/>
        <Decided/>
        <Decided/>
        <Decided/>
        <Decided/>
        <Decided/>
        <Decided/>
        <Decided/>
      </Wrap>
      </Grid>          
      <div className="container mx-auto my-4 space-y-4 w-full">
      <SmallTitle>대화방 목록</SmallTitle>       
        {rooms?.length >= 1 ? (
          rooms.map((el) => <ChatListCardComponent {...el} />)
        ) : (
          <div className="text-center font-bold text-lg">
            참여 중인 대화방이 존재하지 않아요!
          </div>
        )}
      </div> 
      </Grid>
      <Grid style={{ zIndex: 10 }}>
      <Footer>chat</Footer>
      </Grid>
    </Fragment>
  );
};

function ChatListCardComponent({ children, ...props }) {
  return (
    <div
      key={props.postId}
      className="rounded-lg px-5 py-4 mx-4 border border-gray-500 border-opacity-20 chatBoxShadow bg-gray-100 hover:bg-white transition cursor-pointer"
      onClick={() => (window.location.href = `/chat/${props.postId}`)}
    >
      <div className="flex items-center self-center">
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

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
`;
const Decided = styled.div`
  background: url("./assets/unknownChatRoomImg.gif");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 5px;
  width: 100px;
  min-width: 100px;
  height: 100px;
  min-height: 100px;
  margin: auto 10px;
  `;
const SmallTitle = styled.div`
  margin: 10px 20px 20px 20px;
  font-weight: bold;
`;

export default SearchChatListMy;
