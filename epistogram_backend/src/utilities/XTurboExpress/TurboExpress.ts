import express, { Application, NextFunction, Request, Response } from 'express';
import { LoggerService } from '../../services/LoggerService';
import { GlobalConfiguration } from '../../services/misc/GlobalConfiguration';
import { PermissionCodeType } from '../../shared/types/sharedTypes';
import { ErrorWithCode } from '../../shared/types/ErrorWithCode';
import { ServiceProvider } from '../../startup/servicesDI';
import { ITurboExpressLayer } from './ITurboExpressLayer';
import { getControllerActionMetadatas } from './XTurboExpressDecorators';
import { ControllerActionReturnType } from './XTurboExpressTypes';

export interface ITurboMiddlewareInstance<TInParams, TOutParams> {

    runMiddlewareAsync: (params: MiddlewareParams<TInParams>) => Promise<TOutParams>;
}

export type ITurboMiddleware<TInParams, TOutParams> = ITurboExpressLayer<ITurboMiddlewareInstance<TInParams, TOutParams>>

export interface IRouteOptions {
    isPost?: boolean
}

export type MiddlewareParams<TInParams> = {
    req: Request;
    res: Response;
    options: EndpointOptionsType;
    inParams: TInParams;
};

export type ApiActionType<TActionParams> = (params: TActionParams) => Promise<any>;

export class EndpointOptionsType implements IRouteOptions {
    isPublic?: boolean;
    isPost?: boolean;
    isMultipart?: boolean;
    isUnauthorized?: boolean;
    checkPermission?: PermissionCodeType;
}

type MiddlwareFnType = (req: any, res: any, next: any) => void;

export type GetServiceProviderType = () => Promise<ServiceProvider>;

export type ActionWrapperFunctionType = (serviceProvider: ServiceProvider, action: () => Promise<any>) => Promise<any>;

export class TurboExpressBuilder<TActionParams> {

    private _port: string;
    private _middlewares: ITurboMiddleware<any, any>[];
    private _onError: (e: any, req: Request, res: Response) => void;
    private _onSuccess: (value: any, req: Request, res: Response) => void;
    private _expressMiddlewares: MiddlwareFnType[];
    private _controllers: ITurboExpressLayer[];
    private _serviceCreationFunction: GetServiceProviderType;
    private _actionWrapperFunction: ActionWrapperFunctionType;

    constructor(
        private _loggerService: LoggerService,
        private _config: GlobalConfiguration) {

        this._middlewares = [];
        this._expressMiddlewares = [];
        this._controllers = [];
    }

    setServicesCreationFunction(createServices: GetServiceProviderType) {

        this._serviceCreationFunction = createServices;
        return this as Pick<TurboExpressBuilder<TActionParams>, 'addActionWrapperFunction'>;
    }

    addActionWrapperFunction(avFunction: ActionWrapperFunctionType) {

        this._actionWrapperFunction = avFunction;
        return this as Pick<TurboExpressBuilder<TActionParams>, 'setPort'>;
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

    setTurboMiddleware<TInParams, TOutParams>(middleware: ITurboMiddleware<TInParams, TOutParams>):
        Pick<TurboExpressBuilder<TActionParams>, 'setTurboMiddleware' | 'addController' | 'setExpressMiddleware'> {

        this._middlewares
            .push(middleware);

        return this;
    }

    setExpressMiddleware(middleware: MiddlwareFnType): Pick<TurboExpressBuilder<TActionParams>, 'addController' | 'setExpressMiddleware'> {

        this._expressMiddlewares
            .push(middleware);

        return this;
    }

    addController(signature: ITurboExpressLayer): Pick<TurboExpressBuilder<TActionParams>, 'build' | 'addController'> {

        this._controllers
            .push(signature);

        return this;
    }

    build() {

        const turboExpress = new TurboExpress<TActionParams>(
            this._loggerService,
            this._middlewares,
            this._expressMiddlewares,
            this._port,
            this._actionWrapperFunction,
            this._serviceCreationFunction,
            this._onError,
            this._onSuccess);

        this._controllers
            .forEach((sign) => {

                const controllerMetadatas = getControllerActionMetadatas(sign);

                this._loggerService.logScoped('BOOTSTRAP', `Controller: ${sign.name}`);

                controllerMetadatas
                    .orderBy(meta => meta.metadata.isPost + '')
                    .forEach(meta => {

                        const path = meta.metadata.path;

                        this._loggerService.logScoped('BOOTSTRAP', 'SECONDARY', `Adding endpoint ${meta.metadata.isPost ? '[POST]' : '[GET] '} ${path}`);

                        turboExpress
                            .addAPIEndpoint(path, sign, meta.propName, meta.metadata);
                    });
            });

        return turboExpress;
    }
}

export class TurboExpress<TActionParams extends IRouteOptions> {

    private _expressServer: Application;

    constructor(
        private _loggerService: LoggerService,
        private _middlewares: ITurboMiddleware<any, any>[],
        private expressMiddlewares: MiddlwareFnType[],
        private _port: string,
        private _actionWrapper: ActionWrapperFunctionType,
        private _getServiceProviderAsync: GetServiceProviderType,
        private _onError: (e: any, req: Request, res: Response) => void,
        private _onSuccess: (value: any, req: Request, res: Response) => void,
        private _onListen?: () => void) {

        this._expressServer = express();

        expressMiddlewares
            .forEach(x => this._expressServer
                .use(x));
    }

    addAPIEndpoint = (
        path: string,
        controllerSignature: ITurboExpressLayer,
        functionName: string,
        options?: EndpointOptionsType) => {

        /**
         * Handles middleware execution
         */
        const runMiddlewaresAsync = async (req: Request, res: Response, serviceProvider: ServiceProvider) => {

            // run middlewares 
            let prevMiddlewareParam: any = {};

            for (let index = 0; index < this._middlewares.length; index++) {

                const middlewareSignature = this._middlewares[index];

                const middlewareInstance = new middlewareSignature(serviceProvider);

                prevMiddlewareParam = await middlewareInstance
                    .runMiddlewareAsync({
                        req,
                        res,
                        options: options ?? {},
                        inParams: prevMiddlewareParam
                    });
            }

            if (!prevMiddlewareParam)
                throw new Error('Invalid middleware configuration, controller action params is null.');

            return prevMiddlewareParam;
        };

        /**
         * Handle controller action execution 
         */
        const executeControllerAction = async (actionParams: TActionParams, serviceProvider: ServiceProvider) => {

            /**
             * Instantiate controller 
             */
            const controllerInstance = new controllerSignature(serviceProvider);

            /**
             * Get controller action and execute it
             */
            const controllerAction: ApiActionType<TActionParams> = controllerInstance[functionName];
            const boundAction = controllerAction.bind(controllerInstance);
            const controllerActionResultOrData = await boundAction(actionParams);

            /**
             * If controller action returned a ControllerActionReturnType 
             * meaning it has an authentication function,
             * execute the auth function, and only if it passes, 
             * continue, and execute the action funciton, 
             * which returns the data to the client.
             */
            if (this._isAuthResult(controllerActionResultOrData)) {

                const controllerActionResult = controllerActionResultOrData as ControllerActionReturnType;

                /**
                 * Execute auth function. 
                 * It returns an auth res, 
                 * throw exceptions accordingly.
                 */
                const authRes = await controllerActionResult.auth();
                if (authRes.state === 'FAILED')
                    throw new ErrorWithCode('Authorization failed!', 'no permission');

                return await controllerActionResult.action();
            }

            /**
             * If controller action just returns data (OLD SOLUTION) 
             * return the data.
             */
            else {

                return controllerActionResultOrData;
            }
        };

        /**
         * Handle async operations 
         * in the scope of an incoming request
         * - instatiate transient services 
         * - execute middleware
         * - execute action  
         */
        const asyncStuff = async (req: Request, res: Response, next: NextFunction) => {

            this._loggerService
                .log(`${req.path}: REQUEST ARRIVED`);

            /**
             * Instatiate all services, 
             * establish connection to DB
             */
            const serviceProvider = await this._getServiceProviderAsync();

            /**
             * Executes the middlewares, 
             * then the controller action (with action params returned from middlewares) 
             */
            const executeMiddlewaresAndControllerAction = async () => {

                const actionParams = await runMiddlewaresAsync(req, res, serviceProvider);
                return await executeControllerAction(actionParams, serviceProvider);
            };

            /**
             * Execute middlewares, 
             * and controller action in the action wrapper function, 
             * which is an external async wrapper (for flexibility)
             */
            const actionWrapperResult = await this
                ._actionWrapper(serviceProvider, executeMiddlewaresAndControllerAction);

            return actionWrapperResult;
        };

        /**
         * SYNC wrapper for async execution, 
         * this will be supplied directly to Express.js 
         */
        const syncActionWrapper = (req: Request, res: Response, next: NextFunction) => {

            asyncStuff(req, res, next)
                .then((returnValue: any) => {

                    this._onSuccess(returnValue, req, res);
                })
                .catch((error: any) => {

                    this._onError(error, req, res);
                });
        };

        /**
         * Register sync wrapper on Express.js
         */
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

    _isAuthResult(obj: any) {

        const returnObj = obj as ControllerActionReturnType;

        if (!returnObj)
            return false;

        if (!returnObj.auth || !returnObj.action)
            return false;

        if (typeof returnObj.action !== 'function')
            return false;

        if (typeof returnObj.auth !== 'function')
            return false;

        return true;
    }
}