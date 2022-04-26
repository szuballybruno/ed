import { ClassType } from '../../models/DatabaseTypes';
import { getKeys } from '../../shared/logic/sharedLogic';
import { toSQLSnakeCasing as snk } from '../../utilities/helpers';
import { ConsoleColor, log } from '../misc/logger';
import { SQLConnectionService } from '../sqlServices/SQLConnectionService';
import { ExpressionPart, JoinCondition, OperationType, SelectCondition, SimpleExpressionPart, SQLParamType, SQLStaticValueType, WhereCondition } from './XQueryBuilderTypes';

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
                if ((espressionPart as SelectCondition<TEntity>)[0] === 'SELECT') {

                    const selectCond = espressionPart as SelectCondition<TEntity>;
                    const columnOrColumns = selectCond[1];
                    const snakeColumns = Array.isArray(columnOrColumns)
                        ? columnOrColumns
                            .map(columnPropertyName => snk(columnPropertyName as string))
                            .map(columnName => `${sqlTableRef}.${columnName}`)
                            .join(', ')
                        : columnOrColumns;

                    // SELECT xy.ab, xy.abc
                    return `SELECT ${snakeColumns} FROM ${sqlTableRef}`;
                }

                // join condition
                else if ((espressionPart as JoinCondition<TEntity, any, TParams>)[0] === 'JOIN') {

                    const joinCond = espressionPart as JoinCondition<TEntity, any, TParams>;
                    const [, joinEntity, toEntity, onKey, onOp, toKey] = joinCond;
                    const joinTableName = this.toSQLTableName(joinEntity);
                    const toTableName = this.toSQLTableName(toEntity);
                    const onKeySnake = this.toSQLSnakeCasing(onKey as string);
                    const toKeySnake = this.toSQLSnakeCasing(toKey as string);

                    return `LEFT JOIN ${joinTableName} \nON ${joinTableName}.${onKeySnake} ${onOp} ${toTableName}.${toKeySnake}`;
                }

                // where condition
                else {

                    const cond = espressionPart as WhereCondition<TEntity, TParams>;
                    const [conditionName, classType, columnPropertyName, operatorType, paramProperty] = cond;

                    const tableName: string = this.toSQLTableName(classType);
                    const snakeColumn: string = this.toSQLSnakeCasing(columnPropertyName as string);
                    const operator: OperationType = operatorType;
                    const paramName: keyof TParams | SQLStaticValueType = paramProperty;
                    const paramToken = this.isSQLStaticValue(paramName as string)
                        ? paramName as SQLStaticValueType
                        : sqlParamsList
                            .single(x => x.paramName === paramName)
                            .token;

                    // WHERE xy.ab = $1
                    return `${conditionName} ${tableName}.${snakeColumn} ${operator} ${paramToken}`;
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
