import { Response } from 'express';
import { LoggerService } from '../services/LoggerService';
import { ICookieOptions, ITurboResponse } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class TurboResponse implements ITurboResponse {

    constructor(
        private _res: Response,
        private _loggerService: LoggerService) {

    }

    setCookie(key: string, value: string, opts: ICookieOptions): void {

        this._res.cookie(key, value, opts);
    }

    clearCookie(key: string): void {

        this._res.clearCookie(key);
    }

    respond(code: number, data?: any) {

        if (data === undefined) {

            this._loggerService
                .logScoped('SERVER', 'Responding, code: ' + code);

            this
                ._res
                .status(code)
                .send(null);
        } else {

            this._loggerService
                .logScoped('SERVER', `Responding with data, code: ${code}`);

            this
                ._res
                .status(code)
                .send(data);
        }
    }
}
