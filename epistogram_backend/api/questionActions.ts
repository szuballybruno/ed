import { Request } from "express";
import { AnswerQuestionDTO } from "../models/shared_models/AnswerQuestionDTO";
import { answerVideoQuestionAsync } from "../services/videoService";
import { getAsyncActionHandler, withValueOrBadRequest } from "../utilities/helpers";

export const answerVideoQuestionAction = getAsyncActionHandler(async (req: Request) => {

    const dto = withValueOrBadRequest(req.body) as AnswerQuestionDTO;
    const answerId = withValueOrBadRequest(dto.answerId);
    const questionId = withValueOrBadRequest(dto.questionId);
    const answerSessionId = withValueOrBadRequest(dto.answerSessionId);

    return answerVideoQuestionAsync(answerSessionId, questionId, answerId);
});