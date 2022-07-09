import { Comment } from '../models/entity/Comment';
import { CommentListView } from '../models/views/CommentListView';
import { LatestVideoView } from '../models/views/LatestVideoView';
import { CommentCreateDTO } from '../shared/dtos/CommentCreateDTO';
import { CommentListDTO } from '../shared/dtos/CommentListDTO';
import { instantiate } from '../shared/logic/sharedLogic';
import { PrincipalId } from '../utilities/ActionParams';
import { InsertEntity } from '../utilities/misc';
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

        const latestVideoVersion = await this._ormService
            .query(LatestVideoView, { itemId })
            .where('videoId', '=', 'itemId')
            .getSingle();

        if (!latestVideoVersion.videoVersionId)
            throw new Error('Video not found')

        const newComment = instantiate<InsertEntity<Comment>>({
            isAnonymous: isAnonymous,
            isQuestion: isQuestion,
            deletionDate: null,
            creationDate: new Date(Date.now()),
            text: text,
            userId: userId,
            parentCommentId: replyToCommentId,
            videoVersionId: latestVideoVersion.videoVersionId
        });

        await this._ormService
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

        return this
            ._mapperService
            .mapTo(CommentListDTO, [userComments]);
    };
}