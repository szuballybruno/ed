import { ErrorType } from "./types/sharedTypes";

export default class HttpErrorResponseDTO {

    message: string;
    errorType: ErrorType;

    constructor(message: string, errorType: ErrorType) {
        this.message = message;
        this.errorType = errorType;
    }
}