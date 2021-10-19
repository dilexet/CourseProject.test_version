import {Dispatch} from "redux";
import axios from "axios";
import {RegisterActionTypes} from "../types/RegisterActionTypes";
import {RegisterAction} from "../types/RegisterTypes";
import {RegisterFormValues} from "../../types/RegisterFormValues";

export const sendLogin = (data: RegisterFormValues) => {
    return async (dispatch: Dispatch<RegisterAction>) => {
        try {
            dispatch({type: RegisterActionTypes.REGISTER})
            const response = await axios.post("https://localhost:44368/register", data);
            dispatch({type: RegisterActionTypes.REGISTER_SUCCESS, payload: response.data})
        } catch (e) {
            dispatch({type: RegisterActionTypes.REGISTER_ERROR, payload: "User already exists"})
        }
    }
}