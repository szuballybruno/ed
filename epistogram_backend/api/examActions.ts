import { Request } from "express";
import { Exam } from "../models/entity/Exam";
import { ExamEditDataDTO } from "../models/shared_models/ExamEditDataDTO";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { getUserIdFromRequest } from "../services/authenticationService";
import { answerExamQuestionAsync, getExamResultsAsync } from "../services/examService";
import { toQuestionDTO } from "../services/mappings";
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