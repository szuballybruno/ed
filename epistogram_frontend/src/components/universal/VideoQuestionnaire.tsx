import { Box, Flex, FlexProps } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useTimer, Timer } from "../../frontendHelpers";
import { QuestionDTO } from '../../models/shared_models/QuestionDTO';
import { useAnswerQuestion } from '../../services/questionnaireService';
import { QuesitionView } from "../QuestionView";
import { EpistoButton } from "./EpistoButton";

export const VideoQuestionnaire = (props: {
    question: QuestionDTO,
    answerSessionId: number,
    onAnswered: () => void,
    onClosed: () => void
} & FlexProps) => {

    const { question, onAnswered, answerSessionId, onClosed, ...css } = props;
    const { answerQuestionAsync, answerResult, answerQuestionError, answerQuestionState } = useAnswerQuestion();
    const isAnswered = !!answerResult?.givenAnswerId;
    const autoCloseSecs = 2;
    const timeoutMiliseconds = autoCloseSecs * 1000;

    const handleAnswerQuestionAsync = async (answerId) => {

        await answerQuestionAsync(answerSessionId, answerId, question.questionId);
        onAnswered();
    }

    const handleCloseDialog = () => {

        if (timer.isRunning) {

            timer.stop();
        }

        onClosed();
    }

    const pauseTimeout = () => {

        timer.stop();
    }

    const resumeTimeout = () => {

        timer.start();
    }

    const timer = useTimer(handleCloseDialog, timeoutMiliseconds);

    useEffect(() => {

        if (!isAnswered)
            return;

        timer.start();

    }, [isAnswered]);

    return <Flex direction="column">

        <QuesitionView
            answerQuesitonAsync={handleAnswerQuestionAsync}
            correctAnswerId={answerResult?.correctAnswerId ?? null}
            loadingProps={{ loadingState: answerQuestionState, error: answerQuestionError }}
            question={question}
            selectedAnswerId={answerResult?.givenAnswerId ?? null}
            {...css} />

        <Flex display={isAnswered ? undefined : "none"} justify="flex-end">

            <EpistoButton
                variant="colored"
                buttonProps={{
                    onMouseEnter: () => pauseTimeout(),
                    onMouseLeave: () => resumeTimeout()
                }}
                style={{ padding: "0" }}
                onClick={() => handleCloseDialog()}>

                <Box position="relative">

                    <Box
                        position="absolute"
                        top="0"
                        transition={`${autoCloseSecs}s linear`}
                        className="whall pauseAnimation"
                        bg="var(--mildGrey)"
                        style={{
                            animationName: "rightSlideAnimation",
                            animationDuration: `${autoCloseSecs}s`,
                            animationTimingFunction: "linear",
                            animationPlayState: timer.isRunning ? "running" : "paused"
                        }} />

                    <Typography style={{ position: "relative", margin: "10px" }}>
                        Bezárás
                    </Typography>
                </Box>
            </EpistoButton>
        </Flex>
    </Flex>
}