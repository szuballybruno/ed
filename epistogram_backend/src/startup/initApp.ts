
import { ParametrizedConstructor } from '../services/misc/advancedTypes/ParametrizedConstructor';
import { ORMConnectionService } from '../services/ORMConnectionService/ORMConnectionService';
import { SQLConnectionService } from '../services/sqlServices/SQLConnectionService';
import { DependencyContainer } from '../utilities/XDInjection/XDInjector';
import { getTransientServiceContainer, instansiateSingletonServices, instatiateServices, ServiceProvider } from './servicesDI';

export type UseTransientServicesContextFunction = <T>(fnInTransientContext: (transientProvider: ServiceProvider) => Promise<T>) => Promise<T>;

interface IInitializeTransientProviderService {
    useTransientServicesContextAsync: UseTransientServicesContextFunction;
}

export class ServiceProviderInitializator implements IInitializeTransientProviderService {

    private _singletonProvider: ServiceProvider;
    private _transientServiceContainer: DependencyContainer<ParametrizedConstructor<any>>;

    constructor(
        private _rootDir: string,
        private _isPurgeMode: boolean,
        private _modifySingletons?: (singletonProvider: ServiceProvider) => void) {

        this._singletonProvider = this._initSingletons();
        this._transientServiceContainer = getTransientServiceContainer(this._singletonProvider);
    }

    /**
     * Reutns the singleton provider
     */
    getSingletonProvider() {

        return this._singletonProvider;
    }

    /**
     * Initialie transient services  
     */
    async getInitializedTransientServices() {

        const serviceProvider = instatiateServices(this._transientServiceContainer);

        //
        // INIT CONNECTION
        await serviceProvider
            .getService(SQLConnectionService)
            .createConnectionClientAsync();

        //
        // VALIDATE ORM SCHEMA
        await serviceProvider
            .getService(ORMConnectionService)
            .validateSchemaAsync();

        return serviceProvider;
    }

    /**
     * use an initialized transient
     * service provider context 
     */
    async useTransientServicesContextAsync<T>(fnInTransientContext: (serviceProvider: ServiceProvider) => Promise<T>): Promise<T> {

        const serviceProvider = instatiateServices(this._transientServiceContainer);

        /**
         * Init context 
         */
        await serviceProvider
            .getService(SQLConnectionService)
            .createConnectionClientAsync();

        /**
         * Use context 
         */
        const returnValue = await fnInTransientContext(serviceProvider);

        /**
         * Destroy context
         */
        await serviceProvider
            .getService(SQLConnectionService)
            .releaseConnectionClient();

        return returnValue;
    }

    /**
     * Initialize singleton services 
     */
    private _initSingletons() {

        const singletonServiceProvider = instansiateSingletonServices(this._rootDir);
        if (this._modifySingletons)
            this._modifySingletons(singletonServiceProvider);

        return singletonServiceProvider;
    }
}