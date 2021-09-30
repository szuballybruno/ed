import { Box, Flex, FlexProps } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import React, { useEffect } from 'react';
import { createTimer } from "../../frontendHelpers";
import { QuestionDTO } from '../../models/shared_models/QuestionDTO';
import { useAnswerQuestion } from '../../services/questionnaireService';
import { QuesitionView } from "../QuestionView";
import { EpistoButton } from "./EpistoButton";
import { TimeoutFrame, useTimeoutFrameLogic } from "./TimeoutFrame";

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

    const handleAnswerQuestionAsync = async (answerId) => {

        await answerQuestionAsync(answerSessionId, answerId, question.questionId);
        onAnswered();
    }

    const handleCloseDialog = () => {

        onClosed();
    }

    const timeoutFrameLogic = useTimeoutFrameLogic(autoCloseSecs, handleCloseDialog);

    useEffect(() => {

        if (!isAnswered)
            return;

        timeoutFrameLogic.start();

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
                    // onMouseEnter: () => pauseTimeout(),
                    // onMouseLeave: () => resumeTimeout()
                }}
                style={{ padding: "0" }}
                onClick={() => handleCloseDialog()}>

                <TimeoutFrame logic={timeoutFrameLogic}>
                    <Typography style={{ position: "relative", margin: "10px" }}>
                        Bezárás
                    </Typography>
                </TimeoutFrame>
            </EpistoButton>
        </Flex>
    </Flex>
}