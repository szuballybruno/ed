import { Question } from "../models/entity/Question";
import { QuestionAnswer } from "../models/entity/QuestionAnswer";
import { staticProvider } from "../staticProvider";
import { toAnswerDTO } from "./mappings";


export const answerQuestionAsync = async (userId: number, questionId: number, answerId: number, noAnswer?: boolean) => {

    const repo = staticProvider
        .ormConnection
        .getRepository(QuestionAnswer);

    // save question answer
    const qa = await repo
        .createQueryBuilder("qa")
        .where("qa.userId = :userId ", { userId })
        .andWhere("qa.questionId = :questionId", { questionId })
        .andWhere("qa.answerId = :answerId", { answerId })
        .select("qa.id")
        .getOne();

    await repo.save({
        id: qa?.id,
        answerId: answerId,
        questionId: questionId,
        userId: userId
    });

    // get correct answer
    if (noAnswer)
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