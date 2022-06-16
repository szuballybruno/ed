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
            userId,
            parentCommentId,
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

        await this
            ._ormService
            .createAsync(Comment, newComment);

        return newComment;
    }

    updateCommentAsync = async (comment: CommentListDTO, currentUserId: PrincipalId) => {

        const commentAddToGroup = await this
            ._ormService
            .query(Comment, { commentId: comment.commentId })
            .where('id', '=', 'commentId')
            .getOneOrNull();

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
    };

    getCommentsAsync = async (videoId: number, currentUserId: PrincipalId) => {

        const userComments = await this
            ._ormService
            .query(CommentListView, { videoId })
            .where('videoId', '=', 'videoId')
            .getMany();

        return this
            ._mapperService
            .mapTo(CommentListDTO, [userComments]);
    };
}