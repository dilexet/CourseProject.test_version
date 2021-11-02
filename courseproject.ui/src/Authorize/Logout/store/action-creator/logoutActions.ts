import {LogoutActionTypes} from "../types/LogoutActionTypes";
import {Dispatch} from "redux";
import {logoutAPI} from "./logoutAPI";
import {LogoutAction} from "../types/LogoutTypes";

export const Logout = () => {
    return async (dispatch: Dispatch<LogoutAction>) => {
        dispatch({type: LogoutActionTypes.LOGOUT})

        await logoutAPI().logout()
            .then(response => {
                    dispatch({type: LogoutActionTypes.LOGOUT_SUCCESS, payload: response.data})
                }
            ).catch(error => {
                if (error.response) {
                    dispatch({
                        type: LogoutActionTypes.LOGOUT_ERROR,
                        payload: error.response.data
                    })
                } else if (error.request) {
                    dispatch({
                        type: LogoutActionTypes.LOGOUT_ERROR,
                        payload: error.request.data
                    })
                } else {
                    dispatch({
                        type: LogoutActionTypes.LOGOUT_ERROR,
                        payload: {status: "error", message: "Server Error"}
                    })
                }
            });
    }
}