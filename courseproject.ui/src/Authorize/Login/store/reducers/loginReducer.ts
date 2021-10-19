import {LoginActionTypes} from "../types/LoginActionTypes";
import {LoginAction, LoginState} from "../types/LoginTypes";
import {AuthorizeResponse} from "../../../Shared/types/Response";

const initialState: LoginState = {
    data: null as AuthorizeResponse | null,
    loading: false,
    error: null as AuthorizeResponse | null
}

// TODO: чекать
export const loginReducer = (state = initialState, action: LoginAction): LoginState => {
    switch (action.type) {
        case LoginActionTypes.LOGIN:
            return {
                ...state,
                loading: true,
                error: null,
                data: null
            }
        case LoginActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload
            }
        case LoginActionTypes.LOGIN_ERROR:
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