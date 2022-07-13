import { Course } from '../models/entity/course/Course';
import { Exam } from '../models/entity/exam/Exam';
import { ExamVersion } from '../models/entity/exam/ExamVersion';
import { ModuleVersion } from '../models/entity/module/ModuleVersion';
import { User } from '../models/entity/User';
import { AvailableCourseView } from '../models/views/AvailableCourseView';
import { LatestCourseVersionView } from '../models/views/LatestCourseVersionView';
import { PretestResultView } from '../models/views/PretestResultView';
import { PretestDataDTO } from '../shared/dtos/PretestDataDTO';
import { PretestResultDTO } from '../shared/dtos/PretestResultDTO';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/ActionParams';
import { throwNotImplemented } from '../utilities/helpers';
import { ExamService } from './ExamService';
import { MapperService } from './MapperService';
import { log } from './misc/logger';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { QuestionAnswerService } from './QuestionAnswerService';
import { UserCourseBridgeService } from './UserCourseBridgeService';

export class PretestService {

    constructor(
        private _ormService: ORMConnectionService,
        private _mapperSerice: MapperService,
        private _examService: ExamService,
        private _courseBridgeService: UserCourseBridgeService,
        private _questionAnswerService: QuestionAnswerService) {
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

        const userIdAsIdType = Id.create<'User'>(principalId.toSQLValue());

        console.log('CourseId: ' + courseId)

        // set course as started, and stage to pretest
        await this._courseBridgeService
            .setCurrentCourse(userIdAsIdType, courseId, 'pretest', null);

        // get pretest exam 
        const pretestExam = await this._getPretestExam(userIdAsIdType, courseId);

        // get answer session
        const answerSessionId = await this._questionAnswerService
            .createAnswerSessionAsync(userIdAsIdType, pretestExam.examVersionId, null);

        return {
            answerSessionId,
            exam: pretestExam
        } as PretestDataDTO;
    }

    /**
     * Returns the single pretest exam for a course 
     */
    private async _getPretestExam(userId: Id<'User'>, courseId: Id<'Course'>) {

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
            .getSingle()

        return await this._examService
            .getExamPlayerDTOAsync(userId, pretestExam.examId);
    }

    async getPretestResultsAsync(principalId: PrincipalId, courseId: Id<'Course'>) {

        const userIdAsIdType = Id.create<'User'>(principalId.toSQLValue());

        // set current course stage 
        await this._courseBridgeService
            .setCurrentCourse(userIdAsIdType, courseId, 'pretest_results', null);

        const view = await this._ormService
            .query(PretestResultView, { userId: userIdAsIdType, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getSingle();

        const courseView = await this._ormService
            .query(AvailableCourseView, { userId: userIdAsIdType, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getSingle();

        log('First item code: ' + courseView.firstItemCode)

        return this._mapperSerice
            .mapTo(PretestResultDTO, [view, courseView]);
    }

    async getPretestExamIdAsync(courseId: Id<'Course'>) {

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
    }
}