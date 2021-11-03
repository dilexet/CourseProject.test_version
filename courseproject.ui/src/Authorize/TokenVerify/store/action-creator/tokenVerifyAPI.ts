import axios from "axios";
import {TokenVerifyURL} from "../../constants/TokenVerifyURL";
import {TokenVerifyResponse} from "../types/TokenVerifyResponse";

export const tokenVerifyAPi = (url = TokenVerifyURL) => {
    return {
        tokenVerify: async () => await axios.get<TokenVerifyResponse>(url, {withCredentials: true})
    }
}