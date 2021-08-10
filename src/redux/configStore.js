// LIBRARY
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import thunk from "redux-thunk";

// REDUCER
import User from "./modules/user";
import Post from "./modules/post";
import Marker from "./modules/marker";
import Chat from "./modules/chat";
import Image from "./modules/image";
import Search from "./modules/search";

// HISTORY
export const history = createBrowserHistory();

const rootReducer = combineReducers({
    user: User,
    post: Post,
    marker: Marker,
    chat: Chat,
    image: Image,
    search: Search,
    router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history })];

if (process.env.NODE_ENV === "development") {
    const { logger } = require("redux-logger");
    middlewares.push(logger);
}

const enhancer = applyMiddleware(...middlewares);
let store = compose(createStore(rootReducer, enhancer));

export default store;
