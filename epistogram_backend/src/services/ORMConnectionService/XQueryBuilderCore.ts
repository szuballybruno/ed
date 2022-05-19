import { ClassType } from "../misc/advancedTypes/ClassType";
import { getKeys, getKeyValues } from '../../shared/logic/sharedLogic';
import { toSQLSnakeCasing as snk } from '../../utilities/helpers';
import { ConsoleColor, log } from '../misc/logger';
import { SQLConnectionService } from '../sqlServices/SQLConnectionService';
import { CheckCondition, CrossJoinCondition, InnerJoinCondition, LeftJoinCondition, OperationType, SelectColumnsType, SelectCondition, SimpleExpressionPart, SQLParamType, SQLStaticValueType } from './XQueryBuilderTypes';

const INDENT = '   ';

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
            .map(x => this.getCondition(x, sqlParamsList, sqlTableRef))
            .join('');

        const isExplicitSelect = queryAsString
            .startsWith('SELECT');

        const fullQuery = isExplicitSelect
            ? queryAsString
            : `SELECT * FROM  ${sqlTableRef}${queryAsString}`;

        return {
            sqlParamsList,
            fullQuery
        };
    }

    private getCondition(
        espressionPart: SimpleExpressionPart<TParams>,
        sqlParamsList: SQLParamType<TParams, keyof TParams>[],
        sqlTableRef: string) {

        // select condition
        if (espressionPart.code === 'SELECT') {

            const selectCond = espressionPart as SelectCondition<TEntity>;

            const text = ((): string => {

                if (selectCond.entity)
                    return `"${this.toSQLSnakeCasing(selectCond.entity.name)}".*`;

                if (selectCond.columnSelects) {

                    const getSelectColumns = (x: SelectColumnsType<any, any>) => INDENT + getKeyValues(x.columnSelectObj)
                        .map(kv => `"${this.toSQLSnakeCasing(x.classType.name)}".${this.toSQLSnakeCasing(kv.value)} ${this.toSQLSnakeCasing(kv.key as string)}`)
                        .join(', ');

                    return selectCond
                        .columnSelects
                        .map(x => x.columnSelectObj === '*'
                            ? `${INDENT}"${this.toSQLSnakeCasing(x.classType.name)}".*`
                            : getSelectColumns(x))
                        .join(',\n');
                }

                throw new Error('Incorrect select condition!');
            })();

            // SELECT xy.ab, xy.abc
            return `SELECT \n${text} \nFROM ${sqlTableRef}`;
        }

        // left join condition
        else if (espressionPart.code === 'LEFT JOIN') {

            const joinCond = espressionPart as LeftJoinCondition<any>;
            const joinTableName = this.toSQLTableName(joinCond.classType);

            return `\n\nLEFT JOIN ${joinTableName}`;
        }

        // inner join condition
        else if (espressionPart.code === 'INNER JOIN') {

            const joinCond = espressionPart as InnerJoinCondition<any>;
            const joinTableName = this.toSQLTableName(joinCond.classType);

            return `\n\nINNER JOIN ${joinTableName}`;
        }

        // cross join condition
        else if (espressionPart.code === 'CROSS JOIN') {

            const joinCond = espressionPart as CrossJoinCondition<any>;
            const joinTableName = this.toSQLTableName(joinCond.classType);

            return `\n\nCROSS JOIN ${joinTableName}`;
        }

        // bracket condition
        else if (espressionPart.code === 'CLOSING BRACKET') {

            return ')';
        }

        // where condition
        else {

            const cond = espressionPart as CheckCondition<TEntity, TParams>;
            const { code, entityA, entityB, keyA, keyB, op, bracket } = cond;
            const isRefOther = !!entityB;

            const tableAName: string = this.toSQLTableName(entityA);
            const snakeColumn: string = this.toSQLSnakeCasing(keyA as string);
            const fullValueA = `${tableAName}.${snakeColumn}`;

            const operator: OperationType = op;
            const bracketProc = bracket ? '(' : '';

            const fullValueB = (() => {

                if (this.isSQLStaticValue(keyB as string))
                    return keyB as SQLStaticValueType;

                if (isRefOther)
                    return `${this.toSQLTableName(entityB)}.${this.toSQLSnakeCasing(keyB as string)}`;

                return sqlParamsList
                    .single(x => x.paramName === keyB)
                    .token;
            })();

            const linebreak = code === 'WHERE' ? '\n' : '';
            const tab = code === 'AND' || code === 'OR' ? INDENT : '';

            return `${linebreak}\n${tab}${code} ${bracketProc}${fullValueA} ${operator} ${fullValueB}`;
        }
    }

    private toSQLTableName<T>(classType: ClassType<T>) {

        return this.escapeTableName(this.toSQLSnakeCasing(classType.name));
    }

    private getSQLParamsList(params: TParams) {

        return getKeys(params)
            .filter(key => params[key] !== null)
            .map((key, index): SQLParamType<TParams, keyof TParams> => {

                const rawValue = params[key] as any;
                
                const value = rawValue.toSQLValue
                    ? rawValue.toSQLValue()
                    : rawValue;

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

        const queryLog = this.getSQLQueryLog(query, params);

        try {

            log('X SQL Query: ');
            log(queryLog, { color: ConsoleColor.purple, noStamp: true });

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

            throw new Error(`Error occured on SQL server while executing query: \n${queryLog} \n Message: ${e.message ?? e} `);
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

        return `${query}\nValues: ${paramPairs.join(', ')}`;
    }

    private snakeToCamelCase(snakeCaseString: string) {

        return snakeCaseString
            .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }
}
