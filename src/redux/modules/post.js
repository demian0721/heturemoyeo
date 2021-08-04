// AXIOS
import instance from "../../common/axios";

// ACTION
const GET_POST = "GET_POST";

// ACTION CREATOR
const getPosts = (posts) => ({ type: GET_POST, posts });

// INITIAL STATE
const initialState = {
  list:  [],
};

// MIDDLEWARE
const getPostsDB = () => {
  return function (dispatch) {
    instance
      .get(`/api/post/posts`)
      .then((res) => {
        console.log(res);
        dispatch(getPosts(res.data.result));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const getMyPostsDB = () => {
    return function (dispatch) {
      instance
        .get(`/api/post/posts/my`)
        .then((res) => {
          console.log(res);
          dispatch(getPosts(res.data.result));
        })
        .catch((error) => {
          console.error(error);
        });
    };
  };

// REDUCER
function post(state = initialState, action) {
  switch (action.type) {
    case GET_POST:
      return { ...state, list: action.posts };
    default:
      return state;
  }
}

export default post;

export const postActions = {
  getPosts,
  getPostsDB,
  getMyPostsDB
};