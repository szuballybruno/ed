import { CommentService } from '../services/CommentService';
import { readItemCode } from '../services/misc/encodeService';
import { CommentCreateDTO } from '../shared/dtos/CommentCreateDTO';
import { CommentListDTO } from '../shared/dtos/CommentListDTO';
import { ActionParams } from '../utilities/helpers';

export class CommentController {

    private _commentService: CommentService;

    constructor(commentService: CommentService) {

        this._commentService = commentService;
    }

    createCommentAction = async (params: ActionParams) => {

        const dto = params
            .getBody<CommentCreateDTO>()
            .data;

        return this
            ._commentService
            .createCommentAsync(
                dto,
            );
    };

    getCommentsAction = async (params: ActionParams) => {

        const itemCode = params
            .getQuery<{ itemCode: string }>()
            .getValue(x => x.itemCode, 'string');

        const itemCodeData = readItemCode(itemCode);

        return this
            ._commentService
            .getCommentsAsync(
                itemCodeData.itemType === 'video'
                    ? itemCodeData.itemId
                    : 0);
    };
}