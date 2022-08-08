import { dirname } from 'path';
import 'reflect-metadata'; // needs to be imported for TypeORM
import { fileURLToPath } from 'url';
import { LoggerService } from './services/LoggerService';
import { GlobalConfiguration } from './services/misc/GlobalConfiguration';
import { log } from './services/misc/logger';
import { CreateDBService } from './services/sqlServices/CreateDBService';
import { SQLConnectionService } from './services/sqlServices/SQLConnectionService';
import './shared/logic/jsExtensions';
import { initServiceProvider } from './startup/initApp';
import { initTurboExpress } from './startup/instatiateTurboExpress';
import { recreateDBAsync } from './startup/recreateDB';
import { ServiceProvider } from './startup/servicesDI';
import { XTurboExpressListener } from './turboImplementations/XTurboExpressListener';
import { snoozeAsync } from './utilities/helpers';
import { GetServiceProviderType } from './utilities/XTurboExpress/XTurboExpressTypes';

const rootDir = dirname(fileURLToPath(import.meta.url));

const lightRecreateDBAsync = async (getServiceProviderAsync: GetServiceProviderType) => {

    const serviceProvider = await getServiceProviderAsync();

    // override logging scopes to show bootstrap
    const globalConfig = serviceProvider
        .getService(GlobalConfiguration);

    globalConfig
        .overrideLogScopes(globalConfig.logging.enabledScopes.concat(['BOOTSTRAP']));

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
    // INIT TURBO EXPRESS LISTENER
    const listener = new XTurboExpressListener(
        singletonServiceProvider.getService(LoggerService),
        singletonServiceProvider.getService(GlobalConfiguration));

    // 
    // INIT TURBO EXPRESS
    const turboExpress = initTurboExpress(singletonServiceProvider, getServiceProviderAsync, listener);

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

await main();