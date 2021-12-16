import React from "react";
import { ExamDTO } from "../../models/shared_models/ExamDTO";
import { useStartExam } from "../../services/api/examApiService";
import { useShowErrorDialog } from "../../services/core/notifications";
import { usePaging } from "../../static/frontendHelpers";
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

    const { startExamAsync, startExamState } = useStartExam();
    const showError = useShowErrorDialog();

    const slidesState = usePaging([1, 2, 3]);

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
            exam={exam}
            answerSessionId={answerSessionId} />
    ];

    return <SlidesDisplay
        flex="1"
        height="100%"
        slides={slides}
        index={slidesState.currentIndex} />
}
