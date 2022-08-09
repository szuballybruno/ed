import { apiRoutes } from '../../shared/types/apiRoutes';
import { VideoRatingDTO } from '../../shared/dtos/VideoRatingDTO';
import { useReactQuery2 } from '../../static/frontendHelpers';
import { usePostDataUnsafe } from '../core/httpClient';
import { Id } from '../../shared/types/versionId';

export const useRateVideoDifficulty = () => {

    const qr = usePostDataUnsafe<VideoRatingDTO, void>(apiRoutes.videoRating.rateVideoDifficulty);

    return {
        rateVideoDifficultyAsync: qr.postDataAsync
    };
};

export const useRateVideoExperience = () => {

    const qr = usePostDataUnsafe<VideoRatingDTO, void>(apiRoutes.videoRating.rateVideoExperience);

    return {
        rateVideoExperienceAsync: qr.postDataAsync
    };
};

export const useVideoRating = (videoVersionId: Id<'VideoVersion'>) => {

    const qr = useReactQuery2<VideoRatingDTO>(apiRoutes.videoRating.getVideoRating, { videoVersionId });

    return {
        videoRating: qr.data,
        refetchVideoRating: qr.refetch
    };
};