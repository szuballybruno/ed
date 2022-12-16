import { existsSync, mkdirSync, rmdirSync, writeFileSync } from "fs";
import { LiveSchemaProvider } from "./LiveSchemaProvider";
import { SQLObjectColumnType } from "./models/SQLObjectColumnType";
import { SQLObjectType } from "./models/SQLObjectType";
import { getDbSchemaFileTemplate } from "./templates/dbSchemaFileTemplate";
import { getOrmObjectFileTemplate } from "./templates/ormObjectFileTemplate";
import { XORMUtils } from "./XORMUtils";

const TAB = '    ';

export class Scaffolder {

    private _typeMappings: { objName: string; colName: string; type: string; }[];

    constructor(private _connService: LiveSchemaProvider, private _typemap: Object) {

        this._typeMappings = Object
            .keys(this._typemap)
            .map(key => {

                const [objName, colName] = key.split('.');

                return {
                    objName,
                    colName,
                    type: this._typemap[key]
                }
            })
    }

    async scaffoldAsync(modelsFolderPath: string) {

        const liveSchema = await this
            ._connService
            .getLiveSchamaAsync();

        const tables = this
            ._mapToOrmObjectTexts(liveSchema.filter(x => x.type === 'table'));

        const views = this
            ._mapToOrmObjectTexts(liveSchema.filter(x => x.type === 'view'));

        const tablesFolderPath = `${modelsFolderPath}/tables`;
        const viewsFolderPath = `${modelsFolderPath}/views`;

        // clear folders
        this._clearFolder(tablesFolderPath); 
        this._clearFolder(viewsFolderPath); 

        // write tables 
        tables
            .forEach(x => writeFileSync(`${tablesFolderPath}/${x.capitalizedName}.ts`, x.fileText, 'utf-8'));

        // write views 
        views
            .forEach(x => writeFileSync(`${viewsFolderPath}/${x.capitalizedName}.ts`, x.fileText, 'utf-8'));

        // create dbschema file
        const schemaFileContents = this
            ._getDBSchemaFile(liveSchema);

        writeFileSync(`${modelsFolderPath}/DatabaseSchema.ts`, schemaFileContents, 'utf-8');
    }

    private _clearFolder(folderPath: string) {

        if (existsSync(folderPath)) {

            rmdirSync(folderPath, { recursive: true });
        }

        mkdirSync(folderPath);
    }

    private _getDBSchemaFile(liveSchema: SQLObjectType[]) {

        const imports = liveSchema
            .map(x => {

                const capName = XORMUtils.toJSCapitalizedName(x.name);
                return `import { ${capName} } from './${x.type === 'view' ? 'views' : 'tables'}/${capName}';`;
            })
            .join('\n');

        const views = liveSchema
            .filter(x => x.type === 'view')
            .map(x => `${TAB}${TAB}${XORMUtils.toJSCapitalizedName(x.name)}`)
            .join(',\n');

        const tables = liveSchema
            .filter(x => x.type === 'table')
            .map(x => `${TAB}${TAB}${XORMUtils.toJSCapitalizedName(x.name)}`)
            .join(',\n');

        return getDbSchemaFileTemplate(imports, views, tables);
    }

    private _mapToOrmObjectTexts(liveSchema: SQLObjectType[]) {

        return liveSchema
            .map(sqlObject => {

                const capitalizedName = XORMUtils.toJSCapitalizedName(sqlObject.name);

                const props = sqlObject
                    .columns
                    .map(col => `${TAB}@XViewColumn()\n${TAB}${XORMUtils.toJSCamelCase(col.name)}: ${this._getPropertyType(sqlObject, col)};`) // // ${col.type}
                    .join('\n\n');

                return {
                    fileText: getOrmObjectFileTemplate(capitalizedName, props),
                    sqlObject,
                    capitalizedName
                }
            });
    };

    private _getPropertyType(sqlObject: SQLObjectType, column: SQLObjectColumnType) {

        const capitalizedName = XORMUtils.toJSCapitalizedName(sqlObject.name);

        const typeName = (() => {

            const mapping = this
                ._typeMappings
                .firstOrNull(x => x.objName === sqlObject.name && x.colName === column.name);

            if (mapping)
                return mapping.type;

            if (column.name === 'id')
                return `Id<'${capitalizedName.endsWith('View')
                    ? capitalizedName.replace('View', '')
                    : capitalizedName}'>`;

            if (column.type === 'timestamp with time zone')
                return 'Date';

            if (column.type === 'date')
                return 'Date';

            if (column.type === 'timestamp without time zone') {

                console.warn(`WARNING: ${sqlObject.name} Column ${column.name} is of type ${column.type}. Use timestamp WITH tz! This could cause fatal bugs!`);
                return 'Date';
            }

            if (column.name.endsWith('_id'))
                return `Id<'${XORMUtils.toJSCapitalizedName(column.name.replace('_id', ''))}'>`;

            if (column.type === 'integer')
                return 'number';

            if (column.type === 'double precision')
                return 'number';

            if (column.type === 'boolean')
                return 'boolean';

            if (column.type === 'numeric')
                return 'number';

            if (column.type === 'bigint') {

                console.warn(`WARNING: ${sqlObject.name} Column ${column.name} is of type ${column.type}. It is not parsed correctly by pg. This could cause fatal bugs!`);
                return 'number'
            }

            if (column.type === 'character varying')
                return 'string';

            if (column.type === 'text')
                return 'string';

            throw new Error(`${sqlObject.name} Column ${column.name} has unknown type: ${column.type}!`);
        })();

        const isNullable = sqlObject.type === 'table' && column.isNullable;

        return `${typeName}${isNullable ? ' | null' : ''}`;
    }
}