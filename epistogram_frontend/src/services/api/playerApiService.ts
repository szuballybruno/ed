import { AnswerQuestionDTO } from '../../shared/dtos/AnswerQuestionDTO';
import { AnswerResultDTO } from '../../shared/dtos/AnswerResultDTO';
import { PlayerDataDTO } from '../../shared/dtos/PlayerDataDTO';
import { PlaylistItemDTO } from '../../shared/dtos/PlaylistItemDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { useReactQuery2 } from '../../static/frontendHelpers';
import { usePostData } from '../core/httpClient';

export const usePlayerData = (descriptorCode: string) => {

    const queryResult = useReactQuery2<PlayerDataDTO>(apiRoutes.player.getPlayerData, { descriptorCode });

    return {
        playerData: queryResult.data,
        playerDataStatus: queryResult.state,
        playerDataError: queryResult.error,
        refetchPlayerData: queryResult.refetch
    };
};

export const usePlaylistData = (descriptorCode: string, isEnabled: boolean) => {

    const qr = useReactQuery2<PlaylistItemDTO[]>(apiRoutes.player.getCourseItems, { descriptorCode }, isEnabled);

    return {
        courseItemList: qr.data as PlaylistItemDTO[] ?? [],
        courseItemListStatus: qr.state,
        courseItemListError: qr.error,
        refetchCourseItemList: qr.refetch
    };
};

export const useAnswerQuestion = () => {

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
};