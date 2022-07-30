
import { SQLConnectionService } from '../services/sqlServices/SQLConnectionService';
import { initJsExtensions } from '../shared/logic/jsExtensions';
import { getTransientServiceContainer, instansiateSingletonServices, instatiateServices } from './servicesDI';

export const initServiceProvider = (rootDir: string) => {

    initJsExtensions();

    const singletonServiceProvider = instansiateSingletonServices(rootDir);
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