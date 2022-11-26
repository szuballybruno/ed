import { IXGatewayLayer } from "./IXGatewayLayer";
import { IXGatewayMiddlewareInstance } from "./IXGatewayMiddlewareInstance";

export type IXGatewayMiddleware<TInParams, TOutParams> = IXGatewayLayer<IXGatewayMiddlewareInstance<TInParams, TOutParams>>
