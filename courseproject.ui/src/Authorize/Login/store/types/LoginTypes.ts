import {LoginActionTypes} from "./LoginActionTypes";
import {LoginResponse} from "./LoginResponse";

export interface LoginState {
    data: LoginResponse | null;
    loading: boolean;
    error: LoginResponse | null;
    isAuthorize: boolean; // TODO: remove
}

interface SendLoginAction {
    type: LoginActionTypes.LOGIN;
}

interface SendLoginSuccessAction {
    type: LoginActionTypes.LOGIN_SUCCESS;
    payload: LoginResponse | null
}

interface SendLoginErrorAction {
    type: LoginActionTypes.LOGIN_ERROR;
    payload: LoginResponse | null
}

export type LoginAction = SendLoginAction | SendLoginSuccessAction | SendLoginErrorAction;