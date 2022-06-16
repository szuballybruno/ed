import { Flex } from '@chakra-ui/react';
import { Avatar, Checkbox } from '@mui/material';
import { useContext, useState } from 'react';
import { Environment } from '../../../static/Environemnt';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { EpistoFont } from '../../controls/EpistoFont';
import { CurrentUserContext } from '../../system/AuthenticationFrame';

export const CommentAnswerEntry = (props: {
    handleCreateNewComment: (
        replyToCommentId: number | null,
        isAnonymous: boolean,
        isQuestion: boolean,
        text: string,
        parentCommentId?: number,
    ) => void,
    currentReplyCommentId: number | null,
    currentReplyUserFullName: string | null,
    setCurrentReplyUserFullName: React.Dispatch<React.SetStateAction<string | null>>,
    parentCommentId?: number,
}) => {

    const {
        handleCreateNewComment,
        currentReplyCommentId,
        currentReplyUserFullName,
        setCurrentReplyUserFullName,
        parentCommentId
    } = props;

    const user = useContext(CurrentUserContext);

    const [commentText, setCommentText] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isQuestion, setIsQuestion] = useState(false);
    const [isStartedEditing, setIsStartedEditing] = useState(false);


    const handleNewComment = async () => {
        await handleCreateNewComment(
            currentReplyCommentId,
            isAnonymous,
            isQuestion,
            commentText,
            parentCommentId,
        );
        setCommentText('');
        setCurrentReplyUserFullName(null);
        setIsQuestion(false);
        setIsAnonymous(false);
    };

    return <Flex
        direction="column"
        marginLeft={currentReplyCommentId ? '45px' : 0}
        marginTop={currentReplyCommentId ? '10px' : 0}>

        <Flex
            flex='1'
            align='center'>


            <Avatar
                alt={user.lastName + ' ' + user.firstName}
                style={{
                    margin: '0 15px 0 0'
                }}
                src={Environment.getAssetUrl('userAvatars/user_avatar_7.png')} />

            <EpistoEntry
                isMultiline
                label={currentReplyCommentId
                    ? currentReplyUserFullName
                        ? `Válasz  ${currentReplyUserFullName} felhasználónak`
                        : ''
                    : ''}
                labelVariant='top'
                style={{
                    marginTop: -7,
                    flex: 1
                }}
                onInput={() => setIsStartedEditing(true)}
                value={commentText}
                setValue={setCommentText}
                placeholder={currentReplyCommentId ? 'Ide írd a válaszodat' : 'Ide írd a kommentedet/kérdésedet'} />
        </Flex>


        {isStartedEditing && commentText &&
            <Flex
                justify="space-between"
                align="center"
                m="10px 0">

                <Flex direction="column">

                    {!currentReplyCommentId &&
                        <Flex align="center">

                            <Checkbox
                                onChange={() =>
                                    setIsQuestion(p => !p)
                                } />

                            <EpistoFont>
                                Ez egy kérdés
                            </EpistoFont>
                        </Flex>}

                    <Flex align="center">

                        <Checkbox
                            onChange={() =>
                                setIsAnonymous(p => !p)
                            } />

                        <EpistoFont>
                            Anoním közzététel
                        </EpistoFont>
                    </Flex>
                </Flex>

                <Flex>
                    <EpistoButton
                        variant="outlined"
                        style={{
                            marginRight: 10
                        }}
                        onClick={() => setIsStartedEditing(false)}>

                        Mégsem
                    </EpistoButton>
                    <EpistoButton
                        variant="colored"
                        onClick={() => handleNewComment()}>

                        Közzététel
                    </EpistoButton>
                </Flex>
            </Flex>}
    </Flex>;
};