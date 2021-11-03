import {TokenVerifyActionTypes} from "./TokenVerifyActionTypes";
import {TokenVerifyResponse} from "./TokenVerifyResponse";

export interface TokenVerifyState {
    data: TokenVerifyResponse | null;
    loading: boolean;
    error: TokenVerifyResponse | null;
    isAuthorize: boolean;
}

interface SendTokenVerifyAction {
    type: TokenVerifyActionTypes.TOKEN_VERIFY;
}

interface SendTokenVerifySuccessAction {
    type: TokenVerifyActionTypes.TOKEN_VERIFY_SUCCESS;
    payload: TokenVerifyResponse | null
}

interface SendTokenVerifyErrorAction {
    type: TokenVerifyActionTypes.TOKEN_VERIFY_ERROR;
    payload: TokenVerifyResponse | null
}

export type TokenVerifyAction = SendTokenVerifyAction | SendTokenVerifySuccessAction | SendTokenVerifyErrorAction;