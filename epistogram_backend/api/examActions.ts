import { Request } from "express";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { getUserIdFromRequest } from "../services/authentication";
import { answerExamQuestionAsync, getExamResultsAsync } from "../services/examService";
import { getAsyncActionHandler, withValueOrBadRequest } from "../utilities/helpers";

export const answerExamQuestionAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const questionAnswerDTO = withValueOrBadRequest(req.body) as QuestionAnswerDTO;

    return answerExamQuestionAsync(userId, questionAnswerDTO);
});

export const getExamResultsAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const answerSessionId = parseInt(withValueOrBadRequest(req.query.answerSession));

    return getExamResultsAsync(userId, answerSessionId);
});