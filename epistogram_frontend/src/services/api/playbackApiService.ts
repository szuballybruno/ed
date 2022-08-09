import { VideoPlaybackSampleDTO } from '../../shared/dtos/playback/VideoPlaybackSampleDTO';
import { VideoSeekEventDTO } from '../../shared/dtos/playback/VideoSeekEventDTO';
import { VideoSamplingResultDTO } from '../../shared/dtos/VideoSamplingResultDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { usePostData } from '../core/httpClient';

export const PlaybackApiService = {

    usePostVideoPlaybackSample: () => {

        const qr = usePostData<VideoPlaybackSampleDTO, VideoSamplingResultDTO>(apiRoutes.playback.saveVideoPlaybackSample);

        return {
            postVideoPlaybackSample: qr.postDataAsync,
            videoSamplingResult: qr.result
        };
    },

    usePostVideoSeekEvent: () => {

        const qr = usePostData<VideoSeekEventDTO, VideoSamplingResultDTO>(apiRoutes.playback.saveVideoSeekEvent);

        return {
            postVideoSeekEvent: qr.postDataAsync
        };
    }
};