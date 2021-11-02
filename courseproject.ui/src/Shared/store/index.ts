import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from './redusers';
import {logger} from "redux-logger";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk, logger),
        composeEnhancers())
)

export type AppDispatch = typeof store.dispatch