import { PrequizQuestionDTO } from '@episto/communication';
import { PrequizUserAnswerDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { QueryService } from '../../static/XQuery/XQueryReact';
import { usePostDataUnsafe } from '../core/httpClient';
import { isNullOrUndefined } from '../../static/frontendHelpers';
import { useMemo } from 'react';

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

        const isEnabled = useMemo(() => !isNullOrUndefined(questionId), [questionId]);

        const query = { questionId, courseId };

        const qr = QueryService
            .useXQuery<PrequizUserAnswerDTO>(apiRoutes.prequiz.getUserAnswer, query, isEnabled);

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