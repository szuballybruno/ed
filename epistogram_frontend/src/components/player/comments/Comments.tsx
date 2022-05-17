import { Flex } from '@chakra-ui/react';
import { Avatar, Checkbox, Divider } from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useComments, useCreateComment, useCreateLike, useDeleteLike } from '../../../services/api/commentApiService';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { CommentCreateDTO } from '../../../shared/dtos/CommentCreateDTO';
import { CommentListDTO } from '../../../shared/dtos/CommentListDTO';
import { Environment } from '../../../static/Environemnt';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { EpistoFont } from '../../controls/EpistoFont';
import { CurrentUserContext } from '../../system/AuthenticationFrame';
import { CommentAnswerEntry } from './CommentAnswerEntry';
import { CommentItem } from './CommentItem';

const Comments = (props: {
    currentItemCode: string
}) => {

    const { currentItemCode } = props;

    const user = useContext(CurrentUserContext);
    const showErrorDialog = useShowErrorDialog();

    const [currentReplyCommentId, setCurrentReplyCommentId] = useState<number | null>(null);
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
        replyToCommentId: number | null,
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

    const handleCreateLike = async (commentId: number) => {

        try {
            await createLikeAsync({ commentId: commentId });
            await refetchComments();
        } catch (e) {
            showErrorDialog(translatableTexts.registrationPage.unknownErrorTryAgain);
        }
    };

    const handleDeleteLike = async (commentId: number) => {

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

    return (
        <Flex direction={'column'}
            minH={600}
            pb="100px">
            <EpistoFont
                style={{
                    margin: '50px 0 10px 0',
                    fontWeight: '500'
                }}
                fontSize={'fontHuge'}>

                {'Kommentek & Kérdések'}
            </EpistoFont>

            <CommentAnswerEntry
                handleCreateNewComment={handleCreateNewComment}
                currentReplyCommentId={null}
                currentReplyUserFullName={currentReplyUserFullName}
                setCurrentReplyUserFullName={setCurrentReplyUserFullName} />


            <Divider
                variant="fullWidth"
                style={{
                    margin: '10px 0 20px 0'
                }} />


            {threads
                .map((thread, index) => {

                    return <Flex
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
                    </Flex>;
                })}
        </Flex>
    );
};

export default Comments;
