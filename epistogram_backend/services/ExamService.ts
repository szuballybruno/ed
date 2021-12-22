import { AnswerSession } from "../models/entity/AnswerSession";
import { Exam } from "../models/entity/Exam";
import { Question } from "../models/entity/Question";
import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { AnswerQuestionDTO } from "../models/shared_models/AnswerQuestionDTO";
import { ExamEditDataDTO } from "../models/shared_models/ExamEditDataDTO";
import { ExamResultView } from "../models/views/ExamResultView";
import { readItemCode } from "./misc/encodeService";
import { toExamDTO, toExamResultDTO } from "./misc/mappings";
import { QuestionAnswerService } from "./QuestionAnswerService2";
import { QuestionService } from "./QuestionService2";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";
import { UserCourseBridgeService } from "./UserCourseBridgeService";
import { UserSessionActivityService } from "./UserSessionActivityService2";

export class ExamService {

    private _userCourseBridgeService: UserCourseBridgeService;
    private _ormService: ORMConnectionService;
    private _userSessionActivityService: UserSessionActivityService;
    private _quesitonAnswerService: QuestionAnswerService;
    private _questionsService: QuestionService;

    constructor(
        userCourseBridgeService: UserCourseBridgeService,
        ormService: ORMConnectionService,
        userSessionActivityService: UserSessionActivityService,
        quesitonAnswerService: QuestionAnswerService,
        questionsService: QuestionService) {

        this._userCourseBridgeService = userCourseBridgeService;
        this._ormService = ormService;
        this._userSessionActivityService = userSessionActivityService;
        this._quesitonAnswerService = quesitonAnswerService;
        this._questionsService = questionsService;
    }

    getExamDTOAsync = async (examId: number) => {

        const exam = await this._ormService
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

    async saveExamAsync(dto: ExamEditDataDTO, examId: number) {

        await this._ormService
            .getRepository(Exam)
            .save({
                id: examId,
                title: dto.title,
                subtitle: dto.subTitle,
                courseId: dto.courseId,
            });

        await this._questionsService
            .saveAssociatedQuestionsAsync(dto.questions, undefined, examId);
    }

    async startExamAsync(answerSessionId: number) {

        await this._ormService
            .getRepository(AnswerSession)
            .save({
                id: answerSessionId,
                startDate: new Date()
            });
    }

    answerExamQuestionAsync = async (userId: number, dto: AnswerQuestionDTO) => {

        // validation comes here 

        // save user activity
        await this._userSessionActivityService
            .saveUserSessionActivityAsync(userId, "exam");

        // inspect questions
        const questions = await this._ormService
            .getRepository(Question)
            .createQueryBuilder("q")
            .leftJoinAndSelect("q.exam", "e")
            .leftJoinAndSelect("e.answerSessions", "as")
            .where("as.id = :asid", { asid: dto.answerSessionId })
            .orderBy("q.orderIndex")
            .getMany();

        const isLast = questions[questions.length - 1].id === dto.questionId;

        // if last, set answer session end date 
        if (isLast)
            await this._ormService
                .getRepository(AnswerSession)
                .save({
                    id: dto.answerSessionId,
                    endDate: new Date()
                });

        return this._quesitonAnswerService
            .answerQuestionAsync(
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
        const questions = await this._ormService
            .getRepository(Question)
            .createQueryBuilder()
            .where('"exam_id" IN (:...examIds)', { examIds })
            .getMany();

        await this._questionsService
            .deleteQuesitonsAsync(questions.map(x => x.id));

        // delete answer sessions
        await this._ormService
            .getOrmConnection()
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
        await this._ormService
            .getOrmConnection()
            .createQueryBuilder()
            .delete()
            .from(Exam)
            .where("id IN (:...examIds)", { examIds })
            .execute();
    }

    getExamResultsAsync = async (userId: number, answerSessionId: number) => {

        const bridge = await this._ormService
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

        const examCompletedViews = await this._ormService
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