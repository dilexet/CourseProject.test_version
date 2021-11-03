import {TokenVerifyActionTypes} from "./TokenVerifyActionTypes";
import {AuthorizeResponse} from "../../../Shared/types/AuthorizeResponse";

export interface TokenVerifyState {
    data: AuthorizeResponse | null;
    loading: boolean;
    error: AuthorizeResponse | null;
    isAuthorize: boolean;
}

interface SendTokenVerifyAction {
    type: TokenVerifyActionTypes.TOKEN_VERIFY;
}

interface SendTokenVerifySuccessAction {
    type: TokenVerifyActionTypes.TOKEN_VERIFY_SUCCESS;
    payload: AuthorizeResponse | null
}

interface SendTokenVerifyErrorAction {
    type: TokenVerifyActionTypes.TOKEN_VERIFY_ERROR;
    payload: AuthorizeResponse | null
}

export type TokenVerifyAction = SendTokenVerifyAction | SendTokenVerifySuccessAction | SendTokenVerifyErrorAction;