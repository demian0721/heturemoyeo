// AXIOS
import instance from "../../common/axios";

// REDUX-ACTIONS & IMMER
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// FUNCTION
import { setToken, removeToken } from "../../common/token";

// ACTION
const MY_INFO = "MY_INFO";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const CHECK_DUP_EMAIL = "CHECK_DUP_EMAIL";
const CHECK_DUP_NICKNAME = "CHECK_DUP_NICKNAME";
const TEMP_SAVE = "TEMP_SAVE";

// ACTION CREATORS
const myInfo = createAction(MY_INFO, (userInfo) => ({ userInfo }));
const logIn = createAction(LOG_IN, (token) => ({ token }));
const logOut = createAction(LOG_OUT);
const checkDupEmail = createAction(CHECK_DUP_EMAIL, (is_check_email) => ({
  is_check_email,
}));
const checkDupNick = createAction(CHECK_DUP_NICKNAME, (is_check_nickname) => ({
  is_check_nickname,
}));
const tempSave = createAction(TEMP_SAVE, (tempInfo) => ({ tempInfo }));

// INITIAL STATE
const initialState = {
  token: null,
  is_login: false,
  is_check_email: false,
  is_check_nickname: false,
  userId: null,
  nickname: null,
  tempInfo: null,
};

// MIDDLEWARE
const myInfoDB = () => {
  return function (dispatch) {
    instance
      .post("/api/user/me")
      .then((res) => {
        console.log(res);
        dispatch(myInfo(res.data));
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
        dispatch(logIn(res.data.token));
        dispatch(myInfoDB());

        setToken(res.data.token);

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
      console.log(res);
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
      console.log(res);
      window.alert("사용 가능한 닉네임입니다.");
    })
    .catch((error) => {
      dispatch(checkDupNick(false));
      window.alert("이미 존재하는 닉네임입니다.");
    });
  };
};

const signupDB = (
  email,
  name,
  nickname,
  password,
  confirm,
  profileImg,
  statusMessage,
  likeItem
) => {
  // return function () {
  console.log(
    email,
    name,
    nickname,
    password,
    confirm,
    profileImg,
    statusMessage,
    likeItem
  );
  instance
    .post("/api/sign/", {
      email,
      name,
      nickname,
      password,
      confirm,
      profileImg,
      statusMessage,
      likeItem: [],
    })
    .then((res) => {
      console.log(res);
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
  },
  initialState
);

const userActions = {
  logIn,
  logInCheck,
  logOut,
  loginAction,
  myInfoDB,
  signupDB,
  emailCheck,
  nickCheck,
  tempSave,
};

export { userActions };
