import { Comment } from '../models/entity/Comment';
import { CommentDTO } from '../shared/dtos/CommentDTO';
import { MapperService } from './MapperService';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class CommentService extends QueryServiceBase<Comment> {

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService
    ) {
        super(mapperService, ormService, Comment);
    }

    async createCommentAsync(comment: CommentDTO) {

        const {
            text,
            isAnonymous,
            isQuestion,
            userId,
            videoId
        } = comment;

        const newComment = {
            isAnonymous: isAnonymous,
            isQuestion: isQuestion,
            text: text,
            userId: userId,
            videoId: videoId
        } as Comment;

        await this.createAsync(newComment);
    }

    getCommentsAsync = async (videoId: number) => {

        return await this
            ._ormService
            .query(Comment, { videoId })
            .where('videoId', '=', 'videoId')
            .getMany();
    };
}