import bodyParser from 'body-parser';
import express, { Application, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import { DomainProviderService } from '../services/DomainProviderService';
import { LoggerService } from '../services/LoggerService';
import { getCORSMiddleware } from '../services/misc/CORSMiddleware';
import { ServiceProviderInitializator } from '../startup/initApp';
import { respondError } from '../startup/initTurboExpressListener';
import { ITurboRequest, ITurboResponse, IXTurboExpressListener, RegisterEndpointOptsType } from '../utilities/XTurboExpress/XTurboExpressTypes';
import { TurboRequest } from './TurboRequest';
import { TurboResponse } from './TurboResponse';

export class XTurboExpressListener implements IXTurboExpressListener {

    private _expressServer: Application;

    constructor(
        private _loggerService: LoggerService,
        private _initializator: ServiceProviderInitializator) {

        this._expressServer = express();

        const getCourseDomains: () => Promise<string[]> = async () => {

            const domains = await this._initializator
                .useTransientServicesContextAsync(async serviceProvider => {

                    const domainPrivider = serviceProvider
                        .getService(DomainProviderService);

                    return await domainPrivider
                        .getAllDomainsAsync();
                });

            return domains;
        };

        this._setExpressMiddleware(getCORSMiddleware(getCourseDomains));
        this._setExpressMiddleware(bodyParser.json({ limit: '32mb' }));
        this._setExpressMiddleware(bodyParser.urlencoded({ limit: '32mb', extended: true }));
        this._setExpressMiddleware(fileUpload());
    }

    registerEndpoint(opts: RegisterEndpointOptsType<ITurboRequest, ITurboResponse>) {

        /**
         * SYNC wrapper for async execution, 
         * this will be supplied directly to Express.js 
         */
        const syncActionWrapper = (req: TurboRequest, res: TurboResponse) => {

            opts.action(req, res)
                .then((returnValue: any) => {

                    this._onSuccess(returnValue, req, res, opts);
                })
                .catch((error: any) => {

                    this._onError(error, req, res, opts);
                });
        };

        /**
         * Wrapping express 'Request'
         * to conform it to the interface 
         */
        const reqResWrapper = (req: Request, res: Response) => {

            syncActionWrapper(new TurboRequest(req), new TurboResponse(res, this._loggerService));
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

    // ------------ PRIVATE

    private _onError(errorin: any, req: ITurboRequest, res: ITurboResponse, opts: RegisterEndpointOptsType<ITurboRequest, ITurboResponse>) {

        const requestPath = req.path;
        const error = errorin as Error;

        this._loggerService.logScoped('ERROR', `---------------- [${opts.controllerSignature.name}/${requestPath}] Failed! ----------------`,);
        this._loggerService.logScoped('ERROR', error.message);
        this._loggerService.logScoped('ERROR', error.stack);

        respondError(res, error);
    }

    private _onSuccess(value: any, req: ITurboRequest, res: ITurboResponse, opts: RegisterEndpointOptsType<ITurboRequest, ITurboResponse>) {

        const requestPath = req.path;

        this._loggerService.logScoped('SERVER', `${opts.controllerSignature.name}/${requestPath}: Succeeded...`);
        res.respond(200, value);
    }

    private _setExpressMiddleware(expressMiddleware: any) {

        this._expressServer
            .use(expressMiddleware);

        return this;
    }
}