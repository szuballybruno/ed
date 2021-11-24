import { DbConnectionService } from "../databaseConnectionService";

export class SQLFunctionsService {
    private _connectionService: DbConnectionService;

    constructor(conn: DbConnectionService) {

        this._connectionService = conn;
    }

    execSQLFunctionAsync = async <T>(fnName: string, args: any[]) => {

        // create args indicies
        const argsIndicies = [] as string[];

        args
            .forEach((x, index) => argsIndicies.push(`$${index + 1}`));

        // create statement 
        const statement = `SELECT ${fnName}(${argsIndicies.join(",")})`;

        // get results
        const result = await this._connectionService
            .getSQLConnection()
            .executeSQL(statement, args);

        const firstRow = result.rows[0];
        const fnReturnValue = firstRow[fnName];

        return fnReturnValue as T;
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

    answerQuestionFn = (answerSessionId: number, questionId: number, answerIds: number[], isPractiseAnswer: boolean) => {

        return this.execSQLFunctionAsync<number[]>(
            "answer_question_fn",
            [
                answerSessionId,
                questionId,
                answerIds,
                isPractiseAnswer
            ]);
    }

    insertCoinAcquiredFn = (
        amount: number,
        sessionActivityId: number | null,
        videoId: number | null,
        givenAnswerStreakId: number | null) => {

        return this.execSQLFunctionAsync<number>(
            "insert_coin_acquire",
            [
                amount,
                sessionActivityId,
                videoId,
                givenAnswerStreakId
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
}