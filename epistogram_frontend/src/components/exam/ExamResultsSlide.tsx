import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { useEffect } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useExamResults } from '../../services/api/examApiService';
import { useNavigation } from '../../services/core/navigatior';
import { ExamPlayerDataDTO } from '../../shared/dtos/ExamPlayerDataDTO';
import { Id } from '../../shared/types/versionId';
import { ArrayBuilder } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { ChipSmall } from '../administration/courses/ChipSmall';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
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

    const courseId = Id.create<'Course'>(1);

    // effects
    useEffect(() => {

        if (exam.isFinalExam)
            setWatchSubpageState('watch');
    }, [exam]);

    return <ExamLayout
        justify='flex-start'
        headerCenterText={exam.title}
        showFooterButtonsOnTop
        footerButtons={new ArrayBuilder()
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
            .addIf(!!exam.isFinalExam, {
                title: 'Vissza a tanfolyamkeresőbe',
                action: () => {

                    navigate2(applicationRoutes.availableCoursesRoute);
                }
            })
            .getArray()}>

        <EpistoFlex2
            direction="column"
            className='roundBorders mildShadow'
            width='100%'
            height='100%'
            flex='1'
            background='var(--transparentWhite70)'
            px='20px'
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
                    m='10px 5px 5px 5px'
                    pb='20px'
                    h='100%'
                    boxSizing='border-box'
                    height='fit-content'>

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

                            return <Accordion
                                key={index}>

                                {/* question */}
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">

                                    <EpistoFlex2 flex='1'>
                                        <EpistoFont margin={{ right: 'px5' }}>
                                            {question.text}
                                        </EpistoFont>
                                        <EpistoFont>
                                            ({question.score}/{question.maxScore} pont)
                                        </EpistoFont>
                                    </EpistoFlex2>

                                    <EpistoFlex2 width='100px'>
                                        <ChipSmall
                                            style={{
                                                margin: '0 10px'
                                            }}
                                            text={displayState.text}
                                            color={displayState.color} />
                                    </EpistoFlex2>
                                </AccordionSummary>

                                {/* answers */}
                                <AccordionDetails>
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
                                </AccordionDetails>
                            </Accordion>;
                        })}
                </EpistoFlex2>
            </EpistoFlex2>
        </EpistoFlex2>
    </ExamLayout>;
};
