
import { SQLConnectionService } from '../services/sqlServices/SQLConnectionService';
import { initJsExtensions } from '../shared/logic/jsExtensions';
import { getTransientServiceContainer, instansiateSingletonServices, instatiateServices, ServiceProvider } from './servicesDI';

export const initServiceProvider = (rootDir: string, modifySingletons?: (singletonProvider: ServiceProvider) => void) => {

    initJsExtensions();

    const singletonServiceProvider = instansiateSingletonServices(rootDir);
    if (modifySingletons)
        modifySingletons(singletonServiceProvider);
        
    const transientServiceContainer = getTransientServiceContainer(singletonServiceProvider);

    const getServiceProviderAsync = async () => {

        const serviceProvider = instatiateServices(transientServiceContainer);

        //
        // INIT CONNECTION
        await serviceProvider
            .getService(SQLConnectionService)
            .createConnectionClientAsync();

        return serviceProvider;
    };

    return { getServiceProviderAsync, singletonServiceProvider };
};