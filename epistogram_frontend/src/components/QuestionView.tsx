import { Flex, FlexProps } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { showNotification } from '../services/core/notifications';
import { CoinAcquireResultDTO } from '../shared/dtos/CoinAcquireResultDTO';
import { QuestionDTO } from '../shared/dtos/QuestionDTO';
import { Environment } from '../static/Environemnt';
import { EpistoFont } from './controls/EpistoFont';
import { LoadingFramePropsType } from './system/LoadingFrame';
import { QuestionnaierAnswer } from './universal/QuestionnaireAnswer';
import { QuestionnaireLayout } from './universal/QuestionnaireLayout';

export const QuesitionView = (props: {
    answerQuesitonAsync: (answerId: number[]) => Promise<void>,
    correctAnswerIds: number[],
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

    const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);

    const handleSelectedAnswerAsync = async (answerId: number) => {

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
            'warning',
            {
                style: {
                    border: 'solid 2px gold',
                },
                icon: <img
                    src={Environment.getAssetUrl('images/epistoCoin.png')} />
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

        {!!coinsAcquired && <Flex
            mt="10px"
            borderRadius="5px"
            p="7px"
            align="center">

            <EpistoFont>
                +1 EpistoCoin megszerezve!
            </EpistoFont>

            <img
                src={Environment.getAssetUrl('images/epistoCoin.png')}
                className="square25"
                style={{ margin: '0px 0px 4px 4px' }} />
        </Flex>}
    </QuestionnaireLayout>;
};
