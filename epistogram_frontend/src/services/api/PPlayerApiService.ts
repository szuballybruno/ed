import { AnswerQuestionsDTO } from '../../shared/dtos/AnswerQuestionDTO';
import { AnswerResultDTO } from '../../shared/dtos/AnswerResultDTO';
import { PlayerDataDTO } from '../../shared/dtos/PlayerDataDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { QueryService } from '../../static/QueryService';
import { usePostData } from '../core/httpClient';

export const PlayerApiService = {

    usePlayerData: (descriptorCode: string) => {

        const queryResult = QueryService.useXQuery<PlayerDataDTO>(apiRoutes.player.getPlayerData, { descriptorCode });

        return {
            playerData: queryResult.data,
            playerDataStatus: queryResult.state,
            playerDataError: queryResult.error,
            refetchPlayerData: queryResult.refetch
        };
    },

    useAnswerQuestion: () => {

        const queryRes = usePostData<AnswerQuestionsDTO, AnswerResultDTO>(apiRoutes.player.answerVideoQuestion);

        return {
            answerResult: queryRes.result,
            answerQuestionError: queryRes.error,
            answerQuestionState: queryRes.state,
            answerQuestionAsync: queryRes.postDataAsync
        };
    }
};
