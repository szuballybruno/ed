import { Id } from '@episto/commontypes';
import { useContext, useState } from 'react';
import { Environment } from '../../../static/Environemnt';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoCheckbox } from '../../controls/EpistoCheckbox';
import { EpistoCheckboxLabel } from '../../controls/EpistoCheckboxLabel';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { ProfileImage } from '../../ProfileImage';
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

            <ProfileImage
                firstName={user.firstName}
                lastName={user.lastName}
                className="square40"
                style={{
                    margin: '0 15px 0 0'
                }}
                url={user.avatarUrl ? Environment.getAssetUrl(user.avatarUrl) : undefined} />

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
                margin="10px 0">

                <EpistoFlex2 direction="column">

                    {!currentReplyCommentId &&
                        <EpistoCheckboxLabel
                            boxFirst
                            label="Ez egy kérdés">

                            <EpistoCheckbox
                                noBackground
                                setValue={setIsQuestion}
                                value={isQuestion} />
                        </EpistoCheckboxLabel>}

                    <EpistoCheckboxLabel
                        boxFirst
                        label="Közzététel névtelenül">

                        <EpistoCheckbox
                            noBackground
                            setValue={setIsAnonymous}
                            value={isAnonymous} />
                    </EpistoCheckboxLabel>
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
