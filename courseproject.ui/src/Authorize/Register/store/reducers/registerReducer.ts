import {RegisterActionTypes} from "../types/RegisterActionTypes";
import {RegisterAction, RegisterState} from "../types/RegisterTypes";
import {AuthorizeResponse} from "../../../Shared/types/Response";

const initialState: RegisterState = {
    data: null as AuthorizeResponse | null,
    loading: false,
    error: null as AuthorizeResponse | null
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