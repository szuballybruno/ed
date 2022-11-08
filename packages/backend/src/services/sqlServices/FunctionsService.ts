import { TaskCodeType } from '../../models/Types';
import { Id } from '@episto/commontypes';
import { GlobalConfiguration } from '../misc/GlobalConfiguration';
import { logObject } from '../misc/logger';
import { SQLConnectionService } from './SQLConnectionService';

export type InsertCoinFnParamsType = {
    userId: Id<'User'>,
    amount: number,
    activitySessionId?: Id<'ActivitySession'>,
    videoId?: Id<'Video'>,
    givenAnswerId?: Id<'GivenAnswer'>,
    givenAnswerStreakId?: Id<'GivenAnswerStreak'>,
    activityStreakId?: Id<'ActivityStreak'>,
    shopItemId?: Id<'ShopItem'>
};

export class SQLFunctionsService {

    private _connectionService: SQLConnectionService;
    private _loggingEnabled: boolean;

    constructor(conn: SQLConnectionService, config: GlobalConfiguration) {

        this._connectionService = conn;
        this._loggingEnabled = config.logging.enabledScopes.some(x => x === 'ORM');
    }

    execSQLFunctionAsync = async <T>(fnName: string, args: any[], isMultiResult?: boolean) => {

        if (this._loggingEnabled) {

            logObject('');
            logObject(`Executing SQL funciton (${fnName})... Args: `);
            logObject(args);
        }

        // create args indicies
        const argsIndicies = [] as string[];

        args
            .forEach((x, index) => argsIndicies
                .push(`$${index + 1}`));

        // create statement
        const statement = `SELECT ${isMultiResult ? '* FROM' : ''} ${fnName}(${argsIndicies.join(',')})`;

        const result = await this
            ._connectionService
            .executeSQLAsync(statement, args.map(x => x === undefined ? null : x));

        const firstRow = result.rows[0];

        if (isMultiResult) {

            const returnObject = firstRow as T;

            if (this._loggingEnabled) {

                logObject('Return value: ');
                logObject(returnObject);
            }

            return returnObject;
        } else {

            const fnReturnValue = firstRow[fnName];

            if (this._loggingEnabled) {

                logObject('Return value: ');
                logObject(fnReturnValue);
            }

            return fnReturnValue as T;
        }
    };

    getUserSessionFirstActivityId = (
        userId: Id<'User'>,
        sessionActivityId: Id<'ActivitySession'>) => {

        return this.execSQLFunctionAsync<number>(
            'get_user_session_first_activity_id',
            [
                userId,
                sessionActivityId
            ]
        );
    };

    acquireTaskLockAsync = (taskCode: TaskCodeType) => {

        return this.execSQLFunctionAsync<boolean>(
            'acquire_task_lock_fn',
            [
                taskCode
            ]
        );
    };
}
