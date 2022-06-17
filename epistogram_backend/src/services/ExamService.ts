import { AnswerSession } from '../models/entity/AnswerSession';
import { Exam } from '../models/entity/exam/Exam';
import { ExamData } from '../models/entity/exam/ExamData';
import { QuestionData } from '../models/entity/question/QuestionData';
import { ExamCompletion } from '../models/entity/UserExamProgressBridge';
import { AnswerSessionView } from '../models/views/AnswerSessionView';
import { CourseItemEditView } from '../models/views/CourseItemEditView';
import { ExamResultView } from '../models/views/ExamResultView';
import { ExamView } from '../models/views/ExamView';
import { AnswerQuestionDTO } from '../shared/dtos/AnswerQuestionDTO';
import { ExamEditDataDTO } from '../shared/dtos/ExamEditDataDTO';
import { ExamPlayerDataDTO } from '../shared/dtos/ExamPlayerDataDTO';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { PrincipalId } from '../utilities/ActionParams';
import { throwNotImplemented } from '../utilities/helpers';
import { MapperService } from './MapperService';
import { readItemCode } from './misc/encodeService';
import { toExamResultDTO } from './misc/mappings';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { QuestionAnswerService } from './QuestionAnswerService';
import { QuestionService } from './QuestionService';
import { UserCourseBridgeService } from './UserCourseBridgeService';
import { UserSessionActivityService } from './UserSessionActivityService';

export class ExamService extends QueryServiceBase<ExamData> {

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

        super(mapperService, ormService, ExamData);

        this._userCourseBridgeService = userCourseBridgeService;
        this._userSessionActivityService = userSessionActivityService;
        this._quesitonAnswerService = quesitonAnswerService;
        this._questionsService = questionsService;

    }

    /**
     * Creates a new exam
     */
    async createExamAsync(exam: ExamData) {

        await this._ormService
            .getRepository(ExamData)
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
            ._getExamQuestionsAsync(examView.examId);

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
    private async _getExamQuestionsAsync(examId: number) {

        throwNotImplemented();
        // const exam = await this._ormService
        //     .getRepository(Exam)
        //     .createQueryBuilder('e')
        //     .where('e.id = :examId', { examId })
        //     .leftJoinAndSelect('e.questions', 'q')
        //     .leftJoinAndSelect('q.answers', 'a')
        //     .getOneOrFail();

        return [] as any;
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
            .getSingleById(ExamData, examId);
    };

    /**
     * Answer a question in the exam. 
     * 
     * @param userId 
     * @param dto 
     * @returns 
     */
    answerExamQuestionAsync = async (principalId: PrincipalId, dto: AnswerQuestionDTO) => {

        throwNotImplemented();
        // TODO validation comes here

        // const userId = principalId.toSQLValue();

        // const { answerSessionId, answerIds, elapsedSeconds, questionId } = dto;

        // // inspect questions
        // const questions = await this._ormService
        //     .getRepository(QuestionData)
        //     .createQueryBuilder('q')
        //     .withDeleted()
        //     .leftJoinAndSelect('q.exam', 'e')
        //     .leftJoinAndSelect('e.answerSessions', 'as')
        //     .where('as.id = :asid', { asid: answerSessionId })
        //     .orderBy('q.orderIndex')
        //     .getMany();

        // const isLast = questions[questions.length - 1].id === questionId;
        // const examId = questions.first().examId!;

        // // save user activity
        // await this._userSessionActivityService
        //     .saveUserSessionActivityAsync(userId, 'exam', examId);

        // // save answer 
        // const result = this._quesitonAnswerService
        //     .answerQuestionAsync(
        //         userId,
        //         answerSessionId,
        //         questionId,
        //         answerIds,
        //         true,
        //         elapsedSeconds);

        // if (!isLast)
        //     return result;

        // // set answer session end date 
        // await this._ormService
        //     .getRepository(AnswerSession)
        //     .save({
        //         id: answerSessionId,
        //         endDate: new Date()
        //     });

        // // set user exam progress
        // const answerSessionViews = await this._ormService
        //     .getRepository(AnswerSessionView)
        //     .createQueryBuilder('asv')
        //     .where('asv.userId = :userId', { userId })
        //     .andWhere('asv.examId = :examId', { examId })
        //     .getMany();

        // const currentAnswerSessionIsSuccessful = answerSessionViews
        //     .first(x => x.answerSessionId == answerSessionId);

        // const successfulAsvCount = answerSessionViews
        //     .count(x => x.isSuccessful);

        // const currentIsFirstSuccessfulAse = successfulAsvCount === 1 && currentAnswerSessionIsSuccessful;

        // // if not first successful ase return
        // if (!currentIsFirstSuccessfulAse)
        //     return result;

        // // if first successful ase, save user exam progress bridge
        // await this._ormService
        //     .getRepository(UserExamProgressBridge)
        //     .save({
        //         completionDate: new Date(),
        //         examId,
        //         userId
        //     });
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
            .softDelete(ExamData, examIds);
    };

    /**
     * Get the results of the particular exam.
     * 
     * @param userId 
     * @param answerSessionId 
     * @returns 
     */
    getExamResultsAsync = async (userId: PrincipalId, answerSessionId: number) => {

        const currentItemCode = await this._userCourseBridgeService
            .getCurrentItemCodeOrFailAsync(userId.toSQLValue());

        const { itemId: currentExamId, itemType } = readItemCode(currentItemCode);

        if (itemType !== 'exam')
            throw new Error('Current item is not an exam!');

        const examResultViews = await this._ormService
            .getRepository(ExamResultView)
            .find({
                where: {
                    examId: currentExamId,
                    userId: userId.toSQLValue(),
                    answerSessionId: answerSessionId
                }
            });

        return toExamResultDTO(examResultViews);
    };
}