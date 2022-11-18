import { CommentCreateDTO } from '@episto/communication';
import { CommentListDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { QueryService } from '../../static/XQuery/XQueryReact';
import { usePostDataUnsafe } from '../core/httpClient';

export const useCreateComment = () => {

    const qr = usePostDataUnsafe<CommentCreateDTO, void>(apiRoutes.comment.createComment);

    return {
        createCommentAsync: qr.postDataAsync,
        createCommentState: qr.state
    };
};

export const useCreateLike = () => {

    const qr = usePostDataUnsafe<{ commentId: Id<'Comment'> }, void>(apiRoutes.comment.createLike);

    return {
        createLikeAsync: qr.postDataAsync,
        createLikeState: qr.state
    };
};

export const useDeleteLike = () => {

    const qr = usePostDataUnsafe<{ commentId: Id<'Comment'> }, void>(apiRoutes.comment.deleteLike);

    return {
        deleteLikeAsync: qr.postDataAsync,
        deleteLikeState: qr.state
    };
};

export const useComments = (itemCode: string) => {

    const qr = QueryService.useXQuery<CommentListDTO[]>(apiRoutes.comment.getComments, { itemCode });

    return {
        comments: qr.data ?? [],
        commentsState: qr.state,
        commentsError: qr.error,
        refetchComments: qr.refetch
    };
};