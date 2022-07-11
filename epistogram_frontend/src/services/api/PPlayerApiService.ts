import { AnswerQuestionDTO } from '../../shared/dtos/AnswerQuestionDTO';
import { AnswerResultDTO } from '../../shared/dtos/AnswerResultDTO';
import { PlayerDataDTO } from '../../shared/dtos/PlayerDataDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { useReactQuery2 } from '../../static/frontendHelpers';
import { usePostData } from '../core/httpClient';

export const PlayerApiService = {

    usePlayerData: (descriptorCode: string) => {

        const queryResult = useReactQuery2<PlayerDataDTO>(apiRoutes.player.getPlayerData, { descriptorCode });

        return {
            playerData: queryResult.data,
            playerDataStatus: queryResult.state,
            playerDataError: queryResult.error,
            refetchPlayerData: queryResult.refetch
        };
    },

    useAnswerQuestion: () => {

        const queryRes = usePostData<AnswerQuestionDTO, AnswerResultDTO>(apiRoutes.player.answerVideoQuestion);

        const answerQuestionAsync = (answerSessionId: number, answerIds: number[], questionVersionId: number, elapsedSeconds: number) => {

            const dto = {
                answerIds,
                questionVersionId,
                answerSessionId,
                elapsedSeconds
            } as AnswerQuestionDTO;

            return queryRes.postDataAsync(dto);
        };

        return {
            answerResult: queryRes.result,
            answerQuestionError: queryRes.error,
            answerQuestionState: queryRes.state,
            answerQuestionAsync
        };
    }
};