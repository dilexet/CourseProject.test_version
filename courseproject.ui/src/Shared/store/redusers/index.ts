import {combineReducers} from "redux";
import {loginReducer} from "../../../Authorize/Login/store/reducers/loginReducer";
import {registerReducer} from "../../../Authorize/Register/store/reducers/registerReducer";
import {logoutReducer} from "../../../Authorize/Logout/store/reducers/logoutReducer";
import {tokenVerifyReducer} from "../../../Authorize/TokenVerify/store/reducers/tokenVerifyReducer";


export const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    logout: logoutReducer,
    token_verify: tokenVerifyReducer,
})

export type RootState = ReturnType<typeof rootReducer>