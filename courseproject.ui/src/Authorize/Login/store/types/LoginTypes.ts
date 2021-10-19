import {LoginActionTypes} from "./LoginActionTypes";
import {AuthorizeResponse} from "../../../Shared/types/Response";

export interface LoginState {
    data: AuthorizeResponse | null;
    loading: boolean;
    error: AuthorizeResponse | null;
}

interface SendLoginAction {
    type: LoginActionTypes.LOGIN;
}

interface SendLoginSuccessAction {
    type: LoginActionTypes.LOGIN_SUCCESS;
    payload: AuthorizeResponse | null
}

interface SendLoginErrorAction {
    type: LoginActionTypes.LOGIN_ERROR;
    payload: AuthorizeResponse | null
}

export type LoginAction = SendLoginAction | SendLoginSuccessAction | SendLoginErrorAction;