import { dirname } from 'path';
import 'reflect-metadata'; // needs to be imported for TypeORM
import { fileURLToPath } from 'url';
import { GlobalConfiguration } from './services/misc/GlobalConfiguration';
import { log } from './services/misc/logger';
import { CreateDBService } from './services/sqlServices/CreateDBService';
import { RecreateDBService } from './services/sqlServices/RecreateDBService';
import { SQLConnectionService } from './services/sqlServices/SQLConnectionService';
import './shared/logic/jsExtensions';
import { initServiceProvider } from './startup/initApp';
import { initTurboExpress } from './startup/instatiateTurboExpress';
import { ServiceProvider } from './startup/servicesDI';
import { snoozeAsync } from './utilities/helpers';
import { GetServiceProviderType } from './utilities/XTurboExpress/TurboExpress';

const rootDir = dirname(fileURLToPath(import.meta.url));

const recreateDBAsync = async (getServiceProviderAsync: GetServiceProviderType) => {

    const serviceProvider = await getServiceProviderAsync();

    // override logging scopes to show bootstrap
    serviceProvider
        .getService(GlobalConfiguration)
        .overrideLogScopes(['BOOTSTRAP']);

    //
    // SEED DB
    await serviceProvider
        .getService(RecreateDBService)
        .recreateDBAsync();

    serviceProvider
        .getService(SQLConnectionService)
        .releaseConnectionClient();
};

const lightRecreateDBAsync = async (getServiceProviderAsync: GetServiceProviderType) => {

    const serviceProvider = await getServiceProviderAsync();

    // override logging scopes to show bootstrap
    serviceProvider
        .getService(GlobalConfiguration)
        .overrideLogScopes(['BOOTSTRAP']);

    await serviceProvider
        .getService(CreateDBService)
        .createDatabaseSchemaAsync(false);

    serviceProvider
        .getService(SQLConnectionService)
        .releaseConnectionClient();
};

const startServerAsync = async (
    singletonServiceProvider: ServiceProvider,
    getServiceProviderAsync: () => Promise<ServiceProvider>) => {

    // 
    // INIT TURBO EXPRESS
    const turboExpress = initTurboExpress(singletonServiceProvider, getServiceProviderAsync);

    // 
    // LISTEN (start server)
    turboExpress.listen();
};

const main = async () => {

    log('');
    log('------------- APPLICATION STARTED ----------------');
    log('');

    const isPurgeMode = process.argv.any(x => x === '--purge');
    const isLightRecreateMode = process.argv.any(x => x === '--lightRecreate');
    const isShortLife = process.argv.any(x => x === '--shortLife');
    const isKeepAlive = process.argv.any(x => x === '--keepAlive');

    log(`MODE FLAGS: [${isPurgeMode ? 'PURGE' : ''}${isLightRecreateMode ? 'LIGHT RECREATE' : ''}${isShortLife ? 'SHORT LIFE' : ''}]`);

    const { getServiceProviderAsync, singletonServiceProvider } = initServiceProvider(rootDir);

    if (isPurgeMode)
        await recreateDBAsync(getServiceProviderAsync);

    if (isLightRecreateMode)
        await lightRecreateDBAsync(getServiceProviderAsync);

    if (isKeepAlive)
        await snoozeAsync(9999999);

    if (!isShortLife)
        await startServerAsync(singletonServiceProvider, getServiceProviderAsync);
};

main();