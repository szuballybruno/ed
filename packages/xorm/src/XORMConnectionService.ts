import { ISQLConnectionService, SQLSchemaObjectType, XDBMSchemaType } from "./XDBManagerTypes";
import { getXViewColumnNames } from "./XORMDecorators";
import { XORMUtils } from "./XORMUtils";

export class XORMConnectionService {

    constructor(
        private _schema: XDBMSchemaType,
        private _sqlConnectionService: ISQLConnectionService) {
    }

    async validateSchemaAsync() {

        const sqlTables = await this._getTableSchema();
        this._validateSchemaObjects({
            type: 'Tables',
            schemaFromDB: sqlTables,
            ormSchemaEntities: this._schema.entities
        });

        const sqlViews = await this._getViewSchema();
        this._validateSchemaObjects({
            type: 'Views',
            schemaFromDB: sqlViews,
            ormSchemaEntities: this._schema.views
        });
    }

    private _validateSchemaObjects({
        type,
        schemaFromDB,
        ormSchemaEntities
    }: {
        type: 'Views' | 'Tables',
        schemaFromDB: SQLSchemaObjectType[],
        ormSchemaEntities: Function[]
    }) {

        const missingEntities = ormSchemaEntities
            .filter(entity => !schemaFromDB
                .some(sqlTable => sqlTable.name === XORMUtils
                    .toSQLSnakeCasing(entity.name)));

        if (missingEntities.any())
            throw new Error(`${type}: ${missingEntities
                .map(x => x.name)
                .join(', ')} are missing from DB!`);

        const missingColumns = ormSchemaEntities
            .map(entity => {

                const entityColumns = getXViewColumnNames(entity as any);

                const sqlTable = schemaFromDB
                    .single(x => x.name === XORMUtils.toSQLSnakeCasing(entity.name));

                const sqlTableColumns = sqlTable
                    .columnNames;

                const missingColumns = entityColumns
                    .map(entityColumn => XORMUtils.toSQLSnakeCasing(entityColumn))
                    .filter(entityColumnSnake => !sqlTableColumns
                        .includes(entityColumnSnake));

                return {
                    tableName: sqlTable.name,
                    missingColumns
                };
            })
            .filter(x => x.missingColumns.any());

        if (missingColumns.any()) {

            const log = missingColumns
                .map(x => `- ${type} (${x.tableName}): ${x.missingColumns.join(', ')}`)
                .join('\n');

            throw new Error(`Missing columns: \n${log}`);
        }
    }

    private async _getTableSchema() {

        type ResType = {
            table_name: string,
            column_name: string,
            data_type: string
        };

        const script = `
            SELECT 
                tb.table_name,
                co.*
            FROM information_schema.tables tb
            LEFT JOIN information_schema.columns co
            ON co.table_name = tb.table_name
            WHERE tb.table_type = 'BASE TABLE'
            AND tb.table_schema = 'public';
        `;

        const { rows } = await this
            ._sqlConnectionService
            .executeSQLAsync<ResType>(script);

        const sqlTables = rows
            .groupBy(x => x.table_name)
            .map(x => ({
                name: x.key,
                columnNames: x.items.map(x => x.column_name)
            }));

        return sqlTables;
    }

    private async _getViewSchema() {

        type ResType = {
            view_name: string,
            column_name: string,
        };

        const script = `
            SELECT 
            tb.table_name view_name,
            co.column_name
            FROM information_schema.views tb
            LEFT JOIN information_schema.columns co
            ON co.table_name = tb.table_name
            WHERE tb.table_schema = 'public';
        `;

        const { rows } = await this
            ._sqlConnectionService
            .executeSQLAsync<ResType>(script);

        const views = rows
            .groupBy(x => x.view_name)
            .map(x => ({
                name: x.key,
                columnNames: x.items.map(x => x.column_name)
            }));

        return views;
    }

}