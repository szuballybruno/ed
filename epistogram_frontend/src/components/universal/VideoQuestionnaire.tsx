import { FlexProps } from "@chakra-ui/react";
import React, { useState } from 'react';
import { QuestionDTO } from '../../models/shared_models/QuestionDTO';
import { useAnswerQuestion } from '../../services/questionnaireService';
import { QuesitionView } from "../QuestionView";

export const VideoQuestionnaire = (props: {
    question: QuestionDTO,
    answerSessionId: number,
    onAnswered: () => void
} & FlexProps) => {

    const { question, onAnswered, answerSessionId, ...css } = props;
    const [selectedAnswerId, setSelectedAnswerId] = useState(-1);
    const { answerQuestionAsync, correctAnswer, answerQuestionError, answerQuestionState } = useAnswerQuestion();
    const correctAnswerId = correctAnswer?.answerId ?? null;

    const handleAnswerQuestionAsync = async (answerId) => {

        setSelectedAnswerId(answerId);
        onAnswered();

        await answerQuestionAsync(answerSessionId, answerId, question.questionId);
    }

    return <QuesitionView
        answerQuesitonAsync={handleAnswerQuestionAsync}
        correctAnswerId={correctAnswerId}
        loadingProps={{ loadingState: answerQuestionState, error: answerQuestionError }}
        question={question}
        selectedAnswerId={selectedAnswerId} />
}