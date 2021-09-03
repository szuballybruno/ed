import React, { useState } from 'react';
import { Button, Typography } from "@material-ui/core";
import { Box, Flex } from '@chakra-ui/react';
import { AnswerDTO } from '../../models/shared_models/AnswerDTO';
import { QuestionDTO } from '../../models/shared_models/QuestionDTO';
import { useAnswerQuestion } from '../../services/questionnaireService';
import { LoadingFrame } from '../../HOC/LoadingFrame';

const QuestionnaierAnswer = (props: {
    answer: AnswerDTO,
    onClick: () => void,
    isIncorrect: boolean,
    isCorrect: boolean
}) => {

    const { answer, onClick, isIncorrect, isCorrect } = props;

    const getBg = () => {

        if (isIncorrect)
            return "#fa6767";

        if (isCorrect)
            return "#7cf25e";

        return "white";
    }

    return <Box p="5px">
        <Button
            variant={"contained"}
            onClick={() => onClick()}
            style={{ background: getBg() }}>
            {answer.answerText}
        </Button>
    </Box>
}

export const Questionnaire = (props: {
    question: QuestionDTO,
    onAnswered: () => void
}) => {

    const { question, onAnswered } = props;
    const [selectedAnswerId, setSelectedAnswerId] = useState(-1);
    const { answerQuestionAsync, correctAnswer, answerQuestionError, answerQuestionState } = useAnswerQuestion();
    const correctAnswerId = correctAnswer?.answerId;

    return (
        <Flex id="questionnaireRoot" direction="column">

            {/* title */}
            <Typography variant={"button"} style={{ fontSize: "18px" }}>
                {question.questionText}
            </Typography>

            {/* answers */}
            <LoadingFrame loadingState={answerQuestionState} error={answerQuestionError}>
                <Flex
                    id="answersList"
                    direction="column"
                    alignItems="center"
                    mt="20px"
                    pointerEvents={correctAnswerId ? "none" : "all"}>
                    {question
                        .answers
                        .map((answer, index) => {

                            const answerId = answer.answerId;

                            return <QuestionnaierAnswer
                                key={index}
                                answer={answer}
                                isCorrect={correctAnswerId === answerId}
                                isIncorrect={selectedAnswerId === answerId && correctAnswerId !== answerId}
                                onClick={async () => {

                                    setSelectedAnswerId(answerId);
                                    onAnswered();

                                    await answerQuestionAsync(answerId, question.questionId);
                                }} />;
                        })}
                </Flex>
            </LoadingFrame>
        </Flex>
    );
}