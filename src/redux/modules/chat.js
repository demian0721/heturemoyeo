// AXIOS
import instance from "../../common/axios";

// REDUX-ACTIONS & IMMER
import { createAction, handleActions } from "redux-actions";

// ACTION
const GET_CHAT = "GET_CHAT";
const GET_MORE_CHAT = "GET_MORE_CHAT";
const SEND_CHAT = "SEND_CHAT";

// ACTION CREATOR
const getChat = (chatList, start) => ({ type: GET_CHAT, chatList, start });
const getMoreChat = (chatList, start) => ({
  type: GET_MORE_CHAT,
  chatList,
  start,
});
const sendChat = (chatList, start) => ({ type: SEND_CHAT, chatList, start });

// INITIAL STATE
const initialState = {
  chatList: [],
  start: 0,
};

// MIDDLEWARE
const getChatDB = (postId, limit = 5) => {
  return function (dispatch) {
    instance
      .get(`/api/room/${postId}?start=0&limit=${limit}`)
      .then((res) => {
        if (res.data.length < limit + 1) {
          dispatch(getChat(res.data, null));
          return;
        }

        if (res.data.length >= limit + 1) res.data.pop();

        dispatch(getChat(res.data, limit));
      })
      .catch((error) => {
        window.alert("잘못된 접근입니다!");
        window.location.href = "/chat";
        console.error(error);
      });
  };
};

const getMoreChatDB = (postId, limit = 5) => {
  return function (dispatch, getState) {
    const start = getState().post.start;

    if (start === null) return;

    instance
      .get(`/api/room/${postId}?start=${start}&limit=${limit + 1}`)
      .then((res) => {
        if (res.data.result.length < limit + 1) {
          return dispatch(getMoreChat(res.data.result, null));
        }

        if (res.data.result.length >= limit + 1) res.data.result.pop();

        dispatch(getMoreChat(res.data.result, start + limit));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const sendChatDB = (postId, message) => {
  return function (dispatch) {
    instance
      .post("/api/room/chat", { postId, message })
      .then((res) => {
        console.log(res);
        dispatch(sendChat(res.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

// REDUCER
function chat(state = initialState, action) {
  switch (action.type) {
    case GET_CHAT:
      return { ...state, chatList: action.chatList, start: action.start };

    case GET_MORE_CHAT:
      return {
        ...state,
        chatList: [...state.chatList, ...action.chatList],
        start: action.start,
      };

    case SEND_CHAT:
      const newChatList = [...state.chatList, action.chatList];
      return { ...state, chatList: newChatList };

    default:
      return state;
  }
}

export default chat;

export const chatActions = {
  getChat,
  getMoreChat,
  sendChat,
  getChatDB,
  getMoreChatDB,
  sendChatDB,
};
