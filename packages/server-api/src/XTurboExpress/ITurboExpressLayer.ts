import { ServiceProvider } from "../startup/ServiceProvider";

export interface ITurboExpressLayer<T = any> {

    new(serviceProvider: ServiceProvider): T;
}