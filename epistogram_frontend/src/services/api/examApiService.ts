import { AnswerQuestionDTO } from '../../shared/dtos/AnswerQuestionDTO';
import { AnswerResultDTO } from '../../shared/dtos/AnswerResultDTO';
import { CreateExamDTO } from '../../shared/dtos/CreateExamDTO';
import { ExamEditDataDTO } from '../../shared/dtos/ExamEditDataDTO';
import { ExamQuestionEditDTO } from '../../shared/dtos/ExamQuestionEditDTO';
import { ExamResultsDTO } from '../../shared/dtos/ExamResultsDTO';
import { IdResultDTO } from '../../shared/dtos/IdResultDTO';
import { Mutation } from '../../shared/dtos/mutations/Mutation';
import { QuestionEditDataDTO } from '../../shared/dtos/QuestionEditDataDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { useReactQuery2 } from '../../static/frontendHelpers';
import { usePostDataUnsafe } from '../core/httpClient';

export const useEditExamData = (examId: number) => {

    const qr = useReactQuery2<ExamEditDataDTO>(apiRoutes.exam.getExamEditData, { examId });

    return {
        examEditData: qr.data,
        examEditDataError: qr.error,
        examEditDataState: qr.state,
        refetchEditDataAsync: qr.refetch
    };
};

export const useExamQuestionEditData = (examId: number | null) => {

    const qr = useReactQuery2<ExamQuestionEditDTO>(apiRoutes.exam.getExamQuestionEditData, { examId }, !!examId);

    return {
        examQuestionEditData: qr.data,
        examQuestionEditDataError: qr.error,
        examQuestionEditDataState: qr.state,
        refetchExamQuestionEditData: qr.refetch
    };
};

export const useSaveExamQuestionEditData = () => {

    const qr = usePostDataUnsafe<Mutation<QuestionEditDataDTO, 'questionId'>[], void>(apiRoutes.exam.saveExamQuestionEditData);

    return {
        saveExamQuestionEditData: qr.postDataAsync,
        saveExamQuestionEditDataState: qr.state,
    };
};

export const useDeleteExam = () => {

    const qr = usePostDataUnsafe<IdResultDTO, void>(apiRoutes.exam.deleteExam);

    return {
        deleteExamAsync: (examId: number) => qr.postDataAsync({ id: examId }),
        deleteExamState: qr.state,
    };
};

export const useCreateExam = () => {

    const qr = usePostDataUnsafe<CreateExamDTO, IdResultDTO>(apiRoutes.exam.createExam);

    return {
        createExamAsync: (moduleId: number) => qr.postDataAsync({
            moduleId,
            subtitle: '',
            title: ''
        }),
        createExamState: qr.state,
    };
};

export const useSaveExam = () => {

    const qr = usePostDataUnsafe<ExamEditDataDTO, void>(apiRoutes.exam.saveExam);

    return {
        saveExamAsync: qr.postDataAsync,
        saveExamState: qr.state,
    };
};

export const useStartExam = () => {

    const qr = usePostDataUnsafe<{ answerSessionId: number }, void>(apiRoutes.exam.startExam);

    return {
        startExamAsync: qr.postDataAsync,
        startExamState: qr.state,
    };
};

export const useSaveExamAnswer = () => {

    const qr = usePostDataUnsafe<AnswerQuestionDTO, AnswerResultDTO>(apiRoutes.exam.answerExamQuestion);

    return {
        saveExamAnswer: qr.postDataAsync,
        saveExamAnswerState: qr.state,
        answerResult: qr.result ?? null,
        clearExamAnswerCache: qr.clearCache
    };
};

export const useExamResults = (answerSessionId: number) => {

    const qr = useReactQuery2<ExamResultsDTO>(apiRoutes.exam.getExamResults, { answerSessionId });

    return {
        examResults: qr.data,
        examResultsError: qr.error,
        examResultsState: qr.state
    };
};