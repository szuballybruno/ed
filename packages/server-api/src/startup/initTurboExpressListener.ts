import { HttpErrorResponseDTO } from '@episto/communication';
import { ErrorWithCode } from '@episto/commontypes';
import { ErrorCodeType } from '@episto/commontypes';
import { ITurboResponse } from '../XTurboExpress/XTurboExpressTypes';

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