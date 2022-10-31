import './jsExtensions';
import { Polyfills, writeFileSync } from "./polyfills";
import { SoftSchemaScriptService } from "./SoftSchemaScriptService";

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

    const migrations = migrationVersions
        .map(ver => {

            return `
-- MIGRATION: ${ver}
INSERT INTO public.migration_version
VALUES ('${ver}', now()); `;
        });

    return `
-- MIGRATION VERSIONS: ${migrationVersions.join(', ')}

-- BEGIN TRANSACTION
BEGIN;

-- STORE MIGRATION VERSION
${createMigrationsTableScript}

-- DROP SOFT SCHEMA
${dropSoftSchemaScript}

-- EXECUTE MIGRATIONS 
${migrations.join('\n\n')}

-- CREATE SOFT SCHEMA
${softSchemaCreateScript}

-- COMMIT TRANSACTION
COMMIT;
`;
};

const getMigrationVerisonsArgs = () => {

    const arg = process.argv[2];
    if (!arg)
        throw new Error('Arg is not supplied!');

    return arg
        .replace('[', '')
        .replace(']', '')
        .split(', ');
}

const getMissingMigrations = (migrationsFolderFilePath: string, serverMigrationVersions: string[]) => {

    const allMigrationVersions = Polyfills
        .getAllFilePaths(migrationsFolderFilePath)
        .map(x => Polyfills
            .getFileName(x)
            .replace('.sql', ''));

    const missingVersions = allMigrationVersions
        .filter(x => !serverMigrationVersions.includes(x));

    return missingVersions;
};

const createScripts = () => {

    const backendPath = __dirname + `/../../../../epistogram_backend`;
    const deployFolderFilePath = backendPath + '/deploy';
    const sqlFolderFilePath = backendPath + '/sql';
    const migrationsFolderFilePath = sqlFolderFilePath + '/migrations';

    const serverMigrationVersions = getMigrationVerisonsArgs();

    const missingMigraitonVersions = getMissingMigrations(migrationsFolderFilePath, serverMigrationVersions);

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