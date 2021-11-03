import {AuthorizeResponse} from "../../../Shared/types/AuthorizeResponse";
import {UserType} from "../../../Shared/types/UserType";

export interface TokenVerifyResponse extends AuthorizeResponse {
    data?: UserType;
}