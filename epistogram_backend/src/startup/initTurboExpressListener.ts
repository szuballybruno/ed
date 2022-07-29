import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { logError, logSecondary } from '../services/misc/logger';
import HttpErrorResponseDTO from '../shared/dtos/HttpErrorResponseDTO';
import { ErrorWithCode } from '../shared/types/ErrorWithCode';
import { ErrorCodeType } from '../shared/types/sharedTypes';
import { XTurboExpressListener } from '../utilities/XTurboExpress/XTurboExpressListener';
import { ITurboRequest, ITurboResponse, IXTurboExpressListener } from '../utilities/XTurboExpress/XTurboExpressTypes';
import { getCORSMiddleware } from './../services/misc/middlewareService';

export const initTurboExpressListener = (globalConfig: GlobalConfiguration): IXTurboExpressListener => {

    const respondError = (res: ITurboResponse, msg: string, code: ErrorCodeType) => {

        logSecondary(`Responding typed error: Type: ${code} Msg: ${msg}`);
    
        const errorDTO = {
            code: code,
            message: msg
        } as HttpErrorResponseDTO;
    
        switch (code) {
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

    /**
     * Error 
     */
    const onActionError = (errorin: any, req: ITurboRequest, res: ITurboResponse) => {

        const requestPath = req.path;
        const error = errorin as Error;
    
        logError(`---------------- [${requestPath}] Failed! ----------------`);
        // logError(error.message);
        logError(error.stack);
    
        respondError(res, '', ((error as ErrorWithCode).code ?? 'internal server error') as ErrorCodeType);
    };
    
    /**
     * Success 
     */
    const onActionSuccess = (value: any, req: ITurboRequest, res: ITurboResponse) => {
    
        const requestPath = req.path;
    
        logSecondary(`${requestPath}: Succeeded...`);
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