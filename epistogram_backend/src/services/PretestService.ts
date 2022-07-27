import { Exam } from '../models/entity/exam/Exam';
import { ExamVersion } from '../models/entity/exam/ExamVersion';
import { ModuleVersion } from '../models/entity/module/ModuleVersion';
import { AvailableCourseView } from '../models/views/AvailableCourseView';
import { LatestCourseVersionView } from '../models/views/LatestCourseVersionView';
import { PretestResultView } from '../models/views/PretestResultView';
import { PretestDataDTO } from '../shared/dtos/PretestDataDTO';
import { PretestResultDTO } from '../shared/dtos/PretestResultDTO';
import { Id } from '../shared/types/versionId';
import { throwNotImplemented } from '../utilities/helpers';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { ExamService } from './ExamService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { QuestionAnswerService } from './QuestionAnswerService';
import { TempomatService } from './TempomatService';
import { UserCourseBridgeService } from './UserCourseBridgeService';

export class PretestService {

    private _tempomatService: TempomatService;

    constructor(
        private _ormService: ORMConnectionService,
        private _mapperSerice: MapperService,
        private _examService: ExamService,
        private _courseBridgeService: UserCourseBridgeService,
        private _questionAnswerService: QuestionAnswerService,
        tempomatService: TempomatService) {

        this._tempomatService = tempomatService;
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
    async getPretestDataAsync(principalId: PrincipalId, courseId: Id<'Course'>) {

        const userId = principalId.getId();

        console.log('CourseId: ' + courseId);

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
     * Returns the single pretest exam for a course 
     */
    private async _getPretestExamPlayerData(userId: Id<'User'>, courseId: Id<'Course'>) {

        const pretestExam = await this._ormService
            .withResType<ExamVersion>()
            .query(LatestCourseVersionView, { courseId })
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

    /**
     * Get pretest results  
     */
    async getPretestResultsAsync(principalId: PrincipalId, courseId: Id<'Course'>) {

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
         * Get course view 
         */
        const courseView = await this._ormService
            .query(AvailableCourseView, { userId: userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getSingle();

        /**
         * Get tempomat data
         */
        const {
            originalPrevisionedCompletionDate,
            recommendedItemsPerDay,
            requiredCompletionDate
        } = await this._tempomatService
            .calculateTempomatValuesAsync(userId, courseId);

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
            .setCourseStartDateAsync(principalId, courseId);
    }
}