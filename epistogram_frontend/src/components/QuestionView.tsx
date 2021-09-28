import { FlexProps } from "@chakra-ui/react";
import React from 'react';
import { QuestionDTO } from "../models/shared_models/QuestionDTO";
import { LoadingFramePropsType } from "./HOC/LoadingFrame";
import { EpistoText } from "./universal/EpistoText";
import { QuestionnaierAnswer } from "./universal/QuestionnaireAnswer";
import { QuestionnaireLayout } from "./universal/QuestionnaireLayout";

export const QuesitionView = (props: {
    answerQuesitonAsync: (answerId: number) => Promise<void>,
    selectedAnswerId: number | null,
    correctAnswerId: number | null,
    question: QuestionDTO,
    loadingProps: LoadingFramePropsType
} & FlexProps) => {

    const {
        answerQuesitonAsync,
        correctAnswerId,
        selectedAnswerId,
        question,
        loadingProps,
        ...css
    } = props;

    return <QuestionnaireLayout
        buttonsEnabled={!correctAnswerId}
        title={question.questionText}
        loadingProps={loadingProps}
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

                        answerQuesitonAsync(answerId);
                    }}>
                    <EpistoText
                        isAutoFontSize
                        text={answer.answerText}
                        maxFontSize={20}
                        style={{
                            width: "100%"
                        }} />
                    {/* <Text fontSize="15px" textTransform="none">{answer.answerText}</Text> */}
                </QuestionnaierAnswer>;
            })}
    </QuestionnaireLayout>
}