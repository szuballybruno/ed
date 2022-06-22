import { AnswerQuestionDTO } from '../../shared/dtos/AnswerQuestionDTO';
import { AnswerResultDTO } from '../../shared/dtos/AnswerResultDTO';
import { QuestionDTO } from '../../shared/dtos/QuestionDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { useReactQuery2 } from '../../static/frontendHelpers';
import { usePostData } from '../core/httpClient';

export const useAnswerPractiseQuestion = () => {

    const postDataQuery = usePostData<AnswerQuestionDTO, AnswerResultDTO>(apiRoutes.questions.answerPractiseQuestion);

    const answerQuestionAsync = (answerIds: number[], questionVersionId: number) => {

        const dto = {
            answerIds,
            questionVersionId
        } as AnswerQuestionDTO;

        return postDataQuery.postDataAsync(dto);
    };

    return {
        answerResults: postDataQuery.result,
        answerQuestionError: postDataQuery.error,
        answerQuestionState: postDataQuery.state,
        answerQuestionAsync,
        clearAnswerResults: postDataQuery.clearCache
    };
};

export const usePractiseQuestion = () => {

    const qr = useReactQuery2<QuestionDTO>(apiRoutes.questions.getPractiseQuestions);

    return {
        practiseQuestion: qr.data,
        practiseQuestionState: qr.state,
        practiseQuestionError: qr.error,
        refetchPractiseQuestion: qr.refetch,
    };
};