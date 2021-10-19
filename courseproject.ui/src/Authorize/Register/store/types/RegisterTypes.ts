import {RegisterActionTypes} from "./RegisterActionTypes";

export interface RegisterState {
    data: any[] | unknown;
    loading: boolean;
    error: string | null;
}

interface SendRegisterAction {
    type: RegisterActionTypes.REGISTER;
}

interface SendRegisterSuccessAction {
    type: RegisterActionTypes.REGISTER_SUCCESS;
    payload: any[] | unknown
}

interface SendRegisterErrorAction {
    type: RegisterActionTypes.REGISTER_ERROR;
    payload: string | null
}

export type RegisterAction = SendRegisterAction | SendRegisterSuccessAction | SendRegisterErrorAction;