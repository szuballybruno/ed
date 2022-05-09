import express, { Application, NextFunction, Request, Response } from 'express';
import { ConstructorSignature } from '../../models/Types';
import { getControllerActionMetadatas } from './XTurboExpressDecorators';

export interface ITurboMiddleware<TActionParams> {

    runMiddlewareAsync: (req: Request, res: Response, options?: EndpointOptionsType, actionParams?: TActionParams) => Promise<TActionParams>;
}

export interface IRouteOptions {
    isPost?: boolean
}

export type ApiActionType<TActionParams> = (params: TActionParams) => Promise<any>;

export class EndpointOptionsType implements IRouteOptions {
    isPublic?: boolean;
    isPost?: boolean;
    isMultipart?: boolean;
}

type MiddlwareFnType = (req: any, res: any, next: any) => void;

export class TurboExpressBuilder<TActionParams> {

    private _port: string;
    private _middlewares: ITurboMiddleware<TActionParams>[];
    private _onError: (e: any, req: Request, res: Response) => void;
    private _onSuccess: (value: any, req: Request, res: Response) => void;
    private _expressMiddlewares: MiddlwareFnType[];
    private _controllers: [ConstructorSignature<any>, any][];

    constructor() {

        this._middlewares = [];
        this._expressMiddlewares = [];
        this._controllers = [];
    }

    setPort(port: string) {

        this._port = port;
        return this as Pick<TurboExpressBuilder<TActionParams>, 'setErrorHandler'>;
    }

    setErrorHandler(onError: (e: any, req: Request, res: Response) => void) {

        this._onError = onError;
        return this as Pick<TurboExpressBuilder<TActionParams>, 'setSuccessHandler'>;
    }

    setSuccessHandler(onSuccess: (value: any, req: Request, res: Response) => void) {

        this._onSuccess = onSuccess;
        return this as Pick<TurboExpressBuilder<TActionParams>, 'setTurboMiddleware'>;
    }

    setTurboMiddleware(middleware: ITurboMiddleware<TActionParams>) {

        this._middlewares.push(middleware);
        return this as Pick<TurboExpressBuilder<TActionParams>, 'addController' | 'setExpressMiddleware'>;
    }

    setExpressMiddleware(middleware: MiddlwareFnType): Pick<TurboExpressBuilder<TActionParams>, 'addController' | 'setExpressMiddleware'> {

        this._expressMiddlewares
            .push(middleware);

        return this;
    }

    addController<TController>(signature: ConstructorSignature<TController>, controller: TController): Pick<TurboExpressBuilder<TActionParams>, 'build' | 'addController'> {

        this._controllers
            .push([signature, controller]);

        return this;
    }

    build() {

        const turboExpress = new TurboExpress<TActionParams>(
            this._middlewares,
            this._expressMiddlewares,
            this._port,
            this._onError,
            this._onSuccess);

        this._controllers
            .forEach(([sign, instance]) => {

                const controllerMetadatas = getControllerActionMetadatas(sign);

                controllerMetadatas
                    .forEach(meta => {

                        const path = meta.metadata.path;

                        console.log(`Adding endpoint: path: ${path}, prop: ${meta.propName}, meta: ${JSON.stringify(meta.metadata)}`);

                        turboExpress
                            .addAPIEndpoint(path, instance[meta.propName], meta.metadata);
                    });
            });

        return turboExpress;
    }
}

export class TurboExpress<TActionParams extends IRouteOptions> {

    private _expressServer: Application;
    private _middlewares: ITurboMiddleware<TActionParams>[];
    private _onError: (e: any, req: Request, res: Response) => void;
    private _onSuccess: (value: any, req: Request, res: Response) => void;
    private _port: string;
    private _onListen: (() => void) | undefined;

    constructor(
        middlewares: ITurboMiddleware<TActionParams>[],
        expressMiddlewares: MiddlwareFnType[],
        port: string,
        onError: (e: any, req: Request, res: Response) => void,
        onSuccess: (value: any, req: Request, res: Response) => void,
        onListen?: () => void) {

        this._middlewares = middlewares;
        this._port = port;
        this._expressServer = express();
        this._onListen = onListen;
        this._onError = onError;
        this._onSuccess = onSuccess;

        expressMiddlewares
            .forEach(x => this._expressServer
                .use(x));
    }

    addAPIEndpoint = (path: string, action: ApiActionType<TActionParams>, options?: EndpointOptionsType) => {

        // async api action handler 
        const asyncStuff = async (req: Request, res: Response, next: NextFunction) => {

            // run middlewares 
            let actionParams = undefined as TActionParams | undefined;

            for (let index = 0; index < this._middlewares.length; index++) {

                const middleware = this._middlewares[index];

                actionParams = await middleware
                    .runMiddlewareAsync(req, res, options, actionParams);
            }

            if (!actionParams)
                throw new Error('Invalid middleware configuration, one middleware should create the action parameters, but it was left as null.');

            // run action 
            return await action(actionParams);
        };

        // create sync wrapper
        const syncActionWrapper = (req: Request, res: Response, next: NextFunction) => {

            asyncStuff(req, res, next)
                .then((returnValue: any) => {

                    this._onSuccess(returnValue, req, res);
                })
                .catch((error: any) => {

                    this._onError(error, req, res);
                });
        };

        // register on express as route 
        if (options?.isPost) {

            this._expressServer.post(path, syncActionWrapper);
        } else {

            this._expressServer.get(path, syncActionWrapper);
        }
    };

    listen() {

        this._expressServer
            .listen(this._port, this._onListen);
    }
}