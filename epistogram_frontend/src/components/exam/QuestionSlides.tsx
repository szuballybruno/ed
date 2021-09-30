import { Typography } from "@mui/material";
import { useState } from "react";
import { usePaging } from "../../frontendHelpers";
import { QuestionAnswerDTO } from "../../models/shared_models/QuestionAnswerDTO";
import { QuestionDTO } from "../../models/shared_models/QuestionDTO";
import { LinearProgressWithLabel } from "../signup/ProgressIndicator";
import { SignupRadioGroup } from "../signup/SignupRadioGroup";
import { SignupWrapper } from "../signup/SignupWrapper";

export const QuestionSlides = (props: {
    onAnswerSelected: (questionAnswer: QuestionAnswerDTO) => void,
    onPrevoiusOverNavigation?: () => void,
    onNextOverNavigation?: () => void,
    upperTitle?: string,
    questions: QuestionDTO[],
    getSelectedAnswerId: (questionId: number) => number | null,
    getCorrectAnswerId?: (questionId: number) => number | null,
    clearAnswerCache?: () => void,
}) => {

    const {
        onNextOverNavigation,
        onPrevoiusOverNavigation,
        onAnswerSelected,
        getSelectedAnswerId,
        getCorrectAnswerId,
        clearAnswerCache,
        upperTitle,
        questions
    } = props;


    // questionnaire 
    const questionnaireState = usePaging(questions, onPrevoiusOverNavigation, onNextOverNavigation);
    const currentQuestion = questionnaireState.currentItem;
    const questionnaireProgressbarValue = (questionnaireState.currentIndex / questions.length) * 100;
    const questionnaireProgressLabel = `${questionnaireState.currentIndex + 1}/${questions.length}`;

    const handleAnswerSelectedAsync = async (answerId: number) => {

        const questionAnswerDTO = {
            answerId,
            questionId: currentQuestion.questionId
        } as QuestionAnswerDTO;

        onAnswerSelected(questionAnswerDTO);
    }

    const selectedAnswerId = getSelectedAnswerId(currentQuestion.questionId);
    const correctAnswerId = getCorrectAnswerId
        ? getCorrectAnswerId(currentQuestion.questionId)
        : null;

    const handleNext = () => {

        if (clearAnswerCache)
            clearAnswerCache();

        questionnaireState.next();
    }

    return <SignupWrapper
        title={currentQuestion.questionText}
        upperTitle={upperTitle}
        nextButtonTitle="Kovetkezo"
        onNext={selectedAnswerId ? handleNext : undefined}
        currentImage={currentQuestion.imageUrl!}
        bottomComponent={<LinearProgressWithLabel value={questionnaireProgressbarValue} />}
        upperComponent={<Typography>{questionnaireProgressLabel}</Typography>}>

        <SignupRadioGroup
            answers={currentQuestion.answers}
            onAnswerSelected={x => handleAnswerSelectedAsync(x)}
            selectedAnswerId={selectedAnswerId}
            correctAnswerId={correctAnswerId}
        />
    </SignupWrapper>
}