import { useEffect, useState } from 'react';
import { useReactTimer } from '../../helpers/reactTimer';
import { PlayerApiService } from '../../services/api/PlayerApiService';
import { QuestionDTO } from '../../shared/dtos/QuestionDTO';
import { Id } from '../../shared/types/versionId';
import { epochDates } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { QuesitionView } from '../QuestionView';
import { TimeoutFrame } from './TimeoutFrame';

export const VideoQuestionnaire = (props: {
    question: QuestionDTO,
    answerSessionId: Id<'AnswerSession'>,
    isShowing: boolean,
    onAnswered: () => void,
    onClosed: () => void
} & EpistoFlex2Props) => {

    const { question, isShowing, onAnswered, answerSessionId, onClosed, ...css } = props;
    const { answerQuestionAsync, answerResult, answerQuestionState } = PlayerApiService.useAnswerQuestion();
    const isAnswered = !!answerResult;
    const autoCloseSecs = 8;
    const [showUpTime, setShowUpTime] = useState<Date>(new Date());

    const handleAnswerQuestionAsync = async (answerVersionIds: Id<'AnswerVersion'>[]) => {

        const timeElapsed = epochDates(new Date(), showUpTime);
        await answerQuestionAsync({
            answerSessionId,
            givenAnswer: {
                answerVersionIds,
                questionVersionId: question.questionVersionId,
                elapsedSeconds: timeElapsed
            }
        });
        onAnswered();
    };

    const handleCloseDialog = () => {

        onClosed();
    };

    const reactTimer = useReactTimer(handleCloseDialog, autoCloseSecs * 1000);

    // useEffect(() => {

    //     if (!isAnswered)
    //         return;

    //     reactTimer.start();
    // }, [isAnswered]);

    useEffect(() => {

        if (!isShowing)
            return;

        setShowUpTime(new Date());
    }, [isShowing]);

    return <EpistoFlex2
        direction="column">

        <QuesitionView
            answerQuesitonAsync={handleAnswerQuestionAsync}
            loadingProps={{ loadingState: answerQuestionState }}
            question={question}
            answerResult={answerResult}
            {...css} />

        <EpistoFlex2
            display={isAnswered ? undefined : 'none'}
            justify="flex-end">

            <EpistoButton
                variant="colored"
                style={{ padding: '0' }}
                onClick={() => handleCloseDialog()}>

                <TimeoutFrame reactTimer={reactTimer}>
                    <EpistoFont
                        isUppercase
                        fontSize="fontNormal14"
                        style={{
                            position: 'relative',
                            zIndex: '8',
                            margin: '10px'
                        }}>

                        {translatableTexts.videoQuestionnaire.close}
                    </EpistoFont>
                </TimeoutFrame>
            </EpistoButton>
        </EpistoFlex2>
    </EpistoFlex2>;
};
