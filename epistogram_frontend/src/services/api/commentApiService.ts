import { CommentCreateDTO } from '../../shared/dtos/CommentCreateDTO';
import { CommentListDTO } from '../../shared/dtos/CommentListDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { useReactQuery2 } from '../../static/frontendHelpers';
import { usePostDataUnsafe } from '../core/httpClient';

export const useCreateComment = () => {

    const qr = usePostDataUnsafe<CommentCreateDTO, void>(apiRoutes.comment.createComment);

    return {
        createCommentAsync: qr.postDataAsync,
        createCommentState: qr.state
    };
};

export const useUpdateComment = () => {
    const qr = usePostDataUnsafe<CommentListDTO, void>(apiRoutes.comment.updateComment);

    return {
        updateCommentAsync: qr.postDataAsync,
        updateCommentState: qr.state,
    };
};

export const useCreateLike = () => {

    const qr = usePostDataUnsafe<{ commentId: number }, void>(apiRoutes.comment.createLike);

    return {
        createLikeAsync: qr.postDataAsync,
        createLikeState: qr.state
    };
};

export const useDeleteLike = () => {

    const qr = usePostDataUnsafe<{ commentId: number }, void>(apiRoutes.comment.deleteLike);

    return {
        deleteLikeAsync: qr.postDataAsync,
        deleteLikeState: qr.state
    };
};

export const useComments = (itemCode: string) => {

    const qr = useReactQuery2<CommentListDTO[]>(apiRoutes.comment.getComments, { itemCode });

    return {
        comments: qr.data ?? [],
        commentsState: qr.state,
        commentsError: qr.error,
        refetchComments: qr.refetch
    };
};