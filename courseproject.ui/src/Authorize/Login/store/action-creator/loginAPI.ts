import axios from "axios";
import {LoginURL} from "../../constants/LoginURL";
import {LoginFormValues} from "../../types/LoginFormValues";
import {LoginResponse} from "../types/LoginResponse";

export const loginAPI = (url = LoginURL) => {
    return {
        signIn: async (data: LoginFormValues) => await axios.post<LoginResponse>(url, data, {withCredentials: true})
    }
}