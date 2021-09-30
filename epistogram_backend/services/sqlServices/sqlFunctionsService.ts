import { staticProvider } from "../../staticProvider";

const execSQLFunction = async <T>(fnName: string, args: any[]) => {

    // create args indicies
    const argsIndicies = [] as string[];

    args
        .forEach((x, index) => argsIndicies.push(`$${index + 1}`));

    // create statement 
    const statement = `SELECT ${fnName}(${argsIndicies.join(",")})`;

    // get results
    const result = await staticProvider
        .sqlConnection
        .executeSQL(statement, args);

    const firstRow = result.rows[0];
    const fnReturnValue = firstRow[fnName];

    return fnReturnValue as T;
}

export const answerSignupQuestionFn = (userId: number, questionId: number, answerId: number) => {

    return execSQLFunction(
        "answer_signup_question_fn",
        [
            userId,
            questionId,
            answerId
        ]);
}

export const answerQuestionFn = (answerSessionId: number, questionId: number, answerId: number, isPractiseAnswer: boolean) => {

    return execSQLFunction<number>(
        "answer_question_fn",
        [
            answerSessionId,
            questionId,
            answerId,
            isPractiseAnswer
        ]);
}