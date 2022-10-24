import { writeFileSync } from 'fs';
import { dirname } from 'path';
import 'reflect-metadata'; // needs to be imported for TypeORM
import { fileURLToPath } from 'url';
import { FileSystemService } from './services/FileSystemService';
import { LoggerService } from './services/LoggerService';
import { GlobalConfiguration } from './services/misc/GlobalConfiguration';
import { log } from './services/misc/logger';
import { CreateDBService } from './services/sqlServices/CreateDBService';
import { SQLConnectionService } from './services/sqlServices/SQLConnectionService';
import './shared/logic/jsExtensions';
import { ServiceProviderInitializator } from './startup/initApp';
import { initTurboExpress } from './startup/instatiateTurboExpress';
import { XTurboExpressListener } from './turboImplementations/XTurboExpressListener';
import { GetServiceProviderType } from './utilities/XTurboExpress/XTurboExpressTypes';

const rootDir = dirname(fileURLToPath(import.meta.url));

const lightRecreateDBAsync = async (getServiceProviderAsync: GetServiceProviderType) => {

    const serviceProvider = await getServiceProviderAsync();

    // override logging scopes to show bootstrap
    const globalConfig = serviceProvider
        .getService(GlobalConfiguration);

    const fileSystemService = serviceProvider
        .getService(FileSystemService);

    globalConfig
        .overrideLogScopes(globalConfig.logging.enabledScopes.concat(['BOOTSTRAP']));

    /**
     * Get recreate script 
     */
    const recerateScriptParts = serviceProvider
        .getService(CreateDBService)
        .getDatabaseLightSchemaRecreateScript();

    const recerateScript = recerateScriptParts.dropScript + '\n\n\n' + recerateScriptParts.createScript;

    serviceProvider
        .getService(SQLConnectionService)
        .releaseConnectionClient();

    /**
     * Get migration script 
     */
    const migrationsFolderFilePath = globalConfig
        .getRootRelativePath('/sql/migrations');

    const migrationScriptFileName = fileSystemService
        .getAllFilePaths(migrationsFolderFilePath)
        .orderBy(x => x)
        .last();

    const migrationFileContents = fileSystemService
        .readFileAsText(`${migrationsFolderFilePath}/${migrationScriptFileName}`);

    const fullMigrationScript =
`
-- DROP SOFT SCHEMA
${recerateScriptParts.dropScript}

-- TRANSFORM TABLES / MIGRATE DATA
${migrationFileContents}

-- CREATE SOFT SCHEMA
${recerateScriptParts.createScript}
`;

    writeFileSync(globalConfig.getRootRelativePath('/sql/out/recreateLightSchema.sql'), recerateScript);
    writeFileSync(globalConfig.getRootRelativePath('/sql/out/fullMigrationScript.sql'), fullMigrationScript);
};

const startServerAsync = async (initializator: ServiceProviderInitializator) => {

    const listener = new XTurboExpressListener(
        initializator
            .getSingletonProvider()
            .getService(LoggerService),
        initializator
    );

    /**
     * INIT TURBO EXPRESS
     */
    const turboExpress = initTurboExpress(initializator, listener);

    /**
     * LISTEN (start server)
     */
    turboExpress.listen();
};

const main = async () => {

    log('');
    log('------------- APPLICATION STARTED ----------------');
    log('');

    const isLightRecreateMode = process.argv.any(x => x === '--lightRecreate');

    log(`MODE: [${isLightRecreateMode ? 'LIGHT RECREATE' : 'NORMAL'}]`);

    const initializator = new ServiceProviderInitializator(rootDir, false);
    if (isLightRecreateMode) {

        await lightRecreateDBAsync(initializator.getInitializedTransientServices.bind(initializator));
    }
    else {

        await startServerAsync(initializator);
    }
};

await main();
