import { ClassType } from '../misc/advancedTypes/ClassType';
import { getKeys, getKeyValues } from '../../shared/logic/sharedLogic';
import { toSQLSnakeCasing as snk, toSQLSnakeCasing } from '../../utilities/helpers';
import { ConsoleColor, log } from '../misc/logger';
import { SQLConnectionService } from '../sqlServices/SQLConnectionService';
import { CheckExpression, CrossJoinCondition, InnerJoinCondition, LeftJoinCondition, OperationType, SaveEntityType, SelectColumnsType, SelectCondition, SimpleExpressionPart, SQLParamType, SQLStaticValueType, XOrmExpression } from './XORMTypes';
import { getXViewColumnNames } from './XORMDecorators';

const INDENT = '   ';

export class XQueryBuilderCore<TEntity, TParams> {

    constructor(
        private _sqlConnectionService: SQLConnectionService,
        private _loggingEnabled: boolean) {
    }

    /**
     * Returns a single entity, 
     * throws error if 0 or more than 1 is found. 
     */
    async getSingle(
        classType: ClassType<TEntity>,
        expression: XOrmExpression,
        params?: TParams): Promise<TEntity> {

        // compile expression
        const { sqlQuery, sqlParams, isExplicitSelect } = this
            ._compileExpressionToSQLQuery(classType, expression, params ?? {} as any);

        // execute query and get result rows
        const resultRows = await this
            ._executeSQLQuery(sqlQuery, sqlParams);

        const errorEndingQueryLog = this._getSQLQueryLog(sqlQuery, sqlParams);
        const rowCount = resultRows.length;

        if (rowCount === 0)
            throw new Error(`SQL single query failed, 0 rows has been returned.\n${errorEndingQueryLog} `);

        if (rowCount > 1)
            throw new Error(`SQL single query failed, more than 1 rows has been returned.\n${errorEndingQueryLog} `);

        const resultRow = resultRows[0];

        return resultRow;
    }

    /**
     * Returns a single entity, or null if not found.
     */
    async getOneOrNull(
        classType: ClassType<TEntity>,
        expression: XOrmExpression,
        params?: TParams): Promise<TEntity | null> {

        // compile expression
        const { sqlQuery, sqlParams, isExplicitSelect } = this
            ._compileExpressionToSQLQuery(classType, expression, params ?? {} as any);

        // execute query and get result rows
        const resultRows = await this
            ._executeSQLQuery(sqlQuery, sqlParams);

        const row = resultRows[0] ?? null;

        return row;
    }

    /**
     * Returns multiple entities.
     */
    async getMany(
        classType: ClassType<TEntity>,
        query: XOrmExpression,
        params?: TParams) {

        // compile expression
        const { sqlQuery, sqlParams, isExplicitSelect } = this
            ._compileExpressionToSQLQuery(classType, query, params ?? {} as any);

        // execute query and get result rows
        const resultRows = await this
            ._executeSQLQuery(sqlQuery, sqlParams);

        return resultRows;
    }

    /**
     * Inserts multiple entities to the DB 
     */
    async insertManyAsync<T>(signature: ClassType<T>, entities: T[]) {

        if (entities.length === 0)
            return [];

        const { insertFields, insertColumns } = this._getInsertColumns(entities);
        const { valuesQuery, valuesLog, values } = this._getInsertValues(insertFields, entities);
        const tableName = 'public.' + toSQLSnakeCasing(signature.name);

        const query = `
INSERT INTO ${tableName} (${insertColumns.join(', ')})
VALUES 
${valuesQuery}
RETURNING id`;

        log(`${query}\n${valuesLog}`, { color: ConsoleColor.purple, noStamp: true });

        const result = await this._sqlConnectionService
            .executeSQLAsync(query, values);

        return result
            .rows
            .map(x => x.id as number);
    }

    /**
     * Save many async
     */
    async saveManyAsync<T>(signature: ClassType<T>, entities: SaveEntityType<T>[]) {

        if (entities.length === 0)
            return;

        const { insertFields, insertColumns } = this._getInsertColumns(entities);
        const insertColumnsWithId = ['id', ...insertFields];
        const { valuesQuery, values, valuesLog } = this._getInsertValues(insertColumnsWithId, entities);

        const tableName = 'public.' + toSQLSnakeCasing(signature.name);

        const setQuery = insertColumns
            .map(insertColumn => `${INDENT}${insertColumn} = value_table.${insertColumn}`)
            .join(',\n');

        const query = `
UPDATE ${tableName} SET 
${setQuery}
FROM (VALUES
${valuesQuery}
) value_table(${insertColumnsWithId.map(x => toSQLSnakeCasing(x)).join(', ')}) 
WHERE ${tableName}.id = value_table.id::int;
`;

        log(`${query}\n${valuesLog}`, { color: ConsoleColor.purple, noStamp: true });

        const res = await this._sqlConnectionService
            .executeSQLAsync(query, values);
    }

    /**
     * Hard delete 
     */
    async hardDeleteAsync<T>(signature: ClassType<T>, ids: number[]) {

        const tableName = 'public.' + toSQLSnakeCasing(signature.name);

        await this._sqlConnectionService
            .executeSQLAsync(`DELETE FROM ${tableName} WHERE id = ANY($1::int[])`, [ids]);
    }

    /**
     * Soft delete 
     */
    async softDeleteAsync<T>(signature: ClassType<T>, ids: number[]) {

        const ents: any[] = ids
            .map((x) => ({
                id: x,
                deletionDate: new Date()
            }));

        await this
            .saveManyAsync(signature, ents);
    }

    // ----- PRIVATE ----- //

    /**
     * Get insert fields  
     */
    private _getInsertColumns(entities: any[]) {

        const first = entities[0];
        const insertFields = Object
            .keys(first)
            .filter(x => x !== 'id');

        return {
            insertColumns: insertFields
                .map(x => toSQLSnakeCasing(x)),
            insertFields
        };
    }

    /**
     * Get insert values 
     */
    private _getInsertValues(insertFields: string[], entities: any[]) {

        let tokenId = 0;

        const entityInsertDatas = entities
            .map(entity => {

                const tokenValuePairs = insertFields
                    .map(insertField => {

                        tokenId++;

                        return {
                            value: (entity as any)[insertField],
                            token: '$' + tokenId
                        };
                    });

                return {
                    entity,
                    tokenValuePairs
                };
            });

        const valuesQuery = entityInsertDatas
            .map(entityInsertdata => `${INDENT}(${entityInsertdata.tokenValuePairs.map(tvp => tvp.token).join(', ')})`)
            .join(', ');

        const valuesLog = `Values: \n${entityInsertDatas
            .map((x, i) => `Entity ${i}: ${x.tokenValuePairs.map(tvp => `${tvp.token}: ${tvp.value}`)
                .join(', ')}`)
            .join('\n')}`;

        const values = entityInsertDatas
            .flatMap(x => x.tokenValuePairs)
            .map(x => x.value);

        return { tokenId, entityInsertDatas, valuesQuery, valuesLog, values };
    }

    /**
     * Returns the full SQL query that can be run against the DB 
     */
    private _compileExpressionToSQLQuery(
        classType: ClassType<TEntity>,
        expressionParts: XOrmExpression,
        params: TParams): { sqlQuery: string, sqlParams: any[], isExplicitSelect: boolean } {

        const tableName = `"${snk(classType.name)}"`;
        const sqlTableRef = `public.${tableName} ${tableName}`;

        // get processed params list 
        const sqlParamsList = this
            ._getSQLParamsList(params);

        // compile all expression parts
        const queryAsString = expressionParts
            .map(x => this._compileExpressionPart(x, sqlParamsList, sqlTableRef))
            .join('');

        const isExplicitSelect = queryAsString
            .startsWith('SELECT');

        const sqlQuery = isExplicitSelect
            ? queryAsString
            : `SELECT \n${getXViewColumnNames(classType).map(x => `${INDENT}${tableName}.${snk(x)}`).join(',\n')} \nFROM  ${sqlTableRef}${queryAsString}`;

        // filter out null params since they're embedded in the sql query now
        // as static values, ther's no need to supply them
        const sqlParams = sqlParamsList
            .filter(x => x.paramValue !== null);

        return {
            sqlParams,
            sqlQuery,
            isExplicitSelect
        };
    }

    /**
     * Filters out undefined params. 
     * Transforms params into raw sql value - sql $ token pairs
     */
    private _getSQLParamsList(params: TParams) {

        let counter = 1;

        return getKeys(params)
            .filter(key => params[key] !== undefined)
            .map((key): SQLParamType<TParams, keyof TParams> => {

                // get param value 
                const rawValue = params[key] as any;
                const value = rawValue?.toSQLValue
                    ? rawValue.toSQLValue()
                    : rawValue;

                // check if value is of a special type 
                const valueIsNull = value === null;
                const isArray = value && Array.isArray(value);

                // special token strings are required if 
                // value is is array,
                // or value is null
                const token = isArray
                    ? `ANY($${counter}::int[])`
                    : valueIsNull
                        ? `$null`
                        : `$${counter}`;

                // only increment token if value is not null, 
                // since null values will be filtered out before 
                // executing sql query 
                if (!valueIsNull)
                    counter++;

                return ({
                    token: token,
                    paramName: key,
                    paramValue: value
                });
            });
    }

    /**
     * Turns an 'ExpressionPart' into SQL query 
     */
    private _compileExpressionPart(
        expressionPart: SimpleExpressionPart<TParams>,
        sqlParamsList: SQLParamType<TParams, keyof TParams>[],
        sqlTableRef: string): string {

        // select condition
        if (expressionPart.code === 'SELECT') {

            const selectCond = expressionPart as SelectCondition<TEntity>;

            const text = ((): string => {

                if (selectCond.entity)
                    return `"${this._toSQLSnakeCasing(selectCond.entity.name)}".*`;

                if (selectCond.columnSelects) {

                    const getSelectColumns = (x: SelectColumnsType<any, any>) => INDENT + getKeyValues(x.columnSelectObj)
                        .map(kv => `"${this._toSQLSnakeCasing(x.classType.name)}".${this._toSQLSnakeCasing(kv.value)} ${this._toSQLSnakeCasing(kv.key as string)}`)
                        .join(', ');

                    return selectCond
                        .columnSelects
                        .map(x => x.columnSelectObj === '*'
                            ? `${INDENT}"${this._toSQLSnakeCasing(x.classType.name)}".*`
                            : getSelectColumns(x))
                        .join(',\n');
                }

                throw new Error('Incorrect select condition!');
            })();

            // SELECT xy.ab, xy.abc
            return `SELECT \n${text} \nFROM ${sqlTableRef}`;
        }

        // left join condition
        else if (expressionPart.code === 'LEFT JOIN') {

            const joinCond = expressionPart as LeftJoinCondition<any>;
            const joinTableName = this._toSQLTableName(joinCond.classType);

            return `\n\nLEFT JOIN ${joinTableName}`;
        }

        // inner join condition
        else if (expressionPart.code === 'INNER JOIN') {

            const joinCond = expressionPart as InnerJoinCondition<any>;
            const joinTableName = this._toSQLTableName(joinCond.classType);

            return `\n\nINNER JOIN ${joinTableName}`;
        }

        // cross join condition
        else if (expressionPart.code === 'CROSS JOIN') {

            const joinCond = expressionPart as CrossJoinCondition<any>;
            const joinTableName = this._toSQLTableName(joinCond.classType);

            return `\n\nCROSS JOIN ${joinTableName}`;
        }

        // bracket condition
        else if (expressionPart.code === 'CLOSING BRACKET') {

            return ')';
        }

        // ORDER BY
        else if (expressionPart.code === 'ORDER BY') {

            const columns = expressionPart
                .orderColumns
                .map(x => toSQLSnakeCasing(x))
                .join(', ');

            return `\n\nORDER BY ${columns}`;
        }

        // where condition
        else {

            return this._compileCheckExpression(expressionPart, sqlParamsList);
        }
    }

    /**
     * Compiles a CheckExpression to SQL query
     */
    private _compileCheckExpression(
        expression: CheckExpression<TEntity, TParams>,
        sqlParamsList: SQLParamType<TParams, keyof TParams>[]): string {

        const { code, type, entityA, entityB, keyA, keyB, op, bracket } = expression;

        const tableAName: string = this._toSQLTableName(entityA);
        const snakeColumn: string = this._toSQLSnakeCasing(keyA as string);
        const fullValueA = `${tableAName}.${snakeColumn}`;

        const bracketProc = bracket ? '(' : '';

        const { tokenValue } = ((): { tokenValue: string | null } => {

            // where condition right side is a 'static value' 
            if (type === 'STATIC_VALUE')
                return { tokenValue: keyB as SQLStaticValueType };

            // where condition right side is a 'ref to another entity' 
            if (type === 'ENTITY_REF')
                return { tokenValue: `${this._toSQLTableName(entityB!)}.${this._toSQLSnakeCasing(keyB as string)}` };

            // where condition right side is a 'params value'
            if (sqlParamsList.length === 0)
                throw new Error('Where condition is expecting a parameter, but the params list is empty!');

            const param = sqlParamsList
                .single(x => x.paramName === keyB);

            return { tokenValue: param.paramValue === null ? null : param.token };
        })();

        const getOperatorIncaseParamIsNull = (): OperationType => {

            if (op === '!=')
                return 'IS NOT';

            if (op === '=')
                return 'IS';

            throw new Error(`Operator is ${op} but parameter is null. Null can't be compared with operator: ${op}.`);
        }

        const operator: OperationType = tokenValue === null
            ? getOperatorIncaseParamIsNull()
            : op;

        const linebreak = code === 'WHERE' ? '\n' : '';
        const tab = code === 'AND' || code === 'OR' ? INDENT : '';

        return `${linebreak}\n${tab}${code} ${bracketProc}${fullValueA} ${operator} ${tokenValue}`;
    }

    private _toSQLTableName<T>(classType: ClassType<T>) {

        return this._escapeTableName(this._toSQLSnakeCasing(classType.name));
    }

    private _escapeTableName(name: string) {

        return `"${name}"`;
    }

    private _toSQLSnakeCasing(str: string) {

        return snk(str);
    }

    /**
     * Executes an SQL query against the DB and returns the results. 
     */
    private async _executeSQLQuery(
        query: string,
        params?: SQLParamType<TParams, keyof TParams>[]) {

        const queryLog = this._getSQLQueryLog(query, params);

        try {

            if (this._loggingEnabled) {

                log('X SQL Query: ');
                log(queryLog, { color: ConsoleColor.purple, noStamp: true });
            }

            const values = this._getParamValues(params);

            const res = await this._sqlConnectionService
                .executeSQLAsync(query, values);

            const rowsMapped = res
                .rows
                .map(row => {

                    const obj = {} as any;

                    getKeys(row)
                        .forEach(key => obj[this._snakeToCamelCase(key as string)] = row[key]);

                    return obj as TEntity;
                });

            return rowsMapped;
        }
        catch (e: any) {

            throw new Error(`Error occured on SQL server while executing query: \n${queryLog} \n Message: ${e.message ?? e} `);
        }
    }

    private _getParamValues(params?: SQLParamType<TParams, keyof TParams>[]): any[] {

        return (params ?? [])
            .map(x => this._getParamValue(x));
    }

    private _getParamValue(param: SQLParamType<TParams, keyof TParams>): any {

        return param.paramValue;
    }

    /**
     * Returns a sophisticated SQL query error string.
     */
    private _getSQLQueryLog(query: string, params?: SQLParamType<TParams, keyof TParams>[]) {

        const paramPairs = (params ?? [])
            .map((param) => `${param.token}: ${this._getParamValue(param)}`);

        return `${query}\nValues: ${paramPairs.join(', ')}`;
    }

    private _snakeToCamelCase(snakeCaseString: string) {

        return snakeCaseString
            .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }
}
