import {LoginActionTypes} from "../types/LoginActionTypes";
import {Dispatch} from "redux";
import {LoginAction} from "../types/LoginTypes";
import {LoginFormValues} from "../../types/LoginFormValues";

export const SignIn = (data: LoginFormValues) => (dispatch: Dispatch<LoginAction>) => {
    dispatch({type: LoginActionTypes.LOGIN})
    const loginCorrect = "gey";
    const passwordCorrect = "12345";

    if (data.Login === loginCorrect && data.Password === passwordCorrect) {
        dispatch({
            type: LoginActionTypes.LOGIN_SUCCESS,
            payload: {status: "success", message: "Sign in success"}
        })
    } else {
        dispatch({
            type: LoginActionTypes.LOGIN_ERROR,
            payload: {status: "error", message: "Login or password invalid"}
        })
    }
}

export const sendLogin = (data: LoginFormValues) => {
    return async (dispatch: Dispatch<LoginAction>) => {
        dispatch({type: LoginActionTypes.LOGIN})

        // await axios.post<AuthorizeResponse>("https://localhost:44368/login", data)
        //     .then(response => {
        //             dispatch({type: LoginActionTypes.LOGIN_SUCCESS, payload: response.data})
        //         }
        //     ).catch(error => {
        //         if (error.response) {
        //             dispatch({
        //                 type: LoginActionTypes.LOGIN_ERROR,
        //                 payload: error.response.data
        //             })
        //         } else if (error.request) {
        //             dispatch({
        //                 type: LoginActionTypes.LOGIN_ERROR,
        //                 payload: error.request.data
        //             })
        //         } else {
        //             dispatch({type: LoginActionTypes.LOGIN_ERROR, payload: error})
        //         }
        //     });
    }
}