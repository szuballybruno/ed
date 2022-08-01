import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { LoggerService } from '../services/LoggerService';
import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import HttpErrorResponseDTO from '../shared/dtos/HttpErrorResponseDTO';
import { ErrorWithCode } from '../shared/types/ErrorWithCode';
import { ErrorCodeType } from '../shared/types/sharedTypes';
import { XTurboExpressListener } from '../utilities/XTurboExpress/XTurboExpressListener';
import { ITurboRequest, ITurboResponse, IXTurboExpressListener } from '../utilities/XTurboExpress/XTurboExpressTypes';
import { getCORSMiddleware } from './../services/misc/middlewareService';

export const respondError = (res: ITurboResponse, error: Error) => {

    const errorCode = ((error as ErrorWithCode).code ?? 'internal server error') as ErrorCodeType;

    const errorDTO: HttpErrorResponseDTO = {
        code: errorCode,
        message: '' // do not send messages
    };

    switch (errorCode) {
        case 'bad request':
            res.respond(400, errorDTO);
            break;

        case 'forbidden':
            res.respond(403, errorDTO);
            break;

        case 'internal server error':
            res.respond(500, errorDTO);
            break;

        case 'under maintenance':
            res.respond(503, errorDTO);
            break;

        default:
            res.respond(500, errorDTO);
            break;
    }
};

export const initTurboExpressListener = (globalConfig: GlobalConfiguration, loggerService: LoggerService): IXTurboExpressListener => {

    /**
     * Error 
     */
    const onActionError = (errorin: any, req: ITurboRequest, res: ITurboResponse) => {

        const requestPath = req.path;
        const error = errorin as Error;

        loggerService.logScoped('GENERIC', 'ERROR', `---------------- [${requestPath}] Failed! ----------------`,);
        loggerService.logScoped('GENERIC', 'ERROR', error.message);
        loggerService.logScoped('GENERIC', 'ERROR', error.stack);

        respondError(res, error);
    };

    /**
     * Success 
     */
    const onActionSuccess = (value: any, req: ITurboRequest, res: ITurboResponse) => {

        const requestPath = req.path;

        loggerService.logScoped('GENERIC', `${requestPath}: Succeeded...`);
        res.respond(200, value);
    };

    /**
     * Create listener 
     */
    const listener = XTurboExpressListener
        .create()
        .setHandlers(onActionError, onActionSuccess)
        .setExpressMiddleware(getCORSMiddleware(globalConfig))
        .setExpressMiddleware(bodyParser.json({ limit: '32mb' }))
        .setExpressMiddleware(bodyParser.urlencoded({ limit: '32mb', extended: true }))
        .setExpressMiddleware(fileUpload())
        .build();

    return listener;
};