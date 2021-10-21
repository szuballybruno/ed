import { usePaging } from "../../frontendHelpers";
import { ExamDTO } from "../../models/shared_models/ExamDTO";
import { QuestionnaireSlide } from "../QuestionnaireSlide";
import { SlidesDisplay } from "../universal/SlidesDisplay";
import React from "react";
import {useExamResults} from "../../services/examService";
import ResultsSlide from "../exam/ResultsSlide";
import {GreetSlide} from "../exam/GreetSlide";

export const ExamPlayer = (props: {
    exam: ExamDTO,
    answerSessionId: number,
    setIsExamInProgress: (isExamStarted: boolean) => void
}) => {

    const {
        exam,
        setIsExamInProgress,
        answerSessionId,
    } = props;

    const { examResults } = useExamResults(answerSessionId);
    const questions = examResults?.questions ?? [];

    const slidesState = usePaging([1, 2, 3, 4]);

    const handleExamFinished = () => {

        setIsExamInProgress(false);
        slidesState.next();
    }

    const slides = [
        () => <GreetSlide
            slidesState={slidesState}
            {...props}  />,
        () => <QuestionnaireSlide
            slidesState={slidesState}
            answerSessionId={answerSessionId}
            questions={exam.questions}
            onExamFinished={handleExamFinished}  />,
        () => <ResultsSlide {...props} />
    ];

    return <SlidesDisplay
        flex="1"
        height="100%"
        slides={slides}
        index={slidesState.currentIndex}
    />
}
