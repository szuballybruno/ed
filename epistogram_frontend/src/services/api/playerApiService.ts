import { useReactQuery2 } from "../../static/frontendHelpers";
import { AnswerQuestionDTO } from "../../shared/dtos/AnswerQuestionDTO";
import { AnswerResultDTO } from "../../shared/dtos/AnswerResultDTO";
import { CourseItemDTO } from "../../shared/dtos/CourseItemDTO";
import { PlayerDataDTO } from "../../shared/dtos/PlayerDataDTO";
import { apiRoutes } from "../../shared/types/apiRoutes";
import { VideoPlaybackSampleDTO } from "../../shared/dtos/VideoPlaybackSampleDTO";
import { VideoSamplingResultDTO } from "../../shared/dtos/VideoSamplingResultDTO";
import { usePostData } from "../core/httpClient";

export const usePlayerData = (descriptorCode: string) => {

    const queryResult = useReactQuery2<PlayerDataDTO>(apiRoutes.player.getPlayerData, { descriptorCode });

    return {
        playerData: queryResult.data,
        playerDataStatus: queryResult.state,
        playerDataError: queryResult.error,
        refetchPlayerData: queryResult.refetch
    }
}

export const useCourseItemList = (descriptorCode: string, isEnabled: boolean) => {

    const qr = useReactQuery2<CourseItemDTO[]>(apiRoutes.player.getCourseItems, { descriptorCode }, isEnabled);

    return {
        courseItemList: qr.data as CourseItemDTO[] ?? [],
        courseItemListStatus: qr.state,
        courseItemListError: qr.error,
        refetchCourseItemList: qr.refetch
    }
}

export const usePostVideoPlaybackSample = () => {

    const qr = usePostData<VideoPlaybackSampleDTO, VideoSamplingResultDTO>(apiRoutes.player.saveVideoPlaybackSample);

    const postVideoPlaybackSampleAsync = (fromPlayedSeconds: number, toPlayedSeconds: number) => {

        return qr.postDataAsync({
            fromSeconds: fromPlayedSeconds,
            toSeconds: toPlayedSeconds
        });
    }

    return {
        postVideoPlaybackSampleAsync,
        videoSamplingResult: qr.result
    }
}

export const useAnswerQuestion = () => {

    const queryRes = usePostData<AnswerQuestionDTO, AnswerResultDTO>(apiRoutes.player.answerVideoQuestion);

    const answerQuestionAsync = (answerSessionId: number, answerIds: number[], questionId: number, elapsedSeconds: number) => {

        const dto = {
            answerIds,
            questionId,
            answerSessionId,
            elapsedSeconds
        } as AnswerQuestionDTO;

        return queryRes.postDataAsync(dto);
    }

    return {
        answerResult: queryRes.result,
        answerQuestionError: queryRes.error,
        answerQuestionState: queryRes.state,
        answerQuestionAsync
    }
}