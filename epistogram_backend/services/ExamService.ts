import { AnswerSession } from "../models/entity/AnswerSession";
import { Exam } from "../models/entity/Exam";
import { Question } from "../models/entity/Question";
import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { AnswerQuestionDTO } from "../models/shared_models/AnswerQuestionDTO";
import { ExamEditDataDTO } from "../models/shared_models/ExamEditDataDTO";
import { ExamPlayerDataDTO } from "../models/shared_models/ExamPlayerDataDTO";
import { ExamResultView } from "../models/views/ExamResultView";
import { ExamView } from "../models/views/ExamView";
import { MapperService } from "./MapperService";
import { readItemCode } from "./misc/encodeService";
import { toExamResultDTO } from "./misc/mappings";
import { QuestionAnswerService } from "./QuestionAnswerService";
import { QuestionService } from "./QuestionService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";
import { UserCourseBridgeService } from "./UserCourseBridgeService";
import { UserSessionActivityService } from "./UserSessionActivityService";

export class ExamService {

    private _userCourseBridgeService: UserCourseBridgeService;
    private _ormService: ORMConnectionService;
    private _userSessionActivityService: UserSessionActivityService;
    private _quesitonAnswerService: QuestionAnswerService;
    private _questionsService: QuestionService;
    private _mapperService: MapperService;

    constructor(
        userCourseBridgeService: UserCourseBridgeService,
        ormService: ORMConnectionService,
        userSessionActivityService: UserSessionActivityService,
        quesitonAnswerService: QuestionAnswerService,
        questionsService: QuestionService,
        mapperService: MapperService) {

        this._userCourseBridgeService = userCourseBridgeService;
        this._ormService = ormService;
        this._userSessionActivityService = userSessionActivityService;
        this._quesitonAnswerService = quesitonAnswerService;
        this._questionsService = questionsService;
        this._mapperService = mapperService;
    }

    /**
     * Returns an exam player dto that contains 
     * all the data necessary to play an exam.
     * 
     * @param examId 
     * @returns 
     */
    getExamPlayerDTOAsync = async (userId: number, examId: number) => {

        const examView = await this._ormService
            .getRepository(ExamView)
            .findOneOrFail({
                where: {
                    examId: examId,
                    userId: userId
                }
            });

        const questions = await this
            .getExamQuestionsAsync(examId);

        if (questions.length === 0)
            throw new Error("Exam has no questions assigend.");

        return this._mapperService
            .map(ExamView, ExamPlayerDataDTO, examView, questions);
    }

    /**
     * Get questions for a particular exam.
     * 
     * @param examId 
     * @returns 
     */
    async getExamQuestionsAsync(examId: number) {

        const exam = await this._ormService
            .getRepository(Exam)
            .createQueryBuilder("e")
            .where("e.id = :examId", { examId })
            .leftJoinAndSelect("e.questions", "q")
            .leftJoinAndSelect("q.answers", "a")
            .getOneOrFail();

        return exam.questions;
    }

    /**
     * Get edit data for the exam.
     * 
     * @param examId 
     * @returns 
     */
    async getExamEditDataAsync(examId: number) {

        const exam = await this._ormService
            .getRepository(Exam)
            .createQueryBuilder("e")
            .leftJoinAndSelect("e.questions", "eq")
            .leftJoinAndSelect("eq.answers", "eqa")
            .where("e.id = :examId", { examId })
            .getOneOrFail();

        return this._mapperService
            .map(Exam, ExamEditDataDTO, exam);
    }

    /**
     * Save the exam.
     * 
     * @param dto 
     */
    async saveExamAsync(dto: ExamEditDataDTO) {

        const examId = dto.id;

        const examBeforeSave = await this._ormService
            .getRepository(Exam)
            .createQueryBuilder("e")
            .leftJoinAndSelect("e.module", "mo")
            .where("e.id = :examId", { examId })
            .getOneOrFail();

        const courseId = examBeforeSave.module?.courseId ?? dto.courseId;

        // if this exam was not a final exam previously, 
        // but now it is, set every other exam in the course as non final exam
        if (dto.isFinalExam && examBeforeSave.type !== "final") {

            // get all exams in course 
            const previousFinalExam = await this._ormService
                .getRepository(Exam)
                .createQueryBuilder("e")
                .leftJoinAndSelect("e.module", "mo")
                .leftJoinAndSelect("mo.course", "co")
                .where("co.id = :courseId", { courseId })
                .andWhere("e.type = 'final'")
                .getMany();

            // set all exams to non final 
            await this._ormService
                .getRepository(Exam)
                .save(previousFinalExam
                    .map(x => ({
                        id: x.id,
                        type: "normal"
                    } as Exam)));
        }

        await this._ormService
            .getRepository(Exam)
            .save({
                id: examId,
                title: dto.title,
                subtitle: dto.subTitle,
                courseId: dto.courseId,
                isFinalExam: dto.isFinalExam,
                retakeLimit: dto.reatakeLimit
            });

        await this._questionsService
            .saveAssociatedQuestionsAsync(dto.questions, undefined, examId);
    }

    /**
     * Sets the start date of the answer session, so it can be tracked once finished.
     * 
     * @param answerSessionId 
     */
    async startExamAsync(answerSessionId: number) {

        await this._ormService
            .getRepository(AnswerSession)
            .save({
                id: answerSessionId,
                startDate: new Date()
            });
    }

    /**
     * Returns the exam by it's id.
     * 
     * @param examId 
     * @returns 
     */
    getExamByIdAsync = (examId: number) => {

        return this._ormService
            .getRepository(Exam)
            .findOneOrFail(examId);
    }

    /**
     * Answer a question in the exam. 
     * 
     * @param userId 
     * @param dto 
     * @returns 
     */
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

    /**
     * Delete multiple exams by their ids.
     * 
     * @param examIds 
     * @param unsetCurrentCourseItem 
     * @returns 
     */
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

    /**
     * Get the results of the particular exam.
     * 
     * @param userId 
     * @param answerSessionId 
     * @returns 
     */
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

        const examResultViews = await this._ormService
            .getRepository(ExamResultView)
            .find({
                where: {
                    examId: currentExamId,
                    userId: userId,
                    answerSessionId: answerSessionId
                }
            });

        return toExamResultDTO(examResultViews);
    }
}