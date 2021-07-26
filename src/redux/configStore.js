// LIBRARY
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import thunk from 'redux-thunk';

// REDUCER
import User from './modules/user';

// HISTORY
export const history = createBrowserHistory();

const rootReducer = combineReducers({
    user: User,
    router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history: history })];

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
}

const enhancer = applyMiddleware(...middlewares);
let store = compose(createStore(rootReducer, enhancer));

export default store;
