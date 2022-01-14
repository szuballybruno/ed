import { apiRoutes } from "../../models/shared_models/types/apiRoutes"
import { VideoRatingDTO } from "../../models/shared_models/VideoRatingDTO";
import { useReactQuery2 } from "../../static/frontendHelpers";
import { usePostDataUnsafe } from "../core/httpClient"

export const useRateVideoDifficulty = () => {

    const qr = usePostDataUnsafe<VideoRatingDTO, void>(apiRoutes.videoRating.rateVideoDifficulty);

    return {
        rateVideoDifficultyAsync: qr.postDataAsync
    }
}

export const useRateVideoExperience = () => {

    const qr = usePostDataUnsafe<VideoRatingDTO, void>(apiRoutes.videoRating.rateVideoExperience);

    return {
        rateVideoExperienceAsync: qr.postDataAsync
    }
}

export const useVideoRating = (videoId: number) => {

    const qr = useReactQuery2<VideoRatingDTO>(apiRoutes.videoRating.getVideoRating, { videoId });

    return {
        videoRating: qr.data,
        refetchVideoRating: qr.refetch
    }
}