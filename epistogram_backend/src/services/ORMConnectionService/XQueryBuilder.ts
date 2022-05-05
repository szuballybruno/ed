import { ClassType } from '../../models/DatabaseTypes';
import { SQLConnectionService } from '../sqlServices/SQLConnectionService';
import { getIsDeletedDecoratorPropertyData } from './ORMConnectionDecorators';
import { XQueryBuilderCore } from './XQueryBuilderCore';
import { ExpressionPart, OperationType, SimpleExpressionPart, SQLStaticValueType } from './XQueryBuilderTypes';

export class XQueryBuilder<TEntity, TParams> {

    private _connection: XQueryBuilderCore<TEntity, TParams>;
    private _mainClassType: ClassType<TEntity>;
    private _params: TParams | undefined;
    private _expression: SimpleExpressionPart<TParams>[] = [];
    private _allowDeleted = false;

    constructor(connection: SQLConnectionService, classType: ClassType<TEntity>, params?: TParams) {

        this._connection = new XQueryBuilderCore<TEntity, TParams>(connection);
        this._mainClassType = classType;
        this._params = params;
    }

    select(props: keyof TEntity | (keyof TEntity)[]) {

        return this;
    }

    allowDeleted(allowDeleted?: boolean) {

        this._allowDeleted = allowDeleted !== false;
        return this;
    }

    where(key: keyof TEntity, op: OperationType, param: keyof TParams | SQLStaticValueType) {

        this._expression
            .push(['WHERE', this._mainClassType, key, op, param]);

        return this;
    }

    and(
        key: keyof TEntity,
        op: OperationType,
        param: keyof TParams | SQLStaticValueType): XQueryBuilder<TEntity, TParams>;
    and<TCheckEntity>(
        classType: ClassType<TCheckEntity>,
        key: keyof TCheckEntity,
        op: OperationType,
        param: keyof TParams | SQLStaticValueType): XQueryBuilder<TEntity, TParams>;
    and<TCheckEntity>(
        key_Or_ClassType: keyof TEntity | ClassType<TCheckEntity>,
        op_Or_Key: OperationType | keyof TCheckEntity,
        param_OR_op: keyof TParams | SQLStaticValueType | OperationType,
        param?: keyof TParams | SQLStaticValueType): XQueryBuilder<TEntity, TParams> {

        const isFirstClassType = !!(key_Or_ClassType as any).name;

        if (isFirstClassType) {

            const classType = key_Or_ClassType as ClassType<TCheckEntity>;
            const key = op_Or_Key as keyof TCheckEntity;
            const op = param_OR_op as OperationType;
            const par = param! as keyof TParams | SQLStaticValueType;

            this._expression
                .push(['AND', classType, key, op, par]);
        }
        else {

            const key = key_Or_ClassType as keyof TEntity;
            const op = op_Or_Key as OperationType;
            const param = param_OR_op as keyof TParams | SQLStaticValueType;

            this._expression
                .push(['AND', this._mainClassType, key, op, param]);
        }

        return this;
    }

    leftJoin<TJoinEntity, TOnEntity>(joinEntity: ClassType<TJoinEntity>, toEntity: ClassType<TOnEntity>) {

        return {
            on: (onKey: keyof TJoinEntity, onOp: OperationType, toKey: keyof TOnEntity) => {

                this._expression
                    .push(['JOIN', joinEntity, toEntity, onKey, onOp, toKey]);

                return this;
            }
        };
    }

    setQuery(query: ExpressionPart<TEntity, TParams>[]) {

        this._expression = query;
        return this;
    }

    async getSingle(): Promise<TEntity> {

        this.addDeletedCheck();

        return await this._connection
            .getSingle(this._mainClassType, this._expression, this._params);
    }

    async getOneOrNull(): Promise<TEntity | null> {

        this.addDeletedCheck();

        return await this._connection
            .getOneOrNull(this._mainClassType, this._expression, this._params);
    }

    async getMany(): Promise<TEntity[]> {

        this.addDeletedCheck();

        return await this._connection
            .getMany(this._mainClassType, this._expression, this._params);
    }

    private addDeletedCheck() {

        if (this._allowDeleted)
            return;

        const deletionPropertyData = getIsDeletedDecoratorPropertyData(this._mainClassType);
        if (!deletionPropertyData)
            return;

        const whereIndex = this._expression
            .findIndex(x => x[0] === 'WHERE');

        // after explicit where 
        if (whereIndex !== -1) {

            // null check 
            if (deletionPropertyData.checkType === 'null') {

                this._expression = this._expression
                    .insert(whereIndex + 1, ['AND', this._mainClassType, deletionPropertyData.propName, 'IS', 'NULL']);
            }

            // bool check
            else {

                this._expression = this._expression
                    .insert(whereIndex + 1, ['AND', this._mainClassType, deletionPropertyData.propName, '=', 'false']);
            }
        }

        // end of expression
        else {

            // null check 
            if (deletionPropertyData.checkType === 'null') {

                this._expression
                    .push(['WHERE', this._mainClassType, deletionPropertyData.propName, 'IS', 'NULL']);
            }

            // bool check
            else {

                this._expression
                    .push(['WHERE', this._mainClassType, deletionPropertyData.propName, '=', 'false']);
            }
        }
    }
}