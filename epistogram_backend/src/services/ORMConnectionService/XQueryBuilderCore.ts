import { ClassType } from '../../models/DatabaseTypes';
import { getKeys } from '../../shared/logic/sharedLogic';
import { toSQLSnakeCasing as snk } from '../../utilities/helpers';
import { ConsoleColor, log } from '../misc/logger';
import { SQLConnectionService } from '../sqlServices/SQLConnectionService';
import { CrossJoinCondition, ExpressionPart, InnerJoinCondition, LeftJoinCondition, OperationType, SelectCondition, SimpleExpressionPart, SQLParamType, SQLStaticValueType, CheckCondition } from './XQueryBuilderTypes';

export class XQueryBuilderCore<TEntity, TParams> {

    private _sqlConnectionService: SQLConnectionService;

    constructor(sqlConnectionService: SQLConnectionService) {

        this._sqlConnectionService = sqlConnectionService;
    }

    /**
     * Returns a single entity, 
     * throws error if 0 or more than 1 is found. 
     */
    async getSingle(
        classType: ClassType<TEntity>,
        whereQuery: SimpleExpressionPart<TParams>[],
        params?: TParams): Promise<TEntity> {

        const { fullQuery, sqlParamsList } = this.getFullQuery(classType, whereQuery, params ?? {} as any);

        const rows = await this
            .executeSQLQuery(fullQuery, sqlParamsList);

        const errorEndingQueryLog = this.getSQLQueryLog(fullQuery, sqlParamsList);
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
    async getOneOrNull(
        classType: ClassType<TEntity>,
        whereQuery: SimpleExpressionPart<TParams>[],
        params?: TParams): Promise<TEntity | null> {

        const { fullQuery, sqlParamsList } = this.getFullQuery(classType, whereQuery, params ?? {} as any);

        const rows = await this
            .executeSQLQuery(fullQuery, sqlParamsList);

        return rows[0] ?? null;
    }

    /**
     * Returns multiple entities.
     */
    async getMany(
        classType: ClassType<TEntity>,
        query: SimpleExpressionPart<TParams>[],
        params?: TParams) {

        const { fullQuery, sqlParamsList } = this
            .getFullQuery(classType, query, params ?? {} as any);

        return this.executeSQLQuery(fullQuery, sqlParamsList);
    }

    // ----- PRIVATE ----- //

    /**
     * Returns the full SQL query that can be run against the DB 
     */
    private getFullQuery(
        classType: ClassType<TEntity>,
        expressionParts: SimpleExpressionPart<TParams>[],
        params: TParams) {

        const tableName = `"${snk(classType.name)}"`;
        const sqlTableRef = `public.${tableName} ${tableName}`;
        const sqlParamsList = this.getSQLParamsList(params);

        const queryAsString = expressionParts
            .map(espressionPart => {

                // select condition
                if (espressionPart.code === 'SELECT') {

                    const selectCond = espressionPart as SelectCondition<TEntity>;

                    const text = (() => {

                        if (selectCond.key)
                            return `${tableName}.${this.toSQLSnakeCasing(selectCond.key as string)}`;

                        if (selectCond.keys)
                            return selectCond.keys
                                .map(x => `${tableName}.${this.toSQLSnakeCasing(x as string)}`)
                                .join(', ');

                        if (selectCond.entity)
                            return `"${this.toSQLSnakeCasing(selectCond.entity.name)}".*`;

                        throw new Error('Incorrect select condition!');
                    })();

                    // SELECT xy.ab, xy.abc
                    return `SELECT ${text} FROM ${sqlTableRef}`;
                }

                // left join condition
                else if (espressionPart.code === 'LEFT JOIN') {

                    const joinCond = espressionPart as LeftJoinCondition<any>;
                    const joinTableName = this.toSQLTableName(joinCond.classType);

                    return `LEFT JOIN ${joinTableName}`;
                }

                // inner join condition
                else if (espressionPart.code === 'INNER JOIN') {

                    const joinCond = espressionPart as InnerJoinCondition<any>;
                    const joinTableName = this.toSQLTableName(joinCond.classType);

                    return `INNER JOIN ${joinTableName}`;
                }

                // cross join condition
                else if (espressionPart.code === 'CROSS JOIN') {

                    const joinCond = espressionPart as CrossJoinCondition<any>;
                    const joinTableName = this.toSQLTableName(joinCond.classType);

                    return `CROSS JOIN ${joinTableName}`;
                }

                // where condition
                else {

                    const cond = espressionPart as CheckCondition<TEntity, TParams>;
                    const { code, entityA, entityB, keyA, keyB, op } = cond;
                    const isRefOther = !!entityB;

                    const tableAName: string = this.toSQLTableName(entityA);
                    const snakeColumn: string = this.toSQLSnakeCasing(keyA as string);
                    const fullValueA = `${tableAName}.${snakeColumn}`;

                    const operator: OperationType = op;

                    const fullValueB = (() => {

                        if (this.isSQLStaticValue(keyB as string))
                            return keyB as SQLStaticValueType;

                        if (isRefOther)
                            return `${this.toSQLTableName(entityB)}.${this.toSQLSnakeCasing(keyB as string)}`;

                        return sqlParamsList
                            .single(x => x.paramName === keyB)
                            .token;
                    })();

                    // WHERE xy.ab = $1
                    return `${code} ${fullValueA} ${operator} ${fullValueB}`;
                }
            })
            .join('\n');

        const isExplicitSelect = queryAsString
            .startsWith('SELECT');

        const fullQuery = isExplicitSelect
            ? queryAsString
            : `SELECT * FROM  ${sqlTableRef}\n${queryAsString}`;

        return {
            sqlParamsList,
            fullQuery
        };
    }

    private toSQLTableName<T>(classType: ClassType<T>) {

        return this.escapeTableName(this.toSQLSnakeCasing(classType.name));
    }

    private getSQLParamsList(params: TParams) {

        return getKeys(params)
            .filter(key => params[key] !== null)
            .map((key, index): SQLParamType<TParams, keyof TParams> => {

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
    }

    private escapeTableName(name: string) {

        return `"${name}"`;
    }

    private toSQLSnakeCasing(str: string) {

        return snk(str);
    }

    /**
     * Executes an SQL query against the DB and returns the results. 
     */
    private async executeSQLQuery(
        query: string,
        params?: SQLParamType<TParams, keyof TParams>[]) {

        try {

            const queryLog = this.getSQLQueryLog(query, params);

            log(queryLog, { color: ConsoleColor.purple });

            const values = this.getParamValues(params);

            const res = await this._sqlConnectionService
                .executeSQLAsync(query, values);

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

            const errorEndingQueryLog = this.getSQLQueryLog(query, params);
            throw new Error(`Error occured on SQL server while executing query: \n${errorEndingQueryLog} \n Message: ${e.message ?? e} `);
        }
    }

    private isSQLStaticValue(value: string) {

        return value === 'NULL' || value === 'false' || value === 'true';
    }

    private getParamValues(params?: SQLParamType<TParams, keyof TParams>[]): any[] {

        return (params ?? [])
            .map(x => this.getParamValue(x));
    }

    private getParamValue(param: SQLParamType<TParams, keyof TParams>): any {

        return param.paramValue;
    }

    /**
     * Returns a sophisticated SQL query error string.
     */
    private getSQLQueryLog(query: string, params?: SQLParamType<TParams, keyof TParams>[]) {

        const paramPairs = (params ?? [])
            .map((param) => `${param.token}: ${this.getParamValue(param)}`);

        return `Query: \n${query}\nValues: ${paramPairs.join(', ')}`;
    }

    private snakeToCamelCase(snakeCaseString: string) {

        return snakeCaseString
            .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }
}
