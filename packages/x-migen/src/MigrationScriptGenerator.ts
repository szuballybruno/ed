import { PgService } from './PgService';
import { Polyfills } from "./polyfills";
import { SoftSchemaScriptService } from "./SoftSchemaScriptService";

export class MigrationScriptGenerator {

    private _migrationsFolderFilePath: string;
    private _dropSoftSchemaScriptPath: string;
    private _queryServerVersionScriptPath: string;

    constructor(
        private _projectRootFolderPath: string,
        private _log: (text: string) => void,
        private _pgService: PgService,
        private _schemaFolderPath: string) {

        this._migrationsFolderFilePath = `${this._schemaFolderPath}/migrations`;
        this._dropSoftSchemaScriptPath = `${this._projectRootFolderPath}/sql/dropSoftSchema.sql`;
        this._queryServerVersionScriptPath = `${this._projectRootFolderPath}/sql/queryServerVersion.sql`;
    }

    async createScriptAsync() {

        const serverVersion = await this
            ._getServerVersionAsync();

        const missingMigraitonVersions = this
            ._getMissingMigrations(serverVersion);

        this._log(`Missing versions: ${missingMigraitonVersions.length > 0 ? missingMigraitonVersions.join(', ') : '-> no missing version, up to date.'}`);

        const softSchemaCreateScript = new SoftSchemaScriptService(this._schemaFolderPath)
            .getSoftSchemaScript();

        const dropSoftSchemaScript = Polyfills
            .readFileAsText(this._dropSoftSchemaScriptPath);

        const fullMigrationScript = this._getMigrationScript({
            softSchemaCreateScript,
            dropSoftSchemaScript,
            missingMigraitonVersions
        });

        return fullMigrationScript;
    };

    private async _getServerVersionAsync(): Promise<number> {

        const queryServerVersionScript = Polyfills
            .readFileAsText(this._queryServerVersionScriptPath);

        const res = await this
            ._pgService
            .queryAsync(queryServerVersionScript);

        const row = res
            .rows
            .single(x => true) as { version_number: number };

        return row.version_number;
    }

    private _getMigrationScript({
        missingMigraitonVersions,
        dropSoftSchemaScript,
        softSchemaCreateScript
    }: {
        missingMigraitonVersions: string[],
        dropSoftSchemaScript: string,
        softSchemaCreateScript: string
    }) {

        /**
         * Insert migration verisons 
         */
        const insertMigrationVersionsScript = missingMigraitonVersions
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
        const migartionScripts = missingMigraitonVersions
            .map(ver => {

                const migrationScript = `--MIGRATION: ${ver}\n${Polyfills
                    .readFileAsText(`${this._migrationsFolderFilePath}/${ver}.sql`)}`;

                if (!migrationScript.trimEnd().endsWith(';'))
                    return migrationScript + ';';

                return migrationScript;
            })
            .join('\n\n');

        /**
         * Assemble final script 
         */
        return `
-- BEGIN TRANSACTION
BEGIN;

-- INSERT MISSING MIGRATION VERSIONS (${missingMigraitonVersions.join(', ')})
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

    private _getVersionNumber(migver: string) {

        return Polyfills.parseIntOrFail(migver.replace('migration', ''));
    }

    private _getMissingMigrations(serverVersion: number) {

        this._log(`Latest version on server: ${serverVersion}`);

        const allMigrationVersions = Polyfills
            .getAllFilePaths(this._migrationsFolderFilePath)
            .map(x => Polyfills
                .getFileName(x)
                .replace('.sql', ''));

        const missingVersions = allMigrationVersions
            .filter(x => this._getVersionNumber(x) > serverVersion);

        return missingVersions
            .orderBy(x => this._getVersionNumber(x));
    };
}