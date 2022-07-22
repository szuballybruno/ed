import { Flex, Text } from '@chakra-ui/react';
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React, { useEffect } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useExamResults } from '../../services/api/examApiService';
import { useNavigation } from '../../services/core/navigatior';
import { ExamPlayerDataDTO } from '../../shared/dtos/ExamPlayerDataDTO';
import { Id } from '../../shared/types/versionId';
import { ArrayBuilder } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { ChipSmall } from '../administration/courses/ChipSmall';
import { EpistoFont } from '../controls/EpistoFont';
import { ExamLayout } from './ExamLayout';
import { ExamResultStats } from './ExamResultStats';
import { QuestionAnswer } from './QuestionAnswer';

export const ExamResultsSlide = (props: {
    exam: ExamPlayerDataDTO,
    setIsExamInProgress: (isExamInProgress: boolean) => void,
    continueCourse: () => void,
    answerSessionId: Id<'AnswerSession'>,
    goToCourseRating: () => void
}) => {

    const { answerSessionId, goToCourseRating, continueCourse, setIsExamInProgress, exam } = props;
    const { examResults } = useExamResults(answerSessionId);
    const questionsAnswers = examResults?.questions ?? [];
    const { navigate } = useNavigation();

    // effects
    useEffect(() => {

        if (exam.isFinalExam)
            setIsExamInProgress(false);
    }, [exam]);

    return <ExamLayout
        justify='flex-start'
        isHeightMaximized={false}
        headerCenterText={exam.title}
        showFooterButtonsOnTop
        footerButtons={new ArrayBuilder<any>()
            .addIf(exam.isFinalExam, {
                text: 'Kurzus értékelése',
                action: goToCourseRating
            })
            .addIf(exam.isFinalExam, {
                text: 'Kurzus összegzése',
                action: () => {

                    navigate(applicationRoutes.playerRoute.courseOverviewRoute);
                }
            })
            .addIf(exam.isFinalExam, {
                text: 'Vissza a tanfolyamkeresőbe',
                action: () => {

                    navigate(applicationRoutes.availableCoursesRoute);
                }
            })
            .addIf(!exam.isFinalExam, {
                text: translatableTexts.exam.continueCourse,
                action: continueCourse
            })
            .getArray()}>

        <Flex
            direction="column"
            className='roundBorders mildShadow'
            width='100%'
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
                correctAnswerCount={examResults?.fullyCorrectlyAnsweredQuestionsCount ?? 0}
                totalQuestionCount={examResults?.questionsCount ?? 0}
                correctAnswerRate={examResults?.correctAnswerRate ?? 0}
                examLengthSeconds={examResults?.examLengthSeconds ?? null}
                examSuccessRateDiffFromCompany={examResults?.examSuccessRateDiffFromCompany ?? null} />

            {/* results */}
            <Flex
                id="resultsRoot"
                flex="1"
                direction="column">

                {/* list header */}
                <Flex
                    alignItems={'center'}
                    mt="20px"
                    justifyContent={'space-between'}>

                    <Flex flex='1'>
                        <EpistoFont
                            className="fontHuge">
                            {translatableTexts.exam.questionsLabel}
                        </EpistoFont>
                    </Flex>

                </Flex>

                {/* answers */}
                <Flex
                    id="answersRoot"
                    direction={'column'}
                    flex={1}
                    m='10px 5px 5px 5px'
                    pb='20px'
                    boxSizing='border-box'
                    height='fit-content'
                    overflow="visible">

                    {questionsAnswers
                        .map((question, index) => {

                            const bgColor = (() => {

                                if (question.correctAnswerRate === 100)
                                    return 'var(--mildGreen)';

                                if (question.correctAnswerRate > 0 && question.correctAnswerRate < 100)
                                    return 'var(--deepOrange)';

                                return 'var(--mildRed)';
                            })();

                            const correctAnswerRateText = (() => {

                                if (question.correctAnswerRate === 100)
                                    return translatableTexts.exam.correctAnswer;

                                if (question.correctAnswerRate > 0 && question.correctAnswerRate < 100)
                                    return 'Részben helyes';

                                return translatableTexts.exam.incorrectAnswer;
                            })();


                            return <Accordion
                                key={index}>

                                {/* question */}
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">

                                    <Flex flex='1'>
                                        <EpistoFont>
                                            {question.text}
                                        </EpistoFont>
                                    </Flex>

                                    <Flex width='100px'>
                                        <ChipSmall
                                            style={{
                                                margin: '0 10px'
                                            }}
                                            text={correctAnswerRateText}
                                            color={bgColor} />
                                        {/*   <EpistoFont
                                            roundBorders="normal"
                                            style={{
                                                padding: '2px 15px',
                                                backgroundColor: bgColor
                                            }}> 

                                        </EpistoFont>*/}
                                    </Flex>
                                </AccordionSummary>

                                {/* answers */}
                                <AccordionDetails>
                                    <Flex
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
                                    </Flex>
                                </AccordionDetails>
                            </Accordion>;
                        })}
                </Flex>
            </Flex>
        </Flex>
    </ExamLayout>;
};
