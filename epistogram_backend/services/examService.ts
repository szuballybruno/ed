import { User } from "../models/entity/User";
import { UserExamAnswerSessionView } from "../models/views/UserExamAnswerSessionView";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { staticProvider } from "../staticProvider";
import { toExamResultDTO } from "./mappings";
import { answerQuestionAsync } from "./questionAnswerService";
import { getUserById } from "./userService";
import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { Exam } from "../models/entity/Exam";

export const answerExamQuestionAsync = (questionAnswerDTO: QuestionAnswerDTO) => {

    // validation comes here 

    return answerQuestionAsync(
        questionAnswerDTO.answerSessionId,
        questionAnswerDTO.questionId,
        questionAnswerDTO.answerId);
}

export const getExamResultsAsync = async (userId: number, answerSessionId: number) => {

    const bridge = await staticProvider
        .ormConnection
        .getRepository(UserCourseBridge)
        .findOneOrFail({
            where: {
                userId,
                isCurrent: true
            }
        });

    const currentExamId = bridge.currentExamId;
    if (!currentExamId)
        throw new Error("Current exam id is null or undefined!");

    const answerSession = await staticProvider
        .ormConnection
        .getRepository(UserExamAnswerSessionView)
        .findOneOrFail({
            where: {
                examId: currentExamId,
                userId: userId,
                answerSessionId: answerSessionId
            }
        });

    const prevoiuslyCompletedSessions = await staticProvider
        .ormConnection
        .getRepository(UserExamAnswerSessionView)
        .find({
            where: {
                examId: currentExamId,
                userId: userId,
                isCompleteSession: true
            }
        });

    // if only one previous session is completed, 
    // and the current session is completed
    // than the current session is the first one completed.  
    const isFirstTimeComplted = prevoiuslyCompletedSessions.length === 1 && answerSession.isCompleteSession;

    const exam = await staticProvider
        .ormConnection
        .getRepository(Exam)
        .createQueryBuilder("e")
        .leftJoinAndSelect("e.questions", "q")
        .leftJoinAndSelect("q.answers", "allA")
        .leftJoinAndSelect("q.questionAnswers", "qa", "qa.answerSessionId = :answerSessionId", { answerSessionId })
        .leftJoinAndSelect("qa.answer", "ans")
        .where("e.id = :examId", { examId: bridge.currentExamId })
        .getOneOrFail();

    return toExamResultDTO(answerSession, exam, isFirstTimeComplted);
}
