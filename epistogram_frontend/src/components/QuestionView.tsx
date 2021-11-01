import { FlexProps } from "@chakra-ui/react";
import React from 'react';
import { QuestionDTO } from "../models/shared_models/QuestionDTO";
import { LoadingFramePropsType } from "./HOC/LoadingFrame";
import { EpistoText } from "./universal/EpistoText";
import { QuestionnaierAnswer } from "./universal/QuestionnaireAnswer";
import { QuestionnaireLayout } from "./universal/QuestionnaireLayout";

export const QuesitionView = (props: {
    answerQuesitonAsync: (answerId: number) => Promise<void>,
    selectedAnswerIds: number[],
    correctAnswerIds: number[],
    question: QuestionDTO,
    loadingProps: LoadingFramePropsType,
    onlyShowAnswers?: boolean,
} & FlexProps) => {

    const {
        answerQuesitonAsync,
        correctAnswerIds,
        selectedAnswerIds,
        question,
        loadingProps,
        onlyShowAnswers,
        ...css
    } = props;

    return <QuestionnaireLayout
        buttonsEnabled={correctAnswerIds.length > 0}
        title={question.questionText}
        loadingProps={loadingProps}
        onlyShowAnswers={onlyShowAnswers}
        {...css}>
        {question
            .answers
            .map((answer, index) => {

                const answerId = answer.answerId;

                return <QuestionnaierAnswer
                    key={index}
                    isCorrect={correctAnswerIds.some(x => x === answerId)}
                    isIncorrect={selectedAnswerIds.some(x => x === answerId) && !correctAnswerIds.some(x => x === answerId)}
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
                </QuestionnaierAnswer>;
            })}
    </QuestionnaireLayout>
}