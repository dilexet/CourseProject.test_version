export interface AuthorizeResponse {
    code?: number;
    status: string;
    message: string;
    data?: object;
}