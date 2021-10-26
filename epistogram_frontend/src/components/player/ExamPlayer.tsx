import React from "react";
import { usePaging } from "../../frontendHelpers";
import { CourseItemDTO } from "../../models/shared_models/CourseItemDTO";
import { ExamDTO } from "../../models/shared_models/ExamDTO";
import { useNavigation } from "../../services/navigatior";
import { ExamGreetSlide } from "../exam/ExamGreetSlide";
import { ExamQuestions } from "../exam/ExamQuestions";
import { ExamResultsSlide } from "../exam/ExamResultsSlide";
import { SlidesDisplay } from "../universal/SlidesDisplay";

export const ExamPlayer = (props: {
    nextCourseItem: CourseItemDTO,
    exam: ExamDTO,
    answerSessionId: number,
    setIsExamInProgress: (isExamStarted: boolean) => void
}) => {

    const {
        exam,
        setIsExamInProgress,
        answerSessionId,
        nextCourseItem
    } = props;

    const slidesState = usePaging([1, 2, 3]);
    const { navigateToPlayer } = useNavigation();

    const handleStartExam = () => {

        setIsExamInProgress(true);
        slidesState.next();
    }

    const handleExamFinished = () => {

        slidesState.next();
    }

    const handleContinueCourse = () => {

        setIsExamInProgress(false);
        navigateToPlayer(nextCourseItem.descriptorCode);
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
