import { AnswerQuestionDTO } from '@episto/communication';
import { AnswerResultDTO } from '@episto/communication';
import { QuestionDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { QueryService } from '../../static/QueryService';
import { usePostDataUnsafe } from '../core/httpClient';

export const useAnswerPractiseQuestion = () => {

    const postDataQuery = usePostDataUnsafe<AnswerQuestionDTO, AnswerResultDTO>(apiRoutes.questions.answerPractiseQuestion);

    return {
        answerResults: postDataQuery.result,
        answerQuestionState: postDataQuery.state,
        answerQuestionAsync: postDataQuery.postDataAsync,
        clearAnswerResults: postDataQuery.clearCache
    };
};

export const usePractiseQuestion = () => {

    const qr = QueryService.useXQuery<QuestionDTO>(apiRoutes.questions.getPractiseQuestions);

    return {
        practiseQuestion: qr.data,
        practiseQuestionState: qr.state,
        practiseQuestionError: qr.error,
        refetchPractiseQuestion: qr.refetch,
    };
};
