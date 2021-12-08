import { useReactQuery, useReactQuery2 } from "../frontendHelpers";
import { CourseItemDTO } from "../models/shared_models/CourseItemDTO";
import { PlayerDataDTO } from "../models/shared_models/PlayerDataDTO";
import { apiRoutes } from "../models/shared_models/types/apiRoutes";
import { VideoPlaybackSampleDTO } from "../models/shared_models/VideoPlaybackSampleDTO";
import { VideoSamplingResultDTO } from "../models/shared_models/VideoSamplingResultDTO";
import { httpPostAsync, usePostData } from "./core/httpClient";

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

    // descriptor code is not sent but is to trigger updates
    if (isEnabled)
        console.log("getting " + descriptorCode);

    const qr = useReactQuery<CourseItemDTO[]>(
        ["getCorseItemsList", descriptorCode, isEnabled],
        () => httpPostAsync(`player/get-course-items`),
        isEnabled);

    return {
        courseItemList: qr.data as CourseItemDTO[] ?? [],
        courseItemListStatus: qr.status,
        courseItemListError: qr.error,
        refetchCourseItemList: qr.refetch
    }
}

export const usePostVideoPlaybackSample = () => {

    const qr = usePostData<VideoPlaybackSampleDTO, VideoSamplingResultDTO>("player/save-video-playback-sample");

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