import { ClassType } from '../../models/DatabaseTypes';

export type SQLParamType<TParams, TParamName extends keyof TParams> = {

    // $1 $2 etc... 
    token: string;
    paramName: TParamName;
    paramValue: TParams[TParamName];
}


export type OperationType = '=' | '!=' | '<' | '>' | 'IS NOT' | 'IS';
export type SQLStaticValueType = 'NULL' | 'true' | 'false';

export type CheckCondition<TEntityA, TEntityB> = {
    code: 'WHERE' | 'AND' | 'ON',
    entityA: ClassType<TEntityA>,
    entityB?: ClassType<TEntityB>,
    keyA: keyof TEntityA,
    op: OperationType,
    keyB: keyof TEntityB | SQLStaticValueType
};

export type SelectCondition<TEntity> = {
    code: 'SELECT',
    key?: keyof TEntity
    keys?: (keyof TEntity)[]
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

export type ExpressionPart<TEntity, TParams> =
    SelectCondition<TEntity> |
    CheckCondition<any, any> |
    LeftJoinCondition<any> |
    CrossJoinCondition<TEntity> |
    InnerJoinCondition<any>;

export type SimpleExpressionPart<TParams> = ExpressionPart<any, TParams>;
