import {LogoutActionTypes} from "./LogoutActionTypes";
import {AuthorizeResponse} from "../../../Shared/types/Response";

export interface LogoutState {
    data: AuthorizeResponse | null;
    loading: boolean;
    error: AuthorizeResponse | null;
}

interface SendLogoutAction {
    type: LogoutActionTypes.LOGOUT;
}

interface SendLogoutSuccessAction {
    type: LogoutActionTypes.LOGOUT_SUCCESS;
    payload: AuthorizeResponse | null
}

interface SendLogoutErrorAction {
    type: LogoutActionTypes.LOGOUT_ERROR;
    payload: AuthorizeResponse | null
}

export type LogoutAction = SendLogoutAction | SendLogoutSuccessAction | SendLogoutErrorAction;