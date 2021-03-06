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

// HISTORY
import { history } from "../redux/configStore";

const SearchChatListMy = () => {
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState([]);
  const posts = useSelector((state) => state.search.list);
  
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
    const io = socket.connect("https://astraios.shop/room", {
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

  const search = () => {
    if (inputword.current.value === "") {
      window.alert("검색어가 입력되지 않았습니다.");
      return;
    }    
    dispatch(searchActions.searchRoomDB(inputword.current.value));
    history.push(`/chatlist/search/${inputword.current.value}`);
  };
  const onKeyPress = (event) => {
    if (event.key == "Enter") {
      search();
    }
  };

  return (
    <Fragment>
      <Style>
        <Grid>
          <Header>대화방</Header>
        </Grid>
        <Grid width="100%" height="" margin="75px auto 55px auto" maxWidth="540px" bg="white" style={{zIndex:"5"}}>
          <Grid is_flex padding="18px ">
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
                placeholder="제목, 내용, 또는 태그"
                style={{
                  padding: "0px 5px",
                  width: "100%",
                  backgroundColor: "#EFEFEF",
                }}
                ref={inputword}
                onKeyPress={onKeyPress}
              />
            </Grid>
          </Grid>
          <div className="container mx-auto my-4 space-y-3 w-full">
          <SmallTitle>대화방 목록</SmallTitle>       
            {rooms?.length >= 1 ? (
              rooms.map((el) => <ChatListCardComponent {...el} />)
            ) : (
              <div className="text-center font-bold text-lg" style={{ paddingTop:"30px",backgroundColor: "#efefef",height:"calc(100vh - 290px)"}}>
                참여 중인 대화방이 존재하지 않아요!
              </div>
            )}
          </div> 
        </Grid>
          <Grid style={{ zIndex: 10 }}>
            <Footer>chat</Footer>
          </Grid>
      </Style>
      <div style={{position:"fixed",backgroundColor:"#efefef",width:"100vw",height:"100vh", left:"0", zIndex:"1"}}/> 
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
            zIndex:"5",
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

const SmallTitle = styled.div`
  margin: 10px 20px 20px 20px;
  font-weight: bold;
`;

const Style = styled.div`
  align-items: center;
  width: 100vw;
  height: 100%;
  background-color: #efefef;
`;

export default SearchChatListMy;
