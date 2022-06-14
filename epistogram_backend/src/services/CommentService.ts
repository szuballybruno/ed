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

        const newComment = {
            isAnonymous: isAnonymous,
            isQuestion: isQuestion,
            text: text,
            userId: userId,
            parentCommentId: replyToCommentId,
            videoVersionId: videoId
        } as Comment;

        return await this
            ._ormService
            .getRepository(Comment)
            .insert(newComment);
    };

    getCommentsAsync = async (videoId: number, currentUserId: PrincipalId) => {

        const userComments = await this
            ._ormService
            .getRepository(CommentListView)
            .createQueryBuilder('clv')
            .where('clv.videoId = :videoId', { videoId })
            .andWhere('clv.currentUserId = :currentUserId', { currentUserId: currentUserId.toSQLValue() })
            .getMany();

        return await this
            ._mapperService
            .mapMany(CommentListView, CommentListDTO, userComments);
    };
}