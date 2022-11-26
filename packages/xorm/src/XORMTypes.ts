import { Id } from '@episto/xcore';

export type SQLParamType<TParams, TParamName extends keyof TParams> = {

    // $1 $2 etc... 
    token: string;
    paramName: TParamName;
    paramValue: TParams[TParamName];
}

export class EntityType<TEntityName extends string = any> { id: Id<TEntityName>; }

export type GetIdType<T> = T extends Id<infer P> ? P : never;

export type SaveEntityType<TEntity> = Partial<TEntity>;

export type InsertTokenValuePair = {
    value: any;
    token: string;
};

export type EntityTokenValuePair = {
    tokenValuePairs: InsertTokenValuePair[];
};


export type OperationType = '=' | '!=' | '<' | '>' | 'IS NOT' | 'IS';
export type SQLStaticValueType = 'NULL' | 'true' | 'false';
export type SQLBracketType = null | '(' | ')';
export type CheckExpressionType = 'PARAMS' | 'STATIC_VALUE' | 'ENTITY_REF';


export class CheckExpression<TEntityA, TParams, TEntityB = void>  {

    code: 'WHERE' | 'AND' | 'ON' | 'OR';
    type: CheckExpressionType;
    entityA: ClassType<TEntityA>;
    entityB?: ClassType<TEntityB>;
    keyA: keyof TEntityA;
    op: OperationType;
    keyB: keyof TParams | keyof TEntityB | SQLStaticValueType;
    bracket: SQLBracketType;

    constructor(opts: {
        code: 'WHERE' | 'AND' | 'ON' | 'OR',
        entityA: ClassType<TEntityA>,
        entityB?: ClassType<TEntityB>,
        keyA: keyof TEntityA,
        op: OperationType,
        keyB: keyof TParams | keyof TEntityB | SQLStaticValueType,
        bracket?: SQLBracketType
    }) {
        this.code = opts.code;
        this.type = this._getCheckExpressionType(opts.keyB, opts.entityB);
        this.entityA = opts.entityA;
        this.entityB = opts.entityB;
        this.keyA = opts.keyA;
        this.op = opts.op;
        this.keyB = opts.keyB;
        this.bracket = opts.bracket ?? null;
    }

    private _getCheckExpressionType(keyB: any, classTypeB?: ClassType<any>): CheckExpressionType {

        return classTypeB
            ? 'ENTITY_REF'
            : this._isSQLStaticValue(keyB)
                ? 'STATIC_VALUE'
                : 'PARAMS';
    }

    private _isSQLStaticValue(value: string) {

        return value === 'NULL' || value === 'false' || value === 'true';
    }
}

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

export type OrderByExpression = {
    code: 'ORDER BY',
    orderColumns: string[]
}

export type ExpressionPart<TEntity, TParams> =
    SelectCondition<TEntity> |
    CheckExpression<any, any, any> |
    LeftJoinCondition<any> |
    CrossJoinCondition<TEntity> |
    InnerJoinCondition<any> |
    ClosingBracketCondition |
    OrderByExpression;

export type SimpleExpressionPart<TParams> = ExpressionPart<any, TParams>;

export type XOrmExpression = SimpleExpressionPart<any>[];

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
    [K in keyof TParams]: null | string | string[] | number | number[] | boolean | boolean[] | Date | SQLValueType | Id<any> | Id<any>[];
};

export type XDBMConstraintType = {
    fileName: string;
    tableName?: string;
}

export type XDMBIndexType = {
    name: string;
    tableName: string;
}

export type XDBMSchemaType = {
    views: Function[];
    entities: Function[];
}

export interface IXORMSchemaProviderService {
    getSchema(): XDBMSchemaType;
}

export class XDBMSchemaService implements XDBMSchemaType {
    views: Function[];
    entities: Function[];

    constructor(opts: XDBMSchemaType) {

        this.views = opts.views;
        this.entities = opts.entities;
    }
}

export type ClassType<T> = { new(): T };

export type SQLSchemaObjectType = {
    name: string;
    columnNames: string[];
}

export interface ISQLConnectionService {
    executeSQLAsync<T = any>(script: string, values?: any[]): Promise<{ rows: T[] }>;
};