import axios from "axios";
import {LogoutURL} from "../../constants/LogoutURL";
import {AuthorizeResponse} from "../../../Shared/types/AuthorizeResponse";

export const logoutAPI = (url = LogoutURL) => {
    return {
        logout: async () => await axios.get<AuthorizeResponse>(url, {withCredentials: true})
    }
}