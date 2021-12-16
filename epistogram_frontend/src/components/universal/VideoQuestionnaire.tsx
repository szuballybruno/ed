import { Flex, FlexProps } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useReactTimer } from "../../helpers/reactTimer";
import { QuestionDTO } from '../../models/shared_models/QuestionDTO';
import { useAnswerQuestion } from "../../services/api/playerApiService";
import { epochDates } from "../../static/frontendHelpers";
import { QuesitionView } from "../QuestionView";
import { EpistoButton } from "./EpistoButton";
import { TimeoutFrame } from "./TimeoutFrame";

export const VideoQuestionnaire = (props: {
    question: QuestionDTO,
    answerSessionId: number,
    isShowing: boolean,
    onAnswered: () => void,
    onClosed: () => void
} & FlexProps) => {

    const { question, isShowing, onAnswered, answerSessionId, onClosed, ...css } = props;
    const { answerQuestionAsync, answerResult, answerQuestionError, answerQuestionState } = useAnswerQuestion();
    const isAnswered = !!answerResult;
    const autoCloseSecs = 2;
    const [showUpTime, setShowUpTime] = useState<Date>(new Date());

    const handleAnswerQuestionAsync = async (answerId) => {

        const timeElapsed = epochDates(new Date(), showUpTime);
        await answerQuestionAsync(answerSessionId, answerId, question.questionId, timeElapsed);
        onAnswered();
    }

    const handleCloseDialog = () => {

        onClosed();
    }

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

    return <Flex direction="column">

        <QuesitionView
            answerQuesitonAsync={handleAnswerQuestionAsync}
            correctAnswerIds={answerResult?.correctAnswerIds ?? []}
            loadingProps={{ loadingState: answerQuestionState, error: answerQuestionError }}
            question={question}
            coinsAcquired={answerResult?.coinAcquires?.normal?.amount ?? null}
            bonusCoinsAcquired={answerResult?.coinAcquires?.bonus ?? null}
            {...css} />

        <Flex display={isAnswered ? undefined : "none"} justify="flex-end">

            <EpistoButton
                variant="colored"
                style={{ padding: "0" }}
                onClick={() => handleCloseDialog()}>

                <TimeoutFrame reactTimer={reactTimer}>
                    <Typography style={{ position: "relative", margin: "10px" }}>
                        Bezárás
                    </Typography>
                </TimeoutFrame>
            </EpistoButton>
        </Flex>
    </Flex>
}