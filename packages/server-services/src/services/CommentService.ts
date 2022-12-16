import { Comment } from '../models/tables/Comment';
import { CommentListView } from '../models/views/CommentListView';
import { LatestVideoView } from '../models/views/LatestVideoView';
import { CommentCreateDTO } from '@episto/communication';
import { CommentListDTO } from '@episto/communication';
import { instantiate } from '@episto/commonlogic';
import { PrincipalId } from '@episto/x-core';
import { InsertEntity } from '../utilities/misc';
import { MapperService } from './MapperService';
import { readItemCode } from './misc/encodeService';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { AuthorizationService } from './AuthorizationService';

export class CommentService extends QueryServiceBase<Comment> {

    private _authorizationService: AuthorizationService;

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService,
        authorizationService: AuthorizationService) {

        super(mapperService, ormService, Comment);

        this._authorizationService = authorizationService;
    }

    async createCommentAsync(principalId: PrincipalId, comment: CommentCreateDTO) {

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
            throw new Error('Video not found');

        const newComment = instantiate<InsertEntity<Comment>>({
            isAnonymous: isAnonymous,
            isQuestion: isQuestion,
            deletionDate: null,
            creationDate: new Date(Date.now()),
            text: text,
            userId: userId,
            parentCommentId: replyToCommentId,
            videoVersionId: latestVideoVersion.videoVersionId,
            videoId: latestVideoVersion.videoId
        });

        await this._ormService
            .createAsync(Comment, newComment);
    }

    async getCommentsAsync(playlistItemCode: string, principalId: PrincipalId) {

        const { itemId, itemType } = readItemCode(playlistItemCode);

        if (itemType !== 'video')
            throw new Error('Wrong item type!');

        const userComments = await this._ormService
            .query(CommentListView, { videoId: itemId, principalId })
            .where('videoId', '=', 'videoId')
            .and('currentUserId', '=', 'principalId')
            .getMany();

        return this
            ._mapperService
            .mapTo(CommentListDTO, [userComments]);
    }
}