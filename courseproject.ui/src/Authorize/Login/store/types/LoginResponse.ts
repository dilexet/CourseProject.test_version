import {AuthorizeResponse} from "../../../Shared/types/AuthorizeResponse";
import {ErrorTypes} from "./ErrorTypes";


export interface LoginResponse extends AuthorizeResponse {
    errors?: ErrorTypes;
}