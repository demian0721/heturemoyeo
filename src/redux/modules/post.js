// AXIOS
import instance from "../../common/axios";

// ACTION
const GET_POST = "GET_POST";
const GET_MORE_POST = "GET_MORE_POST";
// const GET_MY_POST = "GET_MY_POST";

// ACTION CREATOR
const getPosts = (posts, start) => ({ type: GET_POST, posts, start });
const getMorePosts = (posts, start) => ({ type: GET_MORE_POST, posts, start });
// const getMyPosts = (posts, start) => ({ type: GET_MY_POST, posts, start });

// INITIAL STATE
const initialState = {
  list: [],
  start: 0,
};

// MIDDLEWARE
const getPostsDB = (limit = 5) => {
  return function (dispatch) {
    instance
      .get(`/api/post/posts?start=0&limit=${limit + 1}`)
      .then((res) => {
        if (res.data.result.length < limit + 1) {
          dispatch(getPosts(res.data.result, null));
          return;
        }

        if (res.data.result.length >= limit + 1) res.data.result.pop();

        dispatch(getPosts(res.data.result, limit));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const getMorePostsDB = (limit = 5) => {
  return function (dispatch, getState) {
    const start = getState().post.start;

    if (start === null) return;

    instance
      .get(`/api/post/posts?start=${start}&limit=${limit + 1}`)
      .then((res) => {
        if (res.data.result.length < limit + 1) {
          dispatch(getMorePosts(res.data.result, null));
          return;
        }

        if (res.data.result.length >= limit + 1) res.data.result.pop();

        dispatch(getMorePosts(res.data.result, start + limit));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

// const getMyPostsDB = () => {
//     return function (dispatch) {
//       instance
//         .get(`/api/post/posts/my`)
//         .then((res) => {
//           console.log(res);
//           dispatch(getMyPosts(res.data.result));
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     };
//   };

// REDUCER
function post(state = initialState, action) {
  switch (action.type) {
    case GET_POST:
      return { ...state, list: action.posts, start: action.start };
    case GET_MORE_POST:
      return { ...state, list: [...state.list, ...action.posts], start: action.start };
    // case GET_MY_POST:
    //   return { ...state, list: action.posts, start: action.start };
    default:
      return state;
  }
}

export default post;

export const postActions = {
  getPosts,
  // getMyPosts,
  getMorePosts,
  getPostsDB,
  // getMyPostsDB,
  getMorePostsDB,
};