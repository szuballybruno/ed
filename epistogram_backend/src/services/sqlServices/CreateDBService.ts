
import { readdirSync, readFileSync } from 'fs';
import { regexMatchAll } from '../../utilities/helpers';
import { XDInjector } from '../../utilities/XDInjection/XDInjector';
import { LoggerService } from '../LoggerService';
import { GlobalConfiguration } from '../misc/GlobalConfiguration';
import { XDBMConstraintType, XDBMSchemaType, XDMBIndexType } from '../XDBManager/XDBManagerTypes';
import { SQLConnectionService } from './SQLConnectionService';
import { TypeORMConnectionService } from './TypeORMConnectionService';

type ViewFile = {
    name: string,
    content: string
}

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
        await this.recreateViewsAsync();

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

    private _getDepsOfViews(namesAndContents: ViewFile[]) {

        return namesAndContents
            .map(x => ({
                name: x.name,
                deps: this
                    ._getDepsOfView(x.content)
            }));
    }

    private _getDepsOfView(viewSql: string) {

        const matches = regexMatchAll(viewSql, new RegExp('public\\..*_view', 'g'));
        const filtered = matches
            .map(x => x.replace('public.', ''))
            .groupBy(x => x)
            .map(x => x.key);

        return filtered;
    }

    private _readViews(): ViewFile[] {

        const readFolder = (readFolder: string) => {

            const fileNames = readdirSync(readFolder);
            const namesAndContents = fileNames
                .filter(x => x.endsWith('.sql'))
                .map(x => ({
                    name: x.replace('.sql', ''),
                    content: readFileSync(`${readFolder}\\${x}`, 'utf-8')
                }));

            return namesAndContents;
        };

        const rootFolder = this._getRootFolderPath('views');
        const views = readFolder(rootFolder)
            .concat(readFolder(rootFolder + '\\basic'))
            .concat(readFolder(rootFolder + '\\common'))
            .concat(readFolder(rootFolder + '\\stats'));

        return views;
    }

    private recreateConstraintsAsync = async (constraints: XDBMConstraintType[]) => {

        // drop constraints
        const drops = constraints
            .filter(x => !!x.tableName)
            .map(constraint => `ALTER TABLE public.${constraint.tableName} DROP CONSTRAINT IF EXISTS ${constraint.fileName};`);

        await this._sqlConnectionService.executeSQLAsync(drops.join('\n'));

        // create constraints 
        for (let index = 0; index < constraints.length; index++) {

            const constraint = constraints[index];
            const script = this.readSQLFile('constraints', constraint.fileName);

            this._loggerService.logScoped('BOOTSTRAP', 'SECONDARY', `Creating constraint(s): [${constraint.fileName}]...`);
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

    private recreateViewsAsync = async () => {

        const viewFiles = this._readViews();
        const nameAndDeps = this._getDepsOfViews(viewFiles);
        const ordered = XDInjector.orderDepHierarchy(nameAndDeps);

        const revereseOrderedViewNames = ordered
            .map(x => x.name)
            .reverse();

        const viewFilesOrdered = ordered
            .map(x => viewFiles
                .single(y => y.name === x.name));

        // drop in reverse
        await this.dropViews(revereseOrderedViewNames);

        // create 
        await this.createViews(viewFilesOrdered);
    };

    private createViews = async (viewFilesOrdered: ViewFile[]) => {

        for (let index = 0; index < viewFilesOrdered.length; index++) {

            const viewFile = viewFilesOrdered[index];
            const viewName = viewFile.name;

            this
                ._loggerService
                .logScoped('BOOTSTRAP', 'SECONDARY', `Creating view (${index + 1}): [${viewName}]...`);

            const script = this
                ._getViewCreationScript(viewFile.name, viewFile.content);

            await this
                ._sqlConnectionService
                .executeSQLAsync(script);
        }
    };

    private dropViews = async (viewNames: string[]) => {

        const drops = viewNames
            .map(viewName => `DROP VIEW IF EXISTS ${viewName} CASCADE;`);

        await this._sqlConnectionService.executeSQLAsync(drops.join('\n'));
    };

    private _getViewCreationScript = (viewName: string, viewContent: string) => {

        return `CREATE VIEW ${viewName}\nAS\n${viewContent}`;
    };

    private readSQLFile = (folderName: string, fileName: string, subFolder?: string) => {

        return readFileSync(this._config.getRootRelativePath(`/sql/${folderName}/${subFolder || ''}${subFolder ? '/' : ''}${fileName}.sql`), 'utf8');
    };

    private _getRootFolderPath(folderName: string) {

        return this._config.getRootRelativePath(`/sql/${folderName}`);
    }
}