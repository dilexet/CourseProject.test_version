import {LoginActionTypes} from "./LoginActionTypes";

export interface LoginState {
    data: any[] | unknown;
    loading: boolean;
    error: string | null;
}

interface SendLoginAction {
    type: LoginActionTypes.LOGIN;
}

interface SendLoginSuccessAction {
    type: LoginActionTypes.LOGIN_SUCCESS;
    payload: any[] | unknown
}

interface SendLoginErrorAction {
    type: LoginActionTypes.LOGIN_ERROR;
    payload: string | null
}

export type LoginAction = SendLoginAction | SendLoginSuccessAction | SendLoginErrorAction;