import {RegisterActionTypes} from "../types/RegisterActionTypes";
import {RegisterAction, RegisterState} from "../types/RegisterTypes";
import {RegisterResponse} from "../types/RegisterResponse";

const initialState: RegisterState = {
    data: null as RegisterResponse | null,
    loading: false,
    error: null as RegisterResponse | null
}

export const registerReducer = (state = initialState, action: RegisterAction): RegisterState => {
    switch (action.type) {
        case RegisterActionTypes.REGISTER:
            return {
                ...state,
                loading: true,
                error: null,
                data: null
            }
        case RegisterActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload
            }
        case RegisterActionTypes.REGISTER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                data: null
            }
        default:
            return state;
    }
}