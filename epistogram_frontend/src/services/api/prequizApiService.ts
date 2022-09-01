import { PrequizQuestionDTO } from '../../shared/dtos/PrequizQuestionDTO';
import { PrequizUserAnswerDTO } from '../../shared/dtos/PrequizUserAnswerDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { Id } from '../../shared/types/versionId';
import { QueryService } from '../../static/QueryService';
import { usePostDataUnsafe } from '../core/httpClient';

export const PrequizApiService = {

    usePrequizQuestions: (courseId: Id<'Course'>) => {

        const qr = QueryService.useXQuery<PrequizQuestionDTO[]>(apiRoutes.prequiz.getQuestions, { courseId });

        return {
            questions: qr.data ?? [],
            questionsState: qr.state,
            questionsError: qr.error
        };
    },

    usePrequizUserAnswer: (courseId: Id<'Course'>, questionId: Id<'Question'> | null) => {

        const qr = QueryService.useXQuery<PrequizUserAnswerDTO>(apiRoutes.prequiz.getUserAnswer, { questionId, courseId }, !!questionId);

        return {
            userAnswer: qr.data,
            userAnswerState: qr.state,
            userAnswerError: qr.error
        };
    },

    useAnswerPrequizQuestion: () => {

        const qr = usePostDataUnsafe<{
            questionId: Id<'Question'>,
            courseId: Id<'Course'>,
            answerId: Id<'Answer'> | null,
            value: number | null
        }, void>(apiRoutes.prequiz.answerPrequizQuestion);

        return {
            answerPrequizQuestionAsync: qr.postDataAsync,
            answerPrequizQuestionState: qr.state
        };
    },

    useFinishPrequiz: () => {

        const qr = usePostDataUnsafe(apiRoutes.prequiz.finishPrequiz);

        return {
            finishPrequiz: qr.postDataAsync,
        };
    }
};