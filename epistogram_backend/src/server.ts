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

const main = async () => {

    log('');
    log('------------- APPLICATION STARTED ----------------');
    log('');

    //
    // GET ROOT DIR
    const rootDir = dirname(fileURLToPath(import.meta.url));

    // 
    // INIT GLOBAL CONFIG
    const globalConfig = GlobalConfiguration
        .initGlobalConfig(rootDir);

    // 
    // INIT DB SCHEMA
    const dbSchema = createDBSchema();
    
    // 
    // INIT SERVICES
    const services = instatiateServices(globalConfig, dbSchema);
    
    // 
    // INIT CONTROLLERS
    const controllers = instatiateControllers(services, globalConfig);

    // 
    // INIT
    initializeMappings(services.urlService.getAssetUrl, services.mapperService);
    await services.dbConnectionService.initializeAsync();
    await services.dbConnectionService.seedDBAsync();

    // 
    // INIT TURBO EXPRESS
    const turboExpress = initTurboExpress(globalConfig, services, controllers);

    // 
    // LISTEN (start server)
    turboExpress.listen();
};

await main();