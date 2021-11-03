import axios from "axios";
import {TokenVerifyURL} from "../../constants/TokenVerifyURL";
import {AuthorizeResponse} from "../../../Shared/types/AuthorizeResponse";

export const tokenVerifyAPi = (url = TokenVerifyURL) => {
    return {
        tokenVerify: async () => await axios.post<AuthorizeResponse>(url)
    }
}