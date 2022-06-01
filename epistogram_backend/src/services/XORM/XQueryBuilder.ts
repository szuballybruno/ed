import { ClassType } from '../misc/advancedTypes/ClassType';
import { SQLConnectionService } from '../sqlServices/SQLConnectionService';
import { getIsDeletedDecoratorPropertyData } from './XORMDecorators';
import { XQueryBuilderCore } from './XQueryBuilderCore';
import { CrossJoinCondition, ExpressionPart, InnerJoinCondition, LeftJoinCondition, OperationType, SimpleExpressionPart, SQLStaticValueType, CheckCondition, SelectCondition, ColumnSelectObjType, SelectColumnsType, SQLBracketType, ClosingBracketCondition, ParamConstraintType } from './XORMTypes';

const getCheckCondition = <TEntityA, TEntityB, TParams>(
    code: 'AND' | 'WHERE' | 'ON' | 'OR',
    keyA: keyof TEntityA,
    op: OperationType,
    keyB: keyof TParams | keyof TEntityB | SQLStaticValueType,
    params: TParams | undefined,
    bracket: SQLBracketType,
    classTypeA: ClassType<TEntityA>,
    classTypeB?: ClassType<TEntityB>): CheckCondition<TEntityA, TEntityB> | CheckCondition<TEntityA, TParams> => {

    const isSimple = !classTypeB;

    const getOp = (op: OperationType, par: keyof TParams | SQLStaticValueType): [OperationType, SQLStaticValueType | keyof TParams] => {

        return (params as any)[par] === null
            ? ['IS' as OperationType, 'NULL' as SQLStaticValueType]
            : [op, par];
    };

    if (isSimple) {

        const [op2, par2] = getOp(op, keyB as keyof TParams | SQLStaticValueType);

        const cond: CheckCondition<TEntityA, TParams> = {
            code,
            entityA: classTypeA,
            keyA: keyA,
            op: op2,
            keyB: par2,
            bracket
        };

        return cond;
    }
    else {

        const cond: CheckCondition<TEntityA, TEntityB> = {
            code,
            entityA: classTypeA,
            entityB: classTypeB,
            keyA: keyA,
            op: op,
            keyB: keyB as keyof TEntityB | SQLStaticValueType,
            bracket
        };

        return cond;
    }
};

class JoinBuilder<TEntity, TParams extends ParamConstraintType<TParams>> {

    private _builder: XQueryBuilder<TEntity, TParams>;
    private _entityClassType: ClassType<TEntity>;
    private _params: TParams | undefined;

    constructor(
        entityClassType: ClassType<TEntity>,
        builder: XQueryBuilder<TEntity, TParams>,
        params: TParams | undefined) {

        this._builder = builder;
        this._entityClassType = entityClassType;
        this._params = params;
    }

    on(
        keyA: keyof TEntity,
        op: OperationType,
        keyB: keyof TParams | SQLStaticValueType): XQueryBuilder<TEntity, TParams>;

    on<TOtherEntity>(
        keyA: keyof TEntity,
        op: OperationType,
        keyB: keyof TOtherEntity,
        classTypeOther: ClassType<TOtherEntity>): XQueryBuilder<TEntity, TParams>

    on<TOtherEntity>(
        keyA: keyof TEntity,
        op: OperationType,
        keyB: keyof TParams | keyof TOtherEntity | SQLStaticValueType,
        classTypeOther?: ClassType<TOtherEntity>): XQueryBuilder<TEntity, TParams> {

        const cond = getCheckCondition('ON', keyA, op, keyB, this._params, null, this._entityClassType, classTypeOther);

        this
            ._builder
            ._expression
            .push(cond);

        return this._builder;
    }
}

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

    _expression: SimpleExpressionPart<TParams>[] = [];

    constructor(connection: SQLConnectionService, classType: ClassType<TEntity>, params?: TParams) {

        this._connection = new XQueryBuilderCore<TEntity, TParams>(connection);
        this._sqlConnection = connection;
        this._mainClassType = classType;
        this._params = params;
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
            .push({
                code: 'WHERE',
                entityA: this._mainClassType,
                keyA: keyA,
                op: op,
                keyB: keyB
            } as CheckCondition<TEntity, TParams>);

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

        const cond = getCheckCondition('AND', keyA, op, keyB, this._params, this._bracket, this._mainClassType, classTypeOther);

        // clear bracket 
        this.clearBracket();

        this._expression
            .push(cond);

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

        const cond = getCheckCondition('OR', keyA, op, keyB, this._params, this._bracket, this._mainClassType, classTypeOther);

        // clear bracket 
        this.clearBracket();

        this._expression
            .push(cond);

        return this;
    }

    leftJoin<TJoinEntity>(
        joinEntity: ClassType<TJoinEntity>,
        cond: (builder: JoinBuilder<TJoinEntity, TParams>) => void) {

        // left join 
        const leftJoin: LeftJoinCondition<TJoinEntity> = {
            code: 'LEFT JOIN',
            classType: joinEntity
        };

        this._expression
            .push(leftJoin);

        // on, and etc
        const queryBuilder = new XQueryBuilder(this._sqlConnection, joinEntity, this._params);
        const builder = new JoinBuilder<TJoinEntity, TParams>(joinEntity, queryBuilder, this._params);

        cond(builder);

        this._expression = this._expression
            .concat(queryBuilder._expression);

        // exit 
        return this;
    }

    innerJoin<TJoinEntity>(
        joinEntity: ClassType<TJoinEntity>,
        cond: (builder: JoinBuilder<TJoinEntity, TParams>) => XQueryBuilder<TJoinEntity, TParams>) {

        // inner join 
        const innerJoin: InnerJoinCondition<TJoinEntity> = {
            code: 'INNER JOIN',
            classType: joinEntity
        };

        this._expression
            .push(innerJoin);

        // on, and etc
        const queryBuilder = new XQueryBuilder(this._sqlConnection, joinEntity, this._params);
        const builder = new JoinBuilder<TJoinEntity, TParams>(joinEntity, queryBuilder, this._params);

        cond(builder);

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

        this.addDeletedCheck();

        const single = await this._connection
            .getSingle(this._mainClassType, this._expression, this._params);

        return single as any as TResult;
    }

    async getOneOrNull(): Promise<TResult | null> {

        this.addDeletedCheck();

        const oneOrNull = await this._connection
            .getOneOrNull(this._mainClassType, this._expression, this._params);

        return oneOrNull as any as TResult;
    }

    async getMany(): Promise<TResult[]> {

        this.addDeletedCheck();

        const rows = await this._connection
            .getMany(this._mainClassType, this._expression, this._params);

        return rows as any as TResult[];
    }

    private clearBracket() {

        this._bracket = null;
    }

    private addDeletedCheck() {

        if (this._allowDeleted)
            return;

        const deletionPropertyData = getIsDeletedDecoratorPropertyData(this._mainClassType);
        if (!deletionPropertyData)
            return;

        const whereIndex = this._expression
            .findIndex(x => x.code === 'WHERE');

        const isInsert = whereIndex !== -1;

        const getDelChck = (): CheckCondition<TEntity, TParams> => {

            const clauseName = isInsert ? 'AND' : 'WHERE';
            const isNullCheck = deletionPropertyData.checkType === 'null';

            return {
                code: clauseName,
                entityA: this._mainClassType,
                keyA: deletionPropertyData.propName,
                op: isNullCheck ? 'IS' : '=',
                keyB: isNullCheck ? 'NULL' : 'false',
                bracket: null
            };
        };

        isInsert
            ? this._expression = this._expression
                .insert(whereIndex + 1, getDelChck())
            : this._expression
                .push(getDelChck());
    }

    private getParamValue(key: any) {

        return (this._params as any)[key];
    }
}