import { VideoRating } from '../models/entity/misc/VideoRating';
import { VideoRatingDTO } from '../shared/dtos/VideoRatingDTO';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { AuthorizationService } from './AuthorizationService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class VideoRatingService {

    private _ormService: ORMConnectionService;
    private _authorizationService: AuthorizationService;

    constructor(ormService: ORMConnectionService, authorizationService: AuthorizationService) {

        this._ormService = ormService;
        this._authorizationService = authorizationService;
    }

    rateVideoExperienceAsync(principalId: PrincipalId, dto: VideoRatingDTO) {

        return {
            action: async () => {

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
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ACCESS_APPLICATION');
            }
        };

    }

    rateVideoDifficultyAsync(principalId: PrincipalId, dto: VideoRatingDTO) {

        return {
            action: async () => {
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
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ACCESS_APPLICATION');
            }
        };


    }

    getVideoRatingAsync(principalId: PrincipalId, videoVersionId: Id<'VideoVersion'>) {

        return {
            action: async () => {
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
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ACCESS_APPLICATION');
            }
        };
    }
}