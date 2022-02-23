import { VideoPlaybackSampleDTO } from "../../shared/dtos/VideoPlaybackSampleDTO";
import { VideoSamplingResultDTO } from "../../shared/dtos/VideoSamplingResultDTO";
import { apiRoutes } from "../../shared/types/apiRoutes";
import { usePostData } from "../core/httpClient";

export const usePostVideoPlaybackSample = () => {

    const qr = usePostData<VideoPlaybackSampleDTO, VideoSamplingResultDTO>(apiRoutes.playback.saveVideoPlaybackSample);

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