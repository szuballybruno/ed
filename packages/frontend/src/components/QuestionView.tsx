import { Id } from '@episto/commontypes';
import { AnswerResultDTO, QuestionDTO } from '@episto/communication';
import { useEffect, useState } from 'react';
import { Responsivity } from '../helpers/responsivity';
import { showNotification } from '../services/core/notifications';
import { Environment } from '../static/Environemnt';
import { EpistoFlex2, EpistoFlex2Props } from './controls/EpistoFlex';
import { EpistoFont } from './controls/EpistoFont';
import { LoadingFramePropsType } from './system/LoadingFrame';
import { QuestionnaierAnswer } from './universal/QuestionnaireAnswer';
import { QuestionnaireLayout } from './universal/QuestionnaireLayout';

export const QuesitionView = ({
    answerQuesitonAsync,
    question,
    loadingProps,
    onlyShowAnswers,
    answerResult,
    isPractise,
    isShowingAcquiredCoins,
    ...css
}: {
    answerQuesitonAsync: (answerVersionId: Id<'AnswerVersion'>[]) => Promise<void>,
    question: QuestionDTO,
    loadingProps: LoadingFramePropsType,
    onlyShowAnswers?: boolean,
    answerResult: AnswerResultDTO | null,
    isShowingAcquiredCoins?: boolean,
    isPractise: boolean
} & EpistoFlex2Props) => {

    const {
        coinAcquires,
        correctAnswerVersionIds,
        givenAnswerVersionIds,
        isCorrect
    } = answerResult ?? {
        coinAcquires: [],
        correctAnswerVersionIds: [],
        givenAnswerVersionIds: [],
        isCorrect: false
    };

    const isAnswered = !!answerResult;
    const bonusCoinsAcquireData = coinAcquires
        .firstOrNull(x => x.reason === 'answer_streak_10' || x.reason === 'answer_streak_5');
    const coinsAcquired = coinAcquires
        .firstOrNull(x => x.reason === 'correct_answer');
    const { isMobile } = Responsivity
        .useIsMobileView();

    const [selectedAnswerVersionId, setSelectedAnswerVersionId] = useState<Id<'AnswerVersion'> | null>(null);

    const handleSelectedAnswerVersionAsync = async (answerVersionId: Id<'AnswerVersion'>) => {

        setSelectedAnswerVersionId(answerVersionId);
        await answerQuesitonAsync([answerVersionId]);
    };

    // reset when question id changed
    useEffect(() => {

        setSelectedAnswerVersionId(null);
    }, [question]);

    // bonus coin
    useEffect(() => {

        if (!bonusCoinsAcquireData)
            return;

        const streakLength = bonusCoinsAcquireData.reason === 'answer_streak_5' ? 5 : 10;

        showNotification(
            `Sikeresen megszereztél ${bonusCoinsAcquireData.amount} bónusz EpistoCoin-t ${streakLength} egymást követő helyes válaszért!`,
            {
                type: 'warning',
                options: {
                    style: {
                        border: 'solid 2px gold',
                    },
                    icon: <img
                        src={Environment.getAssetUrl('images/epistoCoin.png')} />
                }
            });
    }, [bonusCoinsAcquireData]);

    return <QuestionnaireLayout
        contentClickable={!isAnswered}
        title={question.questionText}
        loadingProps={loadingProps}
        onlyShowAnswers={onlyShowAnswers}
        width={(isMobile && !isPractise) ? '100%' : undefined}
        borderRadius={isMobile ? '0' : undefined}
        minHeight={(isMobile && !isPractise) ? '100vh' : undefined}
        justify={(isMobile && !isPractise) ? 'center' : undefined}
        {...css}>

        {question
            .answers
            .map((answer, index) => {

                const answerVersionId = answer.answerVersionId;
                const isSelected = selectedAnswerVersionId === answerVersionId;
                const isCorrect = isAnswered && correctAnswerVersionIds.some(x => x === answerVersionId);
                const isIncorrect = isAnswered && isSelected && !isCorrect;

                return <QuestionnaierAnswer
                    key={index}
                    disabled={isAnswered}
                    isCorrect={isCorrect}
                    isIncorrect={isIncorrect}
                    isSelected={isSelected}
                    mb="8px"
                    onClick={() => handleSelectedAnswerVersionAsync(answer.answerVersionId)} >

                    <EpistoFont
                        isAutoFontSize
                        maxFontSize={15}
                        style={{
                            fontWeight: 400,
                            width: '100%'
                        }}>
                        {answer.answerText}
                    </EpistoFont>
                </QuestionnaierAnswer>;
            })}

        {(!!coinsAcquired && isShowingAcquiredCoins) && <EpistoFlex2
            mt="10px"
            borderRadius="5px"
            p="7px"
            align="center">

            <EpistoFont>
                +1 EpistoCoinnal gazdagodtál!
            </EpistoFont>

            <img
                src={Environment.getAssetUrl('images/epistoCoin.png')}
                className="square25"
                style={{ margin: '0px 0px 4px 4px' }} />
        </EpistoFlex2>}
    </QuestionnaireLayout>;
};
