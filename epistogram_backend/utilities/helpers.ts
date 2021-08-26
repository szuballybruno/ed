import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import HttpErrorResponseDTO from "../models/shared_models/HttpErrorResponseDTO";
import { ErrorType } from "../models/shared_models/types/sharedTypes";
import { log, logError } from "../services/misc/logger";

export const getAsyncActionHandler = (action: (req: Request, res: Response) => Promise<any>) => {

    return (req: Request, res: Response) => {

        handleAsyncAction(req, res, action);
    }
}

export const handleAsyncAction = (req: Request, res: Response, action: (req: Request, res: Response) => Promise<any>) => {

    action(req, res)
        .then((returnValue: any) => respond(res, 200, returnValue))
        .catch((error: any) => {

            logError(error);
            respondError(res, error.message, (error.type ?? "internal server error") as ErrorType);
            // next(error);
        });
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

export const respond = (res: Response, code: number, data?: any) => {

    if (data) {

        log("Responding with data, code: " + code);
        res.status(code).send(data);
    } else {

        log("Responding, code: " + code);
        res.sendStatus(code);
    }
}

export const withValue = (obj: any, errorFunc?: () => void) => {

    if (!errorFunc)
        errorFunc = () => { throw new Error("Object has no value!"); };

    if (obj == "" || (!obj && obj != false))
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

    throw new TypedError("Requied filed has no value!", "bad request");
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