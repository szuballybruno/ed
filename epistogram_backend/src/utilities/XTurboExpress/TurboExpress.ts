import { LoggerService } from '../../services/LoggerService';
import { ErrorWithCode } from '../../shared/types/ErrorWithCode';
import { ServiceProvider } from '../../startup/servicesDI';
import { ITurboExpressLayer } from './ITurboExpressLayer';
import { getControllerActionMetadatas } from './XTurboExpressDecorators';
import { ActionWrapperFunctionType, ApiActionType, ControllerActionReturnType, EndpointOptionsType, GetServiceProviderType, ITurboMiddleware, ITurboRequest, ITurboResponse, IXTurboExpressListener, MiddlwareFnType, TurboActionType } from './XTurboExpressTypes';

export class TurboExpressBuilder<
    TActionParams,
    TRequest extends ITurboRequest,
    TResponse extends ITurboResponse> {

    private _port: string;
    private _middlewares: ITurboMiddleware<any, TRequest, TResponse, any>[];
    private _expressMiddlewares: MiddlwareFnType[];
    private _controllers: ITurboExpressLayer[];
    private _getServiceProvider: GetServiceProviderType;
    private _actionWrapperFunction: ActionWrapperFunctionType;

    constructor(
        private _loggerService: LoggerService,
        private _listener: IXTurboExpressListener<TRequest, TResponse>) {

        this._middlewares = [];
        this._expressMiddlewares = [];
        this._controllers = [];
    }

    setServicesCreationFunction(createServices: GetServiceProviderType) {

        this._getServiceProvider = createServices;
        return this as Pick<TurboExpressBuilder<TActionParams, TRequest, TResponse>, 'addActionWrapperFunction'>;
    }

    addActionWrapperFunction(avFunction: ActionWrapperFunctionType) {

        this._actionWrapperFunction = avFunction;
        return this as Pick<TurboExpressBuilder<TActionParams, TRequest, TResponse>, 'setPort'>;
    }

    setPort(port: string) {

        this._port = port;
        return this as Pick<TurboExpressBuilder<TActionParams, TRequest, TResponse>, 'setTurboMiddleware'>;
    }

    setTurboMiddleware<TInParams, TOutParams>(middleware: ITurboMiddleware<TInParams, TRequest, TResponse, TOutParams>):
        Pick<TurboExpressBuilder<TActionParams, TRequest, TResponse>, 'setTurboMiddleware' | 'addController' | 'setExpressMiddleware'> {

        this._middlewares
            .push(middleware);

        return this;
    }

    setExpressMiddleware(middleware: MiddlwareFnType): Pick<TurboExpressBuilder<TActionParams, TRequest, TResponse>, 'addController' | 'setExpressMiddleware'> {

        this._expressMiddlewares
            .push(middleware);

        return this;
    }

    addController(signature: ITurboExpressLayer): Pick<TurboExpressBuilder<TActionParams, TRequest, TResponse>, 'build' | 'addController'> {

        this._controllers
            .push(signature);

        return this;
    }

    build(): Pick<TurboExpressBuilder<TActionParams, TRequest, TResponse>, 'listen'> {

        this._getActions()
            .forEach(x => this
                ._addAPIEndpoint(x.path, x.sign, x.propName, x.meta));

        return this;
    }

    listen() {

        this._listener
            .listen(this._port);
    }

    // ------------------------- PRIVATE

    private _addAPIEndpoint = (
        path: string,
        controllerSignature: ITurboExpressLayer,
        functionName: string,
        options?: EndpointOptionsType) => {

        /**
         * Handles middleware execution
         */
        const runMiddlewaresAsync = async (req: TRequest, res: TResponse, serviceProvider: ServiceProvider) => {

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
            const boundControllerAction: (params: TActionParams) => ControllerActionReturnType = controllerAction.bind(controllerInstance);
            const controllerActionResultOrData: ControllerActionReturnType = await boundControllerAction(actionParams);

            /**
             * Complicated solution 
             */
            if ((controllerActionResultOrData as any).auth) {

                const controllerActionResult = controllerActionResultOrData as any;

                if (!controllerActionResult.auth)
                    throw new Error('Controller action declaration has no auth block!');

                const authRes = await controllerActionResult.auth();
                if (authRes.state === 'FAILED') {

                    this._loggerService
                        .logScoped('SERVER', 'ERROR', 'Authorization function returned "FAILED" state.');

                    throw new ErrorWithCode('Authorization failed!', 'no permission');
                }

                const actionRes = await controllerActionResult
                    .action();

                return actionRes;
            }

            /**
             * Simple solution
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
        const asyncStuff = async (req: TRequest, res: TResponse) => {

            this._loggerService
                .logScoped('SERVER', `${req.path}: REQUEST ARRIVED`);

            /**
             * Instatiate all services, 
             * establish connection to DB
             */
            const serviceProvider = await this._getServiceProvider();

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
                ._actionWrapperFunction(serviceProvider, executeMiddlewaresAndControllerAction);

            return actionWrapperResult;
        };

        /**
         * Reg endpoint on listener
         */
        this
            ._listener
            .registerEndpoint({
                path,
                action: asyncStuff,
                isPost: !!options?.isPost,
                options,
                controllerSignature
            });
    };

    private _getActions(): TurboActionType[] {

        const actions = this._controllers
            .flatMap((sign) => {

                const controllerMetadatas = getControllerActionMetadatas(sign);

                this._loggerService.logScoped('BOOTSTRAP', `Controller: ${sign.name}`);

                const actions = controllerMetadatas
                    .orderBy(meta => meta.metadata.isPost + '')
                    .map(meta => {

                        const path = meta.metadata.path;

                        this._loggerService.logScoped('BOOTSTRAP', 'SECONDARY', `Adding endpoint ${meta.metadata.isPost ? '[POST]' : '[GET] '} ${path}`);

                        return {
                            path,
                            sign,
                            propName: meta.propName,
                            meta: meta.metadata
                        };
                    });

                return actions;
            });

        return actions;
    }
}