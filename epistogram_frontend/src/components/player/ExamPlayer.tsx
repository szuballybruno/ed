import React from "react";
import { usePaging } from "../../static/frontendHelpers";
import { CourseItemDTO } from "../../models/shared_models/CourseItemDTO";
import { CourseNextItemDTO } from "../../models/shared_models/CourseNextItemDTO";
import { ExamDTO } from "../../models/shared_models/ExamDTO";
import { useNavigation } from "../../services/core/navigatior";
import { ExamGreetSlide } from "../exam/ExamGreetSlide";
import { ExamQuestions } from "../exam/ExamQuestions";
import { ExamResultsSlide } from "../exam/ExamResultsSlide";
import { SlidesDisplay } from "../universal/SlidesDisplay";

export const ExamPlayer = (props: {
    exam: ExamDTO,
    answerSessionId: number,
    continueCourse: () => void,
    setIsExamInProgress: (isExamStarted: boolean) => void
}) => {

    const {
        exam,
        setIsExamInProgress,
        answerSessionId,
        continueCourse
    } = props;

    const slidesState = usePaging([1, 2, 3]);

    const handleStartExam = () => {

        setIsExamInProgress(true);
        slidesState.next();
    }

    const handleExamFinished = () => {

        slidesState.next();
    }

    const handleContinueCourse = () => {

        setIsExamInProgress(false);
        continueCourse();
    }

    const slides = [
        () => <ExamGreetSlide
            exam={exam}
            startExam={handleStartExam} />,

        () => <ExamQuestions
            exam={exam}
            slidesState={slidesState}
            answerSessionId={answerSessionId}
            questions={exam.questions}
            onExamFinished={handleExamFinished} />,

        () => <ExamResultsSlide
            continueCourse={handleContinueCourse}
            exam={exam}
            answerSessionId={answerSessionId} />
    ];

    return <SlidesDisplay
        flex="1"
        height="100%"
        slides={slides}
        index={slidesState.currentIndex} />
}
