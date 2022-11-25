import { CommentService } from '@episto/server-services';
import { LikeService } from '@episto/server-services';
import { CommentCreateDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { ActionParams } from '../XTurboExpress/ActionParams';
import { XControllerAction } from '../XTurboExpress/XTurboExpressDecorators';
import { ServiceProvider } from '../startup/ServiceProvider';
import { Id } from '@episto/commontypes';
import { XController } from '../XTurboExpress/XTurboExpressTypes';

export class CommentController implements XController<CommentController> {

    private _commentService: CommentService;
    private _userCommentBridgeService: LikeService;

    constructor(serviceProvider: ServiceProvider) {

        this._commentService = serviceProvider.getService(CommentService);
        this._userCommentBridgeService = serviceProvider.getService(LikeService);
    }

    /**
     * Create new comment
     */
    @XControllerAction(apiRoutes.comment.createComment, { isPost: true })
    createCommentAction(params: ActionParams) {

        const dto = params
            .getBody<CommentCreateDTO>()
            .data;

        return this
            ._commentService
            .createCommentAsync(params.principalId, dto);
    }

    /**
     * Create new like/vote for a comment
     */
    @XControllerAction(apiRoutes.comment.createLike, { isPost: true })
    createUserCommentBridgeAction(params: ActionParams) {

        const principalId = params.principalId;

        const commentId = Id
            .create<'Comment'>(params
                .getBody<{ commentId: number }>()
                .getValue(x => x.commentId, 'int'));

        return this
            ._userCommentBridgeService
            .createUserCommentLikeBridgeAsync(principalId, commentId);
    }

    /**
     * Get all comments for video
     */
    @XControllerAction(apiRoutes.comment.getComments)
    getCommentsAction(params: ActionParams) {

        const principalId = params.principalId;

        const itemCode = params
            .getQuery<{ itemCode: string }>()
            .getValue((x) => x.itemCode, 'string');

        return this
            ._commentService
            .getCommentsAsync(itemCode, principalId);
    }

    /**
     * Delete like/vote for a comment
     */
    @XControllerAction(apiRoutes.comment.deleteLike, { isPost: true })
    softDeleteUserCommentBridgeAction(params: ActionParams) {

        const principalId = params.principalId;

        const commentId = Id
            .create<'Comment'>(params
                .getBody<{ commentId: number }>()
                .getValue(x => x.commentId, 'int'));

        return this
            ._userCommentBridgeService
            .softDeleteUserCommentLikeBridgeAsync(principalId, commentId);
    }
}