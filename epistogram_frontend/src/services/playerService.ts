import { useReactQuery } from "../frontendHelpers";
import { CourseItemDTO } from "../models/shared_models/CourseItemDTO";
import { PlayerDataDTO } from "../models/shared_models/PlayerDataDTO";
import { VideoPlaybackSampleDTO } from "../models/shared_models/VideoPlaybackSampleDTO";
import { VideoSamplingResultDTO } from "../models/shared_models/VideoSamplingResultDTO";
import { httpPostAsync, usePostData } from "./httpClient";

export const usePlayerData = (descriptorCode: string) => {

    const qr = useReactQuery<PlayerDataDTO>(
        ["getPlayerData", descriptorCode],
        () => httpPostAsync(`player/get-player-data?descriptorCode=${descriptorCode}`));

    return {
        playerData: qr.data,
        playerDataStatus: qr.status,
        playerDataError: qr.error,
        refetchPlayerData: qr.refetch
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