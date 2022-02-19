import { Application, NextFunction, Request, Response } from "express";

export interface ITurboMiddleware<TActionParams, TRouteOptions> {

    runMiddlewareAsync: (req: Request, res: Response, options?: TRouteOptions, actionParams?: TActionParams) => Promise<TActionParams>;
}

export interface IRouteOptions {
    isPost?: boolean
}

export type ApiActionType<TActionParams> = (params: TActionParams) => Promise<any>;

export class TurboExpress<TActionParams, TRouteOptions extends IRouteOptions> {

    private _expressServer: Application;
    private _middlewares: ITurboMiddleware<TActionParams, TRouteOptions>[];
    private _onError: (e: any, req: Request, res: Response) => void;
    private _onSuccess: (value: any, req: Request, res: Response) => void;

    constructor(
        expressServer: Application,
        middlewares: ITurboMiddleware<TActionParams, TRouteOptions>[],
        onError: (e: any, req: Request, res: Response) => void,
        onSuccess: (value: any, req: Request, res: Response) => void) {

        this._expressServer = expressServer;
        this._middlewares = middlewares;
        this._onError = onError;
        this._onSuccess = onSuccess;
    }

    addAPIEndpoint = (path: string, action: ApiActionType<TActionParams>, options?: TRouteOptions) => {

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
                throw new Error("Invalid middleware configuration, one middleware should create the action parameters, but it was left as null.");

            // run action 
            return await action(actionParams);
        }

        // create sync wrapper
        const syncActionWrapper = (req: Request, res: Response, next: NextFunction) => {

            asyncStuff(req, res, next)
                .then((returnValue: any) => {

                    this._onSuccess(returnValue, req, res);
                })
                .catch((error: any) => {

                    this._onError(error, req, res);
                });
        }

        // register on express as route 
        if (options?.isPost) {

            this._expressServer.post(path, syncActionWrapper);
        } else {

            this._expressServer.get(path, syncActionWrapper);
        }
    }
}