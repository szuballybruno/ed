import { Avatar } from '@chakra-ui/react';
import { Id } from '@episto/commontypes';
import { CommentListDTO } from '@episto/communication';
import { ThumbUpAlt } from '@mui/icons-material';
import { ChipSmall } from '../../administration/courses/ChipSmall';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoDivider } from '../../controls/EpistoDivider';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';

export const CommentItem = (props: {
    comment: CommentListDTO,
    handleAnswerComment: (comment: CommentListDTO) => void,
    handleCreateLike: (commentId: Id<'Comment'>) => void,
    handleDeleteLike: (commentId: Id<'Comment'>) => void

}) => {

    const {
        comment,
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

    const handleLikeButton = (commentId: Id<'Comment'>, isCurrentUserLikedComment: boolean) => {
        if (!isCurrentUserLikedComment) {
            handleCreateLike(commentId);
        } else {
            handleDeleteLike(commentId);
        }
    };

    return <EpistoFlex2
        mt="30px"
        pl={parentCommentId ? '20px' : undefined}>

        {parentCommentId &&
            <EpistoDivider
                variant="fullWidth"
                orientation="vertical" />}

        <EpistoFlex2
            p="20px"
            h='80px'>

            <Avatar
                src={avatarUrl} />
        </EpistoFlex2>

        <EpistoFlex2
            flex='1'
            direction="column">

            <EpistoFlex2
                flex='1'
                justify="space-between"
                align="center">

                <EpistoFlex2
                    align={'center'}>

                    <h4
                        style={{
                            margin: 0,
                            fontWeight: '600',
                            textAlign: 'left'
                        }}>

                        {fullName || 'Névtelen felhasználó'}
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
                </EpistoFlex2>
            </EpistoFlex2>

            <p
                style={{
                    textAlign: 'left'
                }}>

                {commentText}
                {' '}
            </p>

            <EpistoFlex2
                flex='1'>

                <EpistoButton
                    onClick={() => handleLikeButton(comment.id, comment.isCurrentUserLikedComment)}
                    className="fontSmall"
                    style={{
                        color: comment.isCurrentUserLikedComment ? 'blue' : 'grey'
                    }}>

                    <ThumbUpAlt
                        style={{
                            height: 20,
                            width: 20,
                            marginRight: 5,
                            color: comment.isCurrentUserLikedComment ? 'blue' : 'grey'
                        }} />

                    {commentLikeCount}
                </EpistoButton>

                <EpistoButton
                    onClick={() => handleAnswerComment(comment)}
                    className="fontSmall"
                    style={{
                        color: 'grey',
                        marginTop: 3
                    }}>

                    Válasz
                </EpistoButton>
            </EpistoFlex2>
        </EpistoFlex2>
    </EpistoFlex2>;
};
