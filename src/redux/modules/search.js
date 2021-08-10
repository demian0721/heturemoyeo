// AXIOS
import instance from '../../common/axios';

// ACTION
const SEARCH_POST = 'SEARCH_POST';
const SEARCH_MORE_POST = 'SEARCH_MORE_POST';

// ACTION CREATOR
const getSearchPost = (searchPost, start) => ({ type: SEARCH_POST, searchPost, start });
const getSearchMorePost = (searchPost, start) => ({ type: SEARCH_MORE_POST, searchPost, start });

// INITIAL STATE
const initialState = {
  list: [],
  start: 0,
};

// MIDDLEWARE
const searchPostDB = (keyword, limit = 5) => {
  return function (dispatch) {
    instance
      .get(`/api/search/post?keyword=${keyword}&start=0&limit=${limit + 1}`)
      .then((res) => {
        if (res.data.result.length < limit + 1) {
          dispatch(getSearchPost(res.data.result, null));
          return;
        }

        if (res.data.result.length >= limit + 1) res.data.result.pop();

        dispatch(getSearchPost(res.data.result, limit));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const searchMorePostDB = (keyword, limit = 5) => {
  return function (dispatch, getState) {
    const start = getState().search.start;

    if (start === null) return;

    instance
      .get(`/api/search/post?keyword=${keyword}&start=${start}&limit=${limit + 1}`)
      .then((res) => {
        if (res.data.result.length < limit + 1) {
          dispatch(getSearchMorePost(res.data.result, null));
          return;
        }

        if (res.data.result.length >= limit + 1) res.data.result.pop();

        dispatch(getSearchMorePost(res.data.result, start + limit));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

// REDUCER
function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH_POST:
      return { list: action.searchPost, start: action.start };

    case SEARCH_MORE_POST:
      return { list: [...state.list, ...action.searchPost], start: action.start };

    default:
      return state;
  }
}

export default search;

export const searchActions = {
  getSearchPost,
  getSearchMorePost,
  searchPostDB,
  searchMorePostDB,
};