import { Response } from 'express';
import { logSecondary } from '../services/misc/logger';
import { ICookieOptions, ITurboResponse } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class TurboResponse implements ITurboResponse {

    constructor(private _res: Response) {

    }

    setCookie(key: string, value: string, opts: ICookieOptions): void {

        this._res.cookie(key, value, opts);
    }

    clearCookie(key: string): void {

        this._res.clearCookie(key);
    }

    respond(code: number, data?: any) {

        if (data === undefined) {

            logSecondary('Responding, code: ' + code);

            this
                ._res
                .sendStatus(code);
        } else {

            logSecondary(`Responding with data, code: ${code}`);

            this
                ._res
                .status(code)
                .send(data);
        }
    }
}
