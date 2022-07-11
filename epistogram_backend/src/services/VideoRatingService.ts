import { User } from '../models/entity/User';
import { VideoVersion } from '../models/entity/video/VideoVersion';
import { VideoRating } from '../models/entity/VideoRating';
import { VideoRatingDTO } from '../shared/dtos/VideoRatingDTO';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/ActionParams';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class VideoRatingService {

    private _ormService: ORMConnectionService;

    constructor(ormService: ORMConnectionService) {

        this._ormService = ormService;
    }

    async rateVideoExperienceAsync(principalId: PrincipalId, dto: VideoRatingDTO) {

        const userId = Id
            .create<'User'>(principalId.toSQLValue());

        const existingRating = await this._ormService
            .query(VideoRating, {
                userId: userId,
                videoVersionId: dto.videoVersionId
            })
            .where('userId', '=', 'userId')
            .and('videoVersionId', '=', 'videoVersionId')
            .getOneOrNull();

        this._ormService
            .saveOrInsertAsync(VideoRating, {
                id: existingRating ? existingRating.id : undefined,
                experience: dto.experience,
                userId,
                videoVersionId: dto.videoVersionId
            });
    }

    async rateVideoDifficultyAsync(principalId: PrincipalId, dto: VideoRatingDTO) {

        const userId = Id
            .create<'User'>(principalId.toSQLValue());

        const existingRating = await this._ormService
            .query(VideoRating, {
                userId: userId,
                videoVersionId: dto.videoVersionId
            })
            .where('userId', '=', 'userId')
            .and('videoVersionId', '=', 'videoVersionId')
            .getOneOrNull();

        this._ormService
            .saveOrInsertAsync(VideoRating, {
                id: existingRating
                    ? existingRating.id
                    : undefined,
                difficulty: dto.difficulty,
                userId,
                videoVersionId: dto.videoVersionId
            });
    }

    async getVideoRatingAsync(principalId: PrincipalId, videoVersionId: Id<'VideoVersion'>) {

        const userId = Id
            .create<'User'>(principalId.toSQLValue());

        const rating = await this._ormService
            .query(VideoRating, {
                userId: userId,
                videoVersionId: videoVersionId
            })
            .where('userId', '=', 'userId')
            .and('videoVersionId', '=', 'videoVersionId')
            .getOneOrNull();

        return {
            difficulty: rating?.difficulty ?? null,
            experience: rating?.experience ?? null
        } as VideoRatingDTO;
    }
}