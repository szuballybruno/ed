import { staticProvider } from "../../staticProvider";

const execSQLFunction = async <T>(fnName: string, args: string[]) => {

    const argsList = args.join(",");
    const result = await staticProvider
        .sqlConnection
        .executeSQL(`SELECT ${fnName}(${argsList})`);

    const firstRow = result.rows[0];
    const fnReturnValue = firstRow[fnName];

    return fnReturnValue as T;
}

export const answerSignupQuestionFn = (userId: number, questionId: number, answerId: number) => {

    return execSQLFunction(
        "answer_signup_question_fn",
        [
            userId.toString(),
            questionId.toString(),
            answerId.toString()
        ]);
}

export const answerQuestionFn = (answerSessionId: number, questionId: number, answerId: number) => {

    return execSQLFunction<number>(
        "answer_question_fn",
        [
            answerSessionId.toString(),
            questionId.toString(),
            answerId.toString()
        ]);
}