import { Flex } from '@chakra-ui/react';
import { AccessTime, Reply, ThumbUpAlt } from '@mui/icons-material';
import { Avatar, Checkbox, Divider } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useComments, useCreateComment } from '../../../services/api/commentApiService';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { CommentCreateDTO } from '../../../shared/dtos/CommentCreateDTO';
import { CommentListDTO } from '../../../shared/dtos/CommentListDTO';
import { Environment } from '../../../static/Environemnt';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { EpistoFont } from '../../controls/EpistoFont';
import { CurrentUserContext } from '../../system/AuthenticationFrame';

const CommentItem = (props: {
    comment: CommentListDTO,
    handleAnswerComment: (comment: CommentListDTO) => void
}) => {

    const {
        comment,
        handleAnswerComment
    } = props;

    const {
        fullName,
        commentText,
        creationDate,
        parentCommentId,
        avatarUrl
    } = comment;

    return <Flex
        mt="30px"
        pl={parentCommentId ? '20px' : undefined}>

        {parentCommentId &&
            <Divider
                variant="fullWidth"
                orientation="vertical" />}

        <Flex p="20px">

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

                <h4
                    style={{
                        margin: 0,
                        fontWeight: '600',
                        textAlign: 'left'
                    }}>

                    {fullName}
                </h4>

                <Flex
                    flex='1'
                    justify='flex-end'>

                    <EpistoButton
                        className="fontSmall"
                        style={{
                            color: 'grey'
                        }}>

                        <ThumbUpAlt
                            style={{
                                height: 20,
                                width: 20,
                                marginRight: 5
                            }} />

                        0
                    </EpistoButton>

                    <EpistoButton
                        onClick={() => handleAnswerComment(comment)}
                        className="fontExtraSmall"
                        style={{
                            color: 'grey',
                            marginTop: 3
                        }}>

                        {/* <Reply
                            style={{
                                height: 20,
                                width: 20,
                                marginRight: 5
                            }} /> */}

                        Válasz
                    </EpistoButton>
                </Flex>



            </Flex>

            <p
                style={{
                    textAlign: 'left'
                }}>

                {commentText}
                {' '}
            </p>

            <p
                style={{
                    textAlign: 'left',
                    color: 'gray'
                }}>

                {creationDate}
            </p>
        </Flex>
    </Flex>;
};

const Comments = (props: {
    currentItemCode: string
}) => {

    const { currentItemCode } = props;

    const user = useContext(CurrentUserContext);
    const showErrorDialog = useShowErrorDialog();

    const [comment, setComment] = useState('');
    const [currentReplyCommentId, setCurrentReplyCommentId] = useState<number | null>(null);
    const [currentReplyUserFullName, setCurrentReplyUserFullName] = useState<string | null>(null);

    const mockComments = [
        {
            fullName: 'Surányi Ildikó',
            commentText: 'Nagyon hasznos videó volt! Egy olyan kérdésem lenne, hogy nincs esetleg valamilyen billentyűkombináció arra, hogy gyorsan lehessen oszlopokat elrejteni?',
            dateOfPosting: 'posted 1 minute ago',
            isChild: false
        },
        {
            fullName: 'Keresztúri Melinda',
            commentText: 'Én erre a CTRL + 0-t szoktam használni!',
            dateOfPosting: 'posted 2 minutes ago',
            isChild: true
        },
        {
            fullName: 'Oláh Mihály',
            commentText: 'Pontosan, ahogyan Melinda írja, ha pedig sorokat szeretnél elrejteni, úgy a CTRL + 9 kombinációt ajánlom.',
            dateOfPosting: 'posted 2 minutes ago',
            isChild: true,
            avatarUrl: Environment.getAssetUrl('userAvatars/user_avatar_5.png')
        },
        {
            fullName: 'Kiss Andrea',
            commentText: 'Sziasztok! Én használtam a fenti kombinációkat, viszont véletlenül olyan oszlopokat is elrejtettem, amiket nem szerettem volna. Hogyan tudom gyorsan visszahozni őket? A CTRL + Z parancsot próbáltam, viszont közben dolgoztam máson is, így azokat is vissza akarja vonni :(',
            dateOfPosting: 'posted 2 minutes ago',
            isChild: false,
            avatarUrl: Environment.getAssetUrl('userAvatars/user_avatar_3.png')
        },
        {
            fullName: 'Radeczky Richárd',
            commentText: 'Visszahozni (Felfedés) úgy tudod az oszlopokat, hogy egyben (Shift nyíl) kijelölsz az előtte és utána lévő oszlopban is legalább 1-1 cellát, majd megnyomod a Ctrl Shift 8 kombinációt. (Ez Windowson biztosan működik, Mac-en érdemes utána nézni a megfelelő kombinációnak, de ha erre rákeresel, már segíteni fog)',
            dateOfPosting: 'posted 2 minutes ago',
            isChild: true,
            avatarUrl: Environment.getAssetUrl('userAvatars/user_avatar_4.png')
        }
    ];

    const { comments, commentsState, commentsError, refetchComments } = useComments(currentItemCode);

    const { createCommentAsync, createCommentState } = useCreateComment();

    const handleCreateNewComment = async (replyToCommentId: number | null) => {

        const newComment = {
            userId: user.id,
            itemCode: currentItemCode,
            replyToCommentId: replyToCommentId,
            text: comment
        } as CommentCreateDTO;

        try {

            await createCommentAsync(newComment);
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
            <Flex direction="column">
                <Flex p="10px"
                    align="center">
                    <Flex mr="10px">
                        <Avatar alt="Szubally Brúnó"
                            src={Environment.getAssetUrl('userAvatars/user_avatar_7.png')} />
                    </Flex>
                    <Flex flex="1"
                        direction="column">
                        <EpistoFont>
                            Szubally Brúnó
                        </EpistoFont>
                        <Flex align="center">
                            <AccessTime style={{
                                height: 20,
                                width: 20,
                                margin: '0 10px 0 0'
                            }} />
                            <EpistoFont fontSize="fontSmall">
                                2022. 03. 28. 10:05
                            </EpistoFont>
                        </Flex>
                    </Flex>
                    <Flex>
                        <EpistoButton variant="outlined">
                            Visszavonás
                        </EpistoButton>
                    </Flex>
                </Flex>

                <EpistoEntry
                    isMultiline
                    label={currentReplyCommentId
                        ? `Válasz  ${currentReplyUserFullName} felhasználónak`
                        : ''}
                    labelVariant='top'
                    value={comment}
                    setValue={setComment}
                    placeholder='Ide írd a kommentedet/kérdésedet' />
                {/* <EpistoFont
                    className="roundBorders mildShadow"
                    style={{
                        background: 'var(--transparentWhite90)',
                        padding: '20px'
                    }}>


                    <p style={{ textAlign: 'left', color: 'lightgray' }}>
                        Ide írd a kommentedet/kérdésedet{' '}
                    </p>
                </EpistoFont> */}
                <Flex justify="space-between"
                    align="center"
                    m="10px 0">
                    <Flex direction="column">
                        <Flex align="center">
                            <Checkbox />
                            <EpistoFont>
                                Ez egy kérdés
                            </EpistoFont>
                        </Flex>
                        <Flex align="center">
                            <Checkbox />
                            <EpistoFont>
                                Anoním közzététel
                            </EpistoFont>
                        </Flex>
                    </Flex>

                    <Flex>
                        <EpistoButton
                            variant="colored"
                            onClick={() => handleCreateNewComment(currentReplyCommentId)}>

                            Közzététel
                        </EpistoButton>
                    </Flex>
                </Flex>
            </Flex>


            <Divider
                variant="fullWidth"
                style={{
                    margin: '10px 0 20px 0'
                }} />


            {comments
                .map((comment, index) => {
                    return <CommentItem
                        comment={comment}
                        handleAnswerComment={handleAnswerComment}
                        key={index} />;
                })}
        </Flex>
    );
};

export default Comments;
