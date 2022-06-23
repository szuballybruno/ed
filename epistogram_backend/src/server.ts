import { dirname } from 'path';
import 'reflect-metadata'; // needs to be imported for TypeORM
import { fileURLToPath } from 'url';
import { createDBSchema } from './services/misc/dbSchema';
import { GlobalConfiguration } from './services/misc/GlobalConfiguration';
import { log } from './services/misc/logger';
import { initializeMappings } from './services/misc/mappings';
import './shared/logic/jsExtensions';
import { instatiateControllers } from './startup/controllersDI';
import { initTurboExpress } from './startup/instatiateTurboExpress';
import { instatiateServices } from './startup/servicesDI';

const getCurrentDir = () => dirname(fileURLToPath(import.meta.url));

const main = async () => {

    log('');
    log('------------- APPLICATION STARTED ----------------');
    log('');

    const globalConfig = GlobalConfiguration
        .initGlobalConfig(getCurrentDir());

    const dbSchema = createDBSchema();
    const services = instatiateServices(globalConfig, dbSchema);
    const controllers = instatiateControllers(services, globalConfig);

    // initialize services 
    initializeMappings(services.urlService.getAssetUrl, services.mapperService);
    await services.dbConnectionService.initializeAsync();
    await services.dbConnectionService.seedDBAsync();

    // initialize express
    const turboExpress = initTurboExpress(globalConfig, services, controllers);

    // listen
    turboExpress.listen();
};

await main();