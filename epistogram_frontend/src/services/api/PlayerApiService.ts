import { AnswerQuestionDTO } from '../../shared/dtos/AnswerQuestionDTO';
import { AnswerResultDTO } from '../../shared/dtos/AnswerResultDTO';
import { PlayerDataDTO } from '../../shared/dtos/PlayerDataDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { QueryService } from '../../static/QueryService';
import { usePostDataUnsafe } from '../core/httpClient';

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

        const queryRes = usePostDataUnsafe<AnswerQuestionDTO, AnswerResultDTO>(apiRoutes.player.answerVideoQuestion);

        return {
            answerResult: queryRes.result,
            answerQuestionState: queryRes.state,
            answerQuestionAsync: queryRes.postDataAsync
        };
    }
};
