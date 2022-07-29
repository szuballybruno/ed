import express, { Application, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { logSecondary } from '../../services/misc/logger';
import { ICookieOptions, ITurboRequest, ITurboResponse, IXTurboExpressListener, RegisterEndpointOptsType } from './XTurboExpressTypes';

export class TurboRequest implements ITurboRequest {

    path: string;
    body: any;
    query: any;
    files: any;

    constructor(private _req: Request) {

        this.body = this._req.body;
        this.query = this._req.query;
        this.path = this._req.path;
        this.files = this._req.files;
    }

    getCookies() {

        const cookieString = (this._req.headers.cookie as string);
        if (!cookieString)
            return [];

        return cookieString
            .split('; ')
            .map(x => ({
                key: x.split('=')[0],
                value: x.split('=')[1]
            }));
    }

    getCookie(key: string) {

        return this.getCookies()
            .filter(x => x.key === key)[0]?.value as string | null;
    }

    hasFiles() {

        return !!this._req.files;
    }

    getSingleFile() {

        if (!this._req.files)
            throw new Error('Request contains no files.');

        // TODO multiple file error check

        return this._req.files.file as UploadedFile;
    }
}

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

export class XTurboExpressListener implements IXTurboExpressListener {

    private _expressServer: Application;
    private _onError: (e: any, req: TurboRequest, res: TurboResponse) => void;
    private _onSuccess: (value: any, req: TurboRequest, res: TurboResponse) => void;

    constructor() {

        this._expressServer = express();
    }

    static create(): Pick<XTurboExpressListener, 'setHandlers'> {

        return new XTurboExpressListener();
    }

    setHandlers(
        onError: (e: any, req: TurboRequest, res: TurboResponse) => void,
        onSuccess: (value: any, req: TurboRequest, res: TurboResponse) => void): Pick<XTurboExpressListener, 'setExpressMiddleware' | 'build'> {

        this._onError = onError;
        this._onSuccess = onSuccess;

        return this;
    }

    setExpressMiddleware(expressMiddleware: any): Pick<XTurboExpressListener, 'setExpressMiddleware' | 'build'> {

        this._expressServer
            .use(expressMiddleware);

        return this;
    }

    build() {

        return this;
    }

    registerEndpoint(opts: RegisterEndpointOptsType<ITurboRequest, ITurboResponse>) {

        /**
         * SYNC wrapper for async execution, 
         * this will be supplied directly to Express.js 
         */
        const syncActionWrapper = (req: TurboRequest, res: TurboResponse) => {

            opts.action(req, res)
                .then((returnValue: any) => {

                    this._onSuccess(returnValue, req, res);
                })
                .catch((error: any) => {

                    this._onError(error, req, res);
                });
        };

        /**
         * Wrapping express 'Request'
         * to conform it to the interface 
         */
        const reqResWrapper = (req: Request, res: Response) => {

            syncActionWrapper(new TurboRequest(req), new TurboResponse(res));
        };

        /**
         * Reg
         */
        if (opts.isPost) {

            this._expressServer.post(opts.path, reqResWrapper);
        } else {

            this._expressServer.get(opts.path, reqResWrapper);
        }
    }

    listen(port: string, callback?: () => void) {

        this._expressServer.listen(port, callback);
    }
}