import { AnswerQuestionsDTO } from '../../shared/dtos/AnswerQuestionsDTO';
import { AnswerResultDTO } from '../../shared/dtos/AnswerResultDTO';
import { ExamResultsDTO } from '../../shared/dtos/ExamResultsDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { Id } from '../../shared/types/versionId';
import { QueryService } from '../../static/QueryService';
import { usePostDataUnsafe } from '../core/httpClient';

export const useStartExam = () => {

    const qr = usePostDataUnsafe<{ answerSessionId: Id<'AnswerSession'> }, void>(apiRoutes.exam.startExam);

    return {
        startExamAsync: qr.postDataAsync,
        startExamState: qr.state,
    };
};

export const useFinishExam = () => {

    const qr = usePostDataUnsafe<{ answerSessionId: Id<'AnswerSession'> }, void>(apiRoutes.exam.completeExam);

    return {
        finishExamAsync: qr.postDataAsync,
        finishExamState: qr.state,
    };
};

export const useSaveExamAnswers = () => {

    const qr = usePostDataUnsafe<AnswerQuestionsDTO, AnswerResultDTO>(apiRoutes.exam.answerExamQuestion);

    return {
        saveExamAnswers: qr.postDataAsync,
        saveExamAnswersState: qr.state
    };
};

export const useExamResults = (answerSessionId: Id<'AnswerSession'>) => {

    const qr = QueryService.useXQuery<ExamResultsDTO>(apiRoutes.exam.getExamResults, { answerSessionId });

    return {
        examResults: qr.data,
        examResultsError: qr.error,
        examResultsState: qr.state
    };
};

export const useLatestExamResults = (answerSessionId: Id<'AnswerSession'>) => {

    const qr = QueryService.useXQuery<ExamResultsDTO>(apiRoutes.exam.getLatestExamResults, { answerSessionId });

    return {
        examResults: qr.data,
        examResultsError: qr.error,
        examResultsState: qr.state
    };
};

export const ExamApiService = {
    useSaveExamAnswers,
};