import { User } from "../models/entity/User";
import { UserExamAnswerSessionView } from "../models/views/UserExamAnswerSessionView";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { staticProvider } from "../staticProvider";
import { getCurrentCourseItemDescriptor } from "./courseService";
import { toExamResultDTO } from "./mappings";
import { answerQuestionAsync } from "./questionAnswerService";
import { getUserById } from "./userService";

export const answerExamQuestionAsync = (questionAnswerDTO: QuestionAnswerDTO) => {

    // validation comes here 

    return answerQuestionAsync(
        questionAnswerDTO.answerSessionId,
        questionAnswerDTO.questionId,
        questionAnswerDTO.answerId);
}

export const getExamResultsAsync = async (userId: number, answerSessionId: number) => {

    const user = await getUserById(userId);
    const descriptor = await getCurrentCourseItemDescriptor(user);

    if (descriptor?.itemType !== "exam")
        throw new Error("Current course item type is not 'exam'!");

    const answerSession = await staticProvider
        .ormConnection
        .getRepository(UserExamAnswerSessionView)
        .findOneOrFail({
            where: {
                examId: descriptor.itemId,
                userId: userId,
                answerSessionId: answerSessionId
            }
        });

    const prevoiuslyCompletedSessions = await staticProvider
        .ormConnection
        .getRepository(UserExamAnswerSessionView)
        .find({
            where: {
                examId: descriptor.itemId,
                userId: userId,
                isCompleteSession: true
            }
        });

    // if only one previous session is completed, 
    // and the current session is completed
    // than the current session is the first one completed.  
    const isFirstTimeComplted = prevoiuslyCompletedSessions.length === 1 && answerSession.isCompleteSession;

    const data = await staticProvider
        .ormConnection
        .getRepository(User)
        .createQueryBuilder("u")
        .leftJoinAndSelect("u.currentExam", "ce")
        .leftJoinAndSelect("ce.questions", "q")
        .leftJoinAndSelect("q.answers", "allA")
        .leftJoinAndSelect("q.questionAnswers", "qa", "qa.answerSessionId = :answerSessionId", { answerSessionId })
        .leftJoinAndSelect("qa.answer", "ans")
        .where("u.id = :userId", { userId })
        .getOneOrFail();

    return toExamResultDTO(answerSession, data, isFirstTimeComplted);
}
