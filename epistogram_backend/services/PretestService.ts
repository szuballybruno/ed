import { AnswerSession } from "../models/entity/AnswerSession";
import { Exam } from "../models/entity/Exam";
import { PretestDataDTO } from "../models/shared_models/PretestDataDTO";
import { CourseView } from "../models/views/CourseView";
import { ExamService } from "./ExamService";
import { MapperService } from "./MapperService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class PretestService {

    private _mapperSerice: MapperService;
    private _ormService: ORMConnectionService;
    private _examService: ExamService;

    constructor(
        ormService: ORMConnectionService,
        mapperSerice: MapperService,
        examService: ExamService) {

        this._ormService = ormService;
        this._mapperSerice = mapperSerice;
        this._examService = examService;
    }

    async getPretestDataAsync(userId: number, courseId: number) {

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

        // course 
        const course = await this._ormService
            .getRepository(CourseView)
            .findOneOrFail({
                where: {
                    id: courseId,
                    userId
                }
            });

        return {
            answerSessionId: answerSession.id,
            exam: pretestExamDTO,
            firstItemCode: course.firstItemCode
        } as PretestDataDTO;
    }
}