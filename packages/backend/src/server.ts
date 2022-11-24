import { jsExtensions } from '@episto/commonlogic';
import { dirname } from 'path';
import './index';
import 'reflect-metadata'; // needs to be imported for TypeORM
import { fileURLToPath } from 'url';
import { LoggerService } from './services/LoggerService';
import { log } from './services/misc/logger';
import { ORMConnectionService } from './services/ORMConnectionService/ORMConnectionService';
import { ServiceProviderInitializator } from './startup/initApp';
import { initTurboExpress } from './startup/instatiateTurboExpress';
import { XTurboExpressListener } from './turboImplementations/XTurboExpressListener';

jsExtensions.initJsExtensions();

const rootDir = dirname(fileURLToPath(import.meta.url));

const startServerAsync = async (initializator: ServiceProviderInitializator) => {

    const listener = new XTurboExpressListener(
        initializator
            .getSingletonProvider()
            .getService(LoggerService),
        initializator
    );

    /**
     * Validate schema
     */
    await initializator
        .useTransientServicesContextAsync(async serviceProvider => {

            const ormService = serviceProvider
                .getService(ORMConnectionService);

            await ormService
                .validateSchemaAsync();
        });

    /**
     * INIT TURBO EXPRESS
     */
    const turboExpress = initTurboExpress(initializator, listener);

    /**
     * LISTEN (start server)
     */
    turboExpress.listen();
};

await (async () => {

    log('');
    log('------------- APPLICATION STARTED ----------------');
    log('');

    const initializator = new ServiceProviderInitializator(rootDir, false);

    await startServerAsync(initializator);
})();