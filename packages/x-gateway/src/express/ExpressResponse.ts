import { Response } from 'express';
import { IXCookieOptions } from '../interface/IXCookieOptions';
import { IXGatewayResponse } from '../interface/IXGatewayResponse';

export class ExpressResponse implements IXGatewayResponse {

    constructor(
        private _res: Response) {

    }

    setCookie(key: string, value: string, opts: IXCookieOptions): void {

        this._res.cookie(key, value, opts);
    }

    clearCookie(key: string, opts: IXCookieOptions): void {

        this._res.clearCookie(key, opts);
    }

    respond(code: number, data?: any) {

        if (data === undefined) {

            this
                ._res
                .status(code)
                .send(null);
        } else {

            this
                ._res
                .status(code)
                .send(data);
        }
    }
}
