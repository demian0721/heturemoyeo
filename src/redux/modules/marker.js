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

// ACTION CREATORS
const targetAll = createAction(TARGET_ALL, (userInfo) => ({ userInfo }));
const targetFriend = createAction(TARGET_FRIEND, (userInfo) => ({ userInfo }));
const targetPost = createAction(TARGET_POST, (userInfo) => ({ userInfo }));

// INITIAL STATE
const initialState = {
  nickname: null,
  profileImg: null,
  statusMessage: null,
  likeTime: [],
  scheduleCout: null,
  scheduleTitle: null,
  isFriend: null,
  type: null,
  exactType: null,
  userId: null,
};

// MIDDLEWARE
const targetAllDB = (userId) => {
  return function (dispatch) {
    instance
      .get(`/api/user/target/all?userId=${userId}`)
      .then((res) => {
        const result = res.data;
        Object.assign(result, {
          type: "user",
          exactType: "anonymous",
          userId,
        });
        dispatch(targetAll(result));
        console.log(`User: Anonymous -> ${userId}`);
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
        const result = res.data;
        Object.assign(result, {
          type: "user",
          exactType: "friend",
          userId,
        });
        console.log(`User: Friend -> ${userId}`);
        dispatch(targetFriend(result));
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
        const result = res.data;
        Object.assign(result, {
          type: "user",
          exactType: "sameSchedule",
          userId,
        });
        console.log(`User: SameSchedule -> ${userId}`);
        dispatch(targetPost(result));
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
        draft.type = action.payload.userInfo.type;
        draft.exactType = action.payload.userInfo.exactType;
        draft.userId = action.payload.userInfo.userId;
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
        draft.type = action.payload.userInfo.type;
        draft.exactType = action.payload.userInfo.exactType;
        draft.userId = action.payload.userInfo.userId;
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
        draft.type = action.payload.userInfo.type;
        draft.exactType = action.payload.userInfo.exactType;
        draft.userId = action.payload.userInfo.userId;
      }),
  },
  initialState
);

const markerActions = {
  targetAll,
  targetFriend,
  targetPost,
  targetAllDB,
  targetFriendDB,
  targetPostDB,
};

export { markerActions };
