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

export const useComments = (itemCode: string) => {

    const qr = useReactQuery2<CommentListDTO[]>(apiRoutes.comment.getComments, { itemCode });

    return {
        comments: qr.data ?? [],
        commentsState: qr.state,
        commentsError: qr.error,
        refetchComments: qr.refetch
    };
};