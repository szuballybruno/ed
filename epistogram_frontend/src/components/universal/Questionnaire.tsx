import React, { useState } from 'react';
import { QuestionDTO } from '../../models/shared_models/QuestionDTO';
import { useAnswerQuestion } from '../../services/questionnaireService';
import { QuestionnaierAnswer, QuestionnaireLayout } from './QuestionnaireLayout';

export const Questionnaire = (props: {
    question: QuestionDTO,
    onAnswered: () => void
}) => {

    const { question, onAnswered } = props;
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

                            await answerQuestionAsync(answerId, question.questionId);
                        }}>
                        {answer.answerText}
                    </QuestionnaierAnswer>;
                })}
        </QuestionnaireLayout>
    );
}