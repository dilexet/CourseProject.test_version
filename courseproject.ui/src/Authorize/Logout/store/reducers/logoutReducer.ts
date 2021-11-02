import {AuthorizeResponse} from "../../../Shared/types/Response";
import {LogoutAction, LogoutState} from "../types/LogoutTypes";
import {LogoutActionTypes} from "../types/LogoutActionTypes";

const initialState: LogoutState = {
    data: null as AuthorizeResponse | null,
    loading: false,
    error: null as AuthorizeResponse | null,
}

export const logoutReducer = (state = initialState, action: LogoutAction): LogoutState => {
    switch (action.type) {
        case LogoutActionTypes.LOGOUT:
            return {
                ...state,
                loading: true,
                error: null,
                data: null,
            }
        case LogoutActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            }
        case LogoutActionTypes.LOGOUT_ERROR:
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