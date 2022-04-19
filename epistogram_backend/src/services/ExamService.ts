import { AnswerSession } from '../models/entity/AnswerSession';
import { Exam } from '../models/entity/Exam';
import { Question } from '../models/entity/Question';
import { UserExamProgressBridge } from '../models/entity/UserExamProgressBridge';
import { AnswerSessionView } from '../models/views/AnswerSessionView';
import { ExamResultView } from '../models/views/ExamResultView';
import { ExamView } from '../models/views/ExamView';
import { AnswerQuestionDTO } from '../shared/dtos/AnswerQuestionDTO';
import { ExamEditDataDTO } from '../shared/dtos/ExamEditDataDTO';
import { ExamPlayerDataDTO } from '../shared/dtos/ExamPlayerDataDTO';
import { MapperService } from './MapperService';
import { readItemCode } from './misc/encodeService';
import { toExamQuestionEditDTO, toExamResultDTO } from './misc/mappings';
import { QueryServiceBase } from './misc/ServiceBase';
import { QuestionAnswerService } from './QuestionAnswerService';
import { QuestionService } from './QuestionService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { UserCourseBridgeService } from './UserCourseBridgeService';
import { UserSessionActivityService } from './UserSessionActivityService';
import { CourseItemQuestionEditView } from '../models/views/CourseItemQuestionEditView';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { QuestionEditDataDTO } from '../shared/dtos/QuestionEditDataDTO';

export class ExamService extends QueryServiceBase<Exam> {

    private _userCourseBridgeService: UserCourseBridgeService;
    private _userSessionActivityService: UserSessionActivityService;
    private _quesitonAnswerService: QuestionAnswerService;
    private _questionsService: QuestionService;

    constructor(
        userCourseBridgeService: UserCourseBridgeService,
        ormService: ORMConnectionService,
        userSessionActivityService: UserSessionActivityService,
        quesitonAnswerService: QuestionAnswerService,
        questionsService: QuestionService,
        mapperService: MapperService) {

        super(mapperService, ormService, Exam);

        this._userCourseBridgeService = userCourseBridgeService;
        this._userSessionActivityService = userSessionActivityService;
        this._quesitonAnswerService = quesitonAnswerService;
        this._questionsService = questionsService;

    }

    /**
     * Creates a new exam
     */
    async createExamAsync(exam: Exam) {

        await this._ormService
            .getRepository(Exam)
            .insert(exam);
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
            .query(ExamView, { examId, userId })
            .where('examId', '=', 'examId')
            .and('userId', '=', 'userId')
            .getSingle();

        const questions = await this
            .getExamQuestionsAsync(examView.examId);

        if (questions.length === 0)
            throw new Error('Exam has no questions assigend.');

        return this._mapperService
            .map(ExamView, ExamPlayerDataDTO, examView, questions);
    };

    /**
     * Get questions for a particular exam.
     * 
     * @param examId 
     * @returns 
     */
    async getExamQuestionsAsync(examId: number) {

        const exam = await this._ormService
            .getRepository(Exam)
            .createQueryBuilder('e')
            .where('e.id = :examId', { examId })
            .leftJoinAndSelect('e.questions', 'q')
            .leftJoinAndSelect('q.answers', 'a')
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
            .createQueryBuilder('e')
            .leftJoinAndSelect('e.questions', 'eq')
            .leftJoinAndSelect('eq.answers', 'eqa')
            .where('e.id = :examId', { examId })
            .getOneOrFail();

        return this._mapperService
            .map(Exam, ExamEditDataDTO, exam);
    }

    /**
     * Get question edit data for the exam.
     * 
     * @param examId 
     * @returns 
     */
    async getExamQuestionEditDataAsync(
        examId: number
    ) {

        const questionEditView = await this._ormService
            .getRepository(CourseItemQuestionEditView)
            .createQueryBuilder('eq')
            .where('eq.examId = :examId', { examId })
            .getMany();

        const examQuestionEditDTO = toExamQuestionEditDTO(questionEditView);

        return examQuestionEditDTO;
    }

    /**
     * Saves the question edit data for the exam.
     * 
     * @param mutations
     * @returns 
     */
    async saveExamQuestionEditDataAsync(mutations: Mutation<QuestionEditDataDTO, 'questionId'>[]) {

        await this._questionsService.saveNewQuestionsAndAnswers(mutations);
        await this._questionsService.saveUpdatedQuestions(mutations);
        await this._questionsService.saveUpdatedAnswers(mutations);
        await this._questionsService.saveNewAnswers(mutations);
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
            .createQueryBuilder('e')
            .leftJoinAndSelect('e.module', 'mo')
            .where('e.id = :examId', { examId })
            .getOneOrFail();

        const courseId = examBeforeSave.module?.courseId ?? dto.courseId;

        // if this exam was not a final exam previously, 
        // but now it is, set every other exam in the course as non final exam
        if (dto.isFinalExam && examBeforeSave.type !== 'final') {

            // get all exams in course 
            const previousFinalExam = await this._ormService
                .getRepository(Exam)
                .createQueryBuilder('e')
                .leftJoinAndSelect('e.module', 'mo')
                .leftJoinAndSelect('mo.course', 'co')
                .where('co.id = :courseId', { courseId })
                .andWhere('e.type = \'final\'')
                .getMany();

            // set all exams to non final 
            await this._ormService
                .getRepository(Exam)
                .save(previousFinalExam
                    .map(x => ({
                        id: x.id,
                        type: 'normal'
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
            .getSingleById(Exam, examId);
    };

    /**
     * Answer a question in the exam. 
     * 
     * @param userId 
     * @param dto 
     * @returns 
     */
    answerExamQuestionAsync = async (userId: number, dto: AnswerQuestionDTO) => {

        // TODO validation comes here

        const { answerSessionId, answerIds, elapsedSeconds, questionId } = dto;

        // save user activity
        await this._userSessionActivityService
            .saveUserSessionActivityAsync(userId, 'exam');

        // inspect questions
        const questions = await this._ormService
            .getRepository(Question)
            .createQueryBuilder('q')
            .withDeleted()
            .leftJoinAndSelect('q.exam', 'e')
            .leftJoinAndSelect('e.answerSessions', 'as')
            .where('as.id = :asid', { asid: answerSessionId })
            .orderBy('q.orderIndex')
            .getMany();

        const isLast = questions[questions.length - 1].id === questionId;
        const examId = questions.first().examId!;

        // save answer 
        const result = this._quesitonAnswerService
            .answerQuestionAsync(
                userId,
                answerSessionId,
                questionId,
                answerIds,
                true,
                elapsedSeconds);

        if (!isLast)
            return result;

        // set answer session end date 
        await this._ormService
            .getRepository(AnswerSession)
            .save({
                id: answerSessionId,
                endDate: new Date()
            });

        // set user exam progress
        const answerSessionViews = await this._ormService
            .getRepository(AnswerSessionView)
            .createQueryBuilder('asv')
            .where('asv.userId = :userId', { userId })
            .andWhere('asv.examId = :examId', { examId })
            .getMany();

        const currentAnswerSessionIsSuccessful = answerSessionViews
            .first(x => x.answerSessionId == answerSessionId);

        const successfulAsvCount = answerSessionViews
            .count(x => x.isSuccessful);

        const currentIsFirstSuccessfulAse = successfulAsvCount === 1 && currentAnswerSessionIsSuccessful;

        // if not first successful ase return
        if (!currentIsFirstSuccessfulAse)
            return result;

        // if first successful ase, save user exam progress bridge
        await this._ormService
            .getRepository(UserExamProgressBridge)
            .save({
                completionDate: new Date(),
                examId,
                userId
            });
    };

    /**
     * Delete multiple exams by their ids.
     * 
     * @param examIds 
     * @param unsetCurrentCourseItem 
     * @returns 
     */
    softDeleteExamsAsync = async (examIds: number[], unsetCurrentCourseItem: boolean) => {

        // if (examIds.length === 0)
        //     return;

        // delete exam quesitons 
        // const questions = await this._ormService
        //     .getMany(Question,
        //         [
        //             ["SELECT", ["id"]],
        //             ["WHERE", "examId", "=", "examIds"],
        //         ],
        //         { examIds });

        // await this._questionsService
        //     .softDeleteQuesitonsAsync(questions.map(x => x.id));

        // // delete answer sessions
        // const answerSessions = await this._ormService
        //     .getMany(AnswerSession,
        //         [
        //             ["SELECT", ["id"]],
        //             ["WHERE", "examId", "=", "examIds"],
        //         ],
        //         { examIds });

        // await this._ormService
        //     .softDelete(AnswerSession, answerSessions.map(x => x.id));

        // // set current course item on users
        // if (unsetCurrentCourseItem) {
        //     for (let index = 0; index < examIds.length; index++) {

        //         const examId = examIds[index];
        //         await this._userCourseBridgeService
        //             .unsetUsersCurrentCourseItemAsync(examId);
        //     }
        // }

        // delete exam
        await this._ormService
            .softDelete(Exam, examIds);
    };

    /**
     * Get the results of the particular exam.
     * 
     * @param userId 
     * @param answerSessionId 
     * @returns 
     */
    getExamResultsAsync = async (userId: number, answerSessionId: number) => {

        const currentItemCode = await this._userCourseBridgeService
            .getCurrentItemCodeOrFailAsync(userId);

        const { itemId: currentExamId, itemType } = readItemCode(currentItemCode);

        if (itemType !== 'exam')
            throw new Error('Current item is not an exam!');

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
    };
}