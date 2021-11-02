import axios from "axios";
import {LogoutURL} from "../../constants/LogoutURL";
import {AuthorizeResponse} from "../../../Shared/types/Response";

export const logoutAPI = (url = LogoutURL) => {
    return {
        logout: async () => await axios.post<AuthorizeResponse>(url, {withCredentials: true})
    }
}