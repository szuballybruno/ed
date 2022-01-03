import { NextFunction, Request, Response, Application } from "express";
import { AccessTokenPayload } from "../models/DTOs/AccessTokenPayload";
import HttpErrorResponseDTO from "../models/shared_models/HttpErrorResponseDTO";
import { ErrorType } from "../models/shared_models/types/sharedTypes";
import { GlobalConfiguration } from "../services/misc/GlobalConfiguration";
import { log, logError } from "../services/misc/logger";
import { ActionParams, getAuthTokenFromRequest } from "./helpers";

export const addAPIEndpoint = (
    config: GlobalConfiguration,
    getRequestAccessTokenPayload: (accessToken: string) => AccessTokenPayload,
    expressServer: Application,
    path: string,
    action: ApiActionType,
    options?: EndpointOptionsType) => {

    const opts = options
        ? options
        : {
            isPost: false,
            isPublic: false,
            isMultipart: false
        } as EndpointOptionsType;

    const syncActionWrapper = (req: Request, res: Response, next: NextFunction) => {

        const requestPath = req.path;

        const asyncActionWrapper = async () => {

            const accessToken = getAuthTokenFromRequest(req, config);

            const userId = opts.isPublic
                ? -1
                : getRequestAccessTokenPayload(accessToken).userId;

            const actionParams = new ActionParams(req, res, next, userId, !!opts.isMultipart);

            return await action(actionParams);
        }

        asyncActionWrapper()
            .then((returnValue: any) => {

                log(`${requestPath}: Succeeded...`);
                respond(res, 200, returnValue)
            })
            .catch((error: any) => {

                log(`${requestPath}: Failed...`);
                logError(error);
                respondError(res, error.message, (error.type ?? "internal server error") as ErrorType);
            });
    }

    if (opts.isPost) {

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

export type ApiActionType = (params: ActionParams) => Promise<any>;
export type EndpointOptionsType = { isPublic?: boolean, isPost?: boolean, isMultipart?: boolean };

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