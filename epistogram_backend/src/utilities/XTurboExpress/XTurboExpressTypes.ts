import { CookieOptions } from 'express';
import { UploadedFile } from 'express-fileupload';
import { PermissionCodeType } from '../../shared/types/PermissionCodesType';
import { ServiceProvider } from '../../startup/serviceDependencyContainer';
import { ActionParams } from './ActionParams';
import { ITurboExpressLayer } from './ITurboExpressLayer';

export class AuthorizationResult {

    private constructor(
        public state: 'OK' | 'FAILED') {

    }

    static get ok() {

        return new AuthorizationResult('OK');
    }

    static get failed() {

        return new AuthorizationResult('FAILED');
    }
}

export type ControllerActionReturnType = { auth: () => Promise<AuthorizationResult>, action: () => Promise<any> } | Promise<any>;

export type XController<T> = {
    [K in keyof T]: (params: ActionParams) => ControllerActionReturnType;
}

export type ICookieOptions = CookieOptions;

export interface ITurboRequest {
    path: string;
    body: any;
    query: any;
    origin: string;
    files: { [K: string]: UploadedFile };
    getCookie(key: string): string | null;
    hasFiles(): boolean;
    getSingleFile(): UploadedFile;
}

export type ITurboResponse = {
    respond(code: number, data?: any): void;
    setCookie(key: string, value: string, opts: ICookieOptions): void;
    clearCookie(key: string, opts: ICookieOptions): void;
};

export type RegisterEndpointOptsType<TRequest, TResponse> = {
    path: string;
    action: (req: TRequest, res: TResponse) => Promise<void>;
    isPost: boolean;
    controllerSignature: ITurboExpressLayer<any>,
    options: any
}

export type TurboActionType = {
    path: string;
    sign: ITurboExpressLayer<any>;
    propName: string;
    meta: any;
}

export interface IXTurboExpressListener<
    TRequest extends ITurboRequest = ITurboRequest,
    TResponse extends ITurboResponse = ITurboResponse> {

    registerEndpoint(opts: RegisterEndpointOptsType<TRequest, TResponse>): void;
    listen(port: string, callback?: () => void): void;
}

export interface ITurboMiddlewareInstance<TInParams, TRequest, TResponse, TOutParams> {

    runMiddlewareAsync: (params: MiddlewareParams<TInParams, TRequest, TResponse>) => Promise<TOutParams>;
}

export type ITurboMiddleware<TInParams, TRequest, TResponse, TOutParams> = ITurboExpressLayer<ITurboMiddlewareInstance<TInParams, TRequest, TResponse, TOutParams>>

export interface IRouteOptions {
    isPost?: boolean
}

export type MiddlewareParams<TInParams, TRequest, TResponse> = {
    req: TRequest;
    res: TResponse;
    options: EndpointOptionsType;
    inParams: TInParams;
};

export type ApiActionType<TActionParams> = (params: TActionParams) => ControllerActionReturnType;

export class EndpointOptionsType implements IRouteOptions {
    isPublic?: boolean;
    isPost?: boolean;
    isMultipart?: boolean;
    isUnauthorized?: boolean;
    checkPermission?: PermissionCodeType;
}

export type MiddlwareFnType = (req: any, res: any, next: any) => void;

export type GetServiceProviderType = () => Promise<ServiceProvider>;

export type ActionWrapperFunctionType = (serviceProvider: ServiceProvider, action: () => Promise<any>) => Promise<any>;
