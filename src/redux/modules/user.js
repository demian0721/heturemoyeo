// AXIOS
import instance from "../../common/axios";

// REDUX-ACTIONS & IMMER
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// FUNCTION
import { setToken, removeToken } from "../../common/token";

// ACTION
const MY_INFO = "MY_INFO";
const RELATION = "RELATION";
const TARGET_ALL = "TARGET_ALL"
const TARGET_FRIEND = "TARGET_FRIEND"
const TARGET_POST = "TARGET_POST"
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const CHECK_DUP_EMAIL = "CHECK_DUP_EMAIL";
const CHECK_DUP_NICKNAME = "CHECK_DUP_NICKNAME";
const TEMP_SAVE = "TEMP_SAVE";
const EDIT_INFO = "EDIT_INFO";
const EDIT_STATUS = "EDIT_STATUS";

// ACTION CREATORS
const myInfo = createAction(MY_INFO, (userInfo) => ({ userInfo }));
const relation = createAction(RELATION, (user) => ({ user }))
const targetAll = createAction(TARGET_ALL, (user) => ({ user }))
const targetFriend = createAction(TARGET_FRIEND, (user) => ({ user }))
const targetPost = createAction(TARGET_POST, (user) => ({ user }))
const logIn = createAction(LOG_IN, (token) => ({ token }));
const logOut = createAction(LOG_OUT);
const checkDupEmail = createAction(CHECK_DUP_EMAIL, (is_check_email) => ({ is_check_email }));
const checkDupNick = createAction(CHECK_DUP_NICKNAME, (is_check_nickname) => ({ is_check_nickname }));
const tempSave = createAction(TEMP_SAVE, (tempInfo) => ({ tempInfo }));
const editInfo = createAction(EDIT_INFO, (editInfo) => ({ editInfo }));
const editStatus = createAction(EDIT_STATUS, (editStatus) => ({ editStatus }));

// INITIAL STATE
const initialState = {
  token: null,
  is_login: false,
  is_check_email: false,
  is_check_nickname: false,
  userId: null,
  nickname: null,
  tempInfo: null,
  friendUsers: [],
  scheduleUsers: [],
};

// MIDDLEWARE
const myInfoDB = () => {
  return function (dispatch) {
    instance
      .post("/api/user/me")
      .then((res) => {
        dispatch(myInfo(res.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const editInfos = (doc) => {
  return function (dispatch, { history }) {
    console.log(doc)
    instance
      .put("/api/user", doc)
      .then((res) => {
        history.replace("/mypage");
      })
      .catch((error) => {
        console.error(error, "에러");
      });
  };
};

const editStatusMsg = (doc) => {
  return function (dispatch, { history }) {
    console.log(doc)
    instance
      .put("/api/user/status", doc)
      .then((res) => {
        dispatch(editInfo(res.data));
      })
      .catch((error) => {
        console.error(error, "에러");
      });
  };
};

const relationDB = () => {
  return function (dispatch) {
    instance
      .post("/api/user/myusers")
      .then((res) => {
        dispatch(relation(res.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const targetAllDB = (userId) => {
  return function (dispatch) {
    instance
      .post("/api/user/target/all", userId)
      .then((res) => {
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
      .post("/api/user/target/friend", userId)
      .then((res) => {
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
      .post("/api/user/target/post", userId)
      .then((res) => {
        dispatch(targetPost(res.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const loginAction = (user) => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/api/login", user)
      .then((res) => {
        setToken(res.data.token);
        dispatch(logIn(res.data.token));
        dispatch(myInfoDB());
        history.push("/");
      })
      .catch((error) => {
        console.error(error);
        window.alert("아이디 또는 패스워드가 올바르지 않습니다.");
      });
  };
};

const logInCheck = (token) => {
  return function (dispatch) {
    if (token) {
      dispatch(logIn(token));
    }
  };
};

const emailCheck = (id) => {
  return function (dispatch) {
    instance
      .post("/api/sign/email", { email: id })
      .then((res) => {
        dispatch(checkDupEmail(true));
        window.alert("사용 가능한 이메일입니다.");
      })
      .catch((error) => {
        dispatch(checkDupEmail(false));
        window.alert("이미 존재하는 이메일입니다.");
      });
  };
};

const nickCheck = (nick) => {
  return function (dispatch) {
    instance
      .post("/api/sign/nickname", { nickname: nick })
      .then((res) => {
        dispatch(checkDupNick(true));
        window.alert("사용 가능한 닉네임입니다.");
      })
      .catch((error) => {
        dispatch(checkDupNick(false));
        window.alert("이미 존재하는 닉네임입니다.");
      });
  };
};

const signupDB = (email, name, nickname, password, confirm, profileImg, statusMessage, likeItem) => {
  instance
    .post("/api/sign/", { email, name, nickname, password, confirm, profileImg, statusMessage, likeItem: [] })
    .then((res) => {
    })
    .catch((error) => {
      console.log(error);
    });
  // };
};

// REDUCER
export default handleActions(
  {
    [MY_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.userId = action.payload.userInfo.userId;
        draft.email = action.payload.userInfo.email;
        draft.name = action.payload.userInfo.name;
        draft.nickname = action.payload.userInfo.nickname;
        draft.profileImg = action.payload.userInfo.profileImg;
        draft.statusMessage = action.payload.userInfo.statusMessage;
        draft.likeItem = action.payload.userInfo.likeItem;
      }),

    [RELATION]: (state, action) =>
      produce(state, (draft) => {
        draft.friendUsers = action.payload.friendUsers;
        draft.scheduleUsers = action.payload.scheduleUsers;
      }),

      [TARGET_ALL]: (state, action) =>
      produce(state, (draft) => {
        draft.userId = action.payload.userInfo.userId;
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
        draft.userId = action.payload.userInfo.userId;
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
        draft.userId = action.payload.userInfo.userId;
        draft.nickname = action.payload.userInfo.nickname;
        draft.rating = action.payload.userInfo.rating;
        draft.profileImg = action.payload.userInfo.profileImg;
        draft.statusMessage = action.payload.userInfo.statusMessage;
        draft.likeItem = action.payload.userInfo.likeItem;
        draft.scheduleCount = action.payload.userInfo.scheduleCount;
        draft.scheduleTitle = action.payload.userInfo.scheduleTitle;
        draft.isFriend = action.payload.userInfo.isFriend;
      }),

    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.token = action.payload.token;
        draft.is_login = true;
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        removeToken();
        draft.userId = null;
        draft.nickname = null;
        draft.token = null;
        draft.is_login = false;
      }),

    [CHECK_DUP_EMAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.is_check_email = action.payload.is_check_email;
      }),

    [CHECK_DUP_NICKNAME]: (state, action) =>
      produce(state, (draft) => {
        draft.is_check_nickname = action.payload.is_check_nickname;
      }),
    [TEMP_SAVE]: (state, action) =>
      produce(state, (draft) => {
        draft.tempInfo = action.payload.tempInfo;
      }),
    [EDIT_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.nickname = action.payload.infos.nickname;
        draft.password = action.payload.infos.password;
        draft.newpassword = action.payload.infos.newpassword;
        draft.confirm = action.payload.infos.confirm;
        draft.profileImg = action.payload.infos.profileImg;
        draft.likeItem = action.payload.infos.likeItem;
      }),

    [EDIT_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.statusMessage = action.payload.statusMessage;
      }),
  },
  initialState
);

const userActions = {
  logIn,
  logInCheck,
  logOut,
  loginAction,
  myInfoDB,
  targetAll,
  targetFriend,
  targetPost,
  relation,
  relationDB,
  targetAllDB,
  targetFriendDB,
  targetPostDB,
  signupDB,
  emailCheck,
  nickCheck,
  tempSave,
  editInfos,
  editStatusMsg,
  editStatus,
};

export { userActions };
