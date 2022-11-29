import { LoggerService } from '@episto/server-services';
import { initJsExtensions } from '@episto/x-core';
import { ExpressListener, GatewayErrorDataType, GatewaySuccessDataType } from '@episto/x-gateway';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { ServiceProviderInitializator } from './helpers/initApp';
import { startServerAsync } from './helpers/startServer';
import { getCORSMiddleware } from './middleware/CORSMiddleware';

await (async () => {

    console.log('');
    console.log('------------- APPLICATION STARTED ----------------');
    console.log('');

    // root misc
    initJsExtensions();
    const rootDir = dirname(fileURLToPath(import.meta.url));

    // get listener 
    const getListener = async (initializator: ServiceProviderInitializator) => {

        const loggerService = initializator
            .getSingletonProvider()
            .getService(LoggerService);

        const corsMiddleware = await getCORSMiddleware(initializator);

        const errorCallback = (data: GatewayErrorDataType) => {

            loggerService.logScoped('ERROR', `---------------- [${data.opts.controllerSignature.name}/${data.req.path}] Failed! ----------------`,);
            loggerService.logScoped('ERROR', data.errorin.message);
            loggerService.logScoped('ERROR', data.errorin.stack);
        }

        const successCallback = (data: GatewaySuccessDataType) => {

            loggerService.logScoped('SERVER', `${data.opts.controllerSignature.name}/${data.req.path}: Succeeded...`);
        }

        return new ExpressListener(successCallback, errorCallback, corsMiddleware);
    }

    // start server
    await startServerAsync(rootDir, getListener);
})();