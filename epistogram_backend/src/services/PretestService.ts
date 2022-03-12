import { AnswerSession } from "../models/entity/AnswerSession";
import { Exam } from "../models/entity/Exam";
import { CourseView } from "../models/views/CourseView";
import { PretestResultView } from "../models/views/PretestResultView";
import { IdResultDTO } from "../shared/dtos/IdResultDTO";
import { PretestDataDTO } from "../shared/dtos/PretestDataDTO";
import { PretestResultDTO } from "../shared/dtos/PretestResultDTO";
import { ExamService } from "./ExamService";
import { MapperService } from "./MapperService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";
import { UserCourseBridgeService } from "./UserCourseBridgeService";

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

        const newExam = {
            courseId,
            orderIndex: 0,
            title: "",
            type: "pretest",
            subtitle: ""
        } as Exam;

        await this._examService
            .createExamAsync(newExam);

        return newExam.id;
    }

    async getPretestDataAsync(userId: number, courseId: number) {

        // set course as started, and stage to pretest
        await this._courseBridgeService
            .setCurrentCourse(userId, courseId, "pretest", null)

        // pretest exam 
        const pretestExam = await this._ormService
            .getRepository(Exam)
            .findOneOrFail({
                where: {
                    courseId,
                    type: "pretest"
                }
            });

        const pretestExamDTO = await this._examService
            .getExamPlayerDTOAsync(userId, pretestExam.id);

        // answer session
        let answerSession = await this._ormService
            .getRepository(AnswerSession)
            .findOne({
                where: {
                    userId,
                    examId: pretestExam.id,
                    type: "pretest"
                }
            });

        if (!answerSession) {

            answerSession = {
                userId,
                examId: pretestExam.id,
                type: "pretest"
            } as AnswerSession;

            await this._ormService
                .getRepository(AnswerSession)
                .insert(answerSession);
        }

        return {
            answerSessionId: answerSession.id,
            exam: pretestExamDTO
        } as PretestDataDTO;
    }

    async getPretestResultsAsync(userId: number, courseId: number) {

        // set current course stage 
        await this._courseBridgeService
            .setCurrentCourse(userId, courseId, "pretest_results", null);

        const view = await this._ormService
            .getRepository(PretestResultView)
            .findOneOrFail({
                where: {
                    userId,
                    courseId
                }
            });

        const courseView = await this._ormService
            .getRepository(CourseView)
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

        const exam = await this._ormService
            .getRepository(Exam)
            .findOneOrFail({
                where: {
                    courseId,
                    type: "pretest"
                }
            });

        return {
            id: exam.id
        } as IdResultDTO;
    }
}