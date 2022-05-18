import { PrequizQuestionDTO } from '../../shared/dtos/PrequizQuestionDTO';
import { PrequizUserAnswerDTO } from '../../shared/dtos/PrequizUserAnswerDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { useReactQuery2 } from '../../static/frontendHelpers';
import { usePostDataUnsafe } from '../core/httpClient';

export const usePrequizQuestions = (courseId: number) => {

    const qr = useReactQuery2<PrequizQuestionDTO[]>(apiRoutes.prequiz.getQuestions, { courseId });

    return {
        questions: qr.data ?? [],
        questionsState: qr.state,
        questionsError: qr.error
    };
};

export const usePrequizUserAnswer = (courseId: number, questionId: number | null) => {

    const qr = useReactQuery2<PrequizUserAnswerDTO>(apiRoutes.prequiz.getUserAnswer, { questionId, courseId }, !!questionId);

    return {
        userAnswer: qr.data,
        userAnswerState: qr.state,
        userAnswerError: qr.error
    };
};

export const useAnswerPrequizQuestion = () => {

    const qr = usePostDataUnsafe<{
        questionId: number,
        courseId: number,
        answerId: number | null,
        value: number | null
    }, void>(apiRoutes.prequiz.answerPrequizQuestion);

    return {
        answerPrequizQuestionAsync: qr.postDataAsync,
        answerPrequizQuestionState: qr.state
    };
};