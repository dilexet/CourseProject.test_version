import {RegisterActionTypes} from "../types/RegisterActionTypes";
import {RegisterAction, RegisterState} from "../types/RegisterTypes";

const initialState: RegisterState = {
    data: null as [] | null,
    loading: false,
    error: null as string | null
}

// TODO: чекать
export const registerReducer = (state = initialState, action: RegisterAction): RegisterState => {
    switch (action.type) {
        case RegisterActionTypes.REGISTER:
            return {loading: true, error: null, data: []}
        case RegisterActionTypes.REGISTER_SUCCESS:
            return {loading: false, error: null, data: action.payload}
        case RegisterActionTypes.REGISTER_ERROR:
            return {loading: true, error: action.payload, data: []}
        default:
            return state;
    }
}