import { ConstructorSignature } from "@episto/x-core";

export interface IXGatewayServiceProvider {
    getService<T>(signature: ConstructorSignature<T, any[]>): T;
}