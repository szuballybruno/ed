import { Comment } from '../models/entity/Comment';
import { User } from '../models/entity/User';
import { CommentListView } from '../models/views/CommentListView';
import { CommentCreateDTO } from '../shared/dtos/CommentCreateDTO';
import { CommentListDTO } from '../shared/dtos/CommentListDTO';
import { PrincipalId } from '../utilities/ActionParams';
import { MapperService } from './MapperService';
import { readItemCode } from './misc/encodeService';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import {Like} from "../models/entity/Like";
import {instatiateInsertEntity} from "../utilities/misc";

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

        const itemCodeData = readItemCode(itemCode);

        const videoId = itemCodeData.itemType === 'video'
            ? itemCodeData.itemId
            : 0;

        const allComment = this._ormService.getRepository(Comment);
        const commentWithHighestGroupId = await allComment
            .createQueryBuilder('comment')
            .orderBy('comment.group_id', "DESC")
            .limit(1)
            .getOne();

        const highestGroupId = (commentWithHighestGroupId?.groupId) ? (commentWithHighestGroupId?.groupId) + 1 : 0;

        const newComment = {
            isAnonymous: isAnonymous,
            isQuestion: isQuestion,
            text: text,
            userId: userId,
            parentCommentId: replyToCommentId,
            videoId: videoId,
            groupId: highestGroupId,
        };

        return await this
            ._ormService
            .getRepository(Comment)
            .insert(newComment);
    };

    updateCommentAsync = async (comment: CommentListDTO, currentUserId: PrincipalId) => {

        //TODO: Check if the user have a permission not because he owns the comment but he is administrator.
        /*if (currentUserId as unknown as number !== comment.userId) {
            throw new Error("This comment is not owned by the current user.");
        }*/

        const commentAddToGroup = await this
            ._ormService
            .query(Comment, { commentId: comment.id })
            .where('id', '=', 'commentId')
            .getOneOrNull();

        const newGroupComment = {
            ...commentAddToGroup,
            text: comment.commentText,
        }

        if (!newGroupComment)
            throw new Error('This user haven\'t liked this comment yet.');

        await this
            ._ormService
            .getRepository(Comment)
            .insert(newGroupComment);

        return newGroupComment;
    };

    getCommentsAsync = async (videoId: number, currentUserId: PrincipalId) => {

        const userComments = await this
            ._ormService
            .getRepository(CommentListView)
            .createQueryBuilder('clv')
            .where('clv.videoId = :videoId', { videoId })
            .andWhere('clv.currentUserId = :currentUserId', { currentUserId: currentUserId.toSQLValue() })
            .distinctOn(['clv.groupId'])
            .getMany();

        return this
            ._mapperService
            .mapMany(CommentListView, CommentListDTO, userComments);
    };
}