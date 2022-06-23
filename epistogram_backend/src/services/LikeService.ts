import { Comment } from '../models/entity/Comment';
import { Like } from '../models/entity/Like';
import { PrincipalId } from '../utilities/ActionParams';
import { MapperService } from './MapperService';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class LikeService extends QueryServiceBase<Like> {

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService) {

        super(mapperService, ormService, Like);
    }

    // create like with current user
    async createUserCommentLikeBridgeAsync(
        currentUserId: PrincipalId,
        commentId: number
    ) {

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
            .query(Like, { currentUserId: currentUserId.toSQLValue(), commentId })
            .where('commentId', '=', 'commentId')
            .and('userId', '=', 'currentUserId')
            .getOneOrNull();

        if (userComment)
            throw new Error('This user already liked this comment.');

        await this
            ._ormService
            .createAsync(Like, {
                commentId: commentId,
                userId: currentUserId.toSQLValue()
            } as Like);
    }

    // delete like with current user
    async softDeleteUserCommentLikeBridgeAsync(
        currentUserId: PrincipalId,
        commentId: number
    ) {
        const userComment = await this
            ._ormService
            .query(Like, { currentUserId: currentUserId.toSQLValue(), commentId })
            .where('commentId', '=', 'commentId')
            .and('userId', '=', 'currentUserId')
            .getOneOrNull();

        if (!userComment)
            throw new Error('This user haven\'t liked this comment yet.');

        await this
            ._ormService
            .softDelete(Like, [userComment.id]);
    }
}