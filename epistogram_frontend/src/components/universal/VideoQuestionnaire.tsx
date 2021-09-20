import { FlexProps, Text } from "@chakra-ui/react";
import React, { useState } from 'react';
import { QuestionDTO } from '../../models/shared_models/QuestionDTO';
import { useAnswerQuestion } from '../../services/questionnaireService';
import { EpistoText } from "./EpistoText";
import { QuestionnaierAnswer } from "./QuestionnaireAnswer";
import { QuestionnaireLayout } from './QuestionnaireLayout';

export const VideoQuestionnaire = (props: {
    question: QuestionDTO,
    answerSessionId: number,
    onAnswered: () => void
} & FlexProps) => {

    const { question, onAnswered, answerSessionId, ...css } = props;
    const [selectedAnswerId, setSelectedAnswerId] = useState(-1);
    const { answerQuestionAsync, correctAnswer, answerQuestionError, answerQuestionState } = useAnswerQuestion();
    const correctAnswerId = correctAnswer?.answerId;

    return (
        <QuestionnaireLayout
            buttonsEnabled={!correctAnswerId}
            loadingError={answerQuestionError}
            loadingState={answerQuestionState}
            title={question.questionText}
            {...css}>
            {question
                .answers
                .map((answer, index) => {

                    const answerId = answer.answerId;

                    return <QuestionnaierAnswer
                        key={index}
                        isCorrect={correctAnswerId === answerId}
                        isIncorrect={selectedAnswerId === answerId && correctAnswerId !== answerId}
                        mb="8px"
                        onClick={async () => {

                            setSelectedAnswerId(answerId);
                            onAnswered();

                            await answerQuestionAsync(answerSessionId, answerId, question.questionId);
                        }}>
                        <EpistoText
                            isAutoFontSize
                            text={answer.answerText}
                            style={{
                                width: "100%"
                            }} />
                        {/* <Text fontSize="15px" textTransform="none">{answer.answerText}</Text> */}
                    </QuestionnaierAnswer>;
                })}
        </QuestionnaireLayout>
    );
}