// AXIOS
import instance from "../../common/axios";

// REDUX
import { imgActions } from "./image";

// ACTION
const GET_POST = "GET_POST";
const GET_MORE_POST = "GET_MORE_POST";
const POST_DETAIL = "POST_DETAIL";
const GET_MY_POST = "GET_MY_POST";
const GET_MORE_MY_POST = "GET_MORE_MY_POST";
const ADD_POST = "ADD_POST";
const POST_DELETE = "POST_DELETE";
const GET_POST_LOCATION = "GET_POST_LOCATION";
const GET_INTVITED_POST = "GET_INVITED_POST";
const EDIT_POST = "EDIT_POST"

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
const getPostLocation = (postInfo) => ({ type: GET_POST_LOCATION, postInfo });
const getInvitedPosts = (posts) => ({ type: GET_INTVITED_POST, posts });
const editPost = (editPost) => ({ type:EDIT_POST, editPost });

// INITIAL STATE
const initialState = {
  list: [],
  post: null,
  is_loaded: false,
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
      .get("/api/post", { params: { postId } })
      .then((res) => {
        const result = res.data;
        Object.assign(result, { type: "post", postId });
        dispatch(postDetail(result));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const deleteAPost = (postId) => {
  return function (dispatch, { history }) {
    instance
      .delete("/api/post", { data: { postId } })
      .then((res) => {
        dispatch(deletePost(postId));
        window.alert("모임구인이 삭제되었습니다");
        window.location.href = "/postlist";
      })
      .catch((error) => {
        console.error(error);
        window.alert(error.errorMessage);
      });
  };
};

const getMyPostsDB = (limit = 50) => {
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

const getInvitedPostsDB = (limit = 50) => {
  return function (dispatch) {
    instance
      .get(`/api/post/posts/invite?start=0&limit=${limit}`)
      .then((res) => {
        dispatch(getInvitedPosts(res.data));
      })
      .catch((err) => {
        console.log(err);
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

const addPostDB = (image, post) => {
  return function (dispatch, getState, { history }) {
    dispatch(
      imgActions.uploadImageDB(image, () => {
        const imgUrl = getState().image.imageUrl;
        const postInfo = {
          ...post,
          postImg: imgUrl,
        };

        instance
          .post("/api/post", { ...postInfo })
          .then((res) => {
            window.alert("게시글 작성이 완료되었습니다.");
            dispatch(addPost({ postImg: imgUrl, postId: res.data }));
          })
          .catch((error) => {
            console.error(error);
          });
      })
    );
  };
};

const editPostDB = (image, post) => {
  return function (dispatch, getState, { history }) {
    if(image.length>0){
          const postInfo = {
            ...post,
            postImg: image,
          };
  
          instance
            .put("/api/post", { ...postInfo })
            .then((res) => {
              window.alert("게시글 수정이 완료되었습니다.");
              dispatch(editPost({ postImg: image, postId: res.data }));
              // history.replace(`/postdetail/${postInfo.postId}`);
            })
            .catch((error) => {
              console.error(error);
            });
    }else{
      dispatch(
        imgActions.uploadImageDB(image, () => {
          const imgUrl = getState().image.imageUrl;
          const postInfo = {
            ...post,
            postImg: imgUrl,
          };
  
          instance
            .put("/api/post", { ...postInfo })
            .then((res) => {
              window.alert("게시글 수정이 완료되었습니다.");
              dispatch(editPost({ postImg: imgUrl, postId: res.data }));
              // history.replace(`/postdetail/${postInfo.postId}`);
            })
            .catch((error) => {
              console.error(error);
            });
        })
      );
    };
  };
};

const getPostLocationDB = () => {
  return function (dispatch) {
    instance
      .get(`/api/post/posts/location`)
      .then((res) => {
        dispatch(getPostLocation(res.data));
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

    case EDIT_POST:
      return { ...state,};

    case GET_POST_LOCATION:
      return {
        ...state,
        list: [...state.list, ...action.postInfo],
      };

    case GET_INTVITED_POST:
      return {
        ...state,
        list: action.posts,
      };

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
  editPostDB,
  getPostLocation,
  getInvitedPosts,
  getPostsDB,
  getMyPostsDB,
  getMorePostsDB,
  getMoreMyPostsDB,
  getPostLocationDB,
  getInvitedPostsDB,
  addPostDB,
  postDetailInfo,
  deleteAPost,
};
