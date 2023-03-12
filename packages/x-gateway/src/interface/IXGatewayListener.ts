import { RegisterEndpointOptsType } from "../XGatewayTypes";

export interface IXGatewayListener {

    registerEndpoint(opts: RegisterEndpointOptsType): void;
    listen(port: string, callback?: () => void): void;
}