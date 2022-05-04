import { ErrorCodeType } from './sharedTypes';

export class VerboseError extends Error {

    // intentionally nullable
    // makes casting normal exception easier
    code?: ErrorCodeType;

    constructor(code: ErrorCodeType) 
    constructor(message: string, code: ErrorCodeType) 
    constructor(messageOrCode: string | ErrorCodeType, code?: ErrorCodeType) {

        super(code ? messageOrCode : `Error code: ${messageOrCode}`);

        this.code = code ? code : messageOrCode as ErrorCodeType;
    }

    toString() {
        return `${this.code}: ${this.message}`;
    }
}