import { useReactQuery2 } from "../../static/frontendHelpers";
import { AnswerQuestionDTO } from "../../models/shared_models/AnswerQuestionDTO";
import { AnswerResultDTO } from "../../models/shared_models/AnswerResultDTO";
import { CourseItemDTO } from "../../models/shared_models/CourseItemDTO";
import { PlayerDataDTO } from "../../models/shared_models/PlayerDataDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { VideoPlaybackSampleDTO } from "../../models/shared_models/VideoPlaybackSampleDTO";
import { VideoSamplingResultDTO } from "../../models/shared_models/VideoSamplingResultDTO";
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

    const answerQuestionAsync = (answerSessionId: number, answerIds: number[], questionId: number) => {

        const dto = {
            answerIds,
            questionId,
            answerSessionId
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