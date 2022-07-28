import { Comment } from '../models/entity/Comment';
import { Like } from '../models/entity/Like';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { AuthorizationService } from './AuthorizationService';
import { MapperService } from './MapperService';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class LikeService extends QueryServiceBase<Like> {

    private _authorizationService: AuthorizationService

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService,
        authorizationService: AuthorizationService) {

        super(mapperService, ormService, Like);

        this._authorizationService = authorizationService
    }

    // create like with current user
    createUserCommentLikeBridgeAsync(
        principalId: PrincipalId,
        commentId: Id<'Comment'>
    ) {

        return {
            action: async () => {

                const userId = principalId.getId();

                // check if comment exists
                const comment = await this
                    ._ormService
                    .query(Comment, { commentId })
                    .where('id', '=', 'commentId')
                    .getOneOrNull();

                if (!comment)
                    throw new Error('Comment doesn\'t exist.');

                // check if user already liked the comment
                const userComment = await this
                    ._ormService
                    .query(Like, { currentUserId: userId, commentId })
                    .where('commentId', '=', 'commentId')
                    .and('userId', '=', 'currentUserId')
                    .getOneOrNull();

                if (userComment)
                    throw new Error('This user already liked this comment.');

                await this
                    ._ormService
                    .createAsync(Like, {
                        commentId: commentId,
                        userId: userId
                    } as Like);
            },
            auth: async () => {

                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_APPLICATION');
            }
        }
    }

    // delete like with current user
    softDeleteUserCommentLikeBridgeAsync(
        principalId: PrincipalId,
        commentId: Id<'Comment'>
    ) {

        return {
            action: async () => {

                const userComment = await this
                    ._ormService
                    .query(Like, { principalId, commentId })
                    .where('commentId', '=', 'commentId')
                    .and('userId', '=', 'principalId')
                    .getOneOrNull();

                if (!userComment)
                    throw new Error('This user haven\'t liked this comment yet.');

                await this
                    ._ormService
                    .softDelete(Like, [userComment.id]);
            },
            auth: async () => {

                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_APPLICATION');
            }
        }
    }
}