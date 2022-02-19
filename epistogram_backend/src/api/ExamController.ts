import { Course } from "../models/entity/Course";
import { Exam } from "../models/entity/Exam";
import { AnswerQuestionDTO } from "../sharedd/dtos/AnswerQuestionDTO";
import { CreateExamDTO } from "../sharedd/dtos/CreateExamDTO";
import { ExamEditDataDTO } from "../sharedd/dtos/ExamEditDataDTO";
import { IdResultDTO } from "../sharedd/dtos/IdResultDTO";
import { ExamService } from "../services/ExamService";
import { toQuestionDTO } from "../services/misc/mappings";
import { ORMConnectionService } from "../services/sqlServices/ORMConnectionService";
import { ActionParams, withValueOrBadRequest } from "../utilities/helpers";

export class ExamController {

    private _examService: ExamService;
    private _ormService: ORMConnectionService;

    constructor(examService: ExamService, ormService: ORMConnectionService) {

        this._examService = examService;
        this._ormService = ormService;
    }

    answerExamQuestionAction = async (params: ActionParams) => {

        const questionAnswerDTO = withValueOrBadRequest<AnswerQuestionDTO>(params.req.body);

        return this._examService
            .answerExamQuestionAsync(params.currentUserId, questionAnswerDTO);
    };

    startExamAction = async (params: ActionParams) => {

        const body = params.getBody<{ answerSessionId: number }>();
        const answerSessionId = body.getValue(x => x.answerSessionId);

        await this._examService
            .startExamAsync(answerSessionId);
    }

    getExamResultsAction = async (params: ActionParams) => {

        const answerSessionId = withValueOrBadRequest<number>(params.req.query.answerSessionId, "number");

        return this._examService
            .getExamResultsAsync(params.currentUserId, answerSessionId);
    };

    getExamEditDataAction = async (params: ActionParams) => {

        const examId = params
            .getQuery<{ examId: number }>()
            .getValue(x => x.examId, "int");

        return await this._examService
            .getExamEditDataAsync(examId);
    }

    saveExamAction = async (params: ActionParams) => {

        const dto = params
            .getBody<ExamEditDataDTO>();

        await this._examService
            .saveExamAsync(dto.data);
    }

    createExamAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<CreateExamDTO>(params.req.body);

        const course = await this._ormService
            .getRepository(Course)
            .createQueryBuilder("c")
            .leftJoinAndSelect("c.videos", "v")
            .leftJoinAndSelect("c.exams", "e")
            .leftJoinAndSelect("c.modules", "m")
            .where("m.id = :moduleId", { moduleId: dto.moduleId })
            .getOneOrFail();

        const courseItemsLength = course.videos.length + course.exams.length;

        const newExam = {
            courseId: course.id,
            moduleId: dto.moduleId,
            title: dto.title,
            subtitle: dto.subtitle,
            orderIndex: courseItemsLength
        } as Exam;

        await this._ormService
            .getRepository(Exam)
            .insert(newExam);

        return {
            id: newExam.id
        } as IdResultDTO;
    }

    deleteExamAction = async (params: ActionParams) => {

        const examId = withValueOrBadRequest<IdResultDTO>(params.req.body).id;

        await this._examService
            .deleteExamsAsync([examId], true);
    }
}