import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ClassType } from '../../models/Types';
import { noUndefined } from '../../shared/logic/sharedLogic';
import { GlobalConfiguration } from '../misc/GlobalConfiguration';
import { log } from '../misc/logger';
import { SQLConnectionService } from '../sqlServices/SQLConnectionService';
import { XQueryBuilder } from './XQueryBuilder';
import { ExpressionPart, ParamConstraintType } from './XQueryBuilderTypes';

export type ORMConnection = DataSource;

export type ORMSchemaType = {
    entities: any[],
    viewEntities: any[]
}

export class ORMConnectionService {

    private _config: GlobalConfiguration;
    private _schema: ORMSchemaType;
    private _ormConnection: ORMConnection;
    private _sqlConnectionService: SQLConnectionService;

    constructor(config: GlobalConfiguration, schema: ORMSchemaType, sqlConnectionService: SQLConnectionService) {

        this._config = config;
        this._schema = schema;
        this._sqlConnectionService = sqlConnectionService;
    }

    connectORMAsync = async () => {

        const isLoggingEnabled = this._config.database.isOrmLoggingEnabled;
        const isDangerousDBPurgeEnabled = this._config.database.isDangerousDBPurgeEnabled;
        const dbConnOpts = this._config.getDatabaseConnectionParameters();

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
            // "models/entity/**/*.ts"
            entities: [
                ...this._schema.entities,
                ...this._schema.viewEntities
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

    getRepository<T>(classType: ClassType<T>) {

        return this._ormConnection.getRepository(classType);
    }

    getOrmConnection() {

        return this._ormConnection;
    }

    withResType<TResult>() {

        return {
            query: <TEntity, TParam extends ParamConstraintType<TParam>>(classType: ClassType<TEntity>, params?: TParam) => {

                return new XQueryBuilder<TEntity, TParam, TResult>(this._sqlConnectionService, classType, params);
            }
        };
    }

    query<TEntity, TParam extends ParamConstraintType<TParam>, TResult = TEntity>(classType: ClassType<TEntity>, params?: TParam) {

        return new XQueryBuilder<TEntity, TParam, TResult>(this._sqlConnectionService, classType, params);
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
    async create<TEntity>(c: ClassType<TEntity>, ent: Partial<TEntity>) {

        return this
            .getRepository(c)
            .create(ent as any);
    }

    /**
     * Create many entites
     */
    async createMany<TEntity>(c: ClassType<TEntity>, ent: Partial<TEntity>[]) {

        return this
            .getRepository(c)
            .create(ent as any[]);
    }

    /**
     * Saves entities
     */
    async save<TEntity>(classType: ClassType<TEntity>, entites: Partial<TEntity>[]) {

        try {

            if (entites.length === 0)
                return;

            entites
                .forEach(x => noUndefined(x));

            await this._ormConnection
                .getRepository(classType)
                .save(entites as any);
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