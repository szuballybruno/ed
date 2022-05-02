import { ErrorCodeType } from './sharedTypes';

export class VerboseError extends Error {

    code?: ErrorCodeType;

    constructor(message: string, code?: ErrorCodeType) {

        super(message);

        this.code = code;
    }

    toString() {
        return `${this.code}: ${this.message}`;
    }
}