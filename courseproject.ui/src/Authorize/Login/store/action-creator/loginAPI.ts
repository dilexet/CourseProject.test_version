import axios from "axios";
import {LoginURL} from "../../constants/LoginURL";
import {AuthorizeResponse} from "../../../Shared/types/Response";
import {LoginFormValues} from "../../types/LoginFormValues";

export const loginAPI = (url = LoginURL) => {
    return {
        signIn: async (data: LoginFormValues) => await axios.post<AuthorizeResponse>(url, data, {withCredentials: true})
    }
}