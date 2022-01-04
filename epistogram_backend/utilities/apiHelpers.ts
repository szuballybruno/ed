import { Application, NextFunction, Request, Response } from "express";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import HttpErrorResponseDTO from "../models/shared_models/HttpErrorResponseDTO";
import { ErrorType, RoleType } from "../models/shared_models/types/sharedTypes";
import { log, logError } from "../services/misc/logger";
import { ActionParams } from "./helpers";

export type ApiActionType = (params: ActionParams) => Promise<any>;

export type EndpointOptionsType = {
    isPublic?: boolean,
    isPost?: boolean,
    isMultipart?: boolean,
    authorize?: RoleType[]
};

export const addAPIEndpoint = (
    authMiddleware: AuthMiddleware,
    expressServer: Application,
    action: ApiActionType,
    path: string,
    options?: EndpointOptionsType) => {

    const syncActionWrapper = authMiddleware
        .getSyncActionWrapper(action, options);

    if (options?.isPost) {

        expressServer.post(path, syncActionWrapper);
    } else {

        expressServer.get(path, syncActionWrapper);
    }
}

export const respond = (res: Response, code: number, data?: any) => {

    if (data === undefined) {

        log("-- Responding, code: " + code);
        res.sendStatus(code);
    } else {

        log("-- Responding with data, code: " + code);
        res.status(code).send(data);
    }
}

export const getAsyncMiddlewareHandler = (wrappedAction: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {

    const wrapperFunction = (wrapperReq: Request, wrapperRes: Response, wrapperNext: NextFunction) => {

        wrappedAction(wrapperReq, wrapperRes, wrapperNext)
            .then(() => wrapperNext())
            .catch((error: any) => {

                logError(error);

                respondError(wrapperRes, error.message, (error.type ?? "internal server error") as ErrorType);
            });
    }

    return wrapperFunction;
}

export const respondError = (res: Response, msg: string, type: ErrorType) => {

    logError(`Responding typed error: Type: ${type} Msg: ${msg}`);

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

        case "under maintenance":
            respond(res, 503, errorDTO);
            break;

        default:
            respond(res, 500, errorDTO);
            break;
    }
}