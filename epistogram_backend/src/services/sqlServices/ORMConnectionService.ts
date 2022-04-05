import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { ClassType } from "../../models/Types";
import { getKeys } from "../../shared/logic/sharedLogic";
import { toSQLSnakeCasing } from "../../utilities/helpers";
import { GlobalConfiguration } from "../misc/GlobalConfiguration";
import { log } from "../misc/logger";
import { SQLConnectionService } from "./SQLConnectionService";

export type ORMConnection = DataSource;

export type ORMSchemaType = {
    entities: any[],
    viewEntities: any[]
}

type SQLParamType<TParams, TParamName extends keyof TParams> = {

    // $1 $2 etc... 
    token: string;
    paramName: TParamName;
    paramValue: TParams[TParamName];
}

type OperationType = "=" | "!=" | "<" | ">";

type Condition<TEntity, TParams> = [keyof TEntity, OperationType, keyof TParams];

type ExpressionPart<TEntity, TParam> = "WHERE" | "AND" | Condition<TEntity, TParam>;

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
        } as DataSourceOptions;

        log("Connecting to database with TypeORM...", "strong");

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

            log("Connecting to SQL trough TypeORM...");
            const connection = await initAsync(options);

            if (!connection.manager)
                throw new Error("TypeORM manager is null or undefined!");

            this._ormConnection = connection;
        }
        catch (e) {

            throw new Error("Type ORM connection error!" + e);
        }
    }

    getRepository<T>(classType: ClassType<T>) {

        return this._ormConnection.getRepository(classType);
    }

    snakeToCamelCase(snakeCaseString: string) {

        return snakeCaseString
            .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }

    getOrmConnection() {

        return this._ormConnection;
    }

    /**
     * Returns a single entity, 
     * throws error if 0 or more than 1 is found. 
     */
    async getSingle<TEntity, TParam>(
        classType: ClassType<TEntity>,
        alias: string,
        whereQuery: ExpressionPart<TEntity, TParam>[],
        params: TParam): Promise<TEntity> {

        const { fullQuery, sqlParamsList } = this.getFullQuery<TEntity, TParam>(classType, alias, whereQuery, params);

        const rows = await this
            .executeSQLQuery<TEntity, TParam>(fullQuery, sqlParamsList);

        const errorEndingQueryLog = this.getSQLErrorEnding(fullQuery, sqlParamsList);
        const rowCount = rows.length;

        if (rowCount === 0)
            throw new Error(`SQL single query failed, 0 rows has been returned.\n${errorEndingQueryLog} `);

        if (rowCount > 1)
            throw new Error(`SQL single query failed, more than 1 rows has been returned.\n${errorEndingQueryLog} `);

        return rows[0];
    }

    /**
     * Returns a single entity, or null if not found.
     */
    async getOneOrNull<TEntity, TParam>(
        classType: ClassType<TEntity>,
        alias: string,
        whereQuery: ExpressionPart<TEntity, TParam>[],
        params: TParam): Promise<TEntity | null> {

        const { fullQuery, sqlParamsList } = this.getFullQuery<TEntity, TParam>(classType, alias, whereQuery, params);

        const rows = await this
            .executeSQLQuery<TEntity, TParam>(fullQuery, sqlParamsList);

        return rows[0] ?? null;
    }

    /**
     * Returns the full SQL query that can be run against the DB 
     */
    private getFullQuery<TEntity, TParam>(
        classType: ClassType<TEntity>,
        alias: string,
        whereQuery: ExpressionPart<TEntity, TParam>[],
        params: TParam) {

        const sqlParamsList = getKeys(params)
            .map((key, index): SQLParamType<TParam, keyof TParam> => ({
                token: `$${index + 1}`,
                paramName: key,
                paramValue: params[key]
            }));

        const whereQueryStr = whereQuery
            .map(x => {

                if (typeof x === "string")
                    return x as string;

                const cond = x as Condition<TEntity, TParam>;

                const snakeColumn = toSQLSnakeCasing(cond[0] as string);
                const operator = cond[1] as string;
                const paramName = cond[2];
                const paramToken = sqlParamsList
                    .single(x => x.paramName === paramName)
                    .token;

                return `${alias}.${snakeColumn} ${operator} ${paramToken}`;
            })
            .join(' ');

        const baseQuery = `SELECT * FROM public.${toSQLSnakeCasing(classType.name)} ${alias} `;
        const fullQuery = `${baseQuery} ${whereQueryStr} `;

        return {
            sqlParamsList,
            fullQuery
        }
    }

    /**
     * Returns a single entity by it's id, 
     * throws error if 0 or more than 1 is found. 
     */
    async getSingleById<TEntity, TField extends keyof TEntity>(classType: ClassType<TEntity>, id: number, idField?: TField) {

        const idFieldName = idField ?? "id" as TField;
        return this.getSingle(classType, classType.name, ["WHERE", [idFieldName, "=", "id"]], { id })
    }

    /**
     * Returns multiple entities.
     */
    async getMany<TEntity, TParam>(
        classType: ClassType<TEntity>,
        alias: string,
        whereQuery: ExpressionPart<TEntity, TParam>[],
        params: TParam) {

        const { fullQuery, sqlParamsList } = this
            .getFullQuery(classType, alias, whereQuery, params);

        return this.executeSQLQuery<TEntity, TParam>(fullQuery, sqlParamsList);
    }

    /**
     * Executes an SQL query against the DB and returns the results. 
     */
    private async executeSQLQuery<TEntity, TParam>(
        query: string,
        params?: SQLParamType<TParam, keyof TParam>[]) {

        try {

            const errorEndingQueryLog = this.getSQLErrorEnding(query, params);
            console.log(errorEndingQueryLog);

            const res = await this._sqlConnectionService
                .executeSQLAsync(query, (params ?? []).map(x => x.paramValue));

            return res
                .rows
                .map(row => {

                    let obj = {} as any;

                    getKeys(row)
                        .forEach(key => obj[this.snakeToCamelCase(key as string)] = row[key]);

                    return obj as TEntity;
                });
        }
        catch (e: any) {

            const errorEndingQueryLog = this.getSQLErrorEnding(query, params);
            throw new Error(`Error occured on SQL server while executing query: \n${errorEndingQueryLog} \n Message: ${e.message ?? e} `);
        }
    }

    /**
     * Returns a sophisticated SQL query error string.
     */
    private getSQLErrorEnding<TEntity, TParams extends keyof TEntity>(query: string, params?: SQLParamType<TEntity, TParams>[]) {

        const paramPairs = (params ?? [])
            .map((param) => `${param.token}: ${param.paramValue}`);

        return `Query: ${query}\nValues: ${paramPairs.join(", ")}`;
    }
}