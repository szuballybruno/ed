import { VideoPlaybackSampleDTO } from '@episto/communication';
import { VideoSeekEventDTO } from '@episto/communication';
import { VideoSamplingResultDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { usePostDataUnsafe } from '../core/httpClient';

export const PlaybackApiService = {

    usePostVideoPlaybackSample: () => {

        const qr = usePostDataUnsafe<VideoPlaybackSampleDTO, VideoSamplingResultDTO>(apiRoutes.playback.saveVideoPlaybackSample);

        return {
            postVideoPlaybackSample: qr.postDataAsync,
            videoSamplingResult: qr.result
        };
    },

    usePostVideoSeekEvent: () => {

        const qr = usePostDataUnsafe<VideoSeekEventDTO, VideoSamplingResultDTO>(apiRoutes.playback.saveVideoSeekEvent);

        return {
            postVideoSeekEvent: qr.postDataAsync
        };
    }
};