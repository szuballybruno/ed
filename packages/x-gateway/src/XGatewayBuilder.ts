import { IXGatewayLayer } from './interface/IXGatewayLayer';
import { IXGatewayListener } from './interface/IXGatewayListener';
import { IXGatewayMiddleware } from './interface/IXGatewayMiddleware';
import { IXGatewayRequest } from './interface/IXGatewayRequest';
import { IXGatewayResponse } from './interface/IXGatewayResponse';
import { IXGatewayServiceProvider } from './interface/IXGatewayServiceProvider';
import { getControllerActionMetadatas } from './XGatewayDecorators';
import { ActionWrapperFunctionType, ApiActionType, EndpointOptionsType, GetServiceProviderType, MiddlwareFnType, TurboActionType } from './XGatewayTypes';

export class XGatewayBuilder<TActionParams> {

    private _port: string;
    private _middlewares: IXGatewayMiddleware<any, any>[];
    private _expressMiddlewares: MiddlwareFnType[];
    private _controllers: IXGatewayLayer[];
    private _getServiceProvider: GetServiceProviderType;
    private _actionWrapperFunction: ActionWrapperFunctionType;

    constructor(
        private _listener: IXGatewayListener) {

        this._middlewares = [];
        this._expressMiddlewares = [];
        this._controllers = [];
    }

    setServicesCreationFunction(createServices: GetServiceProviderType) {

        this._getServiceProvider = createServices;
        return this as Pick<XGatewayBuilder<TActionParams>, 'addActionWrapperFunction'>;
    }

    addActionWrapperFunction(avFunction: ActionWrapperFunctionType) {

        this._actionWrapperFunction = avFunction;
        return this as Pick<XGatewayBuilder<TActionParams>, 'setPort'>;
    }

    setPort(port: string) {

        this._port = port;
        return this as Pick<XGatewayBuilder<TActionParams>, 'setTurboMiddleware'>;
    }

    setTurboMiddleware<TInParams, TOutParams>(middleware: IXGatewayMiddleware<TInParams, TOutParams>):
        Pick<XGatewayBuilder<TActionParams>, 'setTurboMiddleware' | 'addController' | 'setExpressMiddleware'> {

        this._middlewares
            .push(middleware);

        return this;
    }

    setExpressMiddleware(middleware: MiddlwareFnType): Pick<XGatewayBuilder<TActionParams>, 'addController' | 'setExpressMiddleware'> {

        this._expressMiddlewares
            .push(middleware);

        return this;
    }

    addController(signature: IXGatewayLayer): Pick<XGatewayBuilder<TActionParams>, 'build' | 'addController'> {

        this._controllers
            .push(signature);

        return this;
    }

    build(): Pick<XGatewayBuilder<TActionParams>, 'listen'> {

        this._getActionsFromMetadata()
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
        controllerSignature: IXGatewayLayer,
        functionName: string,
        options?: EndpointOptionsType) => {

        /**
         * Handles middleware execution
         */
        const runMiddlewaresAsync = async (req: IXGatewayRequest, res: IXGatewayResponse, serviceProvider: IXGatewayServiceProvider) => {

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
        const executeControllerAction = async (actionParams: TActionParams, serviceProvider: IXGatewayServiceProvider) => {

            /**
             * Instantiate controller 
             */
            const controllerInstance = new controllerSignature(serviceProvider);

            /**
             * Get controller action and execute it
             */
            const controllerAction: ApiActionType<TActionParams> = controllerInstance[functionName];
            const boundControllerAction: (params: TActionParams) => Promise<any> = controllerAction.bind(controllerInstance);
            const controllerActionResultData: any = await boundControllerAction(actionParams);

            return controllerActionResultData;
        };

        /**
         * Handle async operations 
         * in the scope of an incoming request
         * - instatiate transient services 
         * - execute middleware
         * - execute action  
         */
        const asyncStuff = async (req: IXGatewayRequest, res: IXGatewayResponse) => {

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

    private _getActionsFromMetadata(): TurboActionType[] {

        const actions = this._controllers
            .flatMap((sign) => {

                const controllerMetadatas = getControllerActionMetadatas(sign);

                const actions = controllerMetadatas
                    .orderBy(meta => meta.metadata.isPost + '')
                    .map(meta => {

                        const path = meta.metadata.path;

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