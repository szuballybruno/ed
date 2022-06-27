import { dirname } from 'path';
import 'reflect-metadata'; // needs to be imported for TypeORM
import { fileURLToPath } from 'url';
import { GlobalConfiguration } from './services/misc/GlobalConfiguration';
import { log } from './services/misc/logger';
import { DbConnectionService } from './services/sqlServices/DatabaseConnectionService';
import { SQLConnectionService } from './services/sqlServices/SQLConnectionService';
import './shared/logic/jsExtensions';
import { initTurboExpress } from './startup/instatiateTurboExpress';
import { instansiateSingletonServices, instatiateServices } from './startup/servicesDI';
import { GetServiceProviderType } from './utilities/XTurboExpress/TurboExpress';

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
    // LISTEN (start server)
    turboExpress.listen();
};

await main();