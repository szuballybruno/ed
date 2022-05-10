import { CommentService } from '../services/CommentService';
import { CommentDTO } from '../shared/dtos/CommentDTO';
import { ActionParams } from '../utilities/helpers';

export class CommentController {

    private _commentService: CommentService;

    constructor(commentService: CommentService) {

        this._commentService = commentService;
    }

    async createCommentAction(params: ActionParams) {

        const dto = params
            .getBody<CommentDTO>()
            .data;

        await this._commentService.createCommentAsync(dto);
    }

    async getCommentsAction(params: ActionParams) {

        const videoId = params
            .getQuery<{ videoId: number }>()
            .getValue(x => x.videoId, 'int');

        await this._commentService.getCommentsAsync(videoId);
    }
}