import { ClassType } from '../misc/advancedTypes/ClassType';
import { SQLConnectionService } from '../sqlServices/SQLConnectionService';
import { getIsDeletedDecoratorPropertyData } from './XORMDecorators';
import { XQueryBuilderCore } from './XQueryBuilderCore';
import { CrossJoinCondition, ExpressionPart, InnerJoinCondition, LeftJoinCondition, OperationType, SimpleExpressionPart, SQLStaticValueType, CheckExpression, SelectCondition, ColumnSelectObjType, SelectColumnsType, SQLBracketType, ClosingBracketCondition, ParamConstraintType, OrderByExpression } from './XORMTypes';

// class JoinBuilder<TEntity, TParams extends ParamConstraintType<TParams>> {

//     private _builder: XQueryBuilder<TEntity, TParams>;
//     private _entityClassType: ClassType<TEntity>;
//     private _params: TParams | undefined;

//     constructor(
//         entityClassType: ClassType<TEntity>,
//         builder: XQueryBuilder<TEntity, TParams>,
//         params: TParams | undefined) {

//         this._builder = builder;
//         this._entityClassType = entityClassType;
//         this._params = params;
//     }
// }

type SelectBuilderBackrefType<TResult> = {
    columnSelects: SelectColumnsType<any, TResult>[]
};

class SelectBuilder<TResult> {

    private _backref: SelectBuilderBackrefType<TResult>;

    constructor(backref: SelectBuilderBackrefType<TResult>) {

        this._backref = backref;
    }

    columns<T>(ct: ClassType<T>, columnSelectObj: ColumnSelectObjType<T, TResult>) {

        this._backref
            .columnSelects
            .push({
                classType: ct,
                columnSelectObj: columnSelectObj
            });

        return this;
    }
}

export class XQueryBuilder<TEntity, TParams extends ParamConstraintType<TParams>, TResult = TEntity> {

    private _connection: XQueryBuilderCore<TEntity, TParams>;
    private _mainClassType: ClassType<TEntity>;
    private _params: TParams | undefined;
    private _allowDeleted = false;
    private _sqlConnection: SQLConnectionService;
    private _bracket: SQLBracketType;
    private _loggingEnabled: boolean;

    _expression: SimpleExpressionPart<TParams>[] = [];

    constructor(connection: SQLConnectionService, classType: ClassType<TEntity>, loggingEnabled: boolean, params?: TParams) {

        this._connection = new XQueryBuilderCore<TEntity, TParams>(connection, loggingEnabled);
        this._sqlConnection = connection;
        this._mainClassType = classType;
        this._params = params;
        this._loggingEnabled = loggingEnabled;
    }

    selectFrom(fn: (builder: SelectBuilder<TResult>) => void) {

        const backref: SelectBuilderBackrefType<TResult> = {
            columnSelects: []
        };

        fn(new SelectBuilder(backref));

        const cond: SelectCondition<TEntity> = {
            code: 'SELECT',
            columnSelects: backref.columnSelects
        };

        this._expression
            .push(cond);

        return this;
    }

    select(ct: ClassType<any>) {

        const cond: SelectCondition<TEntity> = {
            code: 'SELECT',
            entity: ct
        };

        this._expression
            .push(cond);

        return this;
    }

    allowDeleted(allowDeleted?: boolean) {

        this._allowDeleted = allowDeleted !== false;
        return this;
    }

    where(keyA: keyof TEntity, op: OperationType, keyB: keyof TParams | SQLStaticValueType) {

        this._expression
            .push(new CheckExpression<TEntity, TParams>({
                code: 'WHERE',
                entityA: this._mainClassType,
                keyA: keyA,
                op: op,
                keyB: keyB,
            }));

        return this;
    }

    orderBy(orderColumns: (keyof TEntity)[]) {

        const expr: OrderByExpression = {
            code: 'ORDER BY',
            orderColumns: orderColumns as any[]
        };

        this._expression
            .push(expr);

        return this;
    }

    openBracket() {

        this._bracket = '(';

        return this;
    }

    closeBracket() {

        this._expression
            .push({
                code: 'CLOSING BRACKET'
            } as ClosingBracketCondition);

        return this;
    }

    and(
        keyA: keyof TEntity,
        op: OperationType,
        keyB: keyof TParams | SQLStaticValueType): XQueryBuilder<TEntity, TParams, TResult>;

    and<TOtherEntity>(
        keyA: keyof TEntity,
        op: OperationType,
        keyB: keyof TOtherEntity,
        classTypeOther: ClassType<TOtherEntity>): XQueryBuilder<TEntity, TParams, TResult>;

    and<TOtherEntity>(
        keyA: keyof TEntity,
        op: OperationType,
        keyB: keyof TParams | keyof TOtherEntity | SQLStaticValueType,
        classTypeOther?: ClassType<TOtherEntity>): XQueryBuilder<TEntity, TParams, TResult> {

        const expression = new CheckExpression<TEntity, TParams, TOtherEntity>({
            code: 'AND',
            keyA: keyA,
            op: op,
            keyB: keyB as keyof TParams | SQLStaticValueType,
            entityA: this._mainClassType,
            entityB: classTypeOther,
            bracket: this._bracket
        });

        // clear bracket 
        this._clearBracket();

        this._expression
            .push(expression);

        return this;
    }

    or(
        keyA: keyof TEntity,
        op: OperationType,
        keyB: keyof TParams | SQLStaticValueType): XQueryBuilder<TEntity, TParams, TResult>;

    or<TOtherEntity>(
        keyA: keyof TEntity,
        op: OperationType,
        keyB: keyof TOtherEntity,
        classTypeOther: ClassType<TOtherEntity>): XQueryBuilder<TEntity, TParams, TResult>;

    or<TOtherEntity>(
        keyA: keyof TEntity,
        op: OperationType,
        keyB: keyof TParams | keyof TOtherEntity | SQLStaticValueType,
        classTypeOther?: ClassType<TOtherEntity>): XQueryBuilder<TEntity, TParams, TResult> {

        const expression = new CheckExpression<TEntity, TParams, TOtherEntity>({
            code: 'OR',
            keyA: keyA,
            op: op,
            keyB: keyB as keyof TParams | SQLStaticValueType,
            entityA: this._mainClassType,
            entityB: classTypeOther,
            bracket: this._bracket
        });

        // clear bracket 
        this._clearBracket();

        this._expression
            .push(expression);

        return this;
    }

    on(
        keyA: keyof TEntity,
        op: OperationType,
        keyB: keyof TParams | SQLStaticValueType): XQueryBuilder<TEntity, TParams, TResult>;

    on<TOtherEntity>(
        keyA: keyof TEntity,
        op: OperationType,
        keyB: keyof TOtherEntity,
        classTypeOther: ClassType<TOtherEntity>): XQueryBuilder<TEntity, TParams, TResult>

    on<TOtherEntity>(
        keyA: keyof TEntity,
        op: OperationType,
        keyB: keyof TParams | keyof TOtherEntity | SQLStaticValueType,
        classTypeOther?: ClassType<TOtherEntity>): XQueryBuilder<TEntity, TParams, TResult> {

        const expression = new CheckExpression<TEntity, TParams, TOtherEntity>({
            code: 'ON',
            keyA: keyA,
            op: op,
            keyB: keyB as keyof TParams | SQLStaticValueType,
            entityA: this._mainClassType,
            entityB: classTypeOther
        });

        this
            ._expression
            .push(expression);

        return this;
    }

    leftJoin<TJoinEntity>(
        joinEntity: ClassType<TJoinEntity>,
        cond: (builder: XQueryBuilder<TJoinEntity, TParams>) => void) {

        // left join 
        const leftJoin: LeftJoinCondition<TJoinEntity> = {
            code: 'LEFT JOIN',
            classType: joinEntity
        };

        this._expression
            .push(leftJoin);

        // on, and etc
        const queryBuilder = new XQueryBuilder(this._sqlConnection, joinEntity, this._loggingEnabled, this._params);

        cond(queryBuilder);

        this._expression = this._expression
            .concat(queryBuilder._expression);

        // exit 
        return this;
    }

    innerJoin<TJoinEntity>(
        joinEntity: ClassType<TJoinEntity>,
        cond: (builder: XQueryBuilder<TJoinEntity, TParams>) => XQueryBuilder<TJoinEntity, TParams>) {

        // inner join 
        const innerJoin: InnerJoinCondition<TJoinEntity> = {
            code: 'INNER JOIN',
            classType: joinEntity
        };

        this._expression
            .push(innerJoin);

        // on, and etc
        const queryBuilder = new XQueryBuilder(this._sqlConnection, joinEntity, this._loggingEnabled, this._params);
        // const builder = new JoinBuilder<TJoinEntity, TParams>(joinEntity, queryBuilder, this._params);

        cond(queryBuilder);

        this._expression = this._expression
            .concat(queryBuilder._expression);

        // exit 
        return this;
    }

    crossJoin<TEntity>(joinEntity: ClassType<TEntity>) {

        this._expression
            .push({
                code: 'CROSS JOIN',
                classType: joinEntity,
            } as CrossJoinCondition<TEntity>);

        return this;
    }

    setQuery(query: ExpressionPart<TEntity, TParams>[]) {

        this._expression = query;
        return this;
    }

    async getSingle(): Promise<TResult> {

        this._addDeletedCheck();

        const single = await this._connection
            .getSingle(this._mainClassType, this._expression, this._params);

        return single as any as TResult;
    }

    async getOneOrNull(): Promise<TResult | null> {

        this._addDeletedCheck();

        const oneOrNull = await this._connection
            .getOneOrNull(this._mainClassType, this._expression, this._params);

        return oneOrNull as any as TResult;
    }

    async getMany(): Promise<TResult[]> {

        this._addDeletedCheck();

        const rows = await this._connection
            .getMany(this._mainClassType, this._expression, this._params);

        return rows as any as TResult[];
    }

    //
    // ----------- PRIVATE 
    //

    private _clearBracket() {

        this._bracket = null;
    }

    private _addDeletedCheck() {

        if (this._allowDeleted)
            return;

        const deletionPropertyData = getIsDeletedDecoratorPropertyData(this._mainClassType);
        if (!deletionPropertyData)
            return;

        const whereIndex = this._expression
            .findIndex(x => x.code === 'WHERE');

        const isInsert = whereIndex !== -1;

        const getDelChck = () => {

            const clauseName = isInsert ? 'AND' : 'WHERE';
            const isNullCheck = deletionPropertyData.checkType === 'null';

            return new CheckExpression<TEntity, TParams>({
                code: clauseName,
                entityA: this._mainClassType,
                keyA: deletionPropertyData.propName,
                op: isNullCheck ? 'IS' : '=',
                keyB: isNullCheck ? 'NULL' : 'false',
                bracket: null
            });
        };

        isInsert
            ? this._expression = this._expression
                .insert(whereIndex + 1, getDelChck())
            : this._expression
                .push(getDelChck());
    }
}