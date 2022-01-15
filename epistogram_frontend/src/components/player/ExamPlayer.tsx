import React from "react";
import { ExamPlayerDataDTO } from "../../models/shared_models/ExamPlayerDataDTO";
import { useStartExam } from "../../services/api/examApiService";
import { useShowErrorDialog } from "../../services/core/notifications";
import { usePaging } from "../../static/frontendHelpers";
import { CourseOverview } from "../coureOverview/CourseOverview";
import { ExamGreetSlide } from "../exam/ExamGreetSlide";
import { ExamQuestions } from "../exam/ExamQuestions";
import { ExamResultsSlide } from "../exam/ExamResultsSlide";
import { SlidesDisplay } from "../universal/SlidesDisplay";

export const ExamPlayer = (props: {
    exam: ExamPlayerDataDTO,
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

    const { startExamAsync, startExamState } = useStartExam();
    const showError = useShowErrorDialog();

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

    const goToCourseOverview = () => {

        slidesState.setItem(3);
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
            slidesState={slidesState}
            answerSessionId={answerSessionId}
            questions={exam.questions}
            onExamFinished={handleExamFinished} />,

        () => <ExamResultsSlide
            continueCourse={handleContinueCourse}
            setIsExamInProgress={setIsExamInProgress}
            exam={exam}
            answerSessionId={answerSessionId}
            goToCourseOverview={goToCourseOverview} />,

        () => <CourseOverview />
    ];

    return <SlidesDisplay
        flex="1"
        slides={slides}
        index={slidesState.currentIndex} />
}
