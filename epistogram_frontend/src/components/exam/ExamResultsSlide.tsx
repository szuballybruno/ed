import { Flex, Text } from '@chakra-ui/react';
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ExamPlayerDataDTO } from '../../shared/dtos/ExamPlayerDataDTO';
import { useExamResults } from '../../services/api/examApiService';
import { useNavigation } from '../../services/core/navigatior';
import { ArrayBuilder } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFont } from '../controls/EpistoFont';
import { ExamLayout } from './ExamLayout';
import { ExamResultStats } from './ExamResultStats';
import { QuestionAnswer } from './QuestionAnswer';

export const ExamResultsSlide = (props: {
    exam: ExamPlayerDataDTO,
    setIsExamInProgress: (isExamInProgress: boolean) => void,
    continueCourse: () => void,
    answerSessionId: number,
    goToCourseRating: () => void
}) => {

    const { answerSessionId, goToCourseRating, continueCourse, setIsExamInProgress, exam } = props;
    const { examResults } = useExamResults(answerSessionId);
    const questionsAnswers = examResults?.questions ?? [];
    const { navigate } = useNavigation();

    const correctPercentage = examResults && examResults
        ? Math.round((examResults.correctAnswerCount / examResults.questionCount) * 100)
        : 0;

    // effects
    useEffect(() => {

        if (exam.isFinalExam)
            setIsExamInProgress(false);
    }, [exam]);

    return <ExamLayout
        headerCenterText={exam.title}
        handleNext={continueCourse}
        nextButtonTitle={translatableTexts.exam.continueCourse}
        footerButtons={new ArrayBuilder<any>()
            .addIf(exam.isFinalExam, {
                text: 'Kurzus értékelése',
                action: goToCourseRating
            })
            .addIf(exam.isFinalExam, {
                text: 'Vissza a tanfolyamkeresobe',
                action: () => {

                    navigate(applicationRoutes.availableCoursesRoute);
                }
            })
            .getArray()}
        showNextButton={!exam.isFinalExam}>

        <Flex direction="column"
            className="whall"
            p="20px">

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
                correctAnswerCount={examResults?.correctAnswerCount ?? 0}
                totalQuestionCount={examResults?.questionCount ?? 0}
                correctAnswerRate={correctPercentage} />

            {/* results */}
            <Flex id="resultsRoot"
                flex="1"
                overflow="hidden"
                direction="column">

                {/* list header */}
                <Flex
                    alignItems={'center'}
                    mt="20px"
                    justifyContent={'space-between'}>

                    <EpistoFont
                        className="fontHuge">
                        {translatableTexts.exam.questionsLabel}
                    </EpistoFont>

                    <Flex width={'25%'}>
                        <EpistoFont
                            className="fontHuge">
                            {translatableTexts.exam.answerLabel}
                        </EpistoFont>
                    </Flex>
                </Flex>

                {/* answers */}
                <Flex
                    id="answersRoot"
                    direction={'column'}
                    flex={1}
                    mt={10}
                    overflowY="scroll">

                    {questionsAnswers
                        .map((question, index) => {

                            const bgColor = (() => {

                                if (question.isCorrect)
                                    return 'var(--mildGreen)';

                                return 'var(--mildRed)';
                            })();

                            return <Accordion
                                key={index}>

                                {/* question */}
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">

                                    <Flex width={'77%'}>
                                        <EpistoFont>
                                            {question.text}
                                        </EpistoFont>
                                    </Flex>

                                    <Flex width={'23%'}>
                                        <EpistoFont
                                            classes={['roundBorders']}
                                            style={{
                                                padding: '2px 15px',
                                                backgroundColor: bgColor
                                            }}>
                                            {question.isCorrect
                                                ? translatableTexts.exam.correctAnswer
                                                : translatableTexts.exam.incorrectAnswer}
                                        </EpistoFont>
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
