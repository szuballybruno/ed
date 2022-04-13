import { ClassType } from '../../models/Types';
import { getKeys } from '../../shared/logic/sharedLogic';
import { toSQLSnakeCasing } from '../../utilities/helpers';
import { SQLConnectionService } from '../sqlServices/SQLConnectionService';
import { getIsDeletedDecoratorPropertyData } from './ORMConnectionDecorators';
import { ExpressionPart, OperationType, SelectCondition, SQLParamType, SQLStaticValueType, WhereCondition } from './XQueryBuilderTypes';

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
        whereQuery: ExpressionPart<TEntity, TParams>[],
        params?: TParams,
        alias?: string): Promise<TEntity> {

        const { fullQuery, sqlParamsList } = this.getFullQuery(classType, whereQuery, params ?? {} as any, alias);

        const rows = await this
            .executeSQLQuery(fullQuery, sqlParamsList);

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
    async getOneOrNull(
        classType: ClassType<TEntity>,
        whereQuery: ExpressionPart<TEntity, TParams>[],
        params?: TParams,
        alias?: string): Promise<TEntity | null> {

        const { fullQuery, sqlParamsList } = this.getFullQuery(classType, whereQuery, params ?? {} as any, alias);

        const rows = await this
            .executeSQLQuery(fullQuery, sqlParamsList);

        return rows[0] ?? null;
    }

    /**
     * Returns multiple entities.
     */
    async getMany(
        classType: ClassType<TEntity>,
        query: ExpressionPart<TEntity, TParams>[],
        params?: TParams,
        alias?: string) {

        const { fullQuery, sqlParamsList } = this
            .getFullQuery(classType, query, params ?? {} as any, alias);

        return this.executeSQLQuery(fullQuery, sqlParamsList);
    }

    // ----- PRIVATE ----- //

    /**
     * Returns the full SQL query that can be run against the DB 
     */
    private getFullQuery(
        classType: ClassType<TEntity>,
        query: ExpressionPart<TEntity, TParams>[],
        params: TParams,
        alias?: string) {

        const tableName = toSQLSnakeCasing(classType.name);
        const sqlAlias = alias ?? `"${tableName}"`;
        const sqlTableRef = `public.${tableName} ${sqlAlias}`;

        const sqlParamsList = getKeys(params)
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

                    const cond = x as WhereCondition<TEntity, TParams>;

                    const snakeColumn = toSQLSnakeCasing(cond[1] as string);
                    const operator: OperationType = cond[2];
                    const paramName: keyof TParams | SQLStaticValueType = cond[3];
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

    /**
     * Executes an SQL query against the DB and returns the results. 
     */
    private async executeSQLQuery(
        query: string,
        params?: SQLParamType<TParams, keyof TParams>[]) {

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
    private getSQLErrorEnding(query: string, params?: SQLParamType<TParams, keyof TParams>[]) {

        const paramPairs = (params ?? [])
            .map((param) => `${param.token}: ${this.getParamValue(param)}`);

        return `Query: ${query}\nValues: ${paramPairs.join(', ')}`;
    }

    private snakeToCamelCase(snakeCaseString: string) {

        return snakeCaseString
            .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }

    private addDeleteFlagCheck(expression: ExpressionPart<TEntity, TParams>[], classType: ClassType<TEntity>) {

        const deletionPropertyData = getIsDeletedDecoratorPropertyData(classType);
        if (!deletionPropertyData)
            return expression;

        // null check 
        if (deletionPropertyData.checkType === 'null')
            return expression
                .concat([['AND', deletionPropertyData.propName, 'IS', 'NULL']]);

        // bool check 
        return expression
            .concat([['AND', deletionPropertyData.propName, '=', 'false']]);
    }
}
