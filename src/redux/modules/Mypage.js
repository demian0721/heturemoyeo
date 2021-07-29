import instance from "../../common/axios";
import axios from 'axios';

// FUNCTION
import { setToken, removeToken } from '../../common/token';

// REDUX

// ACTION
const GET_PROFILE = "GET_PROFILE";

// ACTION CREATOR
const getProfiles = (profiles) => ({ type: GET_PROFILE, profiles });

// INITIAL STATE
const initialState = {
  list: [],
  Profile: null,
};

// MIDDLEWARE
const getProfilesDB = () => {
  return function (dispatch) {
    axios.get('http://astraios.shop:4001/api/user/me', {
      headers: {
        // 'Authorization':`Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => {
        console.log(res);
        // setToken(res.data.token);
        dispatch(getProfiles(res.data.result));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

// REDUCER
function profile(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return { ...state, list: action.profiles };
    default:
      return state;
  }
}

export default profile;

export const profileActions = {
  getProfiles,
  getProfilesDB,
};