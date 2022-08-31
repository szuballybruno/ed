import { dirname } from 'path';
import 'reflect-metadata'; // needs to be imported for TypeORM
import { fileURLToPath } from 'url';
import { LoggerService } from './services/LoggerService';
import { GlobalConfiguration } from './services/misc/GlobalConfiguration';
import { log } from './services/misc/logger';
import { CreateDBService } from './services/sqlServices/CreateDBService';
import { SQLConnectionService } from './services/sqlServices/SQLConnectionService';
import './shared/logic/jsExtensions';
import { ServiceProviderInitializator } from './startup/initApp';
import { initTurboExpress } from './startup/instatiateTurboExpress';
import { recreateDBAsync } from './startup/recreateDB';
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

const startServerAsync = async (initializator: ServiceProviderInitializator) => {

    const listener = new XTurboExpressListener(
        initializator
            .getSingletonProvider()
            .getService(LoggerService),
        initializator
    );

    // 
    // INIT TURBO EXPRESS
    const turboExpress = initTurboExpress(initializator, listener);

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

    const initializator = new ServiceProviderInitializator(rootDir);

    if (isPurgeMode)
        await recreateDBAsync(initializator.getInitializedTransientServices.bind(initializator));

    if (isLightRecreateMode)
        await lightRecreateDBAsync(initializator.getInitializedTransientServices.bind(initializator));

    if (isKeepAlive)
        await snoozeAsync(9999999);

    if (!isShortLife)
        await startServerAsync(initializator);
};

await main();