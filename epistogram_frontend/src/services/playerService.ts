import { useReactQuery } from "../frontendHelpers";
import { PlayerDataDTO } from "../models/shared_models/PlayerDataDTO";
import { VideoPlaybackSampleDTO } from "../models/shared_models/VideoPlaybackSampleDTO";
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

export const usePostVideoPlaybackSample = () => {

    const qr = usePostData<VideoPlaybackSampleDTO, void>("player/save-video-playback-sample");

    const postVideoPlaybackSampleAsync = (fromPlayedSeconds: number, toPlayedSeconds: number) => {

        return qr.postDataAsync({
            fromSeconds: fromPlayedSeconds,
            toSeconds: toPlayedSeconds
        });
    }

    return {
        postVideoPlaybackSampleAsync
    }
}