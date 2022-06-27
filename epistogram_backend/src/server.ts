import { dirname } from 'path';
import 'reflect-metadata'; // needs to be imported for TypeORM
import { fileURLToPath } from 'url';
import { DiscountCode } from './models/entity/DiscountCode';
import { log } from './services/misc/logger';
import { MiscService } from './services/MiscService';
import { ORMConnectionService } from './services/ORMConnectionService/ORMConnectionService';
import { DbConnectionService } from './services/sqlServices/DatabaseConnectionService';
import { SQLConnectionService } from './services/sqlServices/SQLConnectionService';
import './shared/logic/jsExtensions';
import { actionWrapper, initTurboExpress } from './startup/instatiateTurboExpress';
import { instansiateSingletonServices, instatiateServices, ServiceProvider } from './startup/servicesDI';
import { ActionWrapperFunctionType, GetServiceProviderType } from './utilities/XTurboExpress/TurboExpress';

const initalizeAsync = async (getServiceProviderAsync: GetServiceProviderType) => {

    const serviceProvider = await getServiceProviderAsync();

    //
    // SEED DB
    await serviceProvider
        .getService(DbConnectionService)
        .bootstrapDBAsync();

    serviceProvider
        .getService(SQLConnectionService)
        .releaseConnectionClient();
};

const main = async () => {

    log('');
    log('------------- APPLICATION STARTED ----------------');
    log('');

    //
    // GET ROOT DIR
    const rootDir = dirname(fileURLToPath(import.meta.url));

    const singletonServiceProvider = instansiateSingletonServices(rootDir);

    // 
    // INIT SERVICES
    const getServiceProviderAsync = async () => {

        const serviceProvider = instatiateServices(singletonServiceProvider);

        //
        // INIT CONNECTION
        await serviceProvider
            .getService(SQLConnectionService)
            .createConnectionClientAsync();

        await serviceProvider
            .getService(DbConnectionService)
            .connectTypeORM();

        return serviceProvider;
    };

    // 
    // INIT TURBO EXPRESS
    const turboExpress = initTurboExpress(singletonServiceProvider, getServiceProviderAsync);

    // 
    // INIT
    await initalizeAsync(getServiceProviderAsync);

    // 
    // LISTEN (start server)
    turboExpress.listen();
};

await main();