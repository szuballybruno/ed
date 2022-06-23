import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ClassType } from '../misc/advancedTypes/ClassType';
import { noUndefined } from '../../shared/logic/sharedLogic';
import { GlobalConfiguration } from '../misc/GlobalConfiguration';
import { log } from '../misc/logger';
import { SQLConnectionService } from '../sqlServices/SQLConnectionService';
import { XDBMSchemaType } from '../XDBManager/XDBManagerTypes';
import { XQueryBuilder } from '../XORM/XQueryBuilder';
import { ParamConstraintType } from '../XORM/XORMTypes';
import { InsertEntity } from '../../utilities/misc';

export type ORMConnection = DataSource;

export class ORMConnectionService {

    private _config: GlobalConfiguration;
    private _schema: XDBMSchemaType;
    private _ormConnection: ORMConnection;
    private _sqlConnectionService: SQLConnectionService;
    private _loggingEnabled: boolean;

    constructor(config: GlobalConfiguration, schema: XDBMSchemaType, sqlConnectionService: SQLConnectionService) {

        this._config = config;
        this._schema = schema;
        this._sqlConnectionService = sqlConnectionService;
        this._loggingEnabled = config.logging.orm;
    }

    connectORMAsync = async () => {

        const isLoggingEnabled = this._config.database.isOrmLoggingEnabled;
        const isDangerousDBPurgeEnabled = this._config.database.isDangerousDBPurgeEnabled;
        const dbConnOpts = this._config.getDatabaseConnectionParameters();

        const views = this._schema
            .views
            .filter(x => !!x[2])
            .map(x => x[2]!);

        const entities = this._schema
            .entities;

        const options = {
            type: 'postgres',
            port: dbConnOpts.port,
            host: dbConnOpts.host,
            username: dbConnOpts.username,
            password: dbConnOpts.password,
            database: dbConnOpts.databaseName,
            synchronize: isDangerousDBPurgeEnabled,
            logging: isLoggingEnabled,
            namingStrategy: new SnakeNamingStrategy(),
            extra: {
                socketPath: dbConnOpts.socketPath
            },
            entities: [
                ...entities,
                ...views
            ],
        } as DataSourceOptions;

        log('Connecting to database with TypeORM...', { entryType: 'strong' });

        const initAsync = async (dataSourceOptions: DataSourceOptions): Promise<DataSource> => {

            return new Promise<DataSource>((res, rej) => {

                const dataSource = new DataSource(dataSourceOptions);

                dataSource
                    .initialize()
                    .then(() => {

                        res(dataSource);
                    })
                    .catch((err) => {

                        rej(err);
                    });
            });
        };

        try {

            log('Connecting to SQL trough TypeORM...');
            const connection = await initAsync(options);

            if (!connection.manager)
                throw new Error('TypeORM manager is null or undefined!');

            this._ormConnection = connection;
        }
        catch (e) {

            throw new Error('Type ORM connection error!' + e);
        }
    };

    /**
     * @deprecated Use XOrm (this service .query())
     */
    getRepository<T>(classType: ClassType<T>) {

        return this._ormConnection.getRepository(classType);
    }

    /**
     * @deprecated Use XOrm (this service .query())
     */
    getOrmConnection() {

        return this._ormConnection;
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
    async softDelete<TEntity>(classType: ClassType<TEntity>, ids: number[]) {

        if (ids.length === 0)
            return;

        await this._ormConnection
            .getRepository(classType)
            .softDelete(ids);
    }

    /**
     * Hard deletes entites 
     */
    async hardDelete<TEntity>(classType: ClassType<TEntity>, ids: number[]) {

        if (ids.length === 0)
            return;

        await this._ormConnection
            .getRepository(classType)
            .delete(ids);
    }

    /**
     * Creates a new entity
     */
    async createAsync<TEntity>(c: ClassType<TEntity>, ent: InsertEntity<TEntity>): Promise<number> {

        const entity = ent as any;

        entity.id = null;

        const res = await this
            .getRepository(c)
            .insert(entity);

        return entity.id as number;
    }

    /**
     * Create many entites
     */
    async createManyAsync<TEntity>(c: ClassType<TEntity>, ent: InsertEntity<TEntity>[]) {

        const res = await this
            .getRepository(c)
            .insert(ent as any[]);

        return res.identifiers.map(x => x['id']);
    }

    /**
     * Saves entities
     */
    async save<TEntity>(classType: ClassType<TEntity>, entityOrEntities: Partial<TEntity>[] | Partial<TEntity>) {

        try {

            const entities = Array.isArray(entityOrEntities)
                ? entityOrEntities
                : [entityOrEntities];

            if (entities.length === 0)
                return;

            entities
                .forEach(x => noUndefined(x));

            await this._ormConnection
                .getRepository(classType)
                .save(entities as any);
        }
        catch (e: any) {

            throw new Error(`Error while saving entities of type '${classType.name}'. Inner message: \n${e.message}`);
        }
    }

    /**
     * Returns a single entity by it's id, 
     * throws error if 0 or more than 1 is found. 
     */
    async getSingleById<TEntity, TField extends keyof TEntity>(
        classType: ClassType<TEntity>,
        id: number,
        idField?: TField,
        allowDeleted?: boolean) {

        return await this
            .query(classType, { id } as any)
            .allowDeleted(allowDeleted)
            .where((idField ?? 'id') as any, '=', 'id')
            .getSingle();
    }
}