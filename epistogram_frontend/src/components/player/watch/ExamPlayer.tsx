import React from 'react';
import {useFinishExam, useStartExam} from '../../../services/api/examApiService';
import {useNavigation} from '../../../services/core/navigatior';
import {useShowErrorDialog} from '../../../services/core/notifications';
import {ExamPlayerDataDTO} from '../../../shared/dtos/ExamPlayerDataDTO';
import {Id} from '../../../shared/types/versionId';
import {usePaging} from '../../../static/frontendHelpers';
import {ExamGreetSlide} from '../../exam/ExamGreetSlide';
import {ExamQuestions} from '../../exam/ExamQuestions';
import {ExamResultsSlide} from '../../exam/ExamResultsSlide';
import {EpistoPaging} from '../../universal/EpistoPaging';

export const ExamPlayer = (props: {
    exam: ExamPlayerDataDTO,
    answerSessionId: Id<'AnswerSession'>,
    courseId: Id<'Course'>,
    continueCourse: () => void,
    isExamInProgress: boolean,
    setIsExamInProgress: (isExamStarted: boolean) => void
}) => {

    const {
        exam,
        setIsExamInProgress,
        answerSessionId,
        continueCourse,
        courseId,
        isExamInProgress
    } = props;

    const { startExamAsync, startExamState } = useStartExam();
    const showError = useShowErrorDialog();
    const { navigateToCourseRating } = useNavigation();

    const examWorkflowSlides = usePaging({ items: [1, 2, 3, 4] });

    const { finishExamAsync } = useFinishExam();

    const handleStartExamAsync = async () => {

        try {
            await startExamAsync({ answerSessionId });
            setIsExamInProgress(true);
            examWorkflowSlides.next();
        }
        catch (e) {

            showError(e);
        }
    };

    const handleExamFinished = async () => {

        await finishExamAsync({ answerSessionId });
        examWorkflowSlides.next();
    };

    const handleAbortExam = () => {

        examWorkflowSlides.setItem(0);
        setIsExamInProgress(false);
    };

    const goToCourseRating = () => {

        navigateToCourseRating(courseId);
    };

    const handleContinueCourse = () => {

        setIsExamInProgress(false);
        continueCourse();
    };

    const examWorkflowPages = [
        () => <ExamGreetSlide
            exam={exam}
            startExam={handleStartExamAsync} />,

        () => <ExamQuestions
            exam={exam}
            answerSessionId={answerSessionId}
            onExamFinished={handleExamFinished}
            handleAbortExam={handleAbortExam}
            isExamInProgress={isExamInProgress}/>,

        () => <ExamResultsSlide
            continueCourse={handleContinueCourse}
            setIsExamInProgress={setIsExamInProgress}
            exam={exam}
            answerSessionId={answerSessionId}
            goToCourseRating={goToCourseRating} />
    ];

    return <EpistoPaging
        flex="1"
        slides={examWorkflowPages}
        index={examWorkflowSlides.currentIndex} />;
};
