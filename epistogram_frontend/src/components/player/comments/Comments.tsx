import {Flex} from '@chakra-ui/react';
import {Avatar, Checkbox, Divider} from '@mui/material';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
    useComments,
    useCreateComment,
    useCreateLike,
    useDeleteLike,
    useUpdateComment
} from '../../../services/api/commentApiService';
import {useShowErrorDialog} from '../../../services/core/notifications';
import {CommentCreateDTO} from '../../../shared/dtos/CommentCreateDTO';
import {CommentListDTO} from '../../../shared/dtos/CommentListDTO';
import {PagingType} from '../../../static/frontendHelpers';
import {translatableTexts} from '../../../static/translatableTexts';
import {CurrentUserContext} from '../../system/AuthenticationFrame';
import {UnderVideoInfoFrame} from '../watch/UnderVideoInfoFrame';
import {CommentAnswerEntry} from './CommentAnswerEntry';
import {CommentItem} from './CommentItem';
import {EpistoFont} from '../../controls/EpistoFont';

const Comments = (props: {
    currentItemCode: string
    paging: PagingType<string>
}) => {

    const {currentItemCode, paging} = props;

    const user = useContext(CurrentUserContext);
    const showErrorDialog = useShowErrorDialog();

    const [currentReplyCommentId, setCurrentReplyCommentId] = useState<number | null>(null);
    const [currentReplyUserFullName, setCurrentReplyUserFullName] = useState<string | null>(null);

    const {comments, commentsState, commentsError, refetchComments} = useComments(currentItemCode);
    const {createCommentAsync, createCommentState} = useCreateComment();
    const {updateCommentAsync} = useUpdateComment();
    const {createLikeAsync, createLikeState} = useCreateLike();
    const {deleteLikeAsync, deleteLikeState} = useDeleteLike();

    const handleCreateNewComment = async (
        replyToCommentId: number | null,
        isAnonymous: boolean,
        isQuestion: boolean,
        text: string,
        parentCommentId?: number,
    ) => {

        const newComment = {
            userId: user.id,
            itemCode: currentItemCode,
            replyToCommentId,
            isAnonymous,
            isQuestion,
            text,
            parentCommentId,
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
            await createLikeAsync({commentId: commentId});
            await refetchComments();
        } catch (e) {
            showErrorDialog(translatableTexts.registrationPage.unknownErrorTryAgain);
        }
    };

    const handleDeleteLike = async (commentId: number) => {

        try {
            await deleteLikeAsync({commentId: commentId});
            await refetchComments();
        } catch (e) {
            showErrorDialog(translatableTexts.registrationPage.unknownErrorTryAgain);
        }
    };

    const handleAnswerComment = (comment: CommentListDTO) => {
        setCurrentReplyCommentId(comment.commentId);
        setCurrentReplyUserFullName(comment.fullName);
    };

    const handleEditComment = async (commentText: string, commentId: number): Promise<void> => {

        const comment = comments.find((comment) => comment.commentId == commentId) as CommentListDTO;

        const updatedComment: CommentListDTO = {
            ...comment,
            commentText,
        };

        try {
            await updateCommentAsync(updatedComment);
            await refetchComments();
        } catch (e) {
            showErrorDialog(translatableTexts.registrationPage.unknownErrorTryAgain);
        }
    };

  /*  const ChildComponentRender = (comment?: CommentListDTO[]) => {
        return comment?.length && comment.map((childComment) => (
            <>
            <CommentItem
                setCurrentReplyUserFullName={setCurrentReplyUserFullName}
                currentReplyUserFullName={currentReplyUserFullName}
                currentReplyCommentId={currentReplyCommentId}
                handleCreateNewComment={handleCreateNewComment}
                handleEditComment={handleEditComment}
                comment={childComment}
                handleAnswerComment={handleAnswerComment}
                handleCreateLike={handleCreateLike}
                handleDeleteLike={handleDeleteLike}
                key={childComment.commentId}
            />
                { ChildComponentRender(childComment?.childComments) }
            </>
    ));
    };*/


    return (
        <UnderVideoInfoFrame
            title='Kommentek & Kérdések'
            paging={paging}>
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
                setCurrentReplyUserFullName={setCurrentReplyUserFullName}
            />


            <Divider
                variant="fullWidth"
                style={{
                    margin: '10px 0 20px 0'
                }}/>

            <Flex
                direction='column'
            >
                {

                    comments
                        .map((comment, index) => (
                                <>
                                    <CommentItem
                                        setCurrentReplyUserFullName={setCurrentReplyUserFullName}
                                        currentReplyUserFullName={currentReplyUserFullName}
                                        currentReplyCommentId={currentReplyCommentId}
                                        handleCreateNewComment={handleCreateNewComment}
                                        handleEditComment={handleEditComment}
                                        comment={comment}
                                        handleAnswerComment={handleAnswerComment}
                                        handleCreateLike={handleCreateLike}
                                        handleDeleteLike={handleDeleteLike}
                                        key={index}/>
                                    {comment?.childComments?.map((oneChildComment) => (
                                        <CommentItem
                                            setCurrentReplyUserFullName={setCurrentReplyUserFullName}
                                            currentReplyUserFullName={currentReplyUserFullName}
                                            currentReplyCommentId={currentReplyCommentId}
                                            handleCreateNewComment={handleCreateNewComment}
                                            handleEditComment={handleEditComment}
                                            comment={oneChildComment}
                                            handleAnswerComment={handleAnswerComment}
                                            handleCreateLike={handleCreateLike}
                                            handleDeleteLike={handleDeleteLike}
                                            key={index}/>
                                    ))}
                                </>
                            )
                        )
                }
            </Flex>
        </UnderVideoInfoFrame>
    );
};

export default Comments;
