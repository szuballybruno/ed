import {TaskCodeType} from '../../models/Types';
import {Id} from '../../shared/types/versionId';
import {GlobalConfiguration} from '../misc/GlobalConfiguration';
import {logObject} from '../misc/logger';
import {SQLConnectionService} from './SQLConnectionService';

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

        const result = await this._connectionService
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

    answerSignupQuestionFn = (userId: Id<'User'>, questionId: Id<'Question'>, answerVersionId: Id<'AnswerVersion'>) => {

        return this.execSQLFunctionAsync(
            'answer_signup_question_fn',
            [
                userId,
                questionId,
                answerVersionId
            ]);
    };

    answerQuestionFn = async (
        userId: Id<'User'>,
        answerSessionId: Id<'AnswerSession'>,
        questionVersionId: Id<'QuestionVersion'>,
        answerIds: Id<'Answer'>[],
        elapsedSeconds: number,
        isPractiseAnswer: boolean) => {

        type ReType = {
            correct_answer_ids: Id<'Answer'>[],
            given_answer_id: Id<'GivenAnswer'>,
            streak_id: Id<'GivenAnswerStreak'>,
            streak_length: number,
            is_correct: boolean,
        };

        const result = await this
            .execSQLFunctionAsync<ReType>(
                'answer_question_fn',
                [
                    userId,
                    answerSessionId,
                    questionVersionId,
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
