import { useEffect, useState } from 'react';
import { useReactTimer } from '../../helpers/reactTimer';
import { PlayerApiService } from '../../services/api/PlayerApiService';
import { QuestionDTO } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { epochDates } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { QuesitionView } from '../QuestionView';
import { TimeoutFrame } from './TimeoutFrame';
import { Responsivity } from '../../helpers/responsivity';

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

    const { isMobile } = Responsivity
        .useIsMobileView();

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

    useEffect(() => {

        if (!isAnswered)
            return;

        reactTimer.start();
    }, [isAnswered]);

    useEffect(() => {

        if (!isShowing)
            return;

        setShowUpTime(new Date());
    }, [isShowing]);

    return <EpistoFlex2
        maxWidth={isMobile ? '100vw' : undefined}
        // maxHeight={isMobile ? '100vh' : undefined}
        direction="column">

        <QuesitionView
            isShowingAcquiredCoins={isMobile}
            answerQuesitonAsync={handleAnswerQuestionAsync}
            loadingProps={{ loadingState: answerQuestionState }}
            question={question}
            answerResult={answerResult}
            isPractise={false}
            {...css} />

        <EpistoFlex2
            id='closeButtonOverlay'
            display={isAnswered ? undefined : 'none'}
            position={isMobile ? 'fixed' : 'relative'}
            bottom={isMobile ? '20px' : undefined}
            right={isMobile ? '20px' : undefined}
            zIndex={'30'}
            justify="flex-end">

            <EpistoButton
                variant="colored"
                style={{
                    padding: '0'
                }}
                onClick={() => handleCloseDialog()}>

                <TimeoutFrame
                    zIndex='31'
                    reactTimer={reactTimer}>

                    <EpistoFont
                        isUppercase
                        fontSize="fontNormal14"
                        style={{
                            margin: '10px'
                        }}>

                        {translatableTexts.videoQuestionnaire.close}
                    </EpistoFont>
                </TimeoutFrame>
            </EpistoButton>
        </EpistoFlex2>
    </EpistoFlex2>;
};
