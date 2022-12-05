import { IXGatewayServiceProvider } from "@episto/x-gateway";

type CTAnyArgs<T> = { new(...args: any[]): T };

export class ServiceProvider implements IXGatewayServiceProvider {

    private _services: any;

    constructor(services: any) {

        this._services = {
            ...this._services,
            ...services
        };
    }

    getService<T>(ct: CTAnyArgs<T>) {

        const service = Object
            .values(this._services)
            .firstOrNull(x => (x as any).constructor.name === ct.name) as T;

        if (!service)
            throw new Error(`Service ${ct.name} not found in service provider!`);

        return service;
    }
}