import {AuthorizeResponse} from "../../../Shared/types/AuthorizeResponse";
import {ErrorTypes} from "./ErrorTypes";


export interface RegisterResponse extends AuthorizeResponse {
    errors?: ErrorTypes;
}