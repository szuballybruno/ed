import { SQLObjectType } from "./models/SQLObjectType";
import { ISQLConnectionService } from "./XORMTypes";

export class XOrmConnectionService {

    constructor(
        private _sqlConnectionService: ISQLConnectionService) {
    }

    async getLiveSchamaAsync() {

        const tableSchema = await this._getTableSchema();
        const viewSchema = await this._getViewSchema();

        return tableSchema
            .concat(viewSchema);
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
                type: 'table',
                columns: x
                    .items
                    .map(x => ({
                        name: x.column_name,
                        type: ''
                    }))
            } as SQLObjectType));

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
                type: 'view',
                columns: x
                    .items
                    .map(x => ({
                        name: x.column_name,
                        type: ''
                    }))
            } as SQLObjectType));

        return views;
    }
}