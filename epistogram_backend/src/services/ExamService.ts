import { ExamData } from '../models/entity/exam/ExamData';
import { ExamVersion } from '../models/entity/exam/ExamVersion';
import { AnswerSession } from '../models/entity/misc/AnswerSession';
import { ExamCompletion } from '../models/entity/misc/ExamCompletion';
import { ModuleVersion } from '../models/entity/module/ModuleVersion';
import { QuestionVersion } from '../models/entity/question/QuestionVersion';
import { ExamPlayerDataView } from '../models/views/ExamPlayerDataView';
import { ExamResultStatsView } from '../models/views/ExamResultStatsView';
import { ExamResultView } from '../models/views/ExamResultView';
import { ExamVersionView } from '../models/views/ExamVersionView';
import { LatestExamView } from '../models/views/LatestExamView';
import { QuestionDataView } from '../models/views/QuestionDataView';
import { AnswerQuestionsDTO } from '../shared/dtos/AnswerQuestionsDTO';
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

        /**
         * Get highest score session stats
         * for userId and examVersionId
         */
        const examResultView = await this._ormService
            .query(ExamResultStatsView, {
                examVersionId: examView.examVersionId,
                userId: examView.userId
            })
            .where('examVersionId', '=', 'examVersionId')
            .and('userId', '=', 'userId')
            .and('isHighestScoreSession', '=', 'true')
            .getOneOrNull();

        return this._mapperService
            .mapTo(ExamPlayerDataDTO, [examView, questions, examResultView]);
    };

    /**
     * Sets the start date of the answer session, so it can be tracked once finished.
     */
    async startExamAsync(principalId: PrincipalId, answerSessionId: Id<'AnswerSession'>) {

        await this._ormService
            .save(AnswerSession, {
                id: answerSessionId,
                startDate: new Date()
            });
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
            .createAsync(ExamCompletion, {
                answerSessionId,
                completionDate: new Date(),
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

        this._loggerService
            .logScoped('GENERIC', 'Exam finished successfully!' + principalId);
    }

    /**
     * Answer a question in the exam.
     */
    async answerExamQuestionsAsync(principalId: PrincipalId, dto: AnswerQuestionsDTO) {

        const userId = principalId
            .getId();

        const { answerSessionId, givenAnswers } = dto;

        /**
         * Get exam version 
         */
        const answerSession = await this
            ._ormService
            .query(AnswerSession, { answerSessionId })
            .where('id', '=', 'answerSessionId')
            .getSingle();

        const examVersionId = answerSession.examVersionId;
        if (!examVersionId)
            throw new Error('Corrupt request.');

        const examQuestionVersionIds = await this
            ._ormService
            .query(QuestionVersion, { examVersionId })
            .where('examVersionId', '=', 'examVersionId')
            .getMany();

        /**
         * Save given answers
         */
        const result = await this
            ._quesitonAnswerService
            .saveMultipleGivenAnswersAsync({
                userId,
                answerSessionId,
                answerType: 'exam',
                givenAnswerDTOs: givenAnswers,
                questionVersionIds: examQuestionVersionIds
                    .map(x => x.id)
            });

        /**
         * Save user activity
         */
        await this._userSessionActivityService
            .saveUserSessionActivityAsync(userId, 'exam', examVersionId);

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

        const currentItemCode = await this
            ._userCourseBridgeService
            .getCurrentItemCodeOrFailAsync(principalId);

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

        /**
         * Get session stats for exactly
         * the specified answerSession
         */
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
     * Get questions for a particular exam.
     */
    private async _getQuestionDataByExamVersionId(examVersionId: Id<'ExamVersion'>) {

        const questionData = await this._ormService
            .query(QuestionDataView, { examVersionId: examVersionId })
            .where('examVersionId', '=', 'examVersionId')
            .getMany();

        return questionData;
    }
}
