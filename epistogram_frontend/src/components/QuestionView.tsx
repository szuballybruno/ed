import { FlexProps } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import { QuestionDTO } from "../models/shared_models/QuestionDTO";
import { QuestionTypeEnum } from "../models/shared_models/types/sharedTypes";
import { LoadingFramePropsType } from "./HOC/LoadingFrame";
import { EpistoButton } from "./universal/EpistoButton";
import { EpistoText } from "./universal/EpistoText";
import { QuestionnaierAnswer } from "./universal/QuestionnaireAnswer";
import { QuestionnaireLayout } from "./universal/QuestionnaireLayout";

export const QuesitionView = (props: {
    answerQuesitonAsync: (answerId: number[]) => Promise<void>,
    correctAnswerIds: number[],
    question: QuestionDTO,
    loadingProps: LoadingFramePropsType,
    onlyShowAnswers?: boolean,
} & FlexProps) => {

    const {
        answerQuesitonAsync,
        correctAnswerIds,
        question,
        loadingProps,
        onlyShowAnswers,
        ...css
    } = props;

    const [selectedAnswerIds, setSelectedAnswerIds] = useState<number[]>([]);

    const toggleSelectedAnswer = (answerId: number) => {

        if (selectedAnswerIds.some(x => x === answerId)) {

            if (question.typeId === QuestionTypeEnum.multipleAnswers)
                setSelectedAnswerIds(selectedAnswerIds.filter(x => x !== answerId));
        }
        else {

            if (question.typeId === QuestionTypeEnum.multipleAnswers) {

                setSelectedAnswerIds([...selectedAnswerIds, answerId]);
            }
            else {

                setSelectedAnswerIds([answerId]);
            }
        }
    }

    const isAnswered = correctAnswerIds.length > 0;

    console.log(question.questionId);

    useEffect(() => {

        console.log("clear")
        setSelectedAnswerIds([]);
    }, [question.questionId]);

    return <QuestionnaireLayout
        contentClickable={!isAnswered}
        title={question.questionText}
        loadingProps={loadingProps}
        onlyShowAnswers={onlyShowAnswers}
        answerAction={isAnswered ? undefined : () => answerQuesitonAsync(selectedAnswerIds)}
        {...css}>
        {question
            .answers
            .map((answer, index) => {

                const answerId = answer.answerId;
                const isSelected = selectedAnswerIds.some(x => x === answerId);
                const isCorrect = isAnswered && correctAnswerIds.some(x => x === answerId);
                const isIncorrect = isAnswered && isSelected && !isCorrect;

                return <QuestionnaierAnswer
                    key={index}
                    isCorrect={isCorrect}
                    isIncorrect={isIncorrect}
                    isSelected={isSelected}
                    mb="8px"
                    onClick={() => toggleSelectedAnswer(answerId)}>
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