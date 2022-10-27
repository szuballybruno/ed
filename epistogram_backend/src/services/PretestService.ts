import { LatestExamView } from '../models/views/LatestExamView';
import { PretestResultView } from '../models/views/PretestResultView';
import { PretestDataDTO } from '../shared/dtos/PretestDataDTO';
import { PretestResultDTO } from '../shared/dtos/PretestResultDTO';
import { instantiate } from '../shared/logic/sharedLogic';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { AuthorizationService } from './AuthorizationService';
import { ExamService } from './ExamService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { PermissionService } from './PermissionService';
import { PlayerService } from './PlayerService';
import { QuestionAnswerService } from './QuestionAnswerService';
import { TempomatService } from './TempomatService';
import { UserCourseBridgeService } from './UserCourseBridgeService';

export class PretestService {

    constructor(
        private _ormService: ORMConnectionService,
        private _mapperSerice: MapperService,
        private _examService: ExamService,
        private _courseBridgeService: UserCourseBridgeService,
        private _questionAnswerService: QuestionAnswerService,
        private _authorizationService: AuthorizationService,
        private _tempomatService: TempomatService,
        private _permissionService: PermissionService,
        private _playerService: PlayerService) {
    }

    /**
     * Returns pretest data for the principal user - and a course
     */
    async getPretestDataAsync(
        principalId: PrincipalId,
        courseId: Id<'Course'>
    ) {
        const userId = principalId.getId();

        // get pretest exam
        const pretestExam = await this
            ._getPretestExamPlayerData(userId, courseId);

        // get answer session
        const answerSessionId = await this._questionAnswerService
            .createAnswerSessionAsync(userId, pretestExam.examVersionId, null);

        return instantiate<PretestDataDTO>({
            answerSessionId,
            exam: pretestExam
        });
    }

    /**
     * Get pretest results
     */
    async getPretestResultsAsync(
        principalId: PrincipalId,
        courseId: Id<'Course'>
    ) {
        await this._authorizationService
            .checkPermissionAsync(principalId, 'WATCH_COURSE', { courseId });

        const userId = principalId.getId();

        /**
         * Get pretest results view
         */
        const pretestResultsView = await this._ormService
            .query(PretestResultView, { userId: userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getSingle();

        /**
         * Get tempomat data
         */
        const tempomatValues = await this._tempomatService
            .calculateTempomatValuesAsync(userId, courseId);

        const originalPrevisionedCompletionDate = tempomatValues?.originalPrevisionedCompletionDate || null;
        const recommendedItemsPerDay = tempomatValues?.recommendedItemsPerDay || null;
        const requiredCompletionDate = tempomatValues?.requiredCompletionDate || null;

        /**
         * Get first item playlist code 
         */
        const { firstItemPlaylistCode } = await this
            ._playerService
            .getFirstPlaylistItemCodeAsync(principalId.getId(), courseId);

        return this._mapperSerice
            .mapTo(PretestResultDTO, [
                pretestResultsView,
                firstItemPlaylistCode,
                originalPrevisionedCompletionDate,
                requiredCompletionDate,
                recommendedItemsPerDay
            ]);
    }

    /**
     * Finishes a pretest exam
     */
    async finishPretestAsync(
        principalId: PrincipalId,
        answerSessionId: Id<'AnswerSession'>) {

        const userId = principalId.getId();

        // finish pretest
        await this
            ._examService
            .finishExamAsync(principalId, answerSessionId);

        // start course
        const courseId = await this
            ._courseBridgeService
            .getCurrentCourseIdOrFail(userId);

        await this._courseBridgeService
            .setCourseStartDateAsync(principalId, courseId);

        /**
         * Assign SET_COURSE_MODE permission to allow user
         * to start course in their preferred mode
         */
        const assingedSetCourseModePermission = await this
            ._permissionService
            .getPermissionAsync(userId, 'SET_COURSE_MODE', { courseId });

        if (!assingedSetCourseModePermission)
            await this
                ._permissionService
                .assignPermission(userId, 'SET_COURSE_MODE', { courseId });

        /**
         * Set results stage
         */
        await this
            ._courseBridgeService
            .setStageAsync(userId, courseId, 'pretest_results', null);
    }

    /**
     * Returns the single pretest exam for a course
     */
    private async _getPretestExamPlayerData(userId: Id<'User'>, courseId: Id<'Course'>) {

        const pretestExam = await this._ormService
            .query(LatestExamView, { courseId })
            .where('courseId', '=', 'courseId')
            .and('isPretest', '=', 'true')
            .getSingle();

        return await this._examService
            .getExamPlayerDTOAsync(userId, pretestExam.examId);
    }
}
