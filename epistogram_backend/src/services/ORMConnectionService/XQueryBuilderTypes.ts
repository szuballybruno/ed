

export type SQLParamType<TParams, TParamName extends keyof TParams> = {

    // $1 $2 etc... 
    token: string;
    paramName: TParamName;
    paramValue: TParams[TParamName];
}


export type OperationType = '=' | '!=' | '<' | '>' | 'IS NOT' | 'IS';
export type SQLStaticValueType = 'NULL' | 'true' | 'false';

export type WhereCondition<TEntity, TParams> = ['WHERE' | 'AND', keyof TEntity, OperationType, keyof TParams | SQLStaticValueType];
export type SelectCondition<TEntity> = ['SELECT', keyof TEntity | (keyof TEntity)[]];

export type ExpressionPart<TEntity, TParams> = SelectCondition<TEntity> | WhereCondition<TEntity, TParams>;
