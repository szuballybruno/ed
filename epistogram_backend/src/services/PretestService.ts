import { AnswerSession } from '../models/entity/AnswerSession';
import { Exam } from '../models/entity/exam/Exam';
import { ExamData } from '../models/entity/exam/ExamData';
import { ExamVersion } from '../models/entity/exam/ExamVersion';
import { ModuleVersion } from '../models/entity/module/ModuleVersion';
import { AvailableCourseView } from '../models/views/AvailableCourseView';
import { ExamView } from '../models/views/ExamView';
import { LatestCourseVersionView } from '../models/views/LatestCourseVersionView';
import { LatestExamView } from '../models/views/LatestExamView';
import { PretestResultView } from '../models/views/PretestResultView';
import { IdResultDTO } from '../shared/dtos/IdResultDTO';
import { PretestDataDTO } from '../shared/dtos/PretestDataDTO';
import { PretestResultDTO } from '../shared/dtos/PretestResultDTO';
import { PrincipalId } from '../utilities/ActionParams';
import { throwNotImplemented } from '../utilities/helpers';
import { instatiateInsertEntity } from '../utilities/misc';
import { ExamService } from './ExamService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { UserCourseBridgeService } from './UserCourseBridgeService';

export class PretestService {

    private _mapperSerice: MapperService;
    private _ormService: ORMConnectionService;
    private _examService: ExamService;
    private _courseBridgeService: UserCourseBridgeService;

    constructor(
        ormService: ORMConnectionService,
        mapperSerice: MapperService,
        examService: ExamService,
        courseBridgeService: UserCourseBridgeService) {

        this._ormService = ormService;
        this._mapperSerice = mapperSerice;
        this._examService = examService;
        this._courseBridgeService = courseBridgeService;
    }

    async createPretestExamAsync(courseId: number) {

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

    async getPretestDataAsync(userId: PrincipalId, courseId: number) {

        // set course as started, and stage to pretest
        await this._courseBridgeService
            .setCurrentCourse(userId.toSQLValue(), courseId, 'pretest', null);

        // pretest exam 
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

        const pretestExamDTO = await this._examService
            .getExamPlayerDTOAsync(userId.toSQLValue(), pretestExam.id);

        // answer session
        let answerSession = await this._ormService
            .getRepository(AnswerSession)
            .findOne({
                where: {
                    userId: userId.toSQLValue(),
                    examVersionId: pretestExam.id
                }
            });

        if (!answerSession) {

            answerSession = instatiateInsertEntity<AnswerSession>({
                userId: userId.toSQLValue(),
                examVersionId: pretestExam.id,
                videoVersionId: null,
                startDate: null,
                isPractise: false,
                isCompleted: false,
                endDate: null
            });

            await this._ormService
                .getRepository(AnswerSession)
                .insert(answerSession);
        }

        return {
            answerSessionId: answerSession.id,
            exam: pretestExamDTO
        } as PretestDataDTO;
        //return {} as PretestDataDTO;
    }

    async getPretestResultsAsync(principalId: PrincipalId, courseId: number) {

        const userId = principalId.toSQLValue();

        // set current course stage 
        await this._courseBridgeService
            .setCurrentCourse(userId, courseId, 'pretest_results', null);

        const view = await this._ormService
            .getRepository(PretestResultView)
            .findOneOrFail({
                where: {
                    userId,
                    courseId
                }
            });

        const courseView = await this._ormService
            .getRepository(AvailableCourseView)
            .findOneOrFail({
                where: {
                    courseId: courseId,
                    userId
                }
            });

        return this._mapperSerice
            .map(PretestResultView, PretestResultDTO, view, courseView);
    }

    async getPretestExamIdAsync(courseId: number) {

        throwNotImplemented();
        // const exam = await this._ormService
        //     .getRepository(ExamData)
        //     .findOneOrFail({
        //         where: {
        //             courseId,
        //             type: 'pretest'
        //         }
        //     });

        // return {
        //     id: exam.id
        // } as IdResultDTO;
    }
}