import { dirname } from 'path';
import 'reflect-metadata'; // needs to be imported for TypeORM
import { fileURLToPath } from 'url';
import { log } from './services/misc/logger';
import { RecreateDBService } from './services/sqlServices/RecreateDBService';
import { SQLConnectionService } from './services/sqlServices/SQLConnectionService';
import './shared/logic/jsExtensions';
import { initTurboExpress } from './startup/instatiateTurboExpress';
import { instansiateSingletonServices, instatiateServices, ServiceProvider } from './startup/servicesDI';
import { GetServiceProviderType } from './utilities/XTurboExpress/TurboExpress';

const recreateDBAsync = async (getServiceProviderAsync: GetServiceProviderType) => {

    const serviceProvider = await getServiceProviderAsync();

    //
    // SEED DB
    await serviceProvider
        .getService(RecreateDBService)
        .recreateDBAsync();

    serviceProvider
        .getService(SQLConnectionService)
        .releaseConnectionClient();
};

const initServiceProvider = (rootDir: string) => {

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
}

const startServerAsync = async (
    singletonServiceProvider: ServiceProvider,
    getServiceProviderAsync: () => Promise<ServiceProvider>) => {

    // 
    // INIT TURBO EXPRESS
    const turboExpress = initTurboExpress(singletonServiceProvider, getServiceProviderAsync);

    // 
    // LISTEN (start server)
    turboExpress.listen();
}

const main = async () => {

    log('');
    log('------------- APPLICATION STARTED ----------------');
    log('');

    const rootDir = dirname(fileURLToPath(import.meta.url));
    const isPurgeMode = process.argv.any(x => x === '--purge');
    const isShortLife = process.argv.any(x => x === '--shortLife');
    const { getServiceProviderAsync, singletonServiceProvider } = initServiceProvider(rootDir);

    if (isPurgeMode)
        await recreateDBAsync(getServiceProviderAsync);

    if (!isShortLife)
        await startServerAsync(singletonServiceProvider, getServiceProviderAsync);
};

await main();