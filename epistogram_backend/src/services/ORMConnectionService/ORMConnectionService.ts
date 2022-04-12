import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ClassType } from '../../models/Types';
import { getKeys, noUndefined } from '../../shared/logic/sharedLogic';
import { toSQLSnakeCasing } from '../../utilities/helpers';
import { GlobalConfiguration } from '../misc/GlobalConfiguration';
import { log } from '../misc/logger';
import { SQLConnectionService } from '../sqlServices/SQLConnectionService';
import { getIsDeletedDecoratorPropertyData } from './ORMConnectionDecorators';

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

type OperationType = '=' | '!=' | '<' | '>' | 'IS NOT' | 'IS';
type SQLStaticValueType = 'NULL' | 'true' | 'false';

type WhereCondition<TEntity, TParams> = ['WHERE' | 'AND', keyof TEntity, OperationType, keyof TParams | SQLStaticValueType];
type SelectCondition<TEntity> = ['SELECT', keyof TEntity | (keyof TEntity)[]];
type ExpressionPart<TEntity, TParam> = SelectCondition<TEntity> | WhereCondition<TEntity, TParam>;

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

        log('Connecting to database with TypeORM...', 'strong');

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

    snakeToCamelCase(snakeCaseString: string) {

        return snakeCaseString
            .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }

    getOrmConnection() {

        return this._ormConnection;
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
    async getSingleById<TEntity, TField extends keyof TEntity, TParam extends Object = any>(classType: ClassType<TEntity>, id: number, opts?: {
        idField?: TField,
        query?: ExpressionPart<TEntity, TParam>[],
        params?: TParam,
        allowDeleted?: boolean
    }) {

        type ActualParamType = { id: number } & TParam;

        const idFieldName = opts?.idField ?? 'id' as TField;
        const query = opts?.query ?? [];
        const hahparams: TParam | undefined = opts?.params;
        const allowDeleted = !!opts?.allowDeleted;

        // create expression
        let baseExpression: ExpressionPart<TEntity, ActualParamType>[] = [['WHERE', idFieldName, '=', 'id']];

        // check deleted flag 
        if (!allowDeleted) {

            const deletionPropertyData = getIsDeletedDecoratorPropertyData(classType);
            if (deletionPropertyData) {

                baseExpression = deletionPropertyData.checkType === 'null'

                    // null check 
                    ? baseExpression
                        .concat([['AND', deletionPropertyData.propName, 'IS', 'NULL']])

                    // bool check 
                    : baseExpression
                        .concat([['AND', deletionPropertyData.propName, '=', 'false']]);
            }
        }

        // get full expression by adding the extension expression to the base
        const fullExpr: ExpressionPart<TEntity, ActualParamType>[] = baseExpression
            .concat(query);

        const actualParams: ActualParamType = { id, ...hahparams } as any;

        return this.getSingle(classType, fullExpr, actualParams);
    }

    /**
     * Returns a single entity, 
     * throws error if 0 or more than 1 is found. 
     */
    async getSingle<TEntity, TParam>(
        classType: ClassType<TEntity>,
        whereQuery: ExpressionPart<TEntity, TParam>[],
        params: TParam,
        alias?: string): Promise<TEntity> {

        const { fullQuery, sqlParamsList } = this.getFullQuery<TEntity, TParam>(classType, whereQuery, params, alias);

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
        whereQuery: ExpressionPart<TEntity, TParam>[],
        params: TParam,
        alias?: string): Promise<TEntity | null> {

        const { fullQuery, sqlParamsList } = this.getFullQuery<TEntity, TParam>(classType, whereQuery, params, alias);

        const rows = await this
            .executeSQLQuery<TEntity, TParam>(fullQuery, sqlParamsList);

        return rows[0] ?? null;
    }

    /**
     * Returns multiple entities.
     */
    async getMany<TEntity, TParam>(
        classType: ClassType<TEntity>,
        query: ExpressionPart<TEntity, TParam>[],
        params: TParam,
        alias?: string) {

        const { fullQuery, sqlParamsList } = this
            .getFullQuery(classType, query, params, alias);

        return this.executeSQLQuery<TEntity, TParam>(fullQuery, sqlParamsList);
    }

    /**
     * Returns the full SQL query that can be run against the DB 
     */
    private getFullQuery<TEntity, TParam>(
        classType: ClassType<TEntity>,
        query: ExpressionPart<TEntity, TParam>[],
        params: TParam,
        alias?: string) {

        const tableName = toSQLSnakeCasing(classType.name);
        const sqlAlias = alias ?? `"${tableName}"`;
        const sqlTableRef = `public.${tableName} ${sqlAlias}`;

        const sqlParamsList = getKeys(params)
            .map((key, index): SQLParamType<TParam, keyof TParam> => {

                const value = params[key];
                const isArray = Array.isArray(value);
                const token = isArray
                    ? `ANY($${index + 1}::int[])`
                    : `$${index + 1}`;

                return ({
                    token: token,
                    paramName: key,
                    paramValue: value
                });
            });

        const queryAsString = query
            .map(x => {

                // select condition
                if ((x as SelectCondition<TEntity>)[0] === 'SELECT') {

                    const selectCond = x as SelectCondition<TEntity>;
                    const columnOrColumns = selectCond[1];
                    const snakeColumns = Array.isArray(columnOrColumns)
                        ? columnOrColumns
                            .map(x => toSQLSnakeCasing(x as string))
                            .map(x => `${sqlAlias}.${x}`)
                            .join(', ')
                        : columnOrColumns;

                    // SELECT xy.ab, xy.abc
                    return `SELECT ${snakeColumns} FROM ${sqlTableRef}`;
                }

                // where condition
                else {

                    const cond = x as WhereCondition<TEntity, TParam>;

                    const snakeColumn = toSQLSnakeCasing(cond[1] as string);
                    const operator: OperationType = cond[2];
                    const paramName: keyof TParam | SQLStaticValueType = cond[3];
                    const paramToken = this.isSQLStaticValue(paramName as string)
                        ? paramName as SQLStaticValueType
                        : sqlParamsList
                            .single(x => x.paramName === paramName)
                            .token;

                    // WHERE xy.ab = $1
                    return `${cond[0]} ${sqlAlias}.${snakeColumn} ${operator} ${paramToken}`;
                }
            })
            .join(' ');


        const isExplicitSelect = queryAsString
            .startsWith('SELECT');

        const fullQuery = isExplicitSelect
            ? queryAsString
            : `SELECT * FROM  ${sqlTableRef} ${queryAsString} `;

        return {
            sqlParamsList,
            fullQuery
        };
    }

    private isSQLStaticValue(value: string) {

        return value === 'NULL' || value === 'false' || value === 'true';
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
                .executeSQLAsync(query, this.getParamValues(params));

            const rowsMapped = res
                .rows
                .map(row => {

                    const obj = {} as any;

                    getKeys(row)
                        .forEach(key => obj[this.snakeToCamelCase(key as string)] = row[key]);

                    return obj as TEntity;
                });

            return rowsMapped;
        }
        catch (e: any) {

            const errorEndingQueryLog = this.getSQLErrorEnding(query, params);
            throw new Error(`Error occured on SQL server while executing query: \n${errorEndingQueryLog} \n Message: ${e.message ?? e} `);
        }
    }

    private getParamValues<TParam>(params?: SQLParamType<TParam, keyof TParam>[]): any[] {

        return (params ?? [])
            .map(x => this.getParamValue(x));
    }

    private getParamValue<TParam>(param: SQLParamType<TParam, keyof TParam>): any {

        return param.paramValue;
        // if (!Array.isArray(param.paramValue))
        //     return param.paramValue;

        // return `(${(param.paramValue as any as any[]).join(", ")})`;
    }

    /**
     * Returns a sophisticated SQL query error string.
     */
    private getSQLErrorEnding<TEntity, TParams extends keyof TEntity>(query: string, params?: SQLParamType<TEntity, TParams>[]) {

        const paramPairs = (params ?? [])
            .map((param) => `${param.token}: ${this.getParamValue(param)}`);

        return `Query: ${query}\nValues: ${paramPairs.join(', ')}`;
    }
}