import { ServiceProvider } from '../../startup/servicesDI';

export interface ITurboExpressLayer<T = any> {

    new(serviceProvider: ServiceProvider): T;
}