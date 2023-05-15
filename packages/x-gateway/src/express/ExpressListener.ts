import bodyParser from 'body-parser';
import express, { Application, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import { IXGatewayListener } from '../interface/IXGatewayListener';
import { IXGatewayRequest } from '../interface/IXGatewayRequest';
import { IXGatewayResponse } from '../interface/IXGatewayResponse';
import { GatewaySuccessDataType, GatewayErrorDataType, RegisterEndpointOptsType } from '../XGatewayTypes';
import { ExpressRequest } from './ExpressRequest';
import { ExpressResponse } from './ExpressResponse';

export class ExpressListener implements IXGatewayListener {

    private _expressServer: Application;

    constructor(
        private _onSuccessCallback: (data: GatewaySuccessDataType) => void,
        private _onErrorCallback: (data: GatewayErrorDataType) => void,
        corsMiddleware: any) {

        this._expressServer = express();

        this._setExpressMiddleware(corsMiddleware);
        this._setExpressMiddleware(bodyParser.json({ limit: '32mb' }));
        this._setExpressMiddleware(bodyParser.urlencoded({ limit: '32mb', extended: true }));
        this._setExpressMiddleware(fileUpload());
    }

    registerEndpoint(opts: RegisterEndpointOptsType<IXGatewayRequest, IXGatewayResponse>) {

        /**
         * SYNC wrapper for async execution, 
         * this will be supplied directly to Express.js 
         */
        const syncActionWrapper = (req: ExpressRequest, res: ExpressResponse) => {

            opts.action(req, res)
                .then((returnValue: any) => {

                    this._onSuccess({ value: returnValue, req, res, opts });
                })
                .catch((error: any) => {

                    this._onError({ errorin: error, req, res, opts });
                });
        };

        /**
         * Wrapping express 'Request'
         * to conform it to the interface 
         */
        const reqResWrapper = (req: Request, res: Response) => {

            syncActionWrapper(new ExpressRequest(req), new ExpressResponse(res));
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

        // handle 404
        this
            ._expressServer
            .use('/', (req, res) => {

                console.error(`-- 404 recieved -- path: ${req.path}`);
                res
                    .status(404)
                    .send(null);
            });

        // listen
        this
            ._expressServer
            .listen(port, callback);
    }

    // ------------ PRIVATE

    private _onError(data: GatewayErrorDataType) {

        this._setErrorResponse(data.res, data.errorin);
        this._onErrorCallback(data);
    }

    private _onSuccess(data: GatewaySuccessDataType) {

        this._onSuccessCallback(data);
        data.res.respond(200, data.value);
    }

    private _setErrorResponse = (res: IXGatewayResponse, error: any) => {

        const errorCode = error?.code ?? 'internal server error';
        const errorMessage = error?.message ?? 'internal server error';

        const errorDTO = {
            code: errorCode,
            message: errorMessage
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

    private _setExpressMiddleware(expressMiddleware: any) {

        this._expressServer
            .use(expressMiddleware);

        return this;
    }
}