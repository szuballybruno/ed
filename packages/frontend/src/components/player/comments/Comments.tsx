import { Id } from '@episto/commontypes';
import { CommentCreateDTO, CommentListDTO } from '@episto/communication';
import { useContext, useState } from 'react';
import { useComments, useCreateComment, useCreateLike, useDeleteLike } from '../../../services/api/commentApiService';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { PagingType } from '../../../static/frontendHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoDivider } from '../../controls/EpistoDivider';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { CurrentUserContext } from '../../system/AuthenticationFrame';
import { UnderVideoInfoFrame } from '../watch/UnderVideoInfoFrame';
import { CommentAnswerEntry } from './CommentAnswerEntry';
import { CommentItem } from './CommentItem';

const Comments = (props: {
    currentItemCode: string
    paging: PagingType<string>
}) => {

    const { currentItemCode, paging } = props;

    const user = useContext(CurrentUserContext);
    const showErrorDialog = useShowErrorDialog();

    const [currentReplyCommentId, setCurrentReplyCommentId] = useState<Id<'Comment'> | null>(null);
    const [currentReplyThreadId, setCurrentReplyThreadId] = useState<number | null>(null);
    const [currentReplyUserFullName, setCurrentReplyUserFullName] = useState<string | null>(null);

    const { comments, commentsState, commentsError, refetchComments } = useComments(currentItemCode);
    const { createCommentAsync, createCommentState } = useCreateComment();
    const { createLikeAsync, createLikeState } = useCreateLike();
    const { deleteLikeAsync, deleteLikeState } = useDeleteLike();

    const threads = comments
        .groupBy(x => x.threadId)
        .map(x => ({
            threadId: x.first.threadId,
            items: x.items
        }));

    const handleCreateNewComment = async (
        replyToCommentId: Id<'Comment'> | null,
        isAnonymous: boolean,
        isQuestion: boolean,
        text: string
    ) => {

        const newComment = {
            userId: user.id,
            itemCode: currentItemCode,
            replyToCommentId,
            isAnonymous,
            isQuestion,
            text
        } as CommentCreateDTO;

        try {

            await createCommentAsync(newComment);
            setCurrentReplyCommentId(null);
            await refetchComments();
        } catch (e) {
            showErrorDialog(translatableTexts.registrationPage.unknownErrorTryAgain);
        }
    };

    const handleCreateLike = async (commentId: Id<'Comment'>) => {

        try {
            await createLikeAsync({ commentId: commentId });
            await refetchComments();
        } catch (e) {
            showErrorDialog(translatableTexts.registrationPage.unknownErrorTryAgain);
        }
    };

    const handleDeleteLike = async (commentId: Id<'Comment'>) => {

        try {
            await deleteLikeAsync({ commentId: commentId });
            await refetchComments();
        } catch (e) {
            showErrorDialog(translatableTexts.registrationPage.unknownErrorTryAgain);
        }
    };

    const handleAnswerComment = (comment: CommentListDTO) => {

        if (comment.parentCommentId)

            setCurrentReplyCommentId(comment.parentCommentId);
        else {

            setCurrentReplyCommentId(comment.id);
        }
        setCurrentReplyUserFullName(comment.fullName);
        setCurrentReplyThreadId(comment.threadId);
    };

    return <UnderVideoInfoFrame
        title='Kommentek & Kérdések'
        paging={paging}>

        <CommentAnswerEntry
            handleCreateNewComment={handleCreateNewComment}
            currentReplyCommentId={null}
            currentReplyUserFullName={currentReplyUserFullName}
            setCurrentReplyUserFullName={setCurrentReplyUserFullName} />


        <EpistoDivider
            variant="fullWidth"
            style={{
                margin: '10px 0 20px 0'
            }} />


        {threads
            .map((thread, index) => {

                return <EpistoFlex2
                    direction='column'
                    key={index}>

                    {
                        thread.items
                            .map((comment, index) => {
                                return <CommentItem
                                    comment={comment}
                                    handleAnswerComment={handleAnswerComment}
                                    handleCreateLike={handleCreateLike}
                                    handleDeleteLike={handleDeleteLike}
                                    key={index} />;
                            })
                    }

                    {
                        currentReplyCommentId
                        && currentReplyThreadId === thread.threadId
                        && <CommentAnswerEntry
                            handleCreateNewComment={handleCreateNewComment}
                            currentReplyCommentId={currentReplyCommentId}
                            currentReplyUserFullName={currentReplyUserFullName}
                            setCurrentReplyUserFullName={setCurrentReplyUserFullName} />
                    }
                </EpistoFlex2>;
            })}
    </UnderVideoInfoFrame>;
};

export default Comments;
