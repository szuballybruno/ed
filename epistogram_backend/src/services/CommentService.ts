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
            userId,
            parentCommentId,
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

<<<<<<< HEAD
        const highestGroupId = commentWithHighestGroupId?.groupId
            ? commentWithHighestGroupId?.groupId + 1
            : 0;
=======
        const highestGroupId = (commentWithHighestGroupId?.groupId) ? (commentWithHighestGroupId?.groupId) + 1 : 0;

        const newComment = {
            isAnonymous,
            isQuestion,
            text,
            userId,
            parentCommentId: parentCommentId ? parentCommentId : replyToCommentId,
            videoId: videoId,
            creationDate: new Date(),
            deletionDate: null,
            groupId: highestGroupId,
        };
>>>>>>> 5e0dea96e2187db8135af4a98cc7e359742e7d0a

        await this
            ._ormService
<<<<<<< HEAD
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
=======
            .createAsync(Comment, newComment);
>>>>>>> 5e0dea96e2187db8135af4a98cc7e359742e7d0a

        return newComment;
    }

    updateCommentAsync = async (comment: CommentListDTO, currentUserId: PrincipalId) => {

        // TODO

<<<<<<< HEAD
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
=======
        const commentGroupId = commentAddToGroup?.groupId ? commentAddToGroup?.groupId : 0;

        const updatedComment = {
            ...commentAddToGroup,
            text: comment.commentText,
            groupId: commentGroupId,
        } as Comment

        await this
            ._ormService
            .getRepository(Comment)
            .insert(updatedComment);

        return updatedComment;
>>>>>>> 5e0dea96e2187db8135af4a98cc7e359742e7d0a
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