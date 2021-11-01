import { AnswerSession } from "../models/entity/AnswerSession";
import { Exam } from "../models/entity/Exam";
import { Question } from "../models/entity/Question";
import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { AnswerQuestionDTO } from "../models/shared_models/AnswerQuestionDTO";
import { UserExamAnswerSessionView } from "../models/views/UserExamAnswerSessionView";
import { staticProvider } from "../staticProvider";
import { unsetUsersCurrentCourseItemAsync } from "./courseService";
import { toExamResultDTO } from "./mappings";
import { answerQuestionAsync } from "./questionAnswerService";
import { deleteQuesitonsAsync } from "./questionService";

export const answerExamQuestionAsync = (dto: AnswerQuestionDTO) => {

    // validation comes here 

    // throwNotImplemented();

    return answerQuestionAsync(
        dto.answerSessionId,
        dto.questionId,
        dto.answerIds);
}

export const deleteExamsAsync = async (examIds: number[], unsetCurrentCourseItem: boolean) => {

    if (examIds.length === 0)
        return;

    // delete exam quesitons 
    const questions = await staticProvider
        .ormConnection
        .getRepository(Question)
        .createQueryBuilder()
        .where('"examId" IN (:...examIds)', { examIds })
        .getMany();

    await deleteQuesitonsAsync(questions.map(x => x.id));

    // delete answer sessions
    await staticProvider
        .ormConnection
        .createQueryBuilder()
        .delete()
        .from(AnswerSession)
        .where('"examId" IN (:...examIds)', { examIds })
        .execute();

    // set current course item on users
    if (unsetCurrentCourseItem) {
        for (let index = 0; index < examIds.length; index++) {

            const examId = examIds[index];
            await unsetUsersCurrentCourseItemAsync(examId);
        }
    }

    // delete exam
    await staticProvider
        .ormConnection
        .createQueryBuilder()
        .delete()
        .from(Exam)
        .where("id IN (:...examIds)", { examIds })
        .execute();
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
