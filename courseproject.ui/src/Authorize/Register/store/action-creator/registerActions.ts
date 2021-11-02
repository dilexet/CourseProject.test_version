import {Dispatch} from "redux";
import {RegisterActionTypes} from "../types/RegisterActionTypes";
import {RegisterAction} from "../types/RegisterTypes";
import {RegisterFormValues} from "../../types/RegisterFormValues";
import {registerAPi} from "./registerAPI";

export const SignUp = (data: RegisterFormValues) => {
    return async (dispatch: Dispatch<RegisterAction>) => {

        dispatch({type: RegisterActionTypes.REGISTER})

        await registerAPi().signUp(data)
            .then(response => {
                    console.log(response)
                    dispatch({type: RegisterActionTypes.REGISTER_SUCCESS, payload: response.data})
                }
            ).catch(error => {
                console.log(error)
                if (error.response) {
                    dispatch({
                        type: RegisterActionTypes.REGISTER_ERROR,
                        payload: error.response.data
                    })
                } else if (error.request) {
                    dispatch({
                        type: RegisterActionTypes.REGISTER_ERROR,
                        payload: error.request.data
                    })
                } else {
                    dispatch({
                        type: RegisterActionTypes.REGISTER_ERROR,
                        payload: {status: "error", message: "Server Error"}
                    })
                }
            });
    }
}