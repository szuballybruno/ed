import { ErrorType } from "./types/sharedTypes";

export default class HttpErrorResponseDTO {

    message: string;
    code: ErrorType;

    constructor(message: string, code: ErrorType) {
        this.message = message;
        this.code = code;
    }
}