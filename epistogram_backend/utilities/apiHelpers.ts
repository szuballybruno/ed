import { NextFunction, Request, Response, Application } from "express";
import HttpErrorResponseDTO from "../models/shared_models/HttpErrorResponseDTO";
import { ErrorType } from "../models/shared_models/types/sharedTypes";
import { getUserIdFromRequest } from "../services/authenticationService";
import { log, logError } from "../services/misc/logger";
import { ActionParamsType } from "./helpers";

export const addAPIEndpoint = (
    expressServer: Application,
    path: string,
    action: ApiActionType,
    options?: EndpointOptionsType) => {

    const opts = options
        ? options
        : {
            isPost: false,
            isPublic: false
        } as EndpointOptionsType;

    const wrappedSyncAction = getAsyncActionHandlerNew(action, opts);

    if (opts.isPost) {

        expressServer.post(path, wrappedSyncAction);
    } else {

        expressServer.get(path, wrappedSyncAction);
    }
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

export type ApiActionType = (params: ActionParamsType) => Promise<any>;
export type EndpointOptionsType = { isPublic?: boolean, isPost?: boolean };

export const getAsyncActionHandlerNew = (wrappedAction: (params: ActionParamsType) => Promise<any>, options: EndpointOptionsType) => {

    const syncActionWrapper = (req: Request, res: Response, next: NextFunction) => {

        const asyncActionWrapper = async () => {

            const userId = options.isPublic ? -1 : await getUserIdFromRequest(req);
            return await wrappedAction({ req, res, next, userId })
        }

        asyncActionWrapper()
            .then((returnValue: any) => {

                respond(res, 200, returnValue)
            })
            .catch((error: any) => {

                logError(error);
                respondError(res, error.message, (error.type ?? "internal server error") as ErrorType);
            });
    }

    return syncActionWrapper;
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