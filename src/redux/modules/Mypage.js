// AXIOS
import instance from '../../common/axios';


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
    instance
    .get('/api/user/me', {
    })
      .then((res) => {
        console.log(res);
        dispatch(getProfiles(res.data.result));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

// REDUCER
function myPage(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return { ...state, list: action.profiles };
    default:
      return state;
  }
}

export default myPage;

export const profileActions = {
  getProfiles,
  getProfilesDB,
};