import { FlexProps } from "@chakra-ui/react";
import React from 'react';
import { QuestionDTO } from '../../models/shared_models/QuestionDTO';
import { useAnswerQuestion } from '../../services/questionnaireService';
import { QuesitionView } from "../QuestionView";

export const VideoQuestionnaire = (props: {
    question: QuestionDTO,
    answerSessionId: number,
    onAnswered: () => void
} & FlexProps) => {

    const { question, onAnswered, answerSessionId, ...css } = props;
    const { answerQuestionAsync, answerResult, answerQuestionError, answerQuestionState } = useAnswerQuestion();

    const handleAnswerQuestionAsync = async (answerId) => {

        onAnswered();
        await answerQuestionAsync(answerSessionId, answerId, question.questionId);
    }

    return <QuesitionView
        answerQuesitonAsync={handleAnswerQuestionAsync}
        correctAnswerId={answerResult?.correctAnswerId ?? null}
        loadingProps={{ loadingState: answerQuestionState, error: answerQuestionError }}
        question={question}
        selectedAnswerId={answerResult?.givenAnswerId ?? null}
        {...css} />
}