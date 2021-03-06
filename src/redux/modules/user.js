// AXIOS
import instance from "../../common/axios";

// REDUX-ACTIONS & IMMER
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { imgActions } from "./image";

// FUNCTION
import { setToken, removeToken } from "../../common/token";

// ACTION
const MY_INFO = "MY_INFO";
const RELATION = "RELATION";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const CHECK_DUP_PHONE = "CHECK_DUP_PHONE";
const CHECK_DUP_AUTH = "CHECK_DUP_AUTH";
const CHECK_DUP_NICKNAME = "CHECK_DUP_NICKNAME";
const TEMP_SAVE = "TEMP_SAVE";
const EDIT_INFO = "EDIT_INFO";
const EDIT_STATUS = "EDIT_STATUS";
const REQUEST_FRIEND = "REQUEST_FRIEND";
const FIND_PASSWORD = "FIND_PASSWORD";
const TEMP_GET = "TEMP_GET";
const CONFIRM_AUTH = "CONFIRM_AUTH";
const SAVE_AUTH_ID = "SAVE_AUTH_ID";

// ACTION CREATORS
const myInfo = createAction(MY_INFO, (userInfo) => ({ userInfo }));
const relation = createAction(RELATION, (userInfo) => ({ userInfo }));
const logIn = createAction(LOG_IN, (token) => ({ token }));
const logOut = createAction(LOG_OUT);
const checkDupPhone = createAction(CHECK_DUP_PHONE, (is_check_phone) => ({
  is_check_phone,
}));
const checkDupAuth = createAction(CHECK_DUP_AUTH, (is_check_auth) => ({
  is_check_auth,
}));
const checkDupNick = createAction(CHECK_DUP_NICKNAME, (is_check_nickname) => ({
  is_check_nickname,
}));
const tempSave = createAction(TEMP_SAVE, (tempInfo) => ({ tempInfo }));
const editInfo = createAction(EDIT_INFO, (editInfo) => ({ editInfo }));
const editStatus = createAction(EDIT_STATUS, (editStatus) => ({ editStatus }));
const requestFriend = createAction(REQUEST_FRIEND, (requestFriend) => ({
  requestFriend,
}));
const findPassword = createAction(FIND_PASSWORD, (is_check_mobile) => ({
  is_check_mobile,
}));
const tempGet = createAction(TEMP_GET, (mobileInfo) => ({ mobileInfo }));
const confirmAuth = createAction(CONFIRM_AUTH, (is_confirm_auth) => ({
  is_confirm_auth,
}));
const saveAuthId = createAction(SAVE_AUTH_ID, (authId) => ({ authId }));

// INITIAL STATE
const initialState = {
  token: null,
  is_login: false,
  is_check_phone: false,
  is_check_auth: false,
  is_check_nickname: false,
  userId: null,
  nickname: null,
  tempInfo: null,
  friendUsers: null,
  scheduleUsers: null,
  relation: null,
  type: null,
  exactType: null,
  is_loaded: false,
  is_check_mobile: false,
  mobileInfo: null,
  is_confirm_auth: false,
  authId: null,
};

// MIDDLEWARE
const myInfoDB = () => {
  return function (dispatch) {
    instance
      .post("/api/user/me")
      .then((res) => {
        const result = res.data;
        Object.assign(result, {
          type: "user",
          exactType: "me",
        });
        dispatch(myInfo(result));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const editInfos = (image, doc) => {
  return function (dispatch, getState) {
    if (image.length > 0) {
      const profileInfo = {
        ...doc,
        profileImg: image,
      };
      instance
        .put("/api/user", { ...profileInfo })
        .then((res) => {
          window.alert("????????? ????????? ?????????????????????");
          window.location.href = "/mypage";
        })
        .catch((error) => {
          window.alert(error.response.data.errorMessage);
        });
    } else {
      dispatch(
        imgActions.uploadImageDB(image, () => {
          const imgUrl = getState().image.imageUrl;
          const profileInfo = {
            ...doc,
            profileImg: imgUrl,
          };
          instance
            .put("/api/user", { ...profileInfo })
            .then((res) => {
              window.alert("????????? ????????? ?????????????????????");
              window.location.href = "/mypage";
            })
            .catch((error) => {
              window.alert(error.response.data.errorMessage);
            });
        })
      );
    }
  };
};

const editStatusMsg = (doc) => {
  return function (dispatch) {
    console.log(doc);
    instance
      .put("/api/user/status", doc)
      .then((res) => {
        window.alert("?????????????????? ?????????????????????.");
      })
      .catch((error) => {
        window.alert("?????????????????? ???????????? ???????????????.");
        console.error(error.errorMessage);
      });
  };
};

const requestFriends = (doc) => {
  return function () {
    instance
      .post("/api/friend/", doc)
      .then((res) => {
        window.alert("?????? ????????? ?????????????????????");
      })
      .catch((error) => {
        console.error(error);
        window.alert(error.errorMessage);
      });
  };
};

const relationDB = () => {
  return function (dispatch) {
    instance
      .get("/api/user/myusers")
      .then((res) => {
        dispatch(relation(res.data));
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
        dispatch(relationDB());
        window.location.href = "/";
      })
      .catch((error) => {
        console.error(error);
        window.alert(error.response.data.errorMessage);
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

const receiveAuthNum = (phone) => {
  return function (dispatch) {
    instance
      .post("/api/sign/phone", { phone: phone })
      .then((res) => {
        dispatch(checkDupPhone(true));
        window.alert("?????? ???????????? ?????????????????????");
      })
      .catch((error) => {
        dispatch(checkDupPhone(false));
        if (error.response.status === 412) {
          window.alert("?????? ????????? ?????? ?????? ????????????.");
        } else {
          window.alert("?????? ????????? ????????? ?????????????????????.");
        }
      });
  };
};

const getAuthNum = (phone) => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/api/find/password/phone", { phone: phone })
      .then((res) => {
        dispatch(findPassword(true));
        window.alert("?????? ???????????? ?????????????????????");
        history.push("/findpassword/auth");
      })
      .catch((error) => {
        dispatch(findPassword(false));
        if (error.response.status === 412) {
          window.alert("???????????? ?????? ?????? ???????????????.");
        } else {
          window.alert("?????? ????????? ????????? ?????????????????????.");
        }
      });
  };
};

const authNumConfirm = (authInfo) => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/api/find/password/auth", authInfo)
      .then((res) => {
        console.log(res);
        dispatch(saveAuthId(res.data.authId));
        dispatch(confirmAuth(true));
        window.alert("??????????????? ?????????????????????.");
        history.push("/findpassword/new");
      })
      .catch((error) => {
        dispatch(confirmAuth(false));
        window.alert("??????????????? ???????????? ????????????.");
      });
  };
};

const authNumCheck = (authInfo) => {
  return function (dispatch) {
    instance
      .post("/api/sign/phone/auth", authInfo)
      .then((res) => {
        dispatch(checkDupAuth(true));
        window.alert("??????????????? ?????????????????????.");
      })
      .catch((error) => {
        dispatch(checkDupAuth(false));
        window.alert("??????????????? ???????????? ????????????.");
      });
  };
};

const nickCheck = (nick) => {
  return function (dispatch) {
    instance
      .post("/api/sign/nickname", { nickname: nick })
      .then((res) => {
        dispatch(checkDupNick(true));
        window.alert("?????? ????????? ??????????????????.");
      })
      .catch((error) => {
        dispatch(checkDupNick(false));
        window.alert("?????? ???????????? ??????????????????.");
      });
  };
};

const signupDB = (
  phone,
  name,
  nickname,
  password,
  confirm,
  profileImg,
  statusMessage,
  likeItem
) => {
  return function (dispatch, getState, { history }) {
    if (profileImg == null) {
      const profileInfoAll = {
        phone,
        name,
        nickname,
        password,
        confirm,
        statusMessage,
        likeItem,
        profileImg: null,
      };
      instance
        .post("/api/sign/", { ...profileInfoAll })
        .then((res) => {
          localStorage.setItem('firstLogin', true)
          window.alert("??????????????? ?????????????????????. ?????? ???????????? ?????????.");
          history.push("/login");
        })
        .catch((error) => {
          window.alert(error.response.data.errorMessage);
          console.log(error);
        });
    } else {
      dispatch(
        imgActions.uploadImageDB(profileImg, () => {
          const imgUrl = getState().image.imageUrl;
          const profileInfoAll = {
            phone,
            name,
            nickname,
            password,
            confirm,
            statusMessage,
            likeItem,
            profileImg: imgUrl,
          };
          instance
            .post("/api/sign/", { ...profileInfoAll })
            .then((res) => {
              window.alert("??????????????? ?????????????????????. ?????? ???????????? ?????????.");
              history.push("/login");
            })
            .catch((error) => {
              window.alert(error.response.data.errorMessage);
              console.log(error);
            });
        })
      );
    }
  };
};

// authId??? ????????????
const renewPWDDB = (userInfo) => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/api/find/password/newpass", {...userInfo})
      .then((res) => {
        console.log(res);
        window.alert("??????????????? ?????????????????????. ?????? ???????????? ?????????.");
        history.push("/login");
      })
      .catch((error) => {
        window.alert(error.response.data.errorMessage);
        console.log(error);
      });
  };
};

// REDUCER
export default handleActions(
  {
    [MY_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.userId = action.payload.userInfo.userId;
        draft.phone = action.payload.userInfo.phone;
        draft.name = action.payload.userInfo.name;
        draft.nickname = action.payload.userInfo.nickname;
        draft.profileImg = action.payload.userInfo.profileImg;
        draft.statusMessage = action.payload.userInfo.statusMessage;
        draft.likeItem = action.payload.userInfo.likeItem;
        draft.rating = action.payload.userInfo.rating;
        draft.type = action.payload.userInfo.type;
        draft.exactType = action.payload.userInfo.exactType;
        draft.is_loaded= true;
      }),

    [RELATION]: (state, action) =>
      produce(state, (draft) => {
        draft.friendUsers = action.payload.userInfo.friendUsers;
        draft.scheduleUsers = action.payload.userInfo.scheduleUsers;
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

    [CHECK_DUP_PHONE]: (state, action) =>
      produce(state, (draft) => {
        draft.is_check_phone = action.payload.is_check_phone;
      }),

    [CHECK_DUP_AUTH]: (state, action) =>
      produce(state, (draft) => {
        draft.is_check_auth = action.payload.is_check_auth;
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

    [EDIT_STATUS]: (state, action) =>
      produce(state, (draft) => {
        draft.statusMessage = action.payload.statusMessage;
      }),

    [REQUEST_FRIEND]: (state, action) =>
      produce(state, (draft) => {
        draft.userId = action.payload.userId;
      }),

    [FIND_PASSWORD]: (state, action) =>
    produce(state, (draft) => {
      draft.is_check_mobile = action.payload.is_check_mobile;
    }),

    [TEMP_GET]: (state, action) =>
      produce(state, (draft) => {
        draft.mobileInfo = action.payload.mobileInfo;
      }),
    
    [CONFIRM_AUTH]: (state, action) =>
    produce(state, (draft) => {
      draft.is_confirm_auth = action.payload.is_confirm_auth;
    }),

    [SAVE_AUTH_ID]: (state, action) =>
    produce(state, (draft) => {
      draft.authId = action.payload.authId;
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
  relation,
  relationDB,
  signupDB,
  authNumCheck,
  receiveAuthNum,
  nickCheck,
  tempSave,
  editInfos,
  editStatusMsg,
  editStatus,
  requestFriends,
  getAuthNum,
  tempGet,
  authNumConfirm,
  renewPWDDB
};

export { userActions };
