import { AnswerSession } from "../models/entity/AnswerSession";
import { Exam } from "../models/entity/Exam";
import { Question } from "../models/entity/Question";
import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { AnswerQuestionDTO } from "../models/shared_models/AnswerQuestionDTO";
import { ExamResultView } from "../models/views/ExamResultView";
import { staticProvider } from "../staticProvider";
import { readItemCode } from "./encodeService";
import { toExamDTO, toExamResultDTO } from "./mappings";
import { answerQuestionAsync } from "./questionAnswerService";
import { deleteQuesitonsAsync } from "./questionService";
import { UserCourseBridgeService } from "./UserCourseBridgeService";

export class ExamService {

    private _userCourseBridgeService: UserCourseBridgeService;

    constructor(userCourseBridgeService: UserCourseBridgeService) {

        this._userCourseBridgeService = userCourseBridgeService;
    }

    getExamDTOAsync = async (examId: number) => {

        const exam = await staticProvider
            .ormConnection
            .getRepository(Exam)
            .createQueryBuilder("e")
            .where("e.id = :examId", { examId })
            .leftJoinAndSelect("e.questions", "q")
            .leftJoinAndSelect("q.answers", "a")
            .getOneOrFail();

        const questionIds = exam.questions.map(x => x.id);

        if (questionIds.length === 0)
            throw new Error("Exam has no questions assigend.");

        return toExamDTO(exam);
    }

    answerExamQuestionAsync = async (userId: number, dto: AnswerQuestionDTO) => {

        // validation comes here 

        // save user activity
        await staticProvider
            .services
            .userSessionActivityService
            .saveUserSessionActivityAsync(userId, "exam");

        return answerQuestionAsync(
            userId,
            dto.answerSessionId,
            dto.questionId,
            dto.answerIds,
            true);
    }

    deleteExamsAsync = async (examIds: number[], unsetCurrentCourseItem: boolean) => {

        if (examIds.length === 0)
            return;

        // delete exam quesitons 
        const questions = await staticProvider
            .ormConnection
            .getRepository(Question)
            .createQueryBuilder()
            .where('"exam_id" IN (:...examIds)', { examIds })
            .getMany();

        await deleteQuesitonsAsync(questions.map(x => x.id));

        // delete answer sessions
        await staticProvider
            .ormConnection
            .createQueryBuilder()
            .delete()
            .from(AnswerSession)
            .where('"exam_id" IN (:...examIds)', { examIds })
            .execute();

        // set current course item on users
        if (unsetCurrentCourseItem) {
            for (let index = 0; index < examIds.length; index++) {

                const examId = examIds[index];
                await this._userCourseBridgeService
                    .unsetUsersCurrentCourseItemAsync(examId);
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

    getExamResultsAsync = async (userId: number, answerSessionId: number) => {

        const bridge = await staticProvider
            .ormConnection
            .getRepository(UserCourseBridge)
            .findOneOrFail({
                where: {
                    userId,
                    isCurrent: true
                }
            });

        if (!bridge.currentItemCode)
            throw new Error("No current item found");

        const { itemId: currentExamId, itemType } = readItemCode(bridge.currentItemCode);

        if (itemType !== "exam")
            throw new Error("Current item is not an exam!");

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
}