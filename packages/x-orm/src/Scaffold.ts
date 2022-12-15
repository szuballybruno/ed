import { writeFileSync } from "fs";
import { SQLObjectColumnType } from "./models/SQLObjectColumnType";
import { SQLObjectType } from "./models/SQLObjectType";
import { getOrmObjectFileTemplate } from "./templates/ormObjectFileTemplate";
import { LiveSchemaProvider } from "./LiveSchemaProvider";
import { XORMUtils } from "./XORMUtils";

export class Scaffolder {

    constructor(private _connService: LiveSchemaProvider) {
    }

    async scaffoldAsync(sqlFolderPath: string) {

        const liveSchema = await this
            ._connService
            .getLiveSchamaAsync();

        const tables = this
            ._mapToOrmObjectTexts(liveSchema.filter(x => x.type === 'table'));

        tables
            .forEach(x => writeFileSync(`${sqlFolderPath}/tables/${x.capitalizedName}.ts`, x.fileText, 'utf-8'));
    }

    private _mapToOrmObjectTexts(liveSchema: SQLObjectType[]) {

        const TAB = '    ';

        return liveSchema
            .map(sqlObject => {

                const capitalizedName = XORMUtils.toJSCapitalizedName(sqlObject.name);

                const props = sqlObject
                    .columns
                    .map(col => `${TAB}@XViewColumn()\n${TAB}${XORMUtils.toJSCamelCase(col.name)}: ${this._getPropertyType(sqlObject, col)}; // ${col.type}`)
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

            if (column.name === 'id')
                return `Id<'${capitalizedName}'>`;

            if (column.type === 'timestamp with time zone')
                return 'Date';

            if (column.name.endsWith('_id'))
                return `Id<'${XORMUtils.toJSCapitalizedName(column.name.replace('_id', ''))}'>`;

            if (column.type === 'integer')
                return 'number';

            return 'string';
        })();

        return `${typeName}${column.isNullable ? ' | null' : ''}`;
    }
}