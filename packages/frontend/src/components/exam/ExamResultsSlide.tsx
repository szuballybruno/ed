import { Id } from '@episto/commontypes';
import { ExamPlayerDataDTO } from '@episto/communication';
import { ExpandMore } from '@mui/icons-material';
import { useEffect } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { Responsivity } from '../../helpers/responsivity';
import { useExamResults } from '../../services/api/examApiService';
import { useNavigation } from '../../services/core/navigatior';
import { ArrayBuilder } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { ChipSmall } from '../administration/courses/ChipSmall';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { MUI } from '../controls/MUIControls';
import { useVideoPlayerFullscreenContext } from '../player/watch/videoPlayer/VideoPlayerFullscreenFrame';
import { WatchSubpageState } from '../player/watch/WatchSubpage';
import { ExamLayout } from './ExamLayout';
import { ExamResultStats } from './ExamResultStats';
import { QuestionAnswer } from './QuestionAnswer';

export const ExamResultsSlide = (props: {
    exam: ExamPlayerDataDTO,
    setWatchSubpageState: React.Dispatch<React.SetStateAction<WatchSubpageState>>
    continueCourse: () => void,
    answerSessionId: Id<'AnswerSession'>,
    goToCourseRating: () => void
}) => {

    const { answerSessionId, goToCourseRating, continueCourse, setWatchSubpageState, exam } = props;
    const { examResults } = useExamResults(answerSessionId);
    const questionsAnswers = examResults?.questions ?? [];
    const { navigate2 } = useNavigation();
    const { isMobile } = Responsivity
        .useIsMobileView();

    const [isFullscreen, setIsFullscreen] = useVideoPlayerFullscreenContext();

    const courseId = Id.create<'Course'>(1);

    // effects
    useEffect(() => {

        if (exam.isFinalExam)
            setWatchSubpageState('watch');
    }, [exam]);

    return <ExamLayout
        justify='flex-start'
        headerCenterText={exam.title}
        headerButtons={new ArrayBuilder()
            .addIf(!exam.isFinalExam, {
                title: translatableTexts.exam.continueCourse,
                action: continueCourse
            })
            .addIf(!!exam.isFinalExam, {
                title: 'Kurzus értékelése',
                action: goToCourseRating
            })
            .addIf(!!exam.isFinalExam, {
                title: 'Kurzus összegzése',
                action: () => {

                    navigate2(applicationRoutes.playerRoute.courseOverviewRoute, { courseId });
                }
            })
            .addIf(!!exam.isFinalExam && !isMobile, {
                title: 'Vissza a tanfolyamkeresőbe',
                action: () => {

                    if (isMobile) {
                        setIsFullscreen(false);
                    }

                    navigate2(applicationRoutes.availableCoursesRoute);
                }
            })
            .getArray()}
        footerButtons={new ArrayBuilder()
            .addIf(!exam.isFinalExam, {
                title: translatableTexts.exam.continueCourse,
                action: continueCourse
            })
            .addIf(!!exam.isFinalExam && !isMobile, {
                title: 'Kurzus értékelése',
                action: goToCourseRating
            })
            .addIf(!!exam.isFinalExam && !isMobile, {
                title: 'Kurzus összegzése',
                action: () => {

                    navigate2(applicationRoutes.playerRoute.courseOverviewRoute, { courseId });
                }
            })
            .addIf(!!exam.isFinalExam, {
                title: 'Vissza a tanfolyamkeresőbe',
                action: () => {

                    if (isMobile) {
                        setIsFullscreen(false);
                    }

                    navigate2(applicationRoutes.availableCoursesRoute);
                }
            })
            .getArray()}>

        <EpistoFlex2
            direction="column"
            className='roundBorders mildShadow'
            width='100%'
            height={isMobile ? undefined : '100%'}
            flex='1'
            background='var(--transparentWhite70)'
            px={isMobile ? '10px' : '20px'}
            justify='flex-start'>

            {/* title */}
            <EpistoFont
                className="fontHuge"
                style={{
                    padding: '20px 0 20px 0'
                }}>
                {translatableTexts.exam.resultsTitle}
            </EpistoFont>

            {/* stats */}
            <ExamResultStats
                stats={examResults?.examStats ?? null} />

            {/* results */}
            <EpistoFlex2
                id="resultsRoot"
                flex="1"
                direction="column">

                {/* list header */}
                <EpistoFlex2
                    alignItems={'center'}
                    mt="20px"
                    justifyContent={'space-between'}>

                    <EpistoFlex2 flex='1'>
                        <EpistoFont
                            className="fontHuge">
                            {translatableTexts.exam.questionsLabel}
                        </EpistoFont>
                    </EpistoFlex2>

                </EpistoFlex2>

                {/* answers */}
                <EpistoFlex2
                    id="answersRoot"
                    direction={'column'}
                    flex={1}
                    margin={isMobile ? '10px 0 5px 0' : '10px 5px 5px 5px'}
                    pb='20px'
                    height='100%'
                    boxSizing='border-box'>

                    {questionsAnswers
                        .map((question, index) => {

                            const displayState = (() => {

                                if (question.state === 'CORRECT')
                                    return { color: 'var(--mildGreen)', text: translatableTexts.exam.correctAnswer };

                                if (question.state === 'MIXED')
                                    return { color: 'var(--deepOrange)', text: 'Részben helyes' };

                                if (question.state === 'INCORRECT')
                                    return { color: 'var(--mildRed)', text: translatableTexts.exam.incorrectAnswer };

                                throw new Error('Incorrect state!');
                            })();

                            return <MUI.Accordion
                                key={index}>

                                {/* question */}
                                <MUI.AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">

                                    <EpistoFlex2 flex={isMobile ? '2' : '1'}>
                                        <EpistoFont margin={{ right: 'px5' }}>
                                            {question.text}
                                        </EpistoFont>
                                    </EpistoFlex2>

                                    <EpistoFlex2
                                        align={isMobile ? 'center' : undefined}
                                        justify={isMobile ? 'center' : undefined}
                                        direction={isMobile ? 'column' : 'row'}
                                        flexBasis={!isMobile ? '220px' : undefined}>

                                        <EpistoFont>

                                            ({question.score}/{question.maxScore} pont)
                                        </EpistoFont>

                                        <ChipSmall
                                            style={{
                                                margin: isMobile ? '10px 10px 0 30px' : '0 10px 0 30px'
                                            }}
                                            text={displayState.text}
                                            color={displayState.color} />

                                    </EpistoFlex2>
                                </MUI.AccordionSummary>

                                {/* answers */}
                                <MUI.AccordionDetails>
                                    <EpistoFlex2
                                        direction="column"
                                        flex={1}>
                                        {question
                                            .answers
                                            .map((answer, index) => {

                                                return <QuestionAnswer
                                                    key={index}
                                                    margin="5px"
                                                    answerText={answer.answerText}
                                                    isSelected={answer.isGiven}
                                                    isCorrect={answer.isCorrect} />;
                                            })}
                                    </EpistoFlex2>
                                </MUI.AccordionDetails>
                            </MUI.Accordion>;
                        })}
                </EpistoFlex2>
            </EpistoFlex2>
        </EpistoFlex2>
    </ExamLayout>;
};
