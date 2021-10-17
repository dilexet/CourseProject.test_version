import {LoginActionTypes} from "../types/LoginActionTypes";
import {Dispatch} from "redux";
import {LoginAction} from "../types/loginTypes";
import axios from "axios";
import {ILoginModel} from "../types/ILoginModel";

export const sendLogin = (data: ILoginModel) => {
    return async (dispatch: Dispatch<LoginAction>) => {
        try {
            dispatch({type: LoginActionTypes.LOGIN})
            const response = await axios.post("https://localhost:44368/login", data);
            dispatch({type: LoginActionTypes.LOGIN_SUCCESS, payload: response.data})
        } catch (e) {
            dispatch({type: LoginActionTypes.LOGIN_ERROR, payload: "Login or password is invalid"})
        }
    }
}