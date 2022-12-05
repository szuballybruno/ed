import React from 'react';
import { useFinishExam, useStartExam } from '../../../services/api/examApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { ExamPlayerDataDTO } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { usePaging } from '../../../static/frontendHelpers';
import { ExamGreetSlide } from '../../exam/ExamGreetSlide';
import { ExamQuestions } from '../../exam/ExamQuestions';
import { ExamResultsSlide } from '../../exam/ExamResultsSlide';
import { EpistoPaging } from '../../universal/EpistoPaging';
import { useVideoPlayerFullscreenContext } from './videoPlayer/VideoPlayerFullscreenFrame';
import { WatchSubpageState } from './WatchSubpage';
import { Responsivity } from '../../../helpers/responsivity';
import { EpistoFlex2 } from '../../controls/EpistoFlex';

export const ExamPlayer = (props: {
    exam: ExamPlayerDataDTO,
    answerSessionId: Id<'AnswerSession'>,
    courseId: Id<'Course'>,
    continueCourse: () => void,
    handleBackToPlayer: () => void,
    watchSubpageState: WatchSubpageState,
    setWatchSubpageState: React.Dispatch<React.SetStateAction<WatchSubpageState>>
}) => {

    const {
        exam,
        setWatchSubpageState,
        answerSessionId,
        continueCourse,
        handleBackToPlayer,
        courseId,
        watchSubpageState
    } = props;

    const { startExamAsync, startExamState } = useStartExam();
    const showError = useShowErrorDialog();
    const { navigateToCourseRating } = useNavigation();
    const { isMobile } = Responsivity
        .useIsMobileView();
    const [isFullscreen, setIsFullscreen] = useVideoPlayerFullscreenContext();

    const examWorkflowSlides = usePaging({ items: [1, 2, 3, 4] });

    const { finishExamAsync } = useFinishExam();

    const handleStartExamAsync = async () => {

        try {
            await startExamAsync({ answerSessionId });
            if (isMobile) {

                setIsFullscreen(true);
            }
            setWatchSubpageState('examInProgress');
            examWorkflowSlides.next();
        }
        catch (e) {

            showError(e);
        }
    };

    const handleExamFinished = async () => {

        await finishExamAsync({ answerSessionId });
        if (isMobile) {

            setIsFullscreen(false);
        }
        setWatchSubpageState('examResults');
        examWorkflowSlides.next();
    };

    const handleAbortExam = () => {

        examWorkflowSlides.setItem(0);
        if (isMobile) {

            setIsFullscreen(false);
        }
        setWatchSubpageState('examStart');
    };

    const goToCourseRating = () => {

        navigateToCourseRating(courseId);
    };

    const handleContinueCourse = () => {

        setWatchSubpageState('watch');
        continueCourse();
    };

    const examWorkflowPages = [
        () => <ExamGreetSlide
            exam={exam}
            handleBackToPlayer={handleBackToPlayer}
            startExam={handleStartExamAsync} />,

        () => <ExamQuestions
            exam={exam}
            answerSessionId={answerSessionId}
            onExamFinished={handleExamFinished}
            handleAbortExam={handleAbortExam}
            isExamInProgress={watchSubpageState === 'examInProgress'} />,

        () => <ExamResultsSlide
            continueCourse={handleContinueCourse}
            setWatchSubpageState={setWatchSubpageState}
            exam={exam}
            answerSessionId={answerSessionId}
            goToCourseRating={goToCourseRating} />
    ];

    return (
        <EpistoFlex2
            height={isMobile ? '100vh' : undefined}>

            <EpistoPaging
                slides={examWorkflowPages}
                index={examWorkflowSlides.currentIndex} />;
        </EpistoFlex2>
    );
};
