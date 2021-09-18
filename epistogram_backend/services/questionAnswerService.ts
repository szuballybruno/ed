import { AnswerSession } from "../models/entity/AnswerSession";
import { Question } from "../models/entity/Question";
import { QuestionAnswer } from "../models/entity/QuestionAnswer";
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
    userId: number,
    answerSessionId: number,
    questionId: number,
    answerId: number,
    noCorrectAnswer?: boolean) => {

    const repo = staticProvider
        .ormConnection
        .getRepository(QuestionAnswer);

    // insert question answer
    await repo.insert({
        answerId: answerId,
        questionId: questionId,
        answerSessionId: answerSessionId
    });

    // get correct answer
    if (noCorrectAnswer)
        return null;

    const correctAnswer = await staticProvider
        .ormConnection
        .getRepository(Question)
        .createQueryBuilder("q")
        .leftJoinAndSelect("q.answers", "a")
        .where("q.id = :questionId", { questionId })
        .andWhere("a.isCorrect = true")
        .getOneOrFail();

    return toAnswerDTO(correctAnswer.answers[0]);
}