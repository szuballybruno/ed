import './jsExtensions';
import { Polyfills, writeFileSync } from "./polyfills";
import { SoftSchemaScriptService } from "./SoftSchemaScriptService";

const backendPath = __dirname + `/../../../../epistogram_backend`;
const deployFolderFilePath = backendPath + '/deploy';
const sqlFolderFilePath = backendPath + '/sql';
const migrationsFolderFilePath = sqlFolderFilePath + '/migrations';

const getMigrationScript = ({
    createMigrationsTableScript,
    migrationVersions,
    dropSoftSchemaScript,
    softSchemaCreateScript
}: {
    migrationVersions: string[],
    createMigrationsTableScript: string,
    dropSoftSchemaScript: string,
    softSchemaCreateScript: string
}) => {

    /**
     * Insert migration verisons 
     */
    const insertMigrationVersionsScript = migrationVersions
        .map(ver => {

            return `
-- MIGRATION: ${ver}
INSERT INTO public.migration_version
VALUES ('${ver}', now()); `;
        })
        .join('\n');

    /**
     * Migration scripts 
     */
    const migartionScripts = migrationVersions
        .map(ver => {

            const migrationScript = `--MIGRATION: ${ver}\n${Polyfills
                .readFileAsText(`${sqlFolderFilePath}/migrations/${ver}.sql`)}`;

            return migrationScript;
        })
        .join('\n\n');

    /**
     * Assemble final script 
     */
    return `
-- MIGRATION VERSIONS: ${migrationVersions.join(', ')}

-- BEGIN TRANSACTION
BEGIN;

-- CREATE MIGARTION VERSION TABLE
${createMigrationsTableScript}

-- STORE MIGRATION VERSION
${insertMigrationVersionsScript}

-- DROP SOFT SCHEMA
${dropSoftSchemaScript}

-- EXECUTE MIGRATIONS 
${migartionScripts}

-- CREATE SOFT SCHEMA
${softSchemaCreateScript}

-- COMMIT TRANSACTION
COMMIT;
`;
};

const getMigrationVerisonsArgs = () => {

    const versions = Polyfills
        .readFileAsText(deployFolderFilePath + '/out/migrationVersionsOnServer.txt');

    return versions
        .split('\n')
        .map(x => x
            .replace(' ', '')
            .replace('\r', ''))
        .filter(x => !!x);
}

const getVersionNumber = (migver: string) => {

    return Polyfills.parseIntOrFail(migver.replace('migration', ''));
}

const getServerVersionNumber = () => {

    const serverMigrationVersions = getMigrationVerisonsArgs();

    const ordered = serverMigrationVersions
        .orderBy(x => getVersionNumber(x));

    const latestVersionOnServer = ordered
        .last();

    return getVersionNumber(latestVersionOnServer);
}

const getMissingMigrations = (migrationsFolderFilePath: string) => {

    const latestVersionOnServer = getServerVersionNumber();

    console.log(`Latest version on server: ${latestVersionOnServer}`);

    const allMigrationVersions = Polyfills
        .getAllFilePaths(migrationsFolderFilePath)
        .map(x => Polyfills
            .getFileName(x)
            .replace('.sql', ''));

    const missingVersions = allMigrationVersions
        .filter(x => getVersionNumber(x) > latestVersionOnServer);

    return missingVersions;
};

const createScripts = () => {

    const missingMigraitonVersions = getMissingMigrations(migrationsFolderFilePath);

    console.log(`Missing versions: ${missingMigraitonVersions.join(', ')}`);

    const softSchemaCreateScript = new SoftSchemaScriptService(sqlFolderFilePath)
        .getSoftSchemaScript();

    const createMigrationsTableScript = Polyfills
        .readFileAsText(`${deployFolderFilePath}/sql/createMigrationVersionTable.sql`);

    const dropSoftSchemaScript = Polyfills
        .readFileAsText(`${deployFolderFilePath}/sql/dropSoftSchema.sql`);

    const fullMigrationScript = getMigrationScript({
        createMigrationsTableScript,
        softSchemaCreateScript,
        dropSoftSchemaScript,
        migrationVersions: missingMigraitonVersions
    });

    writeFileSync(deployFolderFilePath + '/out/fullMigrationScript.sql', fullMigrationScript);
    writeFileSync(deployFolderFilePath + '/out/softSchemaCreateScript.sql', softSchemaCreateScript);
};

createScripts();