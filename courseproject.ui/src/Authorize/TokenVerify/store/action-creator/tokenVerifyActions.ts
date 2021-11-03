import {Dispatch} from "redux";
import {tokenVerifyAPi} from "./tokenVerifyAPI";
import {TokenVerifyAction} from "../types/TokenVerifyTypes";
import {TokenVerifyActionTypes} from "../types/TokenVerifyActionTypes";

// TODO: вызывать в App, но вместо прокидывания в пропсы, создать контекст
export const TokenVerify = () => {
    return async (dispatch: Dispatch<TokenVerifyAction>) => {

        dispatch({type: TokenVerifyActionTypes.TOKEN_VERIFY})

        await tokenVerifyAPi().tokenVerify()
            .then(response => {
                    console.log(response)
                    dispatch({
                        type: TokenVerifyActionTypes.TOKEN_VERIFY_SUCCESS,
                        payload: response.data
                    })
                }
            ).catch(error => {
                console.log(error)
                if (error.response) {
                    dispatch({
                        type: TokenVerifyActionTypes.TOKEN_VERIFY_ERROR,
                        payload: error.response.data
                    })
                } else if (error.request) {
                    dispatch({
                        type: TokenVerifyActionTypes.TOKEN_VERIFY_ERROR,
                        payload: error.request.data
                    })
                } else {
                    dispatch({
                        type: TokenVerifyActionTypes.TOKEN_VERIFY_ERROR,
                        payload: {status: "error", message: "Server Error"}
                    })
                }
            });
    }
}