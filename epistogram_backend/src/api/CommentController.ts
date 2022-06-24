import { CommentService } from '../services/CommentService';
import { readItemCode } from '../services/misc/encodeService';
import { LikeService } from '../services/LikeService';
import { CommentCreateDTO } from '../shared/dtos/CommentCreateDTO';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class CommentController {

    private _commentService: CommentService;
    private _userCommentBridgeService: LikeService;

    constructor(
        commentService: CommentService,
        userCommentBridgeService: LikeService
    ) {
        this._commentService = commentService;
        this._userCommentBridgeService = userCommentBridgeService;
    }

    /**
     * Create new comment
     */
    @XControllerAction(apiRoutes.comment.createComment, { isPost: true })
    createCommentAction = async (params: ActionParams) => {

        const dto = params
            .getBody<CommentCreateDTO>()
            .data;

        return this
            ._commentService
            .createCommentAsync(dto);
    };

    /**
     * Create new like/vote for a comment
     */
    @XControllerAction(apiRoutes.comment.createLike, { isPost: true })
    createUserCommentBridgeAction = async (params: ActionParams) => {

        const principalId = params.principalId;

        const commentId = params
            .getBody<{ commentId: number }>()
            .getValue(x => x.commentId, 'int');

        return this
            ._userCommentBridgeService
            .createUserCommentLikeBridgeAsync(principalId, commentId);
    };

    /**
     * Get all comments for video
     */
    @XControllerAction(apiRoutes.comment.getComments)
    getCommentsAction = async (params: ActionParams) => {

        const principalId = params.principalId;

        const itemCode = params
            .getQuery<{ itemCode: string }>()
            .getValue((x) => x.itemCode, 'string');

        return this
            ._commentService
            .getCommentsAsync(itemCode, principalId);
    };

    /**
     * Delete like/vote for a comment
     */
    @XControllerAction(apiRoutes.comment.deleteLike, { isPost: true })
    softDeleteUserCommentBridgeAction = async (params: ActionParams) => {

        const principalId = params.principalId;

        const commentId = params
            .getBody<{ commentId: number }>()
            .getValue(x => x.commentId, 'int');

        return this
            ._userCommentBridgeService
            .softDeleteUserCommentLikeBridgeAsync(principalId, commentId);
    };
}