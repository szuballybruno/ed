import { ConstructorSignature } from "@episto/xcore";

export interface IXGatewayServiceProvider {
    getService<T>(signature: ConstructorSignature<T, any[]>): T;
}