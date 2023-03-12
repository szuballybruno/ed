import { IXGatewayServiceProvider } from "./IXGatewayServiceProvider";

export interface IXGatewayLayer<T = any> {

    new(serviceProvider: IXGatewayServiceProvider): T;
}