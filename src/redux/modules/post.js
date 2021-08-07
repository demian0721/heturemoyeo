// AXIOS
import instance from "../../common/axios";

// REDUX-ACTIONS & IMMER
import { createAction, handleActions } from "redux-actions";

// ACTION
const GET_POST = "GET_POST";
const GET_MORE_POST = "GET_MORE_POST";
const POST_DETAIL = "POST_DETAIL";
const GET_MY_POST = "GET_MY_POST";
const GET_MORE_MY_POST = "GET_MORE_MY_POST";
const ADD_POST = "ADD_POST";
const POST_DELETE = "POST_DELETE";

// ACTION CREATOR
const getPosts = (posts, start) => ({ type: GET_POST, posts, start });
const getMorePosts = (posts, start) => ({ type: GET_MORE_POST, posts, start });
const postDetail = (postDetail) => ({ type: POST_DETAIL, postDetail });
const getMyPosts = (posts, start) => ({ type: GET_MY_POST, posts, start });
const getMoreMyPosts = (posts, start) => ({
  type: GET_MORE_MY_POST,
  posts,
  start,
});
const addPost = (post) => ({ type: ADD_POST, post });
const deletePost = (postId) => ({ type: POST_DELETE, postId });

// INITIAL STATE
const initialState = {
  list: [],
  post: null,
  start: 0,
};

// MIDDLEWARE
const getPostsDB = (limit = 7) => {
  return function (dispatch) {
    instance
      .get(`/api/post/posts?start=0&limit=${limit + 1}`)
      .then((res) => {
        if (res.data.length < limit + 1) {
          dispatch(getPosts(res.data, null));
          return;
        }

        if (res.data.length >= limit + 1) res.data.pop();

        dispatch(getPosts(res.data, limit));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const getMorePostsDB = (limit = 7) => {
  return function (dispatch, getState) {
    const start = getState().post.start;
    if (start === null) return;
    instance
      .get(`/api/post/posts?start=${start}&limit=${limit + 1}`)
      .then((res) => {
        if (res.data.length < limit + 1) {
          dispatch(getMorePosts(res.data, null));
          return;
        }

        if (res.data.length >= limit + 1) res.data.pop();

        dispatch(getMorePosts(res.data, start + limit));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const postDetailInfo = (postId) => {
  return function (dispatch) {
    instance
      .get("/api/post", {
        params: {
          postId: postId,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(postDetail(res.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const deleteAPost = (postId) => {
  return function (dispatch) {
    instance
      .delete("/api/post", { data: { postId } })
      .then((res) => {
        dispatch(deletePost(postId));
        window.alert("모임구인이 삭제되었습니다");
      })
      .catch((error) => {
        console.error(error);
        window.alert(error.errorMessage);
      });
  };
};

const getMyPostsDB = (limit = 5) => {
  return function (dispatch) {
    instance
      .get(`/api/post/posts/my?start=0&limit=${limit + 1}`)
      .then((res) => {
        if (res.data.length < limit + 1) {
          dispatch(getPosts(res.data, null));
          return;
        }

        if (res.data.length >= limit + 1) res.data.pop();

        dispatch(getPosts(res.data, limit));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const getMoreMyPostsDB = (limit = 7) => {
  return function (dispatch, getState) {
    const start = getState().post.start;
    if (start === null) return;
    instance
      .get(`/api/post/posts/my?start=${start}&limit=${limit + 1}`)
      .then((res) => {
        if (res.data.length < limit + 1) {
          dispatch(getMoreMyPosts(res.data, null));
          return;
        }

        if (res.data.length >= limit + 1) res.data.pop();

        dispatch(getMorePosts(res.data, start + limit));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const addPostDB = (post) => {
  return function (dispatch, getState, { history }) {
    const postInfo = {
      ...post,
      postImg: null,
    };

    instance
      .post("/api/post", { ...postInfo })
      .then((res) => {
        window.alert("게시글 작성이 완료되었습니다.");
        dispatch(addPost(res.data));
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
      return { ...state, list: action.posts, start: action.start };

    case GET_MORE_POST:
      return {
        ...state,
        list: [...state.list, ...action.posts],
        start: action.start,
      };

    case GET_MY_POST:
      return { ...state, list: action.posts, start: action.start };

    case GET_MORE_MY_POST:
      return {
        ...state,
        list: [...state.list, ...action.posts],
        start: action.start,
      };

    case POST_DETAIL:
      return { ...state, postDetail: action.postDetail, is_loaded: true };

    case ADD_POST:
      const newPostList = [action.post, ...state.list];
      return { ...state, list: newPostList };

    default:
      return state;
  }
}

export default post;

export const postActions = {
  getPosts,
  getMyPosts,
  getMorePosts,
  getMoreMyPosts,
  addPost,
  getPostsDB,
  getMyPostsDB,
  getMorePostsDB,
  getMoreMyPostsDB,
  addPostDB,
  postDetailInfo,
  deleteAPost,
};
