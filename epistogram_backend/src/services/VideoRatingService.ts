import { VideoRating } from '../models/entity/VideoRating';
import { VideoRatingDTO } from '../shared/dtos/VideoRatingDTO';
import { PrincipalId } from '../utilities/ActionParams';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class VideoRatingService {

    private _ormService: ORMConnectionService;

    constructor(ormService: ORMConnectionService) {

        this._ormService = ormService;
    }

    async rateVideoExperienceAsync(principalId: PrincipalId, dto: VideoRatingDTO) {

        const userId = principalId.toSQLValue();

        const existingRating = await this._ormService
            .getRepository(VideoRating)
            .findOne({
                where: {
                    videoId: dto.videoId,
                    userId
                }
            });

        this._ormService
            .getRepository(VideoRating)
            .save({
                id: existingRating ? existingRating.id : undefined,
                experience: dto.experience,
                userId,
                videoId: dto.videoId
            });
    }

    async rateVideoDifficultyAsync(principalId: PrincipalId, dto: VideoRatingDTO) {

        const userId = principalId.toSQLValue();

        const existingRating = await this._ormService
            .getRepository(VideoRating)
            .findOne({
                where: {
                    videoId: dto.videoId,
                    userId
                }
            });

        this._ormService
            .getRepository(VideoRating)
            .save({
                id: existingRating ? existingRating.id : undefined,
                difficulty: dto.difficulty,
                userId,
                videoId: dto.videoId
            });
    }

    async getVideoRatingAsync(principalId: PrincipalId, videoId: number) {

        const userId = principalId.toSQLValue();

        const rating = await this._ormService
            .getRepository(VideoRating)
            .findOne({
                where: {
                    userId,
                    videoId
                }
            });

        return {
            difficulty: rating?.difficulty ?? null,
            experience: rating?.experience ?? null
        } as VideoRatingDTO;
    }
}