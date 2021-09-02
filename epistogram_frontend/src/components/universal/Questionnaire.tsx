import React, { useState } from 'react';
import { Button, Typography } from "@material-ui/core";
import { Box, Flex } from '@chakra-ui/react';
import { AnswerDTO } from '../../models/shared_models/AnswerDTO';
import { QuestionDTO } from '../../models/shared_models/QuestionDTO';
import { useAnswerQuestion } from '../../services/questionnaireService';

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
    const { answerQuestion, correctAnswerId } = useAnswerQuestion();

    return (
        <Flex id="questionnaireRoot" direction="column">

            {/* title */}
            <Typography variant={"button"} style={{ fontSize: "18px" }}>
                {question.questionText}
            </Typography>

            {/* answers */}
            <Flex
                id="answersList"
                direction="column"
                alignItems="center"
                mt="20px"
                pointerEvents={correctAnswerId ? "none" : "all"}>
                {question
                    .answers
                    .map((answer, index) => <QuestionnaierAnswer
                        key={index}
                        answer={answer}
                        isCorrect={correctAnswerId === answer.answerId}
                        isIncorrect={selectedAnswerId === answer.answerId && correctAnswerId !== answer.answerId}
                        onClick={() => {

                            setSelectedAnswerId(answer.answerId);
                            answerQuestion(question.questionId, answer.answerId);
                            onAnswered();
                        }} />)}
            </Flex>
        </Flex>
    );
}