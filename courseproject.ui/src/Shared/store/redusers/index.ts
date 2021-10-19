import {combineReducers} from "redux";
import {loginReducer} from "../../../Authorize/Login/store/reducers/loginReducer";
import {registerReducer} from "../../../Authorize/Register/store/reducers/registerReducer";


export const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer
})

export type RootState = ReturnType<typeof rootReducer>