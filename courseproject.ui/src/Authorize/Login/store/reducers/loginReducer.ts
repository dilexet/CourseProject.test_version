import {LoginActionTypes} from "../types/LoginActionTypes";
import {LoginAction, LoginState} from "../types/loginTypes";

const initialState: LoginState = {
    data: null as [] | null,
    loading: false,
    error: null as string | null
}

// TODO: чекать
export const loginReducer = (state = initialState, action: LoginAction): LoginState => {
    switch (action.type) {
        case LoginActionTypes.LOGIN:
            return {loading: true, error: null, data: []}
        case LoginActionTypes.LOGIN_SUCCESS:
            return {loading: false, error: null, data: action.payload}
        case LoginActionTypes.LOGIN_ERROR:
            return {loading: true, error: action.payload, data: []}
        default:
            return state;
    }
}