
import { getAllFilePaths, Polyfills, readFileSync, regexMatchAll } from './polyfills';
import { DepHierarchyItem, XDependency } from './XDInjection/XDInjector';

type ViewFile = {
    name: string,
    content: string
}

export class SoftSchemaScriptService {

    private _sqlFolderNames: string[];

    constructor(private _sqlFolderPath: string) {

        this._sqlFolderNames = ['views', 'constraints', 'functions', 'indices', 'triggers'];
    }

    getSoftSchemaScript(): string {

        const foldersAndFiles = this
            ._readAllSQLFolders();

        const scripts = foldersAndFiles
            .map(x => ({
                ...x,
                script: x.sqlFolderName === 'views'
                    ? this._getViewCreationScript(x.files)
                    : x
                        .files
                        .map(file => `-- ${file.path} \n${file.content}`)
                        .join('\n')
            }));

        const wrappedScripts = scripts
            .map(script => this._mainScectionWrapper(script.sqlFolderName, script.script));

        const script = wrappedScripts
            .join('\n');

        return script;
    }

    /**
     * SQL section wrapper 
     */
    private _mainScectionWrapper(schemaItemName: string, script: string) {

        return `
-- CREATE ${schemaItemName}
${script}
`;
    }

    /**
     * Reads sql folder file paths 
     */
    private _readSQLFolderFiles(folderName: string) {

        const path = `${this._sqlFolderPath}/${folderName}`;
        const files = Array.from(getAllFilePaths(path))
            .map(x => `${path}/${x}`);

        return files;
    }

    /**
     * Read sql folders 
     */
    private _readAllSQLFolders() {

        return this
            ._sqlFolderNames
            .map(x => {

                return {
                    sqlFolderName: x,
                    files: this._readSQLFolderFiles(x)
                        .filter(x => x.endsWith('.sql'))
                        .map(x => ({
                            name: Polyfills.getFileName(x).replace('.sql', ''),
                            path: x,
                            content: readFileSync(x),
                        }))
                };
            });
    }

    /**
     * Get view createion script 
     */
    private _getViewCreationScript(viewFiles: ViewFile[]) {

        const nameAndDeps = this
            ._getDepsOfViews(viewFiles);

        const ordered = XDependency
            .orderDepHierarchy(nameAndDeps);

        const viewFilesOrdered = ordered
            .map(x => viewFiles
                .single(y => y.name === x.getCompareKey()));

        const createScript = viewFilesOrdered
            .map(x => `\n--${x.name}\nCREATE VIEW ${x.name}\nAS\n${x.content};`)
            .join('\n');

        return createScript;
    }

    /**
     * Get deps of views 
     */
    private _getDepsOfViews(namesAndContents: ViewFile[]) {

        return namesAndContents
            .map(x => new DepHierarchyItem({
                key: x.name,
                deps: this
                    ._getDepsOfView(x.content)
            }));
    }

    /**
     * Get deps of view
     */
    private _getDepsOfView(viewSql: string) {

        const matches = regexMatchAll(viewSql, new RegExp('public\\..*_view', 'g'));
        const filtered = matches
            .map(x => x.replace('public.', ''))
            .groupBy(x => x)
            .map(x => x.key);

        return filtered;
    }
}