// AXIOS
import instance from "../../common/axios";

// REDUX-ACTIONS & IMMER
import { createAction, handleActions } from "redux-actions";

// ACTION
const GET_CHAT = "GET_CHAT";
const GET_MORE_CHAT = "GET_MORE_CHAT";
const SEND_CHAT = "SEND_CHAT";
const EXIT_CHAT = "EXIT_CHAT";
const CONFIRM_CHAT = "CONFIRM_CHAT";

// ACTION CREATOR
const getChat = (chatList, start) => ({ type: GET_CHAT, chatList, start });
const getMoreChat = (chatList, start) => ({
  type: GET_MORE_CHAT,
  chatList,
  start,
});
const sendChat = (chatList, start) => ({ type: SEND_CHAT, chatList, start });
const exitChat = (exitChat) => ({ exitChat });
const confirmChat = (confirmChat) => ({ confirmChat });

// INITIAL STATE
const initialState = {
  chatList: [],
  start: 0,
};

// MIDDLEWARE
const getChatDB = (postId, limit = 1000) => {
  return function (dispatch) {
    instance
      .get(`/api/room/${postId}?start=0&limit=${limit}`)
      .then((res) => {
        console.log(res.data)
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

const getMoreChatDB = (postId, limit = 20) => {
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

const exitAChat = (doc) => {
  return function (dispatch) {
    instance
      .post("/api/room/exit", doc)
      .then((res) => {
        window.location.href = `/chat`;
        window.alert("대화방에서 탈퇴하였습니다.");
      })
      .catch((error) => {
        console.error(error.errorMessage);
      });
  };
};

const confirmAChat = (doc) => {
  return function (dispatch) {
    instance
      .post("/api/room/confirm", doc)
      .then((res) => {
        window.alert("본 일정이 확정되었습니다.");
      })
      .catch((error) => {
        window.alert(error.response.data.errorMessage)
        console.error(error.errorMessage);
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
  exitAChat,
  confirmAChat,
};
