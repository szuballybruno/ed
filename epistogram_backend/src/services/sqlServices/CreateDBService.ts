
import { readFileSync } from 'fs';
import { replaceAll } from '../../utilities/helpers';
import { LoggerService } from '../LoggerService';
import { GlobalConfiguration } from '../misc/GlobalConfiguration';
import { XDBMConstraintType, XDBMSchemaType, XDMBIndexType } from '../XDBManager/XDBManagerTypes';
import { SQLConnectionService } from './SQLConnectionService';
import { TypeORMConnectionService } from './TypeORMConnectionService';

export class CreateDBService {

    constructor(
        private _sqlConnectionService: SQLConnectionService,
        private _dbSchema: XDBMSchemaType,
        private _config: GlobalConfiguration,
        private _typeOrmConnectionService: TypeORMConnectionService,
        private _loggerService: LoggerService) {
    }

    createDatabaseSchemaAsync = async (createTables: boolean) => {

        if (createTables) {

            this._loggerService.logScoped('BOOTSTRAP', 'Creating tables with TypeORM...');
            await this._typeOrmConnectionService.connectTypeORMAsync();
        }

        this._loggerService.logScoped('BOOTSTRAP', 'Recreating views...');
        await this.recreateViewsAsync(this._dbSchema.views.map(x => x[0]), this._dbSchema.views.map(x => x[1]));

        this._loggerService.logScoped('BOOTSTRAP', 'Recreating functions...');
        await this.recreateFunctionsAsync(this._dbSchema.functionScripts);

        this._loggerService.logScoped('BOOTSTRAP', 'Recreating constraints...');
        await this.recreateConstraintsAsync(this._dbSchema.constraints);

        this._loggerService.logScoped('BOOTSTRAP', 'Recreating indices...');
        await this.recreateIndicesAsync(this._dbSchema.indices);

        this._loggerService.logScoped('BOOTSTRAP', 'Recreating triggers...');
        await this.recreateTriggersAsync(this._dbSchema.triggers);
    };

    // PRIVATE

    private recreateConstraintsAsync = async (constraints: XDBMConstraintType[]) => {

        // drop constraints
        const drops = constraints
            .map(constraint => `ALTER TABLE public.${constraint.tableName} DROP CONSTRAINT IF EXISTS ${constraint.name};`);

        await this._sqlConnectionService.executeSQLAsync(drops.join('\n'));

        // create constraints 
        for (let index = 0; index < constraints.length; index++) {

            const constraint = constraints[index];
            const script = this.readSQLFile('constraints', constraint.name);

            this._loggerService.logScoped('BOOTSTRAP', 'SECONDARY', `Creating constraint: [${constraint.tableName} <- ${constraint.name}]...`);
            await this._sqlConnectionService.executeSQLAsync(script);
        }
    };

    private recreateIndicesAsync = async (indices: XDMBIndexType[]) => {

        // drop all indices
        const drops = indices
            .map(index => `DROP INDEX IF EXISTS ${index.name};`);

        await this._sqlConnectionService
            .executeSQLAsync(drops.join('\n'));

        // create indices 
        for (let index = 0; index < indices.length; index++) {

            const sqlIndex = indices[index];
            const script = this.readSQLFile('indices', sqlIndex.name);

            this._loggerService.logScoped('BOOTSTRAP', 'SECONDARY', `Creating index: [${sqlIndex.tableName} <- ${sqlIndex.name}]...`);
            await this._sqlConnectionService
                .executeSQLAsync(script);
        }
    };

    private recreateTriggersAsync = async (triggers: string[]) => {

        // create triggers 
        for (let index = 0; index < triggers.length; index++) {

            const triggerName = triggers[index];
            const script = this.readSQLFile('triggers', triggerName);

            this._loggerService.logScoped('BOOTSTRAP', 'SECONDARY', `Creating trigger: [${triggerName}]...`);
            await this._sqlConnectionService
                .executeSQLAsync(script);
        }
    };

    private recreateFunctionsAsync = async (functionNames: string[]) => {

        // drop functions 
        const drops = functionNames
            .map(functionName => `DROP FUNCTION IF EXISTS ${functionName};`);

        await this._sqlConnectionService.executeSQLAsync(drops.join('\n'));

        // create functions
        for (let index = 0; index < functionNames.length; index++) {

            const functionName = functionNames[index];
            const script = this.readSQLFile('functions', functionName);

            this._loggerService.logScoped('BOOTSTRAP', 'SECONDARY', `Creating function: [${functionName}]...`);
            await this._sqlConnectionService.executeSQLAsync(script);
        }
    };

    private recreateViewsAsync = async (viewSubFolderNames: string[], viewNames: string[]) => {

        await this.dropViews(viewNames);
        await this.createViews(viewNames, viewSubFolderNames);
    };

    private replaceSymbols = (sql: string) => {

        const url = this._config.fileStorage.assetStoreUrl;
        return replaceAll(sql, '{CDN_BUCKET_URL}', url);
    };

    private createViews = async (viewNames: string[], viewSubFolderNames: string[]) => {

        for (let index = 0; index < viewNames.length; index++) {

            const viewName = viewNames[index];
            const viewSubFolderName = viewSubFolderNames[index];
            const script = this.getViewCreationScript(viewName, viewSubFolderName);

            this._loggerService.logScoped('BOOTSTRAP', 'SECONDARY', `Creating view: [${viewName}]...`);

            await this._sqlConnectionService.executeSQLAsync(script);
        }
    };

    private dropViews = async (viewNames: string[]) => {

        const drops = viewNames
            .map(viewName => `DROP VIEW IF EXISTS ${viewName} CASCADE;`);

        await this._sqlConnectionService.executeSQLAsync(drops.join('\n'));
    };

    private getViewCreationScript = (viewName: string, viewSubFolderName: string) => {

        const sql = this.readSQLFile('views', viewName, viewSubFolderName);
        return `CREATE VIEW ${viewName}\nAS\n${sql}`;
    };

    private readSQLFile = (folderName: string, fileName: string, subFolder?: string) => {

        return readFileSync(this._config.getRootRelativePath(`/sql/${folderName}/${subFolder || ''}${subFolder ? '/' : ''}${fileName}.sql`), 'utf8');
    };
}