import { Avatar, Checkbox } from '@mui/material';
import { useContext, useState } from 'react';
import { Id } from '../../../shared/types/versionId';
import { Environment } from '../../../static/Environemnt';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { CurrentUserContext } from '../../system/AuthenticationFrame';

export const CommentAnswerEntry = (props: {
    handleCreateNewComment: (
        replyToCommentId: Id<'Comment'> | null,
        isAnonymous: boolean,
        isQuestion: boolean,
        text: string
    ) => void,
    currentReplyCommentId: Id<'Comment'> | null,
    currentReplyUserFullName: string | null,
    setCurrentReplyUserFullName: React.Dispatch<React.SetStateAction<string | null>>,
}) => {

    const {
        handleCreateNewComment,
        currentReplyCommentId,
        currentReplyUserFullName,
        setCurrentReplyUserFullName
    } = props;

    const user = useContext(CurrentUserContext);

    const [comment, setComment] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isQuestion, setIsQuestion] = useState(false);
    const [isStartedEditing, setIsStartedEditing] = useState(false);


    const handleNewComment = async () => {
        await handleCreateNewComment(
            currentReplyCommentId,
            isAnonymous,
            isQuestion,
            comment
        );
        setComment('');
        setCurrentReplyUserFullName(null);
        setIsQuestion(false);
        setIsAnonymous(false);
    };

    return <EpistoFlex2
        direction="column"
        marginLeft={currentReplyCommentId ? '45px' : 0}
        marginTop={currentReplyCommentId ? '10px' : 0}>

        <EpistoFlex2
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
                value={comment}
                setValue={setComment}
                placeholder={currentReplyCommentId ? 'Ide írd a válaszodat' : 'Ide írd a kommentedet/kérdésedet'} />
        </EpistoFlex2>


        {isStartedEditing && comment &&
            <EpistoFlex2
                justify="space-between"
                align="center"
                m="10px 0">

                <EpistoFlex2 direction="column">

                    {!currentReplyCommentId &&
                        <EpistoFlex2 align="center">

                            <Checkbox
                                onChange={() =>
                                    setIsQuestion(p => !p)
                                } />

                            <EpistoFont>
                                Ez egy kérdés
                            </EpistoFont>
                        </EpistoFlex2>}

                    <EpistoFlex2 align="center">

                        <Checkbox
                            onChange={() =>
                                setIsAnonymous(p => !p)
                            } />

                        <EpistoFont>
                            Közzététel névtelenül
                        </EpistoFont>
                    </EpistoFlex2>
                </EpistoFlex2>

                <EpistoFlex2>
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
                </EpistoFlex2>
            </EpistoFlex2>}
    </EpistoFlex2>;
};
