import { AnswerSession } from "../models/entity/AnswerSession";
import { Exam } from "../models/entity/Exam";
import { IdResultDTO } from "../models/shared_models/IdResultDTO";
import { PretestDataDTO } from "../models/shared_models/PretestDataDTO";
import { PretestResultDTO } from "../models/shared_models/PretestResultDTO";
import { CourseView } from "../models/views/CourseView";
import { PretestResultView } from "../models/views/PretestResultView";
import { CourseService } from "./CourseService";
import { ExamService } from "./ExamService";
import { MapperService } from "./MapperService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class PretestService {

    private _mapperSerice: MapperService;
    private _ormService: ORMConnectionService;
    private _examService: ExamService;
    private _courseService: CourseService;

    constructor(
        ormService: ORMConnectionService,
        mapperSerice: MapperService,
        examService: ExamService,
        courseService: CourseService) {

        this._ormService = ormService;
        this._mapperSerice = mapperSerice;
        this._examService = examService;
        this._courseService = courseService;
    }

    async getPretestDataAsync(userId: number, courseId: number) {

        // set course as started, and stage to pretest
        await this._courseService
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
        await this._courseService
            .setCurrentCourse(userId, courseId, "pretest_results", null);

        const view = await this._ormService
            .getRepository(PretestResultView)
            .findOneOrFail({
                where: {
                    userId,
                    courseId
                }
            });

        const courseView = await this._courseService
            .getCourseViewAsync(userId, courseId);

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