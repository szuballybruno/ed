import { NextFunction, Request, Response } from 'express';
import { logError, logSecondary } from '../services/misc/logger';
import HttpErrorResponseDTO from '../shared/dtos/HttpErrorResponseDTO';
import { ErrorCodeType } from '../shared/types/sharedTypes';
import { VerboseError } from '../shared/types/VerboseError';

export const onActionError = (errorin: any, req: Request, res: Response) => {

    const requestPath = req.path;
    const error = errorin as Error;

    logError(`---------------- [${requestPath}] Failed! ----------------`);
    // logError(error.message);
    logError(error.stack);

    respondError(res, '', ((error as VerboseError).code ?? 'internal server error') as ErrorCodeType);
};

export const onActionSuccess = (value: any, req: Request, res: Response) => {

    const requestPath = req.path;

    logSecondary(`${requestPath}: Succeeded...`);
    respond(res, 200, value);
};

export const respond = (res: Response, code: number, data?: any) => {

    if (data === undefined) {

        logSecondary('Responding, code: ' + code);
        res.sendStatus(code);
    } else {

        logSecondary(`Responding with data, code: ${code}`);
        res.status(code)
            .send(data);
    }
};

export const getAsyncMiddlewareHandler = (wrappedAction: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {

    const wrapperFunction = (wrapperReq: Request, wrapperRes: Response, wrapperNext: NextFunction) => {

        wrappedAction(wrapperReq, wrapperRes, wrapperNext)
            .then(() => wrapperNext())
            .catch((error: any) => {

                logError(error);
                respondError(wrapperRes, error.message, ((error as VerboseError).code ?? 'internal server error') as ErrorCodeType);
            });
    };

    return wrapperFunction;
};

export const respondError = (res: Response, msg: string, code: ErrorCodeType) => {

    logSecondary(`Responding typed error: Type: ${code} Msg: ${msg}`);

    const errorDTO = {
        code: code,
        message: msg
    } as HttpErrorResponseDTO;

    switch (code) {
        case 'bad request':
            respond(res, 400, errorDTO);
            break;

        case 'forbidden':
            respond(res, 403, errorDTO);
            break;

        case 'internal server error':
            respond(res, 500, errorDTO);
            break;

        case 'under maintenance':
            respond(res, 503, errorDTO);
            break;

        default:
            respond(res, 500, errorDTO);
            break;
    }
};