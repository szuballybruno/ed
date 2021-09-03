import { Request } from "express";
import { AnswerQuestionDTO } from "../models/shared_models/AnswerQuestionDTO";
import { getUserIdFromRequest } from "../services/authentication";
import { answerQuestionAsync } from "../services/questionService";
import { getAsyncActionHandler, withValueOrBadRequest } from "../utilities/helpers"

export const answerQuestionAction = getAsyncActionHandler(async (req: Request) => {

    const dto = withValueOrBadRequest(req.body) as AnswerQuestionDTO;
    const answerId = withValueOrBadRequest(dto.answerId);
    const questionId = withValueOrBadRequest(dto.questionId);
    const userId = getUserIdFromRequest(req);

    return answerQuestionAsync(userId, questionId, answerId);
});