import { SQLObjectType } from "../models/SQLObjectType";
import { getXViewColumnNames } from "../XORMDecorators";
import { XDBMSchemaType } from "../XORMTypes";
import { XORMUtils } from "../XORMUtils";

export const parseOrmSchema = ({
    ormSchema
}: {
    ormSchema: XDBMSchemaType
}) => {

    const getSqlObject = (entity: Function, type: 'table' | 'view') => {

        const columnNames = getXViewColumnNames(entity as any);

        const res: SQLObjectType = {
            columns: columnNames
                .map(columnName => ({
                    name: XORMUtils.toSQLSnakeCasing(columnName),
                    type: '',
                    isNullable: false
                })),
            name: XORMUtils.toSQLSnakeCasing(entity.name),
            type
        };

        return res;
    }

    const tables = ormSchema
        .entities
        .map(entity => getSqlObject(entity, 'table'))

    const views = ormSchema
        .views
        .map(view => getSqlObject(view, 'view'));

    return tables
        .concat(views);
}