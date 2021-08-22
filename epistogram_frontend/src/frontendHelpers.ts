import { ErrorType } from "./models/shared_models/types/sharedTypes";

export const disallowWindowNavigation = () => {
    window.onbeforeunload = (event) => {
        const e = event || window.event;
        // Cancel the event
        e.preventDefault();
        if (e) {
            e.returnValue = ''; // Legacy method for cross browser support
        }
        return ''; // Legacy method for cross browser support
    };
}

export const hasValue = (obj: any) => {

    return (!!obj || obj === false) && obj !== "";
}

export class TypedError extends Error {

    errorType: ErrorType;

    constructor(message: string, errorType: ErrorType) {

        super(message);
        this.errorType = errorType;
    }
}

export const getEventValueCallback = (callback: (value: any) => void) => {

    const inputChangeHandler = (e: React.ChangeEvent<{ value: unknown, name?: string }>) => {

        callback(e.currentTarget.value);
    }

    return inputChangeHandler;
}

export const getErrorTypeByHTTPCode = (code: number): ErrorType => {

    if (code == 400)
        return "bad request";

    if (code == 500)
        return "internal server error";

    if (code == 403)
        return "forbidden";

    return "http error";
}