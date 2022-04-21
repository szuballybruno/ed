import { TaskCodeType } from '../../models/DatabaseTypes';
import { SessionActivityType } from '../../shared/types/sharedTypes';
import { logObject } from '../misc/logger';
import { SQLConnectionService } from './SQLConnectionService';

export type InsertCoinFnParamsType = {
    userId: number,
    amount: number,
    activitySessionId?: number,
    videoId?: number,
    givenAnswerId?: number,
    givenAnswerStreakId?: number,
    activityStreakId?: number,
    shopItemId?: number
};

export class SQLFunctionsService {

    private _connectionService: SQLConnectionService;

    constructor(conn: SQLConnectionService) {

        this._connectionService = conn;
    }

    execSQLFunctionAsync = async <T>(fnName: string, args: any[], isMultiResult?: boolean) => {

        logObject('');
        logObject(`Executing SQL funciton (${fnName})... Args: `);
        logObject(args);

        // create args indicies
        const argsIndicies = [] as string[];

        args
            .forEach((x, index) => argsIndicies
                .push(`$${index + 1}`));

        // create statement 
        const statement = `SELECT ${isMultiResult ? '* FROM' : ''} ${fnName}(${argsIndicies.join(',')})`;

        const result = await this._connectionService
            .executeSQLAsync(statement, args.map(x => x === undefined ? null : x));

        const firstRow = result.rows[0];

        if (isMultiResult) {

            const returnObject = firstRow as T;

            logObject('Return value: ');
            logObject(returnObject);

            return returnObject;
        }
        else {

            const fnReturnValue = firstRow[fnName];

            logObject('Return value: ');
            logObject(fnReturnValue);

            return fnReturnValue as T;
        }
    };

    answerSignupQuestionFn = (userId: number, questionId: number, answerId: number) => {

        return this.execSQLFunctionAsync(
            'answer_signup_question_fn',
            [
                userId,
                questionId,
                answerId
            ]);
    };

    answerQuestionFn = async (
        userId: number,
        answerSessionId: number,
        questionId: number,
        answerIds: number[],
        elapsedSeconds: number,
        isPractiseAnswer: boolean) => {

        type ReType = {
            correct_answer_ids: number[],
            given_answer_id: number,
            streak_id: number,
            streak_length: number,
            is_correct: boolean,
        };

        const result = await this
            .execSQLFunctionAsync<ReType>(
                'answer_question_fn',
                [
                    userId,
                    answerSessionId,
                    questionId,
                    answerIds,
                    elapsedSeconds,
                    isPractiseAnswer
                ],
                true);

        return {
            correctAnswerIds: result.correct_answer_ids,
            givenAnswerId: result.given_answer_id,
            streakId: result.streak_id,
            streakLength: result.streak_length,
            isCorrect: result.is_correct
        };
    };

    insertCoinAcquiredFn = (params: InsertCoinFnParamsType) => {

        return this.execSQLFunctionAsync<number>(
            'insert_coin_transaction',
            [
                params.userId,
                params.amount,
                params.activitySessionId,
                params.videoId,
                params.givenAnswerId,
                params.givenAnswerStreakId,
                params.activityStreakId,
                params.shopItemId
            ]
        );
    };

    getUserSessionFirstActivityId = (
        userId: number,
        sessionActivityId: number) => {

        return this.execSQLFunctionAsync<number>(
            'get_user_session_first_activity_id',
            [
                userId,
                sessionActivityId
            ]
        );
    };

    saveUserSessionActivity = (
        userId: number,
        param_activity_type: SessionActivityType) => {

        return this.execSQLFunctionAsync<number>(
            'save_user_session_activity',
            [
                userId,
                param_activity_type
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