import { ServiceProvider } from '../../startup/serviceDependencyContainer';

export interface ITurboExpressLayer<T = any> {

    new(serviceProvider: ServiceProvider): T;
}