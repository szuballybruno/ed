import { AnswerQuestionDTO } from "../models/shared_models/AnswerQuestionDTO";
import { AnswerResultDTO } from "../models/shared_models/AnswerResultDTO";
import { usePostData } from "./httpClient";

export const useAnswerQuestion = () => {

    const queryRes = usePostData<AnswerQuestionDTO, AnswerResultDTO>("questions/answer-video-question");

    const answerQuestionAsync = (answerSessionId: number, answerId: number, questionId: number) => {

        const dto = {
            answerId,
            questionId,
            answerSessionId
        } as AnswerQuestionDTO;

        return queryRes.postDataAsync(dto);
    }

    return {
        answerResult: queryRes.result,
        answerQuestionError: queryRes.error,
        answerQuestionState: queryRes.state,
        answerQuestionAsync
    }
}