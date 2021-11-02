import {LoginActionTypes} from "../types/LoginActionTypes";
import {Dispatch} from "redux";
import {LoginAction} from "../types/LoginTypes";
import {LoginFormValues} from "../../types/LoginFormValues";
import {loginAPI} from "./loginAPI";

export const SignIn = (data: LoginFormValues) => {
    return async (dispatch: Dispatch<LoginAction>) => {
        dispatch({type: LoginActionTypes.LOGIN})

        await loginAPI().signIn(data)
            .then(response => {
                    dispatch({type: LoginActionTypes.LOGIN_SUCCESS, payload: response.data})
                }
            ).catch(error => {
                if (error.response) {
                    dispatch({
                        type: LoginActionTypes.LOGIN_ERROR,
                        payload: error.response.data
                    })
                } else if (error.request) {
                    dispatch({
                        type: LoginActionTypes.LOGIN_ERROR,
                        payload: error.request.data
                    })
                } else {
                    dispatch({
                        type: LoginActionTypes.LOGIN_ERROR,
                        payload: {status: "error", message: "Server Error"}
                    })
                }
            });
    }
}