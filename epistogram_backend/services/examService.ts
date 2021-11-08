import { AnswerSession } from "../models/entity/AnswerSession";
import { Exam } from "../models/entity/Exam";
import { Question } from "../models/entity/Question";
import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { AnswerQuestionDTO } from "../models/shared_models/AnswerQuestionDTO";
import { ExamCompletedView } from "../models/views/ExamCompletedView";
import { ExamResultView } from "../models/views/ExamResultView";
import { ExamSessionSuccessView } from "../models/views/ExamSessionSuccessView";
import { staticProvider } from "../staticProvider";
import { unsetUsersCurrentCourseItemAsync } from "./courseService";
import { toExamResultDTO } from "./mappings";
import { answerQuestionAsync } from "./questionAnswerService";
import { deleteQuesitonsAsync } from "./questionService";
import { saveUserSessionActivityAsync } from "./userSessionActivity";

export const answerExamQuestionAsync = async (userId: number, dto: AnswerQuestionDTO) => {

    // validation comes here 

    // save user activity
    await saveUserSessionActivityAsync(userId, "exam");

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

    const examCompletedViews = await staticProvider
        .ormConnection
        .getRepository(ExamResultView)
        .find({
            where: {
                examId: currentExamId,
                userId: userId,
                answerSessionId: answerSessionId
            }
        });

    return toExamResultDTO(examCompletedViews);
}
