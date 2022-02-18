import React from "react";
import { useStartExam } from "../../../services/api/examApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { useShowErrorDialog } from "../../../services/core/notifications";
import { ExamPlayerDataDTO } from "../../../shared/dtos/ExamPlayerDataDTO";
import { usePaging } from "../../../static/frontendHelpers";
import { ExamGreetSlide } from "../../exam/ExamGreetSlide";
import { ExamQuestions } from "../../exam/ExamQuestions";
import { ExamResultsSlide } from "../../exam/ExamResultsSlide";
import { SlidesDisplay } from "../../universal/SlidesDisplay";

export const ExamPlayer = (props: {
    exam: ExamPlayerDataDTO,
    answerSessionId: number,
    courseId: number,
    continueCourse: () => void,
    setIsExamInProgress: (isExamStarted: boolean) => void
}) => {

    const {
        exam,
        setIsExamInProgress,
        answerSessionId,
        continueCourse,
        courseId
    } = props;

    const { startExamAsync, startExamState } = useStartExam();
    const showError = useShowErrorDialog();
    const { navigateToCourseRating } = useNavigation();

    const slidesState = usePaging([1, 2, 3, 4]);

    const handleStartExamAsync = async () => {

        try {
            await startExamAsync({ answerSessionId });
            setIsExamInProgress(true);
            slidesState.next();
        }
        catch (e) {

            showError(e);
        }
    }

    const handleExamFinished = () => {

        slidesState.next();
    }

    const goToCourseRating = () => {

        navigateToCourseRating(courseId);
    }

    const handleContinueCourse = () => {

        setIsExamInProgress(false);
        continueCourse();
    }

    const slides = [
        () => <ExamGreetSlide
            exam={exam}
            startExam={handleStartExamAsync} />,

        () => <ExamQuestions
            exam={exam}
            answerSessionId={answerSessionId}
            onExamFinished={handleExamFinished} />,

        () => <ExamResultsSlide
            continueCourse={handleContinueCourse}
            setIsExamInProgress={setIsExamInProgress}
            exam={exam}
            answerSessionId={answerSessionId}
            goToCourseRating={goToCourseRating} />
    ];

    return <SlidesDisplay
        flex="1"
        slides={slides}
        index={slidesState.currentIndex} />
}
