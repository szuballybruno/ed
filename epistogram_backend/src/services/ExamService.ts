import { AnswerSession } from '../models/entity/AnswerSession';
import { ExamData } from '../models/entity/exam/ExamData';
import { QuestionVersion } from '../models/entity/question/QuestionVersion';
import { AnswerSessionView } from '../models/views/AnswerSessionView';
import { ExamResultView } from '../models/views/ExamResultView';
import { ExamPlayerDataView } from '../models/views/ExamPlayerDataView';
import { QuestionDataView } from '../models/views/QuestionDataView';
import { AnswerQuestionDTO } from '../shared/dtos/AnswerQuestionDTO';
import { ExamPlayerDataDTO } from '../shared/dtos/ExamPlayerDataDTO';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
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
import { ExamVersionView } from '../models/views/ExamVersionView';
import { QuestionData } from '../models/entity/question/QuestionData';
import { ExamVersion } from '../models/entity/exam/ExamVersion';
import { Id } from '../shared/types/versionId';
import { LatestExamView } from '../models/views/LatestExamView';
import { log } from './misc/logger';
import { ExamResultStatsView } from '../models/views/ExamResultStatsView';
import { AuthorizationService } from './AuthorizationService';
import { ControllerActionReturnType } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class ExamService extends QueryServiceBase<ExamData> {

    private _userCourseBridgeService: UserCourseBridgeService;
    private _userSessionActivityService: UserSessionActivityService;
    private _quesitonAnswerService: QuestionAnswerService;
    private _questionsService: QuestionService;
    private _authorizationService: AuthorizationService;

    constructor(
        userCourseBridgeService: UserCourseBridgeService,
        ormService: ORMConnectionService,
        userSessionActivityService: UserSessionActivityService,
        quesitonAnswerService: QuestionAnswerService,
        questionsService: QuestionService,
        mapperService: MapperService,
        authorizationService: AuthorizationService) {

        super(mapperService, ormService, ExamData);

        this._userCourseBridgeService = userCourseBridgeService;
        this._userSessionActivityService = userSessionActivityService;
        this._quesitonAnswerService = quesitonAnswerService;
        this._questionsService = questionsService;
        this._authorizationService = authorizationService;

    }

    /**
     * Creates a new exam
     */
    async createExamAsync(exam: ExamData) {

        await this._ormService
            .createAsync(ExamData, exam);
    }

    /**
     * Returns an exam player dto that contains 
     * all the data necessary to play an exam.
     */
    getExamPlayerDTOAsync = async (userId: Id<'User'>, examId: Id<'Exam'>) => {

        const examView = await this._ormService
            .query(ExamPlayerDataView, { examId, userId })
            .where('examId', '=', 'examId')
            .and('userId', '=', 'userId')
            .getSingle();

        const questions = await this
            ._getQuestionDataByExamVersionId(examView.examVersionId);

        if (questions.length === 0)
            throw new Error('Exam has no questions assigend.');

        const examResultView = await this._ormService
            .query(ExamResultStatsView, {
                examVersionId: examView.examVersionId,
                userId
            })
            .where('examVersionId', '=', 'examVersionId')
            .and('userId', '=', 'userId')
            .getSingle();

        return this._mapperService
            .mapTo(ExamPlayerDataDTO, [examView, questions, examResultView]);
    };

    /**
     * Get questions for a particular exam.
     */
    private async _getQuestionDataByExamVersionId(examVersionId: Id<'ExamVersion'>) {

        const questionData = await this._ormService
            .query(QuestionDataView, { examVersionId: examVersionId })
            .where('examVersionId', '=', 'examVersionId')
            .getMany();

        return questionData;
    }

    /**
     * Sets the start date of the answer session, so it can be tracked once finished.
     */
    startExamAsync(principalId: PrincipalId, answerSessionId: Id<'AnswerSession'>) {

        return {
            action: async () => {
                await this._ormService
                    .save(AnswerSession, {
                        id: answerSessionId,
                        startDate: new Date()
                    });
            },
            auth: async () => {

                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_APPLICATION')
            }
        }
    }

    completeExamAsync(principalId: PrincipalId, answerSessionId: Id<'AnswerSession'>) {

        return {
            action: async () => {
                await this._ormService
                    .save(AnswerSession, {
                        id: answerSessionId,
                        endDate: new Date()
                    });
            },
            auth: async () => {

                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_APPLICATION')
            }
        }
    }

    /**
     * Returns the exam by it's id.
     */
    getExamByIdAsync = (examId: Id<'Exam'>) => {

        return this._ormService
            .getSingleById(ExamVersionView, examId);
    };

    /**
     * Answer a question in the exam. 
     */
    answerExamQuestionAsync(principalId: PrincipalId, dto: AnswerQuestionDTO): ControllerActionReturnType {

        return {
            action: async () => {
                //throwNotImplemented();
                //TODO validation comes here

                const userIdAsIdType = Id.create<'User'>(principalId.toSQLValue());

                const { answerSessionId, answerIds, elapsedSeconds, questionVersionId } = dto;

                // inspect questions
                const questions = await this._ormService
                    .withResType<QuestionVersion>()
                    .query(AnswerSession, { answerSessionId })
                    .select(QuestionVersion)
                    .leftJoin(ExamVersion, x => x
                        .on('id', '=', 'examVersionId', AnswerSession))
                    .leftJoin(QuestionVersion, x => x
                        .on('examVersionId', '=', 'id', ExamVersion))
                    .leftJoin(QuestionData, x => x
                        .on('id', '=', 'questionDataId', QuestionVersion))
                    .where('id', '=', 'answerSessionId')
                    .getMany();
                /* .getRepository(QuestionVersion)
                .createQueryBuilder('qv')
                .withDeleted()
                .leftJoinAndSelect('qv.questionData', 'qd')
                .leftJoinAndSelect('qv.examVersion', 'ev')
                .leftJoinAndSelect('ev.answerSessions', 'as')
                .where('as.id = :asid', { asid: answerSessionId })
                .orderBy('qd.orderIndex')
                .getMany(); */

                const isLast = questions[questions.length - 1].id === questionVersionId;

                const examVersionId = questions.first().examVersionId!;

                // save user activity
                await this._userSessionActivityService
                    .saveUserSessionActivityAsync(userIdAsIdType, 'exam', examVersionId);

                // save answer 
                const result = this._quesitonAnswerService
                    .answerQuestionAsync(
                        userIdAsIdType,
                        answerSessionId,
                        questionVersionId,
                        answerIds,
                        true,
                        elapsedSeconds);

                if (!isLast)
                    return result;

                // set answer session end date 
                await this._ormService
                    .save(AnswerSession, {
                        id: answerSessionId,
                        isCompleted: true,
                        endDate: new Date()
                    });

                // set user exam progress
                const answerSessionViews = await this._ormService
                    .query(AnswerSessionView, { userId: userIdAsIdType, examVersionId })
                    .where('userId', '=', 'userId')
                    .and('examVersionId', '=', 'examVersionId')
                    .getMany();

                const currentAnswerSessionIsSuccessful = answerSessionViews
                    .first(x => x.answerSessionId == answerSessionId);

                const successfulAsvCount = answerSessionViews
                    .count(x => x.isSuccessful);

                const currentIsFirstSuccessfulAse = successfulAsvCount === 1 && currentAnswerSessionIsSuccessful;

                // if not first successful ase return
                if (!currentIsFirstSuccessfulAse)
                    return result;

                //if first successful ase, save user exam progress bridge
                throwNotImplemented();
                /*  await this._ormService
                     .save(UserExamProgressBridge, {
                         id: currentAnswerSessionIsSuccessful.answerSessionId,
                         completionDate: new Date(),
                         examVersionId,
                         userId: userIdAsIdType
                     }); */
            },
            auth: async () => {

                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_APPLICATION')
            }
        }


    };

    /**
     * Get the results of the particular exam.
     */
    getExamResultsAsync(
        principalId: PrincipalId,
        answerSessionId: Id<'AnswerSession'>
    ) {

        return {
            action: async () => {

                const userIdAsIdType = Id.create<'User'>(principalId.toSQLValue());

                const currentItemCode = await this._userCourseBridgeService
                    .getCurrentItemCodeOrFailAsync(userIdAsIdType);

                const { itemId, itemType } = readItemCode(currentItemCode);

                if (itemType !== 'exam')
                    throw new Error('Current item is not an exam!');

                const latestExam = await this._ormService
                    .query(LatestExamView, { examId: itemId })
                    .where('examId', '=', 'examId')
                    .getSingle();

                const latestExamVersionId = latestExam.examVersionId;

                const examResultViews = await this._ormService
                    .query(ExamResultView, {
                        examVersionId: latestExamVersionId,
                        userId: userIdAsIdType,
                        answerSessionId
                    })
                    .where('examVersionId', '=', 'examVersionId')
                    .and('userId', '=', 'userId')
                    .and('answerSessionId', '=', 'answerSessionId')
                    .getMany();

                const examResultStatsView = await this._ormService
                    .query(ExamResultStatsView, {
                        answerSessionId,
                        userId: principalId
                    })
                    .where('answerSessionId', '=', 'answerSessionId')
                    .and('userId', '=', 'userId')
                    .getSingle();

                return toExamResultDTO(examResultViews, examResultStatsView);
            },
            auth: async () => {

                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_APPLICATION')
            }
        }
    };
}