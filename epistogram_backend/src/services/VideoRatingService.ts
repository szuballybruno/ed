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
            .query(VideoRating, {
                userId: userId,
                videoVersionId: dto.videoId //TODO videoversionid
            })
            .where('userId', '=', 'userId')
            .and('videoVersionId', '=', 'videoVersionId')
            .getSingle();

        this._ormService
            .save(VideoRating, {
                id: existingRating ? existingRating.id : undefined,
                experience: dto.experience,
                userId,
                videoVersionId: dto.videoId //TODO videoversionid
            });
    }

    async rateVideoDifficultyAsync(principalId: PrincipalId, dto: VideoRatingDTO) {

        const userId = principalId.toSQLValue();

        const existingRating = await this._ormService
            .query(VideoRating, {
                userId: userId,
                videoVersionId: dto.videoId //TODO videoversionid
            })
            .where('userId', '=', 'userId')
            .and('videoVersionId', '=', 'videoVersionId')
            .getSingle();

        this._ormService
            .save(VideoRating, {
                id: existingRating
                    ? existingRating.id
                    : undefined,
                difficulty: dto.difficulty,
                userId,
                videoVersionId: dto.videoId
            });
    }

    async getVideoRatingAsync(principalId: PrincipalId, videoId: number) {

        const userId = principalId.toSQLValue();

        const rating = await this._ormService
            .query(VideoRating, {
                userId: userId,
                videoVersionId: videoId //TODO videoversionid
            })
            .where('userId', '=', 'userId')
            .and('videoVersionId', '=', 'videoVersionId')
            .getSingle();

        return {
            difficulty: rating?.difficulty ?? null,
            experience: rating?.experience ?? null
        } as VideoRatingDTO;
    }
}