import { LoggerService } from '@episto/server-services';
import { initJsExtensions } from '@episto/xcore';
import { XORMConnectionService } from '@episto/xorm';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { ServiceProviderInitializator } from './startup/initApp';
import { initTurboExpress } from './startup/instatiateTurboExpress';
import { XTurboExpressListener } from './turboImplementations/XTurboExpressListener';

initJsExtensions();

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
                .getService(XORMConnectionService);

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

    console.log('');
    console.log('------------- APPLICATION STARTED ----------------');
    console.log('');

    const initializator = new ServiceProviderInitializator(rootDir, false);

    await startServerAsync(initializator);
})();