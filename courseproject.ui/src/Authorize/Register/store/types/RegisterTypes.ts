import {RegisterActionTypes} from "./RegisterActionTypes";
import {AuthorizeResponse} from "../../../Shared/types/Response";

export interface RegisterState {
    data: AuthorizeResponse | null;
    loading: boolean;
    error: AuthorizeResponse | null;
}

interface SendRegisterAction {
    type: RegisterActionTypes.REGISTER;
}

interface SendRegisterSuccessAction {
    type: RegisterActionTypes.REGISTER_SUCCESS;
    payload: AuthorizeResponse | null
}

interface SendRegisterErrorAction {
    type: RegisterActionTypes.REGISTER_ERROR;
    payload: AuthorizeResponse | null
}

export type RegisterAction = SendRegisterAction | SendRegisterSuccessAction | SendRegisterErrorAction;