import {LoginActionTypes} from "../types/LoginActionTypes";
import {LoginAction, LoginState} from "../types/LoginTypes";
import {LoginResponse} from "../types/LoginResponse";

const initialState: LoginState = {
    data: null as LoginResponse | null,
    loading: false,
    error: null as LoginResponse | null,
}

export const loginReducer = (state = initialState, action: LoginAction): LoginState => {
    switch (action.type) {
        case LoginActionTypes.LOGIN:
            return {
                ...state,
                loading: true,
                error: null,
                data: null,
            }
        case LoginActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            }
        case LoginActionTypes.LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                data: null,
            }
        default:
            return state;
    }
}