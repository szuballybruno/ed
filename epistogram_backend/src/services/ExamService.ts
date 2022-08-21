import { AnswerSession } from '../models/entity/AnswerSession';
import { CourseItemCompletion } from '../models/entity/CourseItemCompletion';
import { ExamData } from '../models/entity/exam/ExamData';
import { ExamVersion } from '../models/entity/exam/ExamVersion';
import { ModuleVersion } from '../models/entity/module/ModuleVersion';
import { QuestionVersion } from '../models/entity/question/QuestionVersion';
import { AnswerSessionView } from '../models/views/AnswerSessionView';
import { ExamPlayerDataView } from '../models/views/ExamPlayerDataView';
import { ExamResultStatsView } from '../models/views/ExamResultStatsView';
import { ExamResultView } from '../models/views/ExamResultView';
import { ExamVersionView } from '../models/views/ExamVersionView';
import { LatestExamView } from '../models/views/LatestExamView';
import { QuestionDataView } from '../models/views/QuestionDataView';
import { AnswerQuestionDTO } from '../shared/dtos/AnswerQuestionDTO';
import { ExamPlayerDataDTO } from '../shared/dtos/ExamPlayerDataDTO';
import { ExamResultsDTO } from '../shared/dtos/ExamResultsDTO';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { AuthorizationService } from './AuthorizationService';
import { CourseCompletionService } from './CourseCompletionService';
import { LoggerService } from './LoggerService';
import { MapperService } from './MapperService';
import { readItemCode } from './misc/encodeService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { QuestionAnswerService } from './QuestionAnswerService';
import { QuestionService } from './QuestionService';
import { UserCourseBridgeService } from './UserCourseBridgeService';
import { UserSessionActivityService } from './UserSessionActivityService';

export class ExamService {

    constructor(
        private _userCourseBridgeService: UserCourseBridgeService,
        private _ormService: ORMConnectionService,
        private _userSessionActivityService: UserSessionActivityService,
        private _quesitonAnswerService: QuestionAnswerService,
        private _questionsService: QuestionService,
        private _mapperService: MapperService,
        private _authorizationService: AuthorizationService,
        private _loggerService: LoggerService,
        private _courseCompletionService: CourseCompletionService) {
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
            .getOneOrNull();

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
                    .checkPermissionAsync(principalId, 'ACCESS_APPLICATION');
            }
        };
    }

    /**
     * Returns the exam by it's id.
     */
    async getExamByIdAsync(examId: Id<'Exam'>) {

        return this._ormService
            .getSingleById(ExamVersionView, examId);
    }

    /**
     * Finish exam 
     */
    async finishExamAsync(principalId: PrincipalId, answerSessionId: Id<'AnswerSession'>) {

        this._loggerService
            .logScoped('GENERIC', 'Finishing exam... ' + principalId);

        const ans = await this
            ._ormService
            .getSingleById(AnswerSession, answerSessionId);

        await this
            ._ormService
            .createAsync(CourseItemCompletion, {
                answerSessionId,
                completionDate: new Date(),
                examVersionId: ans.examVersionId,
                userId: principalId.getId(),
                videoVersionId: null
            });

        /**
         * Try finish course 
         */
        const moduleVersion = await this
            ._ormService
            .query(ModuleVersion, { examVersionId: ans.examVersionId })
            .select(ModuleVersion)
            .innerJoin(ExamVersion, x => x
                .on('id', '=', 'examVersionId')
                .and('moduleVersionId', '=', 'id', ModuleVersion))
            .getSingle();

        if (!moduleVersion.courseVersionId)
            return;

        await this
            ._courseCompletionService
            .tryFinishCourseAsync(principalId.getId(), moduleVersion.courseVersionId);
    }

    /**
     * Answer a question in the exam. 
     */
    async answerExamQuestionAsync(principalId: PrincipalId, dto: AnswerQuestionDTO) {

        const userId = principalId
            .getId();

        const {
            answerSessionId,
            answerIds,
            elapsedSeconds,
            questionVersionId
        } = dto;

        /**
         * Get exam version id
         */
        const questionVersion = await this
            ._ormService
            .query(QuestionVersion, { questionVersionId })
            .where('id', '=', 'questionVersionId')
            .getSingle();

        const examVersionId = questionVersion
            .examVersionId!;

        /**
         * Save given answer
         */
        const result = await this
            ._quesitonAnswerService
            .saveGivenAnswerAsync({
                userId,
                answerSessionId,
                questionVersionId,
                answerIds,
                isExamQuestion: true,
                elapsedSeconds
            });

        /**
         * Save user activity
         */
        await this._userSessionActivityService
            .saveUserSessionActivityAsync(userId, 'exam', examVersionId);

        /**
         * If first successful, do something DUNNO WHAT
         * TODO
         */
        // const isFirstSuccessfulAnswerSession = await this
        //     ._checkIfFirstSuccessfulAnswerSessionAsync(userId, examVersionId, answerSessionId);

        return result;
    }

    /**
     * Get the results of the particular exam.
     */
    async getExamResultsAsync(
        principalId: PrincipalId,
        answerSessionId: Id<'AnswerSession'>
    ) {

        const userId = principalId
            .getId();

        const currentItemCode = await this._userCourseBridgeService
            .getCurrentItemCodeOrFailAsync(userId);

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
                userId: userId,
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

        return this
            ._mapperService
            .mapTo(ExamResultsDTO, [examResultViews, examResultStatsView]);
    }

    /**
     * Checks if answer session is indeed 
     * the first one to succeed. 
     */
    private async _checkIfFirstSuccessfulAnswerSessionAsync(
        userId: Id<'User'>,
        examVersionId: Id<'ExamVersion'>,
        answerSessionId: Id<'AnswerSession'>) {

        // set user exam progress
        const answerSessionViews = await this._ormService
            .query(AnswerSessionView, { userId: userId, examVersionId })
            .where('userId', '=', 'userId')
            .and('examVersionId', '=', 'examVersionId')
            .getMany();

        if (answerSessionViews.length === 0)
            throw new Error('0 answer session view found!');

        const currentAnswerSessionIsSuccessful = answerSessionViews
            .first(x => x.answerSessionId == answerSessionId);

        const successfulAsvCount = answerSessionViews
            .count(x => x.isSuccessful);

        return successfulAsvCount === 1 && currentAnswerSessionIsSuccessful;
    }
}