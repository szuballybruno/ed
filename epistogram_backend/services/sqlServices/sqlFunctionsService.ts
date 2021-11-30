import { SessionActivityType } from "../../models/shared_models/types/sharedTypes";
import { DbConnectionService } from "../databaseConnectionService";

export class SQLFunctionsService {
    private _connectionService: DbConnectionService;

    constructor(conn: DbConnectionService) {

        this._connectionService = conn;
    }

    execSQLFunctionAsync = async <T>(fnName: string, args: any[], isMultiResult?: boolean) => {

        // create args indicies
        const argsIndicies = [] as string[];

        args
            .forEach((x, index) => argsIndicies
                .push(`$${index + 1}`));

        // create statement 
        const statement = `SELECT ${isMultiResult ? "* FROM" : ""} ${fnName}(${argsIndicies.join(",")})`;

        // get results
        const result = await this._connectionService
            .getSQLConnection()
            .executeSQL(statement, args.map(x => x === undefined ? null : x));

        const firstRow = result.rows[0];

        if (isMultiResult) {

            const returnObject = firstRow as T;
            return returnObject;
        }
        else {

            const fnReturnValue = firstRow[fnName];
            return fnReturnValue as T;
        }
    }

    answerSignupQuestionFn = (userId: number, questionId: number, answerId: number) => {

        return this.execSQLFunctionAsync(
            "answer_signup_question_fn",
            [
                userId,
                questionId,
                answerId
            ]);
    }

    answerQuestionFn = async (answerSessionId: number, questionId: number, answerIds: number[], isPractiseAnswer: boolean) => {

        const result = await this.execSQLFunctionAsync<{ correct_answer_ids: number[], given_answer_id: number }>(
            "answer_question_fn",
            [
                answerSessionId,
                questionId,
                answerIds,
                isPractiseAnswer
            ],
            true);

        return {
            correctAnswerIds: result.correct_answer_ids,
            givenAnswerId: result.given_answer_id
        }
    }

    insertCoinAcquiredFn = (params: {
        userId: number,
        amount: number,
        activitySessionId?: number,
        videoId?: number,
        givenAnswerId?: number,
        givenAnswerStreakId?: number,
        activityStreakId?: number
    }) => {

        return this.execSQLFunctionAsync<number>(
            "insert_coin_acquire",
            [
                params.userId,
                params.amount,
                params.activitySessionId,
                params.videoId,
                params.givenAnswerId,
                params.givenAnswerStreakId,
                params.activityStreakId
            ]
        )
    }

    getUserSessionFirstActivityId = (
        userId: number,
        sessionActivityId: number) => {

        return this.execSQLFunctionAsync<number>(
            "get_user_session_first_activity_id",
            [
                userId,
                sessionActivityId
            ]
        )
    }

    saveUserSessionActivity = (
        userId: number,
        param_activity_type: SessionActivityType) => {

        return this.execSQLFunctionAsync<number>(
            "save_user_session_activity",
            [
                userId,
                param_activity_type
            ]
        )
    }
}