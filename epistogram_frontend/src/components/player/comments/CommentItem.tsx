import { Avatar, Divider, Flex } from '@chakra-ui/react';
import { ThumbUpAlt } from '@mui/icons-material';
import { useState } from 'react';
import { CommentListDTO } from '../../../shared/dtos/CommentListDTO';
import { ChipSmall } from '../../administration/courses/ChipSmall';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { EpistoFont } from '../../controls/EpistoFont';

export const CommentItem = (props: {
    comment: CommentListDTO,
    handleEditComment: (commentText: string, commentId: number) => void,
    handleAnswerComment: (comment: CommentListDTO) => void,
    handleCreateLike: (commentId: number) => void,
    handleDeleteLike: (commentId: number) => void
}) => {

    const {
        comment,
        handleEditComment,
        handleAnswerComment,
        handleCreateLike,
        handleDeleteLike,
    } = props;

    const {
        fullName,
        commentText,
        creationDate,
        parentCommentId,
        avatarUrl,
        commentLikeCount,
        isQuestion
    } = comment;

    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [editCommentText, setEditCommentText] = useState<string>(commentText);
    const [isReplyMode, setIsReplyMode] = useState<boolean>(false);

    const handleLikeButton = (commentId: number, isCurrentUserLikedComment: boolean) => {
        if (!isCurrentUserLikedComment) {
            handleCreateLike(commentId);
        } else {
            handleDeleteLike(commentId);
        }
    };

    const handleEdit = () => {
        setIsEditMode(true);
    };

    const handleSave = () => {
        handleEditComment(editCommentText, comment.commentId);
        setIsEditMode(false);
    };

    return (
        <Flex
            mt="30px"
            pl={parentCommentId ? '20px' : undefined}>

            {parentCommentId &&
                <Divider
                    variant="fullWidth"
                    orientation="vertical" />}

            <Flex
                p="20px"
                h='80px'>

                <Avatar
                    alt="Surányi Ildikó"
                    src={avatarUrl} />
            </Flex>

            <Flex
                flex='1'
                direction="column">

                <Flex
                    flex='1'
                    justify="space-between"
                    align="center">

                    <Flex
                        align={'center'}>

                        <h4
                            style={{
                                margin: 0,
                                fontWeight: '600',
                                textAlign: 'left'
                            }}>

                            {fullName || 'Anoním felhasználó'}
                        </h4>

                        <EpistoFont
                            fontSize={'fontSmall'}
                            style={{
                                textAlign: 'left',
                                color: 'gray',
                                margin: '0 10px'
                            }}>

                            {new Date(creationDate)
                                .toLocaleString(
                                    'hu-hu',
                                    {
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    }
                                )
                            }
                        </EpistoFont>

                        {isQuestion && <ChipSmall
                            text={'Kérdés'}
                            style={{
                                marginLeft: 10
                            }}
                            color={'var(--intenseOrange)'} />}
                    </Flex>
                </Flex>

                {/* Edit mode */}
                {isEditMode && <EpistoEntry
                    isMultiline
                    labelVariant='top'
                    style={{
                        marginTop: -7,
                        flex: 1
                    }}
                    value={editCommentText}
                    setValue={setEditCommentText}
                    placeholder={commentText} />
                }

                {/* Display mode */}
                <EpistoFont
                    style={{
                        textAlign: 'left'
                    }}>
                    {commentText}
                </EpistoFont>

                {/* Write a new comment to existing one */}
                {{/*isReplyMode && <CommentAnswerEntry
                commentToReply={comment}
                handleCreateNewComment={handleCreateNewComment}
                currentReplyCommentId={currentReplyCommentId}
                currentReplyUserFullName={currentReplyUserFullName}
                setCurrentReplyUserFullName={setCurrentReplyUserFullName}/>
            */}}


                <Flex
                    flex='1'>

                    {/* EDIT MODE  */}
                    {isEditMode && <>
                        <EpistoButton
                            onClick={() => handleSave()}
                            className="fontSmall"
                            style={{
                                color: comment.currentUserLiked ? 'blue' : 'grey'
                            }}>
                            Mentés
                        </EpistoButton>

                        <EpistoButton
                            onClick={() => setIsEditMode(false)}
                            className="fontExtraSmall"
                            style={{
                                color: 'grey',
                                marginTop: 3
                            }}>

                            Mégse
                        </EpistoButton>
                    </>}

                    {/* DISPLAY MODE */}
                    {!isEditMode && <>
                        <EpistoButton
                            onClick={() => handleLikeButton(comment.commentId, comment.currentUserLiked)}
                            className="fontSmall"
                            style={{
                                color: comment.currentUserLiked ? 'blue' : 'grey'
                            }}>

                            <ThumbUpAlt
                                style={{
                                    height: 20,
                                    width: 20,
                                    marginRight: 5,
                                    color: comment.currentUserLiked ? 'blue' : 'grey'
                                }} />

                            {commentLikeCount}
                        </EpistoButton>

                        <EpistoButton
                            onClick={() => handleAnswerComment(comment)}
                            className="fontExtraSmall"
                            style={{
                                color: 'grey',
                                marginTop: 3
                            }}>

                            Válasz
                        </EpistoButton>
                    </>}

                    <EpistoButton
                        onClick={() => handleEdit()}
                        className="fontExtraSmall"
                        style={{
                            color: 'grey',
                            marginTop: 3
                        }}>

                        Módosít
                    </EpistoButton>
                </Flex>
            </Flex>
        </Flex>
    );
};