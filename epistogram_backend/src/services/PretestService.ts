import { AnswerSession } from '../models/entity/AnswerSession';
import { ExamData } from '../models/entity/exam/ExamData';
import { AvailableCourseView } from '../models/views/AvailableCourseView';
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

        throwNotImplemented();
        // // set course as started, and stage to pretest
        // await this._courseBridgeService
        //     .setCurrentCourse(userId.toSQLValue(), courseId, 'pretest', null);

        // // pretest exam 
        // const pretestExam = await this._ormService
        //     .getRepository(ExamData)
        //     .findOneOrFail({
        //         where: {
        //             courseId,
        //             type: 'pretest'
        //         }
        //     });

        // const pretestExamDTO = await this._examService
        //     .getExamPlayerDTOAsync(userId.toSQLValue(), pretestExam.id);

        // // answer session
        // let answerSession = await this._ormService
        //     .getRepository(AnswerSession)
        //     .findOne({
        //         where: {
        //             userId: userId.toSQLValue(),
        //             examId: pretestExam.id,
        //             type: 'pretest'
        //         }
        //     });

        // if (!answerSession) {

        //     answerSession = instatiateInsertEntity<AnswerSession>({
        //         userId: userId.toSQLValue(),
        //         examId: pretestExam.id,
        //         type: 'pretest',
        //         videoId: null,
        //         startDate: null,
        //         endDate: null
        //     });

        //     await this._ormService
        //         .getRepository(AnswerSession)
        //         .insert(answerSession);
        // }

        // return {
        //     answerSessionId: answerSession.id,
        //     exam: pretestExamDTO
        // } as PretestDataDTO;
        return {} as PretestDataDTO;
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
                    id: courseId,
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