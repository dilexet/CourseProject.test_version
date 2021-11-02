import axios from "axios";
import {RegisterURL} from "../../constants/RegisterURL";
import {AuthorizeResponse} from "../../../Shared/types/Response";
import {RegisterFormValues} from "../../types/RegisterFormValues";

export const registerAPi = (url = RegisterURL) => {
    return {
        signUp: async (data: RegisterFormValues) => await axios.post<AuthorizeResponse>(url, data)
    }
}