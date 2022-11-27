import { MiddlewareParams } from "../XGatewayTypes";

export interface IXGatewayMiddlewareInstance<TInParams, TOutParams> {

    runMiddlewareAsync: (params: MiddlewareParams<TInParams>) => Promise<TOutParams>;
}