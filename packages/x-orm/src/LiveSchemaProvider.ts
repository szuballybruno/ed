import { SQLObjectColumnType } from "./models/SQLObjectColumnType";
import { SQLObjectType } from "./models/SQLObjectType";
import { ISQLConnectionService } from "./XORMTypes";

export class LiveSchemaProvider {

    constructor(
        private _sqlConnectionService: ISQLConnectionService) {
    }

    async getLiveSchamaAsync() {

        type ResType = {
            object_type: string;
            object_name: string,
            column_name: string,
            data_type: string
            is_nullable: string
        };

        const script = `
        SELECT 
            'TABLE' object_type,
            tb.table_name object_name,
            co.column_name,
            co.is_nullable,
            co.data_type
        FROM information_schema.tables tb

        LEFT JOIN information_schema.columns co
        ON co.table_name = tb.table_name

        WHERE tb.table_type = 'BASE TABLE'
        AND tb.table_schema = 'public'

        UNION ALL

        SELECT 
            'VIEW' object_type,
            tb.table_name object_name,
            co.column_name,
            co.is_nullable,
            co.data_type
        FROM information_schema.views tb

        LEFT JOIN information_schema.columns co
        ON co.table_name = tb.table_name

        WHERE tb.table_schema = 'public';
        `;

        const { rows } = await this
            ._sqlConnectionService
            .executeSQLAsync<ResType>(script);

        const sqlObjets = rows
            .groupBy(x => x.object_name)
            .map(group => ({
                name: group.key,
                type: group.first.object_type === 'TABLE' ? 'table' : 'view',
                columns: group
                    .items
                    .map(x => ({
                        name: x.column_name,
                        type: x.data_type,
                        isNullable: x.is_nullable === 'YES',
                    } as SQLObjectColumnType))
            } as SQLObjectType));

        return sqlObjets;
    }
}