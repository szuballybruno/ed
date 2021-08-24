import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { ErrorType } from "../models/shared_models/types/sharedTypes";
import { log, logError } from "../services/logger";

export const respondOk = (res: Response, data?: any) => {

    data
        ? respond(res, 200, data)
        : respond(res, 200);
};

export const respondForbidden = (res: Response) => {

    respond(res, 403);
};

export const respondBadRequest = (res: Response) => {

    respond(res, 400);
};

export const respondInternalServerError = (res: Response) => {

    respond(res, 500);
};

const respond = (res: Response, code: number, data?: any) => {

    if (data) {

        log("Responding with data, code: " + code);
        res.json(data);
    } else {

        log("Responding, code: " + code);
        res.sendStatus(code);
    }
}

const respondError = (res: Response, msg: string, type: ErrorType) => {

    logError(`Responding error: ${type}: ${msg}`);

    switch (type) {
        case "bad request":
            respondBadRequest(res);
            break;

        case "forbidden":
            respondForbidden(res);
            break;

        case "internal server error":
            respondInternalServerError(res);
            break;

        default:
            break;
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

export const getAsyncActionHandler = (action: (req: Request, res: Response) => Promise<any>) => {

    return (req: Request, res: Response) => {

        handleAsyncAction(req, res, action);
    }
}

export const handleAsyncAction = (req: Request, res: Response, action: (req: Request, res: Response) => Promise<any>) => {

    action(req, res)
        .then((returnValue: any) => respondOk(res, returnValue))
        .catch((error: any) => {

            logError(error);
            respondError(res, error.message, (error.type ?? "internal server error") as ErrorType);
            // next(error);
        });
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