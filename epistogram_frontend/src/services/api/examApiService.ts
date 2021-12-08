import { useReactQuery2 } from "../../frontendHelpers";
import { AnswerQuestionDTO } from "../../models/shared_models/AnswerQuestionDTO";
import { AnswerResultDTO } from "../../models/shared_models/AnswerResultDTO";
import { CreateExamDTO } from "../../models/shared_models/CreateExamDTO";
import { ExamEditDataDTO } from "../../models/shared_models/ExamEditDataDTO";
import { ExamResultsDTO } from "../../models/shared_models/ExamResultsDTO";
import { IdResultDTO } from "../../models/shared_models/IdResultDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { usePostDataUnsafe } from "../core/httpClient";

export const useEditExamData = (examId: number) => {

    const qr = useReactQuery2<ExamEditDataDTO>(apiRoutes.exam.getExamEditData, { examId });

    return {
        examEditData: qr.data,
        examEditDataError: qr.error,
        examEditDataState: qr.state,
        refetchEditDataAsync: qr.refetch
    }
}

export const useDeleteExam = () => {

    const qr = usePostDataUnsafe<IdResultDTO, void>(apiRoutes.exam.deleteExam);

    return {
        deleteExamAsync: (examId: number) => qr.postDataAsync({ id: examId }),
        deleteExamState: qr.state,
    }
}

export const useCreateExam = () => {

    const qr = usePostDataUnsafe<CreateExamDTO, IdResultDTO>(apiRoutes.exam.createExam);

    return {
        createExamAsync: (moduleId: number) => qr.postDataAsync({
            moduleId,
            subtitle: "",
            title: ""
        }),
        createExamState: qr.state,
    }
}

export const useSaveExam = () => {

    const qr = usePostDataUnsafe<ExamEditDataDTO, void>(apiRoutes.exam.saveExam);

    return {
        saveExamAsync: qr.postDataAsync,
        saveExamState: qr.state,
    }
}

export const useSaveExamAnswer = () => {

    const qr = usePostDataUnsafe<AnswerQuestionDTO, AnswerResultDTO>(apiRoutes.exam.answerExamQuestion);

    return {
        saveExamAnswer: qr.postDataAsync,
        saveExamAnswerState: qr.state,
        answerResult: qr.result ?? null,
        clearExamAnswerCache: qr.clearCache
    }
}

export const useExamResults = (answerSessionId: number) => {

    const qr = useReactQuery2<ExamResultsDTO>(apiRoutes.exam.getExamResults, { answerSessionId });

    return {
        examResults: qr.data,
        examResultsError: qr.error,
        examResultsState: qr.state
    }
}