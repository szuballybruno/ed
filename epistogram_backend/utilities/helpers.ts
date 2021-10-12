import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import HttpErrorResponseDTO from "../models/shared_models/HttpErrorResponseDTO";
import { ErrorType } from "../models/shared_models/types/sharedTypes";
import { log, logError } from "../services/misc/logger";

export const getAsyncActionHandler = (wrappedAction: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {

    const wrapperFunction = (req: Request, res: Response, next: NextFunction) => {

        wrappedAction(req, res, next)
            .then((returnValue: any) => respond(res, 200, returnValue))
            .catch((error: any) => {

                logError("Async action error: " + error.message);

                respondError(res, error.message, (error.type ?? "internal server error") as ErrorType);
            });
    }

    return wrapperFunction;
}

export const getAsyncMiddlewareHandler = (wrappedAction: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {

    const wrapperFunction = (req: Request, res: Response, next: NextFunction) => {

        wrappedAction(req, res, next)
            .then(() => next())
            .catch((error: any) => {

                logError("Middleware error: " + error.message);

                respondError(res, error.message, (error.type ?? "internal server error") as ErrorType);
            });
    }

    return wrapperFunction;
}

export function replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find, 'g'), replace);
}

const respondError = (res: Response, msg: string, type: ErrorType) => {

    logError(`Responding error: ${type}: ${msg}`);

    const errorDTO = {
        errorType: type,
        message: msg
    } as HttpErrorResponseDTO;

    switch (type) {
        case "bad request":
            respond(res, 400, errorDTO);
            break;

        case "forbidden":
            respond(res, 403, errorDTO);
            break;

        case "internal server error":
            respond(res, 500, errorDTO);
            break;

        default:
            break;
    }
}

export const throwNotImplemented = () => {

    throw new Error("Not implemented!");
}

export const navPropNotNull = (prop: any) => {

    withValue(prop, () => { throw new Error("Navigation property was null, or undefined. This could be caused by an improper or missing join.") });
}

export const respond = (res: Response, code: number, data?: any) => {

    if (data === undefined) {

        log("Responding, code: " + code);
        res.sendStatus(code);
    } else {

        log("Responding with data, code: " + code);
        res.status(code).send(data);
    }
}

export const hasValue = (obj: any) => {

    if (obj === "")
        return false;

    if (obj === undefined)
        return false;

    if (obj === null)
        return false;

    return true;
}

export const withValue = (obj: any, errorFunc?: () => void) => {

    if (!errorFunc)
        errorFunc = () => { throw new Error("Object has no value!"); };

    if (!hasValue(obj))
        errorFunc();

    return obj;
}

export const requestHasFiles = (req: Request) => {

    return !!req.files;
}

export const getSingleFileFromRequest = (req: Request) => {

    if (!req.files)
        throw new TypedError("Request contains no files.", "bad request");

    // TODO multiple file error check

    return req.files.file as UploadedFile;
}

export const withValueOrBadRequest = (obj: any) => withValue(obj, () => {

    throw new TypedError("Requied field has no value!", "bad request");
});

export const getBearerTokenFromRequest = (req: Request) => {

    const authHeader = req.headers.authorization;
    return authHeader?.split(' ')[1];
}

export const getCookies = (req: Request) => {

    const cookieString = (req.headers.cookie as string);
    if (!cookieString)
        return [];

    return cookieString
        .split('; ')
        .map(x => ({
            key: x.split("=")[0],
            value: x.split("=")[1]
        }));
}

export const getCookie = (req: Request, key: string) => getCookies(req).filter(x => x.key == key)[0];

export class TypedError extends Error {

    type: ErrorType;

    constructor(msg: string, type: ErrorType) {

        super(msg);

        this.type = type;

        logError("Error thrown: " + this.toString());
    }

    toString() {
        return `${this.type}: ${this.message}`;
    }
}