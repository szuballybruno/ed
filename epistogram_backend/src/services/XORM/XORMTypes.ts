import { ClassType } from '../misc/advancedTypes/ClassType';

export type SQLParamType<TParams, TParamName extends keyof TParams> = {

    // $1 $2 etc... 
    token: string;
    paramName: TParamName;
    paramValue: TParams[TParamName];
}


export type OperationType = '=' | '!=' | '<' | '>' | 'IS NOT' | 'IS';
export type SQLStaticValueType = 'NULL' | 'true' | 'false';
export type SQLBracketType = null | '(' | ')';

export type CheckCondition<TEntityA, TEntityB> = {
    code: 'WHERE' | 'AND' | 'ON' | 'OR',
    entityA: ClassType<TEntityA>,
    entityB?: ClassType<TEntityB>,
    keyA: keyof TEntityA,
    op: OperationType,
    keyB: keyof TEntityB | SQLStaticValueType,
    bracket: SQLBracketType
};

export type SelectCondition<TEntity> = {
    code: 'SELECT',
    columnSelects?: SelectColumnsType<any, any>[],
    entity?: ClassType<TEntity>
};

export type LeftJoinCondition<TJoinEntity> = {
    code: 'LEFT JOIN',
    classType: ClassType<TJoinEntity>
};

export type InnerJoinCondition<TJoinEntity> = {
    code: 'INNER JOIN',
    classType: ClassType<TJoinEntity>
};

export type CrossJoinCondition<TJoinEntity> = {
    code: 'CROSS JOIN',
    classType: ClassType<TJoinEntity>
};

export type ClosingBracketCondition = {
    code: 'CLOSING BRACKET'
}

export type ExpressionPart<TEntity, TParams> =
    SelectCondition<TEntity> |
    CheckCondition<any, any> |
    LeftJoinCondition<any> |
    CrossJoinCondition<TEntity> |
    InnerJoinCondition<any> |
    ClosingBracketCondition;

export type SimpleExpressionPart<TParams> = ExpressionPart<any, TParams>;

export type ColumnSelectObjType<TEntity, TRes> = '*' | {
    [K in keyof Partial<TRes>]: keyof TEntity;
};

export type SelectColumnsType<TEntity, TRes> = {
    classType: ClassType<TEntity>,
    columnSelectObj: ColumnSelectObjType<TEntity, TRes>
};

export type SQLValueType = {
    toSQLValue: () => any
};

export type ParamConstraintType<TParams> = {
    [K in keyof TParams]: null | string | string[] | number | number[] | boolean | boolean[] | SQLValueType;
};