import {Exam} from '../models/entity/exam/Exam';
import {ExamVersion} from '../models/entity/exam/ExamVersion';
import {ModuleVersion} from '../models/entity/module/ModuleVersion';
import {AvailableCourseView} from '../models/views/AvailableCourseView';
import {LatestCourseVersionView} from '../models/views/LatestCourseVersionView';
import {PretestResultView} from '../models/views/PretestResultView';
import {PretestDataDTO} from '../shared/dtos/PretestDataDTO';
import {PretestResultDTO} from '../shared/dtos/PretestResultDTO';
import {Id} from '../shared/types/versionId';
import {throwNotImplemented} from '../utilities/helpers';
import {PrincipalId} from '../utilities/XTurboExpress/ActionParams';
import {AuthorizationResult} from '../utilities/XTurboExpress/XTurboExpressTypes';
import {AuthorizationService} from './AuthorizationService';
import {ExamService} from './ExamService';
import {MapperService} from './MapperService';
import {ORMConnectionService} from './ORMConnectionService/ORMConnectionService';
import {PermissionService} from './PermissionService';
import {QuestionAnswerService} from './QuestionAnswerService';
import {TempomatService} from './TempomatService';
import {UserCourseBridgeService} from './UserCourseBridgeService';

export class PretestService {

    constructor(
        private _ormService: ORMConnectionService,
        private _mapperSerice: MapperService,
        private _examService: ExamService,
        private _courseBridgeService: UserCourseBridgeService,
        private _questionAnswerService: QuestionAnswerService,
        private _authorizationService: AuthorizationService,
        private _tempomatService: TempomatService,
        private _permissionService: PermissionService) {
    }

    async createPretestExamAsync(courseId: Id<'Course'>) {

        throwNotImplemented();
        // const newExam = {
        //     courseId,
        //     orderIndex: 0,
        //     title: '',
        //     type: 'pretest',
        //     subtitle: ''
        // } as ExamData;

        // await this._examService
        //     .createExamAsync(newExam);

        // return newExam.id;
    }

    /**
     * Returns pretest data for the principal user - and a course
     */
    async getPretestDataAsync(
        principalId: PrincipalId,
        courseId: Id<'Course'>
    ) {
        const userId = principalId.getId();

        // set course as started, and stage to pretest
        await this._courseBridgeService
            .setCurrentCourse(userId, courseId, 'pretest', null);

        // get pretest exam
        const pretestExam = await this._getPretestExamPlayerData(userId, courseId);

        // get answer session
        const answerSessionId = await this._questionAnswerService
            .createAnswerSessionAsync(userId, pretestExam.examVersionId, null);

        return {
            answerSessionId,
            exam: pretestExam
        } as PretestDataDTO;
    }

    /**
     * Get pretest results
     */
    getPretestResultsAsync(
        principalId: PrincipalId,
        courseId: Id<'Course'>
    ) {

        return {
            action: async () => {
                const userId = principalId.getId();

                /**
                 * Get pretest results view
                 */
                const pretestResultsView = await this._ormService
                    .query(PretestResultView, {userId: userId, courseId})
                    .where('userId', '=', 'userId')
                    .and('courseId', '=', 'courseId')
                    .getSingle();

                /**
                 * Get course view
                 */
                const courseView = await this._ormService
                    .query(AvailableCourseView, {userId: userId, courseId})
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
                 * Set stage,
                 * it's the last thing so it won't
                 * be called if an error occures
                 */
                await this._courseBridgeService
                    .setCurrentCourse(userId, courseId, 'pretest_results', null);

                return this._mapperSerice
                    .mapTo(PretestResultDTO, [
                        pretestResultsView,
                        courseView,
                        originalPrevisionedCompletionDate,
                        requiredCompletionDate,
                        recommendedItemsPerDay
                    ]);
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'WATCH_COURSE', {courseId});
            }
        };
    }

    getPretestExamIdAsync(courseId: Id<'Course'>) {

        return {
            action: async () => {
                throwNotImplemented();
                // const exam = await this._ormService
                //     .query(ExamData, {
                //             courseId,
                //             type: 'pretest'
                //         })
                //     .where('courseId', '=', 'courseId')
                //     .and('type', '=', 'type')
                //     .getOneOrNull();

                // return {
                //     id: exam.id
                // } as IdResultDTO;
            },
            auth: async () => {

                return AuthorizationResult.ok;
            }
        };
    }

    /**
     * Finishes a pretest exam
     */
    async finishPretestAsync(
        principalId: PrincipalId,
        answerSessionId: Id<'AnswerSession'>) {

        // finish pretest
        await this
            ._examService
            .finishExamAsync(principalId, answerSessionId);

        // start course
        const courseId = await this
            ._courseBridgeService
            .getCurrentCourseIdOrFail(principalId.getId());

        await this._courseBridgeService
            .setCourseStartDateAsync(principalId, courseId)
            .action();

        /**
         * Assign SET_COURSE_MODE permission to allow user
         * to start course in their preferred mode
         */
        await this
            ._permissionService
            .assignPermission(principalId.getId(), 'SET_COURSE_MODE', {courseId});
    }

    /**
     * Returns the single pretest exam for a course
     */
    private async _getPretestExamPlayerData(userId: Id<'User'>, courseId: Id<'Course'>) {

        const pretestExam = await this._ormService
            .withResType<ExamVersion>()
            .query(LatestCourseVersionView, {courseId})
            .select(ExamVersion)
            .leftJoin(ModuleVersion, (x) => x
                .on('courseVersionId', '=', 'versionId', LatestCourseVersionView))
            .leftJoin(ExamVersion, (x) => x
                .on('moduleVersionId', '=', 'id', ModuleVersion))
            .innerJoin(Exam, (x) => x
                .on('id', '=', 'examId', ExamVersion)
                .and('isPretest', '=', 'true'))
            .where('courseId', '=', 'courseId')
            .getSingle();

        return await this._examService
            .getExamPlayerDTOAsync(userId, pretestExam.examId);
    }
}
