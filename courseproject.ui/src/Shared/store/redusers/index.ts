import {combineReducers} from "redux";
import {loginReducer} from "../../../Authorize/Login/store/reducers/loginReducer";

export const rootReducer = combineReducers({
    login: loginReducer,
})

export type RootState = ReturnType<typeof rootReducer>