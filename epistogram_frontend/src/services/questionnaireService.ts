import { AnswerDTO } from "../models/shared_models/AnswerDTO";
import { AnswerQuestionDTO } from "../models/shared_models/AnswerQuestionDTO";
import { usePostData } from "./httpClient";

export const useAnswerQuestion = () => {

    const queryRes = usePostData<AnswerQuestionDTO, AnswerDTO>("questions/answer-video-question");

    const answerQuestionAsync = (answerSessionId: number, answerId: number, questionId: number) => {

        const dto = {
            answerId,
            questionId,
            answerSessionId
        } as AnswerQuestionDTO;

        return queryRes.postDataAsync(dto);
    }

    return {
        correctAnswer: queryRes.result,
        answerQuestionError: queryRes.error,
        answerQuestionState: queryRes.state,
        answerQuestionAsync
    }
}