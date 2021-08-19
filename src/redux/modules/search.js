// AXIOS
import instance from '../../common/axios';

// ACTION
const SEARCH_POST = 'SEARCH_POST';
const SEARCH_MORE_POST = 'SEARCH_MORE_POST';
const SEARCH_ROOM = 'SEARCH_ROOM';
const SEARCH_MORE_ROOM = 'SEARCH_MORE_ROOM';

// ACTION CREATOR
const getSearchPost = (searchPost, start) => ({ type: SEARCH_POST, searchPost, start });
const getSearchMorePost = (searchPost, start) => ({ type: SEARCH_MORE_POST, searchPost, start });
const getSearchRoom = (searchRoom, start) => ({ type: SEARCH_ROOM, searchRoom, start });
const getSearchMoreRoom = (searchRoom, start) => ({ type: SEARCH_MORE_ROOM, searchRoom, start });

// INITIAL STATE
const initialState = {
  list: [],
  start: 0,
};

// MIDDLEWARE
const searchPostDB = (keyword, limit = 5) => {
  return function (dispatch) {
    console.log(keyword);
    instance
      .get(`/api/search/post?keyword=${keyword}&start=0&limit=${limit + 1}`)
      .then((res) => {
        if (res.data.length < limit + 1) {
          dispatch(getSearchPost(res.data, null));
          return;
        }

        if (res.data.length >= limit + 1) res.data.pop();

        dispatch(getSearchPost(res.data, limit));
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
        if (res.data.length < limit + 1) {
          dispatch(getSearchMorePost(res.data, null));
          return;
        }

        if (res.data.length >= limit + 1) res.data.pop();

        dispatch(getSearchMorePost(res.data, start + limit));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const searchRoomDB = (keyword, limit = 5) => {
  return function (dispatch) {
    console.log(keyword);
    instance
      .get(`/api/search/room?keyword=${keyword}&start=0&limit=${limit + 1}`)
      .then((res) => {
        if (res.data.length < limit + 1) {
          dispatch(getSearchRoom(res.data, null));
          return;
        }

        if (res.data.length >= limit + 1) res.data.pop();

        dispatch(getSearchRoom(res.data, limit));
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
      return { list: action.searchPost, start: action.start,  };

    case SEARCH_MORE_POST:
      return { list: [...state.list, ...action.searchPost], start: action.start,  };

      case SEARCH_ROOM:
        return { list: action.searchRoom, start: action.start };

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
  searchRoomDB,
};