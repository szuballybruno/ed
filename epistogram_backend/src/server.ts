import { dirname } from 'path';
import 'reflect-metadata'; // needs to be imported for TypeORM
import { fileURLToPath } from 'url';
import { createDBSchema } from './services/misc/dbSchema';
import { GlobalConfiguration } from './services/misc/GlobalConfiguration';
import { log } from './services/misc/logger';
import { initializeMappings } from './services/misc/mappings';
import { DbConnectionService } from './services/sqlServices/DatabaseConnectionService';
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
    await services.getService(DbConnectionService).initializeConnectionAsync();

    // FASZA LESZ, IGY FOG MENNI A TRANSACTION
    // const sqlService = services.getService(SQLConnectionService);

    // try {


    //     await sqlService
    //         .executeSQLAsync(`BEGIN`);

    //     const ids = await sqlService
    //         .executeSQLAsync(`
    //         INSERT INTO module_data (name, description, order_index, is_pretest_module)
    //         VALUES 
    //             ('SUCCESS', 'ba', 0, false),
    //             ('SUCCESS2', 'ba', 0, false)
    //         RETURNING id`);

    //     console.log(ids);

    //     await sqlService
    //         .executeSQLAsync(`
    //         INSERT INTO module_data (name, description, is_pretest_module)
    //         VALUES ('FAIL', 'ba', 0)`);

    //     await sqlService
    //         .executeSQLAsync('COMMIT');

    // } catch (e) {

    //     console.log(e);
    // }

    // return;

    // 
    // INIT TURBO EXPRESS
    const turboExpress = initTurboExpress(globalConfig, services, controllers);

    //
    // SEED DB
    await services.getService(DbConnectionService).bootstrapDBAsync();

    // 
    // LISTEN (start server)
    turboExpress.listen();
};

await main();