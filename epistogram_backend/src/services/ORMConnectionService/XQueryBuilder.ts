import { ClassType } from '../../models/Types';
import { SQLConnectionService } from '../sqlServices/SQLConnectionService';
import { getIsDeletedDecoratorPropertyData } from './ORMConnectionDecorators';
import { XQueryBuilderCore } from './XQueryBuilderCore';
import { ExpressionPart, OperationType, SQLStaticValueType } from './XQueryBuilderTypes';

export class XQueryBuilder<TEntity, TParams> {

    private _connection: XQueryBuilderCore<TEntity, TParams>;
    private _classType: ClassType<TEntity>;
    private _params: TParams | undefined;
    private _expression: ExpressionPart<TEntity, TParams>[] = [];
    private _allowDeleted = false;

    constructor(connection: SQLConnectionService, classType: ClassType<TEntity>, params?: TParams) {

        this._connection = new XQueryBuilderCore<TEntity, TParams>(connection);
        this._classType = classType;
        this._params = params;
    }

    allowDeleted(allowDeleted?: boolean) {

        this._allowDeleted = allowDeleted !== false;
        return this;
    }

    where(key: keyof TEntity, op: OperationType, paramKeyOrValue: keyof TParams | SQLStaticValueType) {

        this._expression
            .push(['WHERE', key, op, paramKeyOrValue]);

        return this;
    }

    setQuery(query: ExpressionPart<TEntity, TParams>[]) {

        this._expression = query;
        return this;
    }

    async getSingle(): Promise<TEntity> {

        this.addDeletedCheck();

        return await this._connection
            .getSingle(this._classType, this._expression, this._params);
    }

    async getOneOrNull(): Promise<TEntity | null> {

        this.addDeletedCheck();

        return await this._connection
            .getOneOrNull(this._classType, this._expression, this._params);
    }

    async getMany(): Promise<TEntity[]> {

        this.addDeletedCheck();

        return await this._connection
            .getMany(this._classType, this._expression, this._params);
    }

    private addDeletedCheck() {

        if (this._allowDeleted)
            return;

        const deletionPropertyData = getIsDeletedDecoratorPropertyData(this._classType);
        if (!deletionPropertyData)
            return;

        const whereIndex = this._expression
            .findIndex(x => x[0] === 'WHERE');

        // after explicit where 
        if (whereIndex !== -1) {

            // null check 
            if (deletionPropertyData.checkType === 'null') {

                this._expression = this._expression
                    .insert(whereIndex + 1, ['AND', deletionPropertyData.propName, 'IS', 'NULL']);
            }

            // bool check
            else {

                this._expression = this._expression
                    .insert(whereIndex + 1, ['AND', deletionPropertyData.propName, '=', 'false']);
            }
        }

        // end of expression
        else {

            // null check 
            if (deletionPropertyData.checkType === 'null') {

                this._expression
                    .push(['WHERE', deletionPropertyData.propName, 'IS', 'NULL']);
            }

            // bool check
            else {

                this._expression
                    .push(['WHERE', deletionPropertyData.propName, '=', 'false']);
            }
        }
    }
}