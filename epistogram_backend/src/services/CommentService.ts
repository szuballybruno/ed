import { Comment } from '../models/entity/Comment';
import { CommentListView } from '../models/views/CommentListView';
import { CommentCreateDTO } from '../shared/dtos/CommentCreateDTO';
import { CommentListDTO } from '../shared/dtos/CommentListDTO';
import { PrincipalId } from '../utilities/ActionParams';
import { MapperService } from './MapperService';
import { readItemCode } from './misc/encodeService';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class CommentService extends QueryServiceBase<Comment> {

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService) {

        super(mapperService, ormService, Comment);
    }

    createCommentAsync = async (comment: CommentCreateDTO) => {

        const {
            text,
            itemCode,
            isAnonymous,
            isQuestion,
            replyToCommentId,
            userId
        } = comment;

        const { itemId, itemType } = readItemCode(itemCode);
        if (itemType !== 'video')
            throw new Error('Item is not video!');

        const commentWithHighestGroupId = await this._ormService
            .getRepository(Comment)
            .createQueryBuilder('c')
            .orderBy('c.group_id', "DESC")
            .limit(1)
            .getOne();

        const highestGroupId = commentWithHighestGroupId?.groupId
            ? commentWithHighestGroupId?.groupId + 1
            : 0;

        return await this
            ._ormService
            .createAsync(Comment, {
                isAnonymous: isAnonymous,
                isQuestion: isQuestion,
                text: text,
                userId: userId,
                parentCommentId: replyToCommentId,
                videoId: itemId,
                groupId: highestGroupId,
                creationDate: new Date(),
                deletionDate: null
            });
    };

    updateCommentAsync = async (comment: CommentListDTO, currentUserId: PrincipalId) => {

        //TODO: Check if the user have a permission not because he owns the comment but he is administrator.
        /*if (currentUserId as unknown as number !== comment.userId) {
            throw new Error("This comment is not owned by the current user.");
        }*/

        // TODO

        // const commentAddToGroup = await this
        //     ._ormService
        //     .query(Comment, { commentId: comment.commentId })
        //     .where('id', '=', 'commentId')
        //     .getOneOrNull();

        // const newGroupComment = {
        //     ...commentAddToGroup,
        //     text: comment.commentText,
        // }

        // if (!newGroupComment)
        //     throw new Error('This user haven\'t liked this comment yet.');

        // await this
        //     ._ormService
        //     .getRepository(Comment)
        //     .insert(newGroupComment);

        // return newGroupComment;
    };

    getCommentsAsync = async (videoId: number, currentUserId: PrincipalId) => {

        const userComments = await this
            ._ormService
            .query(CommentListView, { videoId, currentUserId })
            .where('videoId', '=', 'videoId')
            .and('currentUserId', '=', 'currentUserId')
            .getMany();

        return this
            ._mapperService
            .mapTo(CommentListDTO, [userComments]);
    };
}