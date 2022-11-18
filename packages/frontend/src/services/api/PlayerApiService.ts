import { AnswerQuestionDTO } from '@episto/communication';
import { AnswerResultDTO } from '@episto/communication';
import { PlayerDataDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { QueryService } from '../../static/XQuery/XQueryReact';
import { usePostDataUnsafe } from '../core/httpClient';

export const PlayerApiService = {

    usePlayerData: (descriptorCode: string) => {

        const queryResult = QueryService
            .useXQuery<PlayerDataDTO>(apiRoutes.player.getPlayerData, { descriptorCode });

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
