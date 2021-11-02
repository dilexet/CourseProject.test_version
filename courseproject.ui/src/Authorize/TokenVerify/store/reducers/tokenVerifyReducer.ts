import {TokenVerifyAction, TokenVerifyState} from "../types/TokenVerifyTypes";
import {TokenVerifyActionTypes} from "../types/TokenVerifyActionTypes";
import {AuthorizeResponse} from "../../../Shared/types/Response";

// TODO: переделать под получение юзера
const initialState: TokenVerifyState = {
    data: null as AuthorizeResponse | null,
    loading: false,
    error: null as AuthorizeResponse | null,
    isAuthorize: false,
}

export const tokenVerifyReducer = (state = initialState, action: TokenVerifyAction): TokenVerifyState => {
    switch (action.type) {
        case TokenVerifyActionTypes.TOKEN_VERIFY:
            return {
                ...state,
                loading: true,
                error: null,
                data: null,
                isAuthorize: false
            }
        case TokenVerifyActionTypes.TOKEN_VERIFY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
                isAuthorize: true
            }
        case TokenVerifyActionTypes.TOKEN_VERIFY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                data: null,
                isAuthorize: false
            }
        default:
            return state;
    }
}