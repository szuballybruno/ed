import { AnswerQuestionDTO } from '../../shared/dtos/AnswerQuestionDTO';
import { AnswerResultDTO } from '../../shared/dtos/AnswerResultDTO';
import { ExamResultsDTO } from '../../shared/dtos/ExamResultsDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { Id } from '../../shared/types/versionId';
import { useReactQuery2 } from '../../static/frontendHelpers';
import { usePostDataUnsafe } from '../core/httpClient';

export const useStartExam = () => {

    const qr = usePostDataUnsafe<{ answerSessionId: Id<'AnswerSession'> }, void>(apiRoutes.exam.startExam);

    return {
        startExamAsync: qr.postDataAsync,
        startExamState: qr.state,
    };
};

export const useCompleteExam = () => {

    const qr = usePostDataUnsafe<{ answerSessionId: Id<'AnswerSession'> }, void>(apiRoutes.exam.completeExam);

    return {
        completeExamAsync: qr.postDataAsync,
        completeExamState: qr.state,
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

export const useExamResults = (answerSessionId: Id<'AnswerSession'>) => {

    const qr = useReactQuery2<ExamResultsDTO>(apiRoutes.exam.getExamResults, { answerSessionId });

    return {
        examResults: qr.data,
        examResultsError: qr.error,
        examResultsState: qr.state
    };
};