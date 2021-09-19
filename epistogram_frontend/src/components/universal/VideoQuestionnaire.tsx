import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { QuestionDTO } from '../../models/shared_models/QuestionDTO';
import { useAnswerQuestion } from '../../services/questionnaireService';
import { QuestionnaierAnswer, QuestionnaireLayout } from './QuestionnaireLayout';
import { Text } from "@chakra-ui/react"

export const VideoQuestionnaire = (props: {
    question: QuestionDTO,
    answerSessionId: number,
    onAnswered: () => void
}) => {

    const { question, onAnswered, answerSessionId } = props;
    const [selectedAnswerId, setSelectedAnswerId] = useState(-1);
    const { answerQuestionAsync, correctAnswer, answerQuestionError, answerQuestionState } = useAnswerQuestion();
    const correctAnswerId = correctAnswer?.answerId;

    return (
        <QuestionnaireLayout
            buttonsEnabled={!correctAnswerId}
            loadingError={answerQuestionError}
            title={question.questionText}
            loadingState={answerQuestionState}>
            {question
                .answers
                .map((answer, index) => {

                    const answerId = answer.answerId;

                    return <QuestionnaierAnswer
                        key={index}
                        isCorrect={correctAnswerId === answerId}
                        isIncorrect={selectedAnswerId === answerId && correctAnswerId !== answerId}
                        onClick={async () => {

                            setSelectedAnswerId(answerId);
                            onAnswered();

                            await answerQuestionAsync(answerSessionId, answerId, question.questionId);
                        }}>
                        <Text fontSize="13px">{answer.answerText}</Text>
                    </QuestionnaierAnswer>;
                })}
        </QuestionnaireLayout>
    );
}