import { ClassType } from '../../models/DatabaseTypes';

export type SQLParamType<TParams, TParamName extends keyof TParams> = {

    // $1 $2 etc... 
    token: string;
    paramName: TParamName;
    paramValue: TParams[TParamName];
}


export type OperationType = '=' | '!=' | '<' | '>' | 'IS NOT' | 'IS';
export type SQLStaticValueType = 'NULL' | 'true' | 'false';

export type WhereCondition<TEntity, TParams> = {
    code: 'WHERE' | 'AND',
    classType:  ClassType<TEntity>,
    key: keyof TEntity,
    op: OperationType,
    criteria: keyof TParams | SQLStaticValueType
};

export type SelectCondition<TEntity> = {
    code: 'SELECT',
    keys:  keyof TEntity | (keyof TEntity)[] 
};

export type JoinCondition<TJoinEntity, TToEntity, TParams> = {
    code: 'JOIN',
    classType: ClassType<TJoinEntity>,
    toClassType: ClassType<TToEntity>,
    key: keyof TJoinEntity,
    op: OperationType,
    criteria: keyof TParams | SQLStaticValueType | keyof TToEntity
};

export type ExpressionPart<TEntity, TParams> = SelectCondition<TEntity> | WhereCondition<TEntity, TParams> | JoinCondition<any, TEntity, TParams>;

export type SimpleExpressionPart<TParams> = ExpressionPart<any, TParams>;
