import { IXGatewayLayer } from './interface/IXGatewayLayer';
import { IXGatewayRequest } from './interface/IXGatewayRequest';
import { IXGatewayResponse } from './interface/IXGatewayResponse';
import { IXGatewayServiceProvider } from './interface/IXGatewayServiceProvider';

export type RegisterEndpointOptsType<TRequest = IXGatewayRequest, TResponse = IXGatewayResponse> = {
    path: string;
    action: (req: TRequest, res: TResponse) => Promise<void>;
    isPost: boolean;
    controllerSignature: IXGatewayLayer<any>,
    options: any
}

export type GatewayErrorDataType = {
    errorin: any;
    req: IXGatewayRequest;
    res: IXGatewayResponse;
    opts: RegisterEndpointOptsType<IXGatewayRequest, IXGatewayResponse>;
}

export type GatewaySuccessDataType = {
    value: any;
    req: IXGatewayRequest;
    res: IXGatewayResponse;
    opts: RegisterEndpointOptsType<IXGatewayRequest, IXGatewayResponse>;
}

export type TurboActionType = {
    path: string;
    sign: IXGatewayLayer<any>;
    propName: string;
    meta: any;
}
export interface IRouteOptions {
    isPost?: boolean
}

export type MiddlewareParams<TInParams> = {
    req: IXGatewayRequest;
    res: IXGatewayResponse;
    options: EndpointOptionsType;
    inParams: TInParams;
};

export type ApiActionType<TActionParams> = (params: TActionParams) => Promise<any>;

export class EndpointOptionsType implements IRouteOptions {
    isPublic?: boolean;
    isPost?: boolean;
    isUnauthorized?: boolean;
    isCompanyBound?: boolean;
}

export type MiddlwareFnType = (req: any, res: any, next: any) => void;

export type GetServiceProviderType = () => Promise<IXGatewayServiceProvider>;

export type ActionWrapperFunctionType = (serviceProvider: IXGatewayServiceProvider, action: () => Promise<any>) => Promise<any>;
