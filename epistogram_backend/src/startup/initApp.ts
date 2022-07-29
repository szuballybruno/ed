
import { SQLConnectionService } from '../services/sqlServices/SQLConnectionService';
import { initJsExtensions } from '../shared/logic/jsExtensions';
import { initTurboExpress } from './instatiateTurboExpress';
import { instansiateSingletonServices, instatiateServices } from './servicesDI';

export const initServiceProvider = (rootDir: string) => {

    initJsExtensions();

    const singletonServiceProvider = instansiateSingletonServices(rootDir);

    const getServiceProviderAsync = async () => {

        const serviceProvider = instatiateServices(singletonServiceProvider);

        //
        // INIT CONNECTION
        await serviceProvider
            .getService(SQLConnectionService)
            .createConnectionClientAsync();

        return serviceProvider;
    };

    return { getServiceProviderAsync, singletonServiceProvider };
};