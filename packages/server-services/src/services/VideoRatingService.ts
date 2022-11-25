import { VideoRating } from '../models/entity/misc/VideoRating';
import { VideoRatingDTO } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { PrincipalId } from '@episto/xcore';
import { AuthorizationService } from './AuthorizationService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class VideoRatingService {

    private _ormService: ORMConnectionService;
    private _authorizationService: AuthorizationService;

    constructor(ormService: ORMConnectionService, authorizationService: AuthorizationService) {

        this._ormService = ormService;
        this._authorizationService = authorizationService;
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

        await this._ormService
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

        await this._ormService
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