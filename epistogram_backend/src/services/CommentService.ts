import { Comment } from '../models/entity/Comment';
import { User } from '../models/entity/User';
import { CommentListView } from '../models/views/CommentListView';
import { CommentCreateDTO } from '../shared/dtos/CommentCreateDTO';
import { CommentListDTO } from '../shared/dtos/CommentListDTO';
import { PrincipalId } from '../utilities/ActionParams';
import { throwNotImplemented } from '../utilities/helpers';
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
            throw new Error('Wrong item type!');

        // TODO itemId - itemversionid mismatch
        throwNotImplemented();

        const newComment = {
            isAnonymous: isAnonymous,
            isQuestion: isQuestion,
            text: text,
            userId: userId,
            parentCommentId: replyToCommentId,
            videoVersionId: itemId
        } as Comment;

        return await this._ormService
            .createAsync(Comment, newComment);
    };

    getCommentsAsync = async (playlistItemCode: string, currentUserId: PrincipalId) => {

        const { itemId, itemType } = readItemCode(playlistItemCode);
        if (itemType !== 'video')
            throw new Error('Wrong item type!');

        const userComments = await this._ormService
            .query(CommentListView, { videoId: itemId, currentUserId })
            .where('videoId', '=', 'videoId')
            .and('currentUserId', '=', 'currentUserId')
            .getMany();

        return await this
            ._mapperService
            .mapMany(CommentListView, CommentListDTO, userComments);
    };
}