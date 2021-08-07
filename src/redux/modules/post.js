// AXIOS
import instance from "../../common/axios";

// REDUX-ACTIONS & IMMER
import { createAction, handleActions } from "redux-actions";

// ACTION
const GET_POST = "GET_POST";
const GET_MORE_POST = "GET_MORE_POST";
const POST_DETAIL = "POST_DETAIL";
const GET_MY_POST = "GET_MY_POST";
const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST"

// ACTION CREATOR
const getPosts = (posts, start) => ({ type: GET_POST, posts, start });
const getMorePosts = (posts, start) => ({ type: GET_MORE_POST, posts, start });
const postDetail = (postDetail) => ({ type: POST_DETAIL, postDetail });
const getMyPosts = (posts, start) => ({ type: GET_MY_POST, posts, start });
const addPost = (post) => ({ type: ADD_POST, post });
const deletePost = (post) => ({ type: ADD_POST, post });

// INITIAL STATE
const initialState = {
  list: [],
  start: 0,
  is_loaded: false,
};

// MIDDLEWARE
const getPostsDB = (limit = 5) => {
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

const getMorePostsDB = (limit = 5) => {
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
  return function () {
    instance
      .delete("/api/post", postId)
      .then((res) => {
        window.alert('모임구인이 삭제되었습니다');
      })
      .catch((error) => {
        console.error(error);
        window.alert("오류 발생.");
      });
  };
};

const getMyPostsDB = (limit = 5) => {
  return function (dispatch) {
    instance
      .get(`/api/post/posts/my/?start=0&limit=${limit + 1}`)
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

const addPostDB = (post) => {
  return function (dispatch, getState, { history }) {
    //   const imgFile = getState().image.file;

    //   if (imgFile.length) {
    //     dispatch(
    //       imgActions.uploadImageDB(() => {
    //         const imgUrl = getState().image.imageUrl;
    //         const postInfo = {
    //           ...post,
    //           img: imgUrl,
    //         };

    //         instance
    //           .post('/api/post', { ...postInfo })
    //           .then((res) => {
    //             const userInfo = getState().user;

    //             const newPost = {
    //               ...postInfo,
    //               ...userInfo,
    //               postId: res.data.postId,
    //               reactionCount: 0,
    //               favorite: 'N',
    //               follow: 'N',
    //               createdAt: moment(),
    //             };

    //             dispatch(addPost(newPost));
    //             dispatch(imgActions.setInitialState());
    //           })
    //           .catch((error) => {
    //             console.error(error);
    //           });
    //       })
    //     );

    //     return;
    //   }

    const postInfo = {
      ...post,
      postImg: "",
    };

    instance
      .post("/api/post", { ...postInfo })
      .then((res) => {
        //   const userInfo = getState().user;

        //   const newPost = {
        //     ...postInfo,
        //     ...userInfo,
        //     postId: res.data.postId,
        //     reactionCount: 0,
        //     favorite: 'N',
        //     follow: 'N',
        //     createdAt: moment(),
        //   };

        window.alert("게시글 작성이 완료되었습니다.");
        dispatch(addPost(res.data));
        //   dispatch(imgActions.setInitialState());
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

    // case GET_MY_POST:
    //   return { ...state, list: action.posts, start: action.start };

    case POST_DETAIL:
      return { ...state, postDetail: action.postDetail, is_loaded:true };

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
  addPost,
  getPostsDB,
  getMyPostsDB,
  getMorePostsDB,
  addPostDB,
  postDetailInfo,
  deleteAPost,
};
