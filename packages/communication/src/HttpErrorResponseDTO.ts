import { ErrorCodeType } from "@episto/commontypes";

export class HttpErrorResponseDTO {

    message: string;
    code: ErrorCodeType;

    constructor(message: string, code: ErrorCodeType) {
        this.message = message;
        this.code = code;
    }
}