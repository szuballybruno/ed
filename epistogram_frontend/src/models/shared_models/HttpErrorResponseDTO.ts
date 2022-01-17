import { ErrorCodeType } from "./types/sharedTypes";

export default class HttpErrorResponseDTO {

    message: string;
    code: ErrorCodeType;

    constructor(message: string, code: ErrorCodeType) {
        this.message = message;
        this.code = code;
    }
}