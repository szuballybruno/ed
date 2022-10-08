
import { existsSync, readdirSync, readFileSync } from 'fs';
import { regexMatchAll } from '../../utilities/helpers';
import { DepHierarchyItem, XDependency } from '../../utilities/XDInjection/XDInjector';
import { LoggerService } from '../LoggerService';
import { GlobalConfiguration } from '../misc/GlobalConfiguration';
import { XDBMConstraintType, XDBMSchemaService, XDMBIndexType } from '../XDBManager/XDBManagerTypes';

type ViewFile = {
    name: string,
    content: string
}

export class CreateDBService {

    constructor(
        private _dbSchema: XDBMSchemaService,
        private _config: GlobalConfiguration,
        private _loggerService: LoggerService) {
    }

    getDatabaseLightSchemaRecreateScript() {

        this._checkSqlFolder();

        const recreateViews = this
            ._recreateViewsAsync();

        const recreateFunctions = this
            ._recreateFunctionsAsync(this._dbSchema.functionScripts);

        const recreateConstraints = this
            ._recreateConstraintsAsync(this._dbSchema.constraints);

        const recreateInidcesScript = this
            ._recreateIndicesAsync(this._dbSchema.indices);

        const recteateTriggers = this
            ._recreateTriggersAsync(this._dbSchema.triggers);

        return [
            this._mainScectionWrapper('VIEWS', recreateViews),
            this._mainScectionWrapper('FUNCTIONS', recreateFunctions),
            this._mainScectionWrapper('CONSTRAINTS', recreateConstraints),
            this._mainScectionWrapper('INDICES', recreateInidcesScript),
            this._mainScectionWrapper('TRIGGERS', recteateTriggers),
        ]
            .join('\n');
    }

    // PRIVATE

    private _mainScectionWrapper(name: string, script: string) {

        return `
--
--               RECREATE ${name}
--  
${script}
`;
    }

    private _checkSqlFolder() {

        const path = this._config.getRootRelativePath('/sql');
        const exits = existsSync(path);

        if (!exits)
            throw new Error('SQL folder doesnt exist! Path: ' + path);

        this._loggerService.logScoped('BOOTSTRAP', 'SQL folder found. Path: ' + path);
    }

    private _getDepsOfViews(namesAndContents: ViewFile[]) {

        return namesAndContents
            .map(x => new DepHierarchyItem({
                key: x.name,
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

            const fileNames = Array.from(readdirSync(readFolder));
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
            .concat(readFolder(rootFolder + '\\stats'));

        return views;
    }

    private _recreateConstraintsAsync(constraints: XDBMConstraintType[]) {

        // drop constraints
        const dropConstrains = constraints
            .filter(x => !!x.tableName)
            .map(constraint => `ALTER TABLE public.${constraint.tableName} DROP CONSTRAINT IF EXISTS ${constraint.fileName};`)
            .join('\n');

        // create constraints 
        const createConstraints = constraints
            .map(constraint => this._getCreateScript('CONSTRAINT', constraint.fileName, this.readSQLFile('constraints', constraint.fileName)))
            .join('\n');

        return this._getFullRecreateScript('CONSTRAINTS', dropConstrains, createConstraints);
    }

    private _recreateIndicesAsync(indices: XDMBIndexType[]) {

        // drop all indices
        const dropsScript = indices
            .map(index => `DROP INDEX IF EXISTS ${index.name};`)
            .join('\n');

        const createIndicesScript = indices
            .map(sqlIndex => this._getCreateScript('INDEX', sqlIndex.name, this
                .readSQLFile('indices', sqlIndex.name)))
            .join('\n');

        return this._getFullRecreateScript('INDICES', dropsScript, createIndicesScript);
    }

    private _recreateTriggersAsync(triggers: string[]) {

        return triggers
            .map(trigger => this._getCreateScript('TRIGGER', trigger, this.readSQLFile('triggers', trigger)))
            .join('\n');
    }

    private _recreateFunctionsAsync(functionNames: string[]) {

        const dropScript = functionNames
            .map(functionName => `DROP FUNCTION IF EXISTS ${functionName};`)
            .join('\n');

        const createScript = functionNames
            .map(functionName => this._getCreateScript('FUNCTION', functionName, this
                .readSQLFile('functions', functionName)))
            .join('\n');

        return this._getFullRecreateScript('FUNCTIONS', dropScript, createScript);
    }

    private _recreateViewsAsync() {

        const viewFiles = this._readViews();
        const nameAndDeps = this._getDepsOfViews(viewFiles);
        const ordered = XDependency
            .orderDepHierarchy(nameAndDeps);

        // drop scripts 
        const revereseOrderedViewNames = ordered
            .map(x => x.getCompareKey())
            .reverse();

        const dropScript = revereseOrderedViewNames
            .map(viewName => `DROP VIEW IF EXISTS ${viewName} CASCADE;`)
            .join('\n');

        // create scripts 
        const viewFilesOrdered = ordered
            .map(x => viewFiles
                .single(y => y.name === x.getCompareKey()));

        const createScripts = viewFilesOrdered
            .map(x => this._getCreateScript('VIEW', x.name, this._getViewCreationScript(x.name, x.content)))
            .join('\n');

        return this._getFullRecreateScript('VIEWS', dropScript, createScripts);
    }

    private _getViewCreationScript(viewName: string, viewContent: string) {

        return `CREATE VIEW ${viewName}\nAS\n${viewContent}`;
    }

    private _getFullRecreateScript(name: string, dropsScript: string, createIndicesScript: string) {

        return `--DROP OLD ${name} \n${dropsScript}\n\n--CREATE ${name}\n${createIndicesScript}`;
    }

    private _getCreateScript(tableName: string, name: string, script: string) {

        return `\n--CREATE ${tableName}: ${name}\n${script};`;
    }

    private readSQLFile(folderName: string, fileName: string, subFolder?: string) {

        return readFileSync(this._config.getRootRelativePath(`/sql/${folderName}/${subFolder || ''}${subFolder ? '/' : ''}${fileName}.sql`), 'utf8');
    }

    private _getRootFolderPath(folderName: string) {

        return this._config.getRootRelativePath(`/sql/${folderName}`);
    }
}