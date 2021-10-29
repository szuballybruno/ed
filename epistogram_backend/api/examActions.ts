import { Request } from "express";
import { AnswerSession } from "../models/entity/AnswerSession";
import { Course } from "../models/entity/Course";
import { Exam } from "../models/entity/Exam";
import { Question } from "../models/entity/Question";
import { CreateExamDTO } from "../models/shared_models/CreateExamDTO";
import { ExamEditDataDTO } from "../models/shared_models/ExamEditDataDTO";
import { IdResultDTO } from "../models/shared_models/IdResultDTO";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { getUserIdFromRequest } from "../services/authenticationService";
import { unsetUsersCurrentCourseItemAsync } from "../services/courseService";
import { answerExamQuestionAsync, deleteExamsAsync, getExamResultsAsync } from "../services/examService";
import { toQuestionDTO } from "../services/mappings";
import { deleteQuesitonsAsync, saveAssociatedQuestionsAsync } from "../services/questionService";
import { staticProvider } from "../staticProvider";
import { ActionParamsType, getAsyncActionHandler, withValueOrBadRequest } from "../utilities/helpers";

export const answerExamQuestionAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const questionAnswerDTO = withValueOrBadRequest<QuestionAnswerDTO>(req.body);

    return answerExamQuestionAsync(questionAnswerDTO);
});

export const getExamResultsAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const answerSessionId = withValueOrBadRequest<number>(req.query.answerSessionId, "number");

    return getExamResultsAsync(userId, answerSessionId);
});

export const getExamEditDataAction = async (params: ActionParamsType) => {

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

export const saveExamAction = async (params: ActionParamsType) => {

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

export const createExamAction = async (params: ActionParamsType) => {

    const dto = withValueOrBadRequest<CreateExamDTO>(params.req.body);

    const course = await staticProvider
        .ormConnection
        .getRepository(Course)
        .createQueryBuilder("c")
        .leftJoinAndSelect("c.videos", "v")
        .leftJoinAndSelect("c.exams", "e")
        .where("c.id = :courseId", { courseId: dto.courseId })
        .getOneOrFail();

    const courseItemsLength = course.videos.length + course.exams.length;

    const newExam = {
        courseId: dto.courseId,
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

export const deleteExamAction = async (params: ActionParamsType) => {

    const examId = withValueOrBadRequest<IdResultDTO>(params.req.body).id;

    await deleteExamsAsync([examId], true);
}