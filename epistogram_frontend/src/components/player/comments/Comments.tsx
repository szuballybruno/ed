import { Flex } from '@chakra-ui/react';
import { Avatar, Checkbox, Divider } from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
    useComments,
    useCreateComment,
    useCreateLike,
    useDeleteLike,
    useUpdateComment
} from '../../../services/api/commentApiService';
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
    const { updateCommentAsync } = useUpdateComment();
    const { createLikeAsync, createLikeState } = useCreateLike();
    const { deleteLikeAsync, deleteLikeState } = useDeleteLike();


    const threads = () => {
        console.log('threads2 ', comments);
        const groups: number[] = [];
        const commentGroups: CommentListDTO[] = [];
        comments.forEach((comment) => {
            if (!groups.includes(comment.groupId)) {
                groups.push(comment.groupId);
                commentGroups.push(comment);
            }
        });
        return comments;
    };

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

        if (comment.parentCommentId) {
            setCurrentReplyCommentId(comment.parentCommentId);
        }

        else {

            setCurrentReplyCommentId(comment.id);
        }
        setCurrentReplyUserFullName(comment.fullName);
        setCurrentReplyThreadId(comment.threadId);
    };

    const handleEditComment = async (commentText: string, commentId: number): Promise<void> => {

        const comment = comments.find((comment) => comment.id == commentId) as CommentListDTO;

        const updatedComment: CommentListDTO = {
            ...comment,
            id: commentId,
            commentText,
        };

        try {
            await updateCommentAsync(updatedComment);
            await refetchComments();
        } catch (e) {
            showErrorDialog(translatableTexts.registrationPage.unknownErrorTryAgain);
        }
    };

    return (
        <Flex
            flex='1'
            direction={'column'}
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

            <Flex
                direction='column'
            >
                {

                    threads()
                        .map((comment, index) => (
                            <>
                             <CommentItem
                                handleEditComment={handleEditComment}
                                comment={comment}
                                handleAnswerComment={handleAnswerComment}
                                handleCreateLike={handleCreateLike}
                                handleDeleteLike={handleDeleteLike}
                                key={index} />

                            {
                                currentReplyCommentId
                                && currentReplyThreadId === comment.threadId
                                && <CommentAnswerEntry
                                    handleCreateNewComment={handleCreateNewComment}
                                    currentReplyCommentId={currentReplyCommentId}
                                    currentReplyUserFullName={currentReplyUserFullName}
                                    setCurrentReplyUserFullName={setCurrentReplyUserFullName} />
                            }
                            </>
                    )
                        )
                        }
        </Flex>
        </Flex>
    );
};

export default Comments;
