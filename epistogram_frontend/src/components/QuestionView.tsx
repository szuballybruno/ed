import { Flex, FlexProps } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { CoinAcquireResultDTO } from "../models/shared_models/CoinAcquireResultDTO";
import { QuestionDTO } from "../models/shared_models/QuestionDTO";
import { showNotification } from "../services/core/notifications";
import { getAssetUrl } from "../static/frontendHelpers";
import { LoadingFramePropsType } from "./system/LoadingFrame";
import { EpistoText } from "./universal/EpistoText";
import { QuestionnaierAnswer } from "./universal/QuestionnaireAnswer";
import { QuestionnaireLayout } from "./universal/QuestionnaireLayout";

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
    }

    // reset when question id changed 
    useEffect(() => {

        setSelectedAnswerId(null);
    }, [question.questionId]);

    // bonus coin 
    useEffect(() => {

        if (!bonusCoinsAcquired)
            return;

        const streakLength = bonusCoinsAcquired.reason === "answer_streak_5" ? 5 : 10;

        showNotification(
            `Sikeresen megszereztél ${bonusCoinsAcquired.amount} bónusz EpistoCoin-t ${streakLength} egymást követő helyes válaszért!`,
            "warning",
            {
                style: {
                    border: "solid 2px gold",
                },
                icon: () => <img
                    src={getAssetUrl("images/epistoCoin.png")} />
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
                    <EpistoText
                        isAutoFontSize
                        text={answer.answerText}
                        maxFontSize={16}
                        style={{
                            width: "100%"
                        }} />
                </QuestionnaierAnswer>;
            })}

        {!!coinsAcquired && <Flex
            mt="10px"
            borderRadius="5px"
            border="solid 2px gold"
            p="7px"
            align="center">

            <Typography>
                +1 EpistoCoin megszerezve!
            </Typography>

            <img
                src={getAssetUrl("images/epistoCoin.png")}
                className="square25"
                style={{ margin: "0px 0px 4px 4px" }} />
        </Flex>}
    </QuestionnaireLayout>
}
