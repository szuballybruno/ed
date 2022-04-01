import { Connection, ConnectionOptions, createConnection, Repository, SelectQueryBuilder } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { ClassType } from "../../models/Types";
import { getKeys } from "../../shared/logic/sharedLogic";
import { DeepOptionalEntity, toSQLSnakeCasing } from "../../utilities/helpers";
import { GlobalConfiguration } from "../misc/GlobalConfiguration";
import { log } from "../misc/logger";
import { SQLBootstrapperService } from "./SQLBootstrapper";
import { SQLConnectionService } from "./SQLConnectionService";

export type ORMConnection = Connection;

export type ORMSchemaType = {
    entities: any[],
    viewEntities: any[]
}

type Condition<TEntity, TParams> = [keyof TEntity, string, keyof TParams];

type ExpressionPart<TEntity, TParam> = "WHERE" | "AND" | Condition<TEntity, TParam>;

type Expression<TEntity, TParam> = ExpressionPart<TEntity, TParam>[];

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
            type: "postgres",
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
        } as ConnectionOptions;

        log("Connecting to database with TypeORM...", "strong");
        this._ormConnection = await this.createTypeORMConnection(options);
    }

    getRepository<T>(classType: ClassType<T>) {

        return this._ormConnection.getRepository(classType);
    }

    getRepository2<T>(classType: ClassType<T>) {

        return new MyRepository<T>(classType, this._ormConnection);
    }

    snakeToCamelCase(snakeCaseString: string) {

        return snakeCaseString
            .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }

    async querySingleNew<TEntity, TParam>(classType: ClassType<TEntity>, alias: string, whereQuery: Expression<TEntity, TParam>, params: TParam) {


    }

    getSQLErrorEnding(query: string, params?: any[]) {

        return `Query: ${query}\nValues: ${(params ?? []).map((x, i) => `$${i + 1}: ${x}`)}`;
    }

    async querySingle<T>(classType: ClassType<T>, alias: string, whereQuery: string, params?: any[]) {

        const query = this.getQuery(classType, alias, whereQuery);

        const rows = await this
            .queryManyBase(classType, query, params);

        const errorEndingQueryLog = this.getSQLErrorEnding(query, params);
        const rowCount = rows.length;

        if (rowCount === 0)
            throw new Error(`SQL single query failed, 0 rows has been returned. \n${errorEndingQueryLog}`);

        if (rowCount > 1)
            throw new Error(`SQL single query failed, more than 1 rows has been returned. \n${errorEndingQueryLog}`);

        return rows[0];
    }

    async queryMany<T>(classType: ClassType<T>, alias: string, whereQuery: string, params?: any[]) {

        const query = this.getQuery(classType, alias, whereQuery);
        return this.queryManyBase(classType, query, params);
    }

    private getQuery<T>(classType: ClassType<T>, alias: string, whereQuery: string) {

        const baseQuery = `SELECT * FROM public.${toSQLSnakeCasing(classType.name)} ${alias}`;
        return `${baseQuery} ${whereQuery}`;
    }

    private async queryManyBase<T>(classType: ClassType<T>, query: string, params?: any[]) {

        try {
            console.log(query);

            const res = await this._sqlConnectionService
                .executeSQLAsync(query, params);

            return res
                .rows
                .map(row => {

                    let obj = {} as any;

                    getKeys(row)
                        .forEach(key => obj[this.snakeToCamelCase(key as string)] = row[key]);

                    return obj as T;
                });
        }
        catch (e: any) {

            const errorEndingQueryLog = this.getSQLErrorEnding(query, params);
            throw new Error(`Error occured on SQL server while executing query: \n${errorEndingQueryLog}\n Message: ${e.message ?? e}`);
        }
    }

    getOrmConnection() {

        return this._ormConnection;
    }

    private createTypeORMConnection = async (opt: ConnectionOptions) => {

        try {

            log("Connecting to SQL trough TypeORM...");
            const connection = await createConnection(opt);

            if (!connection.manager)
                throw new Error("TypeORM manager is null or undefined!");

            return connection;
        }
        catch (e) {

            throw new Error("Type ORM connection error!" + e);
        }
    }
}

class MyRepository<T> {

    private _connection: Connection;
    private _classType: ClassType<T>;
    private _ormRepo: Repository<T>;

    constructor(classType: ClassType<T>, connection: ORMConnection) {

        this._connection = connection;
        this._classType = classType;
        this._ormRepo = this._connection
            .getRepository(this._classType);
    }

    static getSqlError(e: any) {

        const driverErrorMessage = e.driverError?.message;
        const message = e.message;

        return new Error("SQL Query Error: " + (driverErrorMessage ?? message));
    }

    async insertAsync(obj: DeepOptionalEntity<T>) {

        try {

            this._ormRepo
                .insert(obj);
        }
        catch (e) {

            throw MyRepository.getSqlError(e);
        }
    }

    createQueryBuilder(alias: string) {

        const queryBuilder = this._ormRepo
            .createQueryBuilder(alias);

        // get many
        const getManyAsync = async (qb: SelectQueryBuilder<T>) => {

            try {

                const reuslts = await qb
                    .getMany();

                return reuslts;
            }
            catch (e) {

                throw MyRepository.getSqlError(e);
            }
        }

        // where 
        const where = (condition: string, params: any) => {

            const whereQuery = queryBuilder
                .where(condition, params);

            return {
                getManyAsync: () => getManyAsync(whereQuery)
            }
        }

        return {
            where
        }
    }
}