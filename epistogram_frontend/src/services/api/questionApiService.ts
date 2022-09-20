import { AnswerQuestionsDTO } from '../../shared/dtos/AnswerQuestionDTO';
import { AnswerResultDTO } from '../../shared/dtos/AnswerResultDTO';
import { QuestionDTO } from '../../shared/dtos/QuestionDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { QueryService } from '../../static/QueryService';
import { usePostData } from '../core/httpClient';

export const useAnswerPractiseQuestion = () => {

    const postDataQuery = usePostData<AnswerQuestionsDTO, AnswerResultDTO>(apiRoutes.questions.answerPractiseQuestion);

    return {
        answerResults: postDataQuery.result,
        answerQuestionError: postDataQuery.error,
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
