import {RegisterActionTypes} from "./RegisterActionTypes";
import {RegisterResponse} from "./RegisterResponse";

export interface RegisterState {
    data: RegisterResponse | null;
    loading: boolean;
    error: RegisterResponse | null;
}

interface SendRegisterAction {
    type: RegisterActionTypes.REGISTER;
}

interface SendRegisterSuccessAction {
    type: RegisterActionTypes.REGISTER_SUCCESS;
    payload: RegisterResponse | null
}

interface SendRegisterErrorAction {
    type: RegisterActionTypes.REGISTER_ERROR;
    payload: RegisterResponse | null
}

export type RegisterAction = SendRegisterAction | SendRegisterSuccessAction | SendRegisterErrorAction;