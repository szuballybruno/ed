import { useReactQuery2 } from "../../static/frontendHelpers";
import { AnswerQuestionDTO } from "../../shared/dtos/AnswerQuestionDTO";
import { AnswerResultDTO } from "../../shared/dtos/AnswerResultDTO";
import { QuestionDTO } from "../../shared/dtos/QuestionDTO";
import { QuestionEditDataDTO } from "../../shared/dtos/QuestionEditDataDTO";
import { apiRoutes } from "../../shared/types/apiRoutes";
import { usePostData, usePostDataUnsafe } from "../core/httpClient";

export const useAnswerPractiseQuestion = () => {

    const postDataQuery = usePostData<AnswerQuestionDTO, AnswerResultDTO>(apiRoutes.questions.answerPractiseQuestion);

    const answerQuestionAsync = (answerIds: number[], questionId: number) => {

        const dto = {
            answerIds,
            questionId
        } as AnswerQuestionDTO;

        return postDataQuery.postDataAsync(dto);
    }

    return {
        answerResults: postDataQuery.result,
        answerQuestionError: postDataQuery.error,
        answerQuestionState: postDataQuery.state,
        answerQuestionAsync,
        clearAnswerResults: postDataQuery.clearCache
    }
}

export const usePractiseQuestion = () => {

    const qr = useReactQuery2<QuestionDTO>(apiRoutes.questions.getPractiseQuestions);

    return {
        practiseQuestion: qr.data,
        practiseQuestionState: qr.state,
        practiseQuestionError: qr.error,
        refetchPractiseQuestion: qr.refetch,
    };
}

export const useEditQuestionData = (questionId: number | null) => {

    const qr = useReactQuery2<QuestionEditDataDTO>(apiRoutes.questions.getQuestionEditData, { questionId }, !!questionId)

    return {
        questionEditData: qr.data,
        questionEditDataError: qr.error,
        questionEditDataState: qr.state,
        refetchQuestionEditData: qr.refetch
    }
}

export const useSaveQuestion = () => {

    const qr = usePostDataUnsafe<QuestionEditDataDTO, void>(apiRoutes.questions.saveQuestion);

    return {
        saveQuesitonAsync: qr.postDataAsync,
        saveQuesitonState: qr.state,
    };
}