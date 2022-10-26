import { instantiate } from '../../shared/logic/sharedLogic';
import { Id } from '../../shared/types/versionId';
import { toSQLSnakeCasing } from '../../utilities/helpers';
import { InsertEntity } from '../../utilities/misc';
import { ClassType } from '../misc/advancedTypes/ClassType';
import { GlobalConfiguration } from '../misc/GlobalConfiguration';
import { SQLConnectionService } from '../sqlServices/SQLConnectionService';
import { XDBMSchemaService } from '../XDBManager/XDBManagerTypes';
import { getXViewColumnNames } from '../XORM/XORMDecorators';
import { EntityType, ParamConstraintType, SaveEntityType } from '../XORM/XORMTypes';
import { XQueryBuilder } from '../XORM/XQueryBuilder';
import { XQueryBuilderCore } from '../XORM/XQueryBuilderCore';

type SQLSchemaObjectType = {
    name: string;
    columnNames: string[];
}

export class ORMConnectionService {

    public _sqlConnectionService: SQLConnectionService;
    private _loggingEnabled: boolean;
    private _schema: XDBMSchemaService;

    constructor(config: GlobalConfiguration, sqlConnectionService: SQLConnectionService, schema: XDBMSchemaService) {

        this._sqlConnectionService = sqlConnectionService;
        this._loggingEnabled = config.logging.enabledScopes.some(x => x === 'ORM');
        this._schema = schema;
    }

    async beginTransactionAsync() {

        return await this._sqlConnectionService
            .executeSQLAsync('BEGIN');
    }

    async commitTransactionAsync() {

        return await this._sqlConnectionService
            .executeSQLAsync('COMMIT');
    }

    async rollbackTransactionAsync() {

        return await this._sqlConnectionService
            .executeSQLAsync('ROLLBACK');
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
                .some(sqlTable => sqlTable.name === toSQLSnakeCasing(entity.name)));

        if (missingEntities.any())
            throw new Error(`${type}: ${missingEntities
                .map(x => x.name)
                .join(', ')} are missing from DB!`);

        const missingColumns = ormSchemaEntities
            .map(entity => {

                const entityColumns = getXViewColumnNames(entity as any);

                const sqlTable = schemaFromDB
                    .single(x => x.name === toSQLSnakeCasing(entity.name));

                const sqlTableColumns = sqlTable
                    .columnNames;

                const missingColumns = entityColumns
                    .map(entityColumn => toSQLSnakeCasing(entityColumn))
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

    withResType<TResult>() {

        return {
            query: <TEntity, TParam extends ParamConstraintType<TParam>>(classType: ClassType<TEntity>, params?: TParam) => {

                return new XQueryBuilder<TEntity, TParam, TResult>(this._sqlConnectionService, classType, this._loggingEnabled, params);
            }
        };
    }

    /**
     * XORM query builder
     */
    query<TEntity, TParam extends ParamConstraintType<TParam>, TResult = TEntity>(classType: ClassType<TEntity>, params?: TParam) {

        return new XQueryBuilder<TEntity, TParam, TResult>(this._sqlConnectionService, classType, this._loggingEnabled, params);
    }

    /**
     * Soft deletes entites 
     */
    async softDelete<TEntity>(signature: ClassType<TEntity>, ids: Id<any>[]) {

        if (ids.length === 0)
            return;

        const core = new XQueryBuilderCore(this._sqlConnectionService, this._loggingEnabled);

        await core.softDeleteAsync(signature, ids);
    }

    /**
     * Hard deletes entites 
     */
    async hardDelete<TEntity>(signature: ClassType<TEntity>, ids: Id<any>[]) {

        if (ids.length === 0)
            return;

        const core = new XQueryBuilderCore(this._sqlConnectionService, this._loggingEnabled);

        await core.hardDeleteAsync(signature, ids);
    }

    /**
     * Creates a new entity
     */
    async createAsync<TEntity extends EntityType>(signature: ClassType<TEntity>, ent: InsertEntity<TEntity>): Promise<TEntity> {

        const core = new XQueryBuilderCore(this._sqlConnectionService, this._loggingEnabled);

        const ids = await core
            .insertManyAsync(signature, [ent]);

        return instantiate<TEntity>({ ...ent, id: ids.single() } as TEntity);
    }

    /**
     * Create many entites
     */
    async createManyAsync<TEntity extends EntityType>(signature: ClassType<TEntity>, entities: InsertEntity<TEntity>[]): Promise<TEntity[]> {

        const core = new XQueryBuilderCore(this._sqlConnectionService, this._loggingEnabled);

        const ids = await core
            .insertManyAsync(signature, entities);

        return entities
            .map((x, index) => ({
                ...(x as TEntity),
                id: ids[index]
            }));
    }

    /**
     * Saves entities
     */
    async save<TEntity>(signature: ClassType<TEntity>, entityOrEntities: SaveEntityType<TEntity>[] | SaveEntityType<TEntity>) {

        const entities = Array.isArray(entityOrEntities)
            ? entityOrEntities
            : [entityOrEntities];

        const core = new XQueryBuilderCore(this._sqlConnectionService, this._loggingEnabled);

        await core.saveManyAsync(signature, entities);
    }

    /**
     * Save or insert entity
     */
    async saveOrInsertAsync<TEntity extends EntityType>(signature: ClassType<TEntity>, ent: Partial<TEntity>): Promise<Id<'TEntity'>> {

        const entityId = (ent as any).id;

        if (entityId) {

            await this.save(signature, ent as SaveEntityType<TEntity>);
            return entityId;
        }
        else {

            return (await this.createAsync(signature, ent as InsertEntity<TEntity>)).id;
        }
    }

    /**
     * Returns a single entity by it's id, 
     * throws error if 0 or more than 1 is found. 
     */
    async getSingleById<TEntity, TField extends keyof TEntity>(
        classType: ClassType<TEntity>,
        id: Id<any>,
        idField?: TField,
        allowDeleted?: boolean) {

        return await this
            .query(classType, { id } as any)
            .allowDeleted(allowDeleted)
            .where((idField ?? 'id') as any, '=', 'id')
            .getSingle();
    }
}