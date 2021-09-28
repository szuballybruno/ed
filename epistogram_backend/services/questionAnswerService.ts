import { Answer } from "../models/entity/Answer";
import { AnswerSession } from "../models/entity/AnswerSession";
import { Question } from "../models/entity/Question";
import { QuestionAnswer } from "../models/entity/QuestionAnswer";
import { AnswerResultDTO } from "../models/shared_models/AnswerResultDTO";
import { staticProvider } from "../staticProvider";
import { toAnswerDTO } from "./mappings";

export const createAnswerSessionAsync = async (
    userId: number,
    examId?: number | null,
    videoId?: number | null) => {

    const session = {
        examId: examId,
        videoId: videoId,
        userId: userId
    } as AnswerSession;

    await staticProvider
        .ormConnection
        .getRepository(AnswerSession)
        .insert(session);

    return session.id;
}

export const answerQuestionAsync = async (
    answerSessionId: number,
    questionId: number,
    answerId: number,
    noCorrectAnswer?: boolean,
    isPractiseAnswer?: boolean) => {

    const repo = staticProvider
        .ormConnection
        .getRepository(QuestionAnswer);

    // insert question answer
    await repo.insert({
        answerId: answerId,
        questionId: questionId,
        answerSessionId: answerSessionId,
        isPractiseAnswer: isPractiseAnswer === true ? true : undefined
    });

    // get correct answer
    if (noCorrectAnswer)
        return null;

    const correctAnswer = await staticProvider
        .ormConnection
        .getRepository(Answer)
        .createQueryBuilder("a")
        .where("a.questionId = :questionId", { questionId })
        .andWhere("a.isCorrect = true")
        .getOneOrFail();

    return {
        correctAnswerId: correctAnswer.id,
        givenAnswerId: answerId
    } as AnswerResultDTO;
}