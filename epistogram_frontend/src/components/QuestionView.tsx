import { FlexProps } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { showNotification } from '../services/core/notifications';
import { CoinAcquireResultDTO } from '../shared/dtos/CoinAcquireResultDTO';
import { QuestionDTO } from '../shared/dtos/QuestionDTO';
import { Id } from '../shared/types/versionId';
import { Environment } from '../static/Environemnt';
import { EpistoFont } from './controls/EpistoFont';
import { LoadingFramePropsType } from './system/LoadingFrame';
import { QuestionnaierAnswer } from './universal/QuestionnaireAnswer';
import { QuestionnaireLayout } from './universal/QuestionnaireLayout';

export const QuesitionView = (props: {
    answerQuesitonAsync: (answerId: Id<'Answer'>[]) => Promise<void>,
    correctAnswerIds: Id<'Answer'>[],
    question: QuestionDTO,
    loadingProps: LoadingFramePropsType,
    onlyShowAnswers?: boolean,
    coinsAcquired: number | null,
    bonusCoinsAcquired: CoinAcquireResultDTO | null
} & FlexProps) => {

    const {
        answerQuesitonAsync,
        correctAnswerIds,
        question,
        loadingProps,
        onlyShowAnswers,
        coinsAcquired,
        bonusCoinsAcquired,
        ...css
    } = props;

    const isAnswered = correctAnswerIds.length > 0;

    const [selectedAnswerId, setSelectedAnswerId] = useState<Id<'Answer'> | null>(null);

    const handleSelectedAnswerAsync = async (answerId: Id<'Answer'>) => {

        setSelectedAnswerId(answerId);
        await answerQuesitonAsync([answerId]);
    };

    // reset when question id changed
    useEffect(() => {

        setSelectedAnswerId(null);
    }, [question.questionVersionId]);

    // bonus coin
    useEffect(() => {

        if (!bonusCoinsAcquired)
            return;

        const streakLength = bonusCoinsAcquired.reason === 'answer_streak_5' ? 5 : 10;

        showNotification(
            `Sikeresen megszereztél ${bonusCoinsAcquired.amount} bónusz EpistoCoin-t ${streakLength} egymást követő helyes válaszért!`,
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
    }, [bonusCoinsAcquired]);

    return <QuestionnaireLayout
        contentClickable={!isAnswered}
        title={question.questionText}
        loadingProps={loadingProps}
        onlyShowAnswers={onlyShowAnswers}
        {...css}>

        {question
            .answers
            .map((answer, index) => {

                const answerId = answer.answerId;
                const isSelected = selectedAnswerId === answerId;
                const isCorrect = isAnswered && correctAnswerIds.some(x => x === answerId);
                const isIncorrect = isAnswered && isSelected && !isCorrect;

                return <QuestionnaierAnswer
                    key={index}
                    isCorrect={isCorrect}
                    isIncorrect={isIncorrect}
                    isSelected={isSelected}
                    mb="8px"
                    onClick={() => handleSelectedAnswerAsync(answer.answerId)} >

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
    </QuestionnaireLayout>;
};
