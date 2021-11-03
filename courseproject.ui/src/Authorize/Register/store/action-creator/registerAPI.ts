import axios from "axios";
import {RegisterURL} from "../../constants/RegisterURL";
import {RegisterFormValues} from "../../types/RegisterFormValues";
import {RegisterResponse} from "../types/RegisterResponse";

export const registerAPi = (url = RegisterURL) => {
    return {
        signUp: async (data: RegisterFormValues) => await axios.post<RegisterResponse>(url, data)
    }
}