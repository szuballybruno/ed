import { Course } from "../models/entity/Course";
import { Exam } from "../models/entity/Exam";
import { AnswerQuestionDTO } from "../models/shared_models/AnswerQuestionDTO";
import { CreateExamDTO } from "../models/shared_models/CreateExamDTO";
import { ExamEditDataDTO } from "../models/shared_models/ExamEditDataDTO";
import { IdResultDTO } from "../models/shared_models/IdResultDTO";
import { getUserIdFromRequest } from "../services/authenticationService";
import { ExamService } from "../services/ExamService";
import { toQuestionDTO } from "../services/mappings";
import { saveAssociatedQuestionsAsync } from "../services/questionService";
import { staticProvider } from "../staticProvider";
import { ActionParams, withValueOrBadRequest } from "../utilities/helpers";

export class ExamController {

    private _examService: ExamService;

    constructor(examService: ExamService) {

        this._examService = examService;
    }

    answerExamQuestionAction = async (params: ActionParams) => {

        const userId = getUserIdFromRequest(params.req);
        const questionAnswerDTO = withValueOrBadRequest<AnswerQuestionDTO>(params.req.body);

        return this._examService
            .answerExamQuestionAsync(userId, questionAnswerDTO);
    };

    getExamResultsAction = async (params: ActionParams) => {

        const answerSessionId = withValueOrBadRequest<number>(params.req.query.answerSessionId, "number");

        return this._examService
            .getExamResultsAsync(params.userId, answerSessionId);
    };

    getExamEditDataAction = async (params: ActionParams) => {

        const examId = withValueOrBadRequest<number>(params.req.query.examId, "number");

        const exam = await staticProvider
            .ormConnection
            .getRepository(Exam)
            .createQueryBuilder("e")
            .leftJoinAndSelect("e.questions", "eq")
            .leftJoinAndSelect("eq.answers", "eqa")
            .where("e.id = :examId", { examId })
            .getOneOrFail();

        return {
            id: exam.id,
            title: exam.title,
            courseId: exam.courseId,
            subTitle: exam.subtitle,
            questions: exam
                .questions
                .map(x => toQuestionDTO(x))
        } as ExamEditDataDTO;
    }

    saveExamAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<ExamEditDataDTO>(params.req.body);
        const examId = dto.id;

        // save exam 
        await staticProvider
            .ormConnection
            .getRepository(Exam)
            .save({
                id: examId,
                title: dto.title,
                subtitle: dto.subTitle,
                courseId: dto.courseId,
            });

        await saveAssociatedQuestionsAsync(dto.questions, undefined, examId);
    }

    createExamAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<CreateExamDTO>(params.req.body);

        const course = await staticProvider
            .ormConnection
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

        await staticProvider
            .ormConnection
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