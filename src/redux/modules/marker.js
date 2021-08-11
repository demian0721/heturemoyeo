// AXIOS
import instance from "../../common/axios";

// REDUX-ACTIONS & IMMER
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// FUNCTION
import { setToken, removeToken } from "../../common/token";

// ACTION
const TARGET_ALL = "TARGET_ALL";
const TARGET_FRIEND = "TARGET_FRIEND";
const TARGET_POST = "TARGET_POST";
const GET_POST_LOCATION = "GET_POST_LOCATION";

// ACTION CREATORS
const targetAll = createAction(TARGET_ALL, (userInfo) => ({ userInfo }));
const targetFriend = createAction(TARGET_FRIEND, (userInfo) => ({ userInfo }));
const targetPost = createAction(TARGET_POST, (userInfo) => ({ userInfo }));
const getPostLocation = createAction(GET_POST_LOCATION, (userInfo) => ({
  userInfo,
}));

// INITIAL STATE
const initialState = {
  nickname: null,
  profileImg: null,
  statusMessage: null,
  likeTime: [],
  scheduleCout: null,
  scheduleTitle: null,
  isFriend: null,
};

// MIDDLEWARE
const targetAllDB = (userId) => {
  return function (dispatch) {
    instance
      .get(`/api/user/target/all?userId=${userId}`)
      .then((res) => {
        // console.log(res)
        dispatch(targetAll(res.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const targetFriendDB = (userId) => {
  return function (dispatch) {
    instance
      .get(`/api/user/target/friend?userId=${userId}`)
      .then((res) => {
        // console.log(res)
        dispatch(targetFriend(res.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const targetPostDB = (userId) => {
  return function (dispatch) {
    instance
      .get(`/api/user/target/post?userId=${userId}`)
      .then((res) => {
        // console.log(res)
        dispatch(targetPost(res.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const getPostLocationDB = () => {
  return function (dispatch) {
    instance
      .get(`/api/post/posts/location`)
      .then((res) => {
        console.log("Hello Get Post Location DB")
        console.log(res);
        // console.log(res)
        dispatch(getPostLocation(res));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

// REDUCER
export default handleActions(
  {
    [TARGET_ALL]: (state, action) =>
      produce(state, (draft) => {
        draft.nickname = action.payload.userInfo.nickname;
        draft.rating = action.payload.userInfo.rating;
        draft.profileImg = action.payload.userInfo.profileImg;
        draft.statusMessage = action.payload.userInfo.statusMessage;
        draft.likeItem = action.payload.userInfo.likeItem;
        draft.scheduleCount = action.payload.userInfo.scheduleCount;
        draft.scheduleTitle = action.payload.userInfo.scheduleTitle;
        draft.isFriend = action.payload.userInfo.isFriend;
      }),

    [TARGET_FRIEND]: (state, action) =>
      produce(state, (draft) => {
        draft.nickname = action.payload.userInfo.nickname;
        draft.rating = action.payload.userInfo.rating;
        draft.profileImg = action.payload.userInfo.profileImg;
        draft.statusMessage = action.payload.userInfo.statusMessage;
        draft.likeItem = action.payload.userInfo.likeItem;
        draft.scheduleCount = action.payload.userInfo.scheduleCount;
        draft.scheduleTitle = action.payload.userInfo.scheduleTitle;
        draft.isFriend = action.payload.userInfo.isFriend;
      }),

    [TARGET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.nickname = action.payload.userInfo.nickname;
        draft.rating = action.payload.userInfo.rating;
        draft.profileImg = action.payload.userInfo.profileImg;
        draft.statusMessage = action.payload.userInfo.statusMessage;
        draft.likeItem = action.payload.userInfo.likeItem;
        draft.scheduleCount = action.payload.userInfo.scheduleCount;
        draft.scheduleTitle = action.payload.userInfo.scheduleTitle;
        draft.isFriend = action.payload.userInfo.isFriend;
      }),

    [GET_POST_LOCATION]: (state, action) =>
      produce(state, (draft) => {
        draft.nickname = action.payload.userInfo.nickname;
        draft.rating = action.payload.userInfo.rating;
        draft.profileImg = action.payload.userInfo.profileImg;
        draft.statusMessage = action.payload.userInfo.statusMessage;
        draft.likeItem = action.payload.userInfo.likeItem;
        draft.scheduleCount = action.payload.userInfo.scheduleCount;
        draft.scheduleTitle = action.payload.userInfo.scheduleTitle;
        draft.isFriend = action.payload.userInfo.isFriend;
      }),

  },
  initialState
);

const markerActions = {
  targetAll,
  targetFriend,
  targetPost,
  getPostLocation,
  targetAllDB,
  targetFriendDB,
  targetPostDB,
  getPostLocationDB,
};

export { markerActions };
