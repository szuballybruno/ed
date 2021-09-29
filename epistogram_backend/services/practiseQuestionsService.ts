import { AnswerSession } from "../models/entity/AnswerSession";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { PractiseQuestionView } from "../models/views/PractiseQuestionView";
import { staticProvider } from "../staticProvider";
import { toQuestionDTO } from "./mappings";
import { answerQuestionAsync } from "./questionAnswerService";

export const getPractiseQuestionAsync = async (userId: number) => {

    const questionViews = await staticProvider
        .ormConnection
        .getRepository(PractiseQuestionView)
        .createQueryBuilder("pq")
        .where("pq.userId = :userId", { userId })
        .leftJoinAndSelect("pq.question", "q")
        .leftJoinAndSelect("q.answers", "a")
        .getMany();

    const questionView = questionViews[0];
    if (!questionView)
        return null;

    return toQuestionDTO(questionView.question);
}

export const answerPractiseQuestionAsync = async (userId: number, qu: QuestionAnswerDTO) => {

    const practiseAnswerSession = await getUserPractiseAnswerSession(userId);

    const result = await answerQuestionAsync(practiseAnswerSession.id, qu.questionId, qu.answerId, true);

    return result;
}

export const getUserPractiseAnswerSession = async (userId: number) => {

    const userPractiseAnswerSession = await staticProvider
        .ormConnection
        .getRepository(AnswerSession)
        .createQueryBuilder("as")
        .where("as.isPractiseAnswerSession = true")
        .andWhere("as.userId = :userId", { userId })
        .getOneOrFail();

    return userPractiseAnswerSession;
}