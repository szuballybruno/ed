import {Flex, FlexProps} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {showNotification} from '../services/core/notifications';
import {CoinAcquireResultDTO} from '../shared/dtos/CoinAcquireResultDTO';
import {QuestionDTO} from '../shared/dtos/QuestionDTO';
import {Id} from '../shared/types/versionId';
import {Environment} from '../static/Environemnt';
import {EpistoFont} from './controls/EpistoFont';
import {LoadingFramePropsType} from './system/LoadingFrame';
import {QuestionnaierAnswer} from './universal/QuestionnaireAnswer';
import {QuestionnaireLayout} from './universal/QuestionnaireLayout';

export const QuesitionView = (props: {
    answerQuesitonAsync: (answerVersionId: Id<'AnswerVersion'>[]) => Promise<void>,
    correctAnswerVersionIds: Id<'AnswerVersion'>[],
    question: QuestionDTO,
    loadingProps: LoadingFramePropsType,
    onlyShowAnswers?: boolean,
    coinsAcquired: number | null,
    showCoinsAcquired?: boolean,
    bonusCoinsAcquired: CoinAcquireResultDTO | null
} & FlexProps) => {

    const {
        answerQuesitonAsync,
        correctAnswerVersionIds,
        question,
        loadingProps,
        onlyShowAnswers,
        coinsAcquired,
        showCoinsAcquired,
        bonusCoinsAcquired,
        ...css
    } = props;

    const isAnswered = correctAnswerVersionIds.length > 0;

    const [selectedAnswerVersionId, setSelectedAnswerVersionId] = useState<Id<'AnswerVersion'> | null>(null);

    const handleSelectedAnswerVersionAsync = async (answerVersionId: Id<'AnswerVersion'>) => {

        setSelectedAnswerVersionId(answerVersionId);
        await answerQuesitonAsync([answerVersionId]);
    };

    // reset when question id changed
    useEffect(() => {

        setSelectedAnswerVersionId(null);
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

                const answerVersionId = answer.answerVersionId;
                const isSelected = selectedAnswerVersionId === answerVersionId;
                const isCorrect = isAnswered && correctAnswerVersionIds.some(x => x === answerVersionId);
                const isIncorrect = isAnswered && isSelected && !isCorrect;

                return <QuestionnaierAnswer
                    key={index}
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

        {(!!coinsAcquired && showCoinsAcquired) && <Flex
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
        </Flex>}
    </QuestionnaireLayout>;
};
