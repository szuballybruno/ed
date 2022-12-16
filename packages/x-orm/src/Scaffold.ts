import { writeFileSync } from "fs";
import { LiveSchemaProvider } from "./LiveSchemaProvider";
import { SQLObjectColumnType } from "./models/SQLObjectColumnType";
import { SQLObjectType } from "./models/SQLObjectType";
import { getOrmObjectFileTemplate } from "./templates/ormObjectFileTemplate";
import { XORMUtils } from "./XORMUtils";

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

    async scaffoldAsync(sqlFolderPath: string) {

        const liveSchema = await this
            ._connService
            .getLiveSchamaAsync();

        const tables = this
            ._mapToOrmObjectTexts(liveSchema.filter(x => x.type === 'table'));

        const views = this
            ._mapToOrmObjectTexts(liveSchema.filter(x => x.type === 'view'));

        // write tables 
        tables
            .forEach(x => writeFileSync(`${sqlFolderPath}/tables/${x.capitalizedName}.ts`, x.fileText, 'utf-8'));

        // write views 
        views
            .forEach(x => writeFileSync(`${sqlFolderPath}/views/${x.capitalizedName}.ts`, x.fileText, 'utf-8'));
    }

    private _mapToOrmObjectTexts(liveSchema: SQLObjectType[]) {

        const TAB = '    ';

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