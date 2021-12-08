import { useReactQuery } from "../frontendHelpers"
import { QuestionEditDataDTO } from "../models/shared_models/QuestionEditDataDTO"
import { apiRoutes } from "../models/shared_models/types/apiRoutes"
import { httpGetAsync, usePostDataUnsafe } from "./core/httpClient"

export const useEditQuestionData = (questionId: number | null) => {

    const qr = useReactQuery<QuestionEditDataDTO>(
        ["useEditQuestionData", questionId],
        () => httpGetAsync(apiRoutes.questions.getQuestionEditData, { questionId }),
        !!questionId)

    return {
        questionEditData: qr.data,
        questionEditDataError: qr.error,
        questionEditDataState: qr.status,
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