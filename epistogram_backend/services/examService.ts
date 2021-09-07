import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { answerQuestionAsync } from "./questionAnswerService";

export const answerExamQuestionAsync = (userId: number, questionAnswerDTO: QuestionAnswerDTO) => {

    // validation comes here 

    return answerQuestionAsync(
        userId,
        questionAnswerDTO.answerSessionId,
        questionAnswerDTO.questionId,
        questionAnswerDTO.answerId);
}