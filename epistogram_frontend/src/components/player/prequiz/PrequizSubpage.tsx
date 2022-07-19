import { Box, Flex, Grid } from '@chakra-ui/react';
import { Slider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAnswerPrequizQuestion, usePrequizQuestions, usePrequizUserAnswer } from '../../../services/api/prequizApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { Id } from '../../../shared/types/versionId';
import { Environment } from '../../../static/Environemnt';
import { usePaging } from '../../../static/frontendHelpers';
import { useIntParam } from '../../../static/locationHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoFont } from '../../controls/EpistoFont';
import { ExamLayout } from '../../exam/ExamLayout';
import { ExamLayoutContent } from '../../exam/ExamLayoutContent';
import { QuestionAnswer } from '../../exam/QuestionAnswer';

export const PrequizSubpage = () => {

    const courseId = Id
        .create<'Course'>(useIntParam('courseId')!);

    const showError = useShowErrorDialog();
    const { navigateToWatchPretestGreeting } = useNavigation();
    const { questions } = usePrequizQuestions(courseId);

    const paging = usePaging({ items: questions });
    const question = paging.currentItem;

    const { userAnswer, userAnswerError, userAnswerState } = usePrequizUserAnswer(courseId, question?.id ?? null);
    const { answerPrequizQuestionAsync, answerPrequizQuestionState } = useAnswerPrequizQuestion();

    const currentQuestionIndex = paging.currentIndex;
    const totalQuestionsCount = questions.length;

    const [selectedAnswerId, setSelectedAnswerId] = useState<Id<'Answer'> | null>();
    const canContinue = question?.isNumeric || !!selectedAnswerId;
    const progressPercentage = (currentQuestionIndex) / totalQuestionsCount * 100;

    const [numericValue, setNumericValue] = useState(0);

    const handleNextAsync = async () => {

        try {

            await answerPrequizQuestionAsync({
                answerId: selectedAnswerId ?? null,
                questionId: question?.id!,
                value: numericValue,
                courseId
            });

            if (paging.isLast) {

                navigateToWatchPretestGreeting(courseId);
            } else {

                paging.next();
            }

        } catch (e) {

            showError(e);
        }
    };

    const handleBackAsync = () => {

        paging.previous();
    };

    useEffect(() => {

        if (!userAnswer)
            return;

        setNumericValue(userAnswer.answerValue ?? 0);
        setSelectedAnswerId(userAnswer.answerId);
    }, [userAnswer]);

    useEffect(() => {

        setNumericValue(question?.minValue ?? 0);
    }, [question?.minValue]);

    return (
        <ExamLayout
            headerLeftItem={<Flex align="center">

                <img
                    alt=""
                    src={Environment.getAssetUrl('course_page_icons/curriculum_test.svg')}
                    className="square35" />

                <EpistoFont style={{ marginLeft: '10px' }}>
                    {totalQuestionsCount}/{currentQuestionIndex + 1}
                </EpistoFont>
            </Flex>}
            headerCenterText="Kurzus előtti felmérő"
            handleNext={handleNextAsync}
            showNextButton={canContinue}
            nextButtonTitle={translatableTexts.exam.nextQuestion}
            progressValue={progressPercentage}
            handleBack={currentQuestionIndex !== 0 ? handleBackAsync : undefined}>

            <ExamLayoutContent
                title={question?.text ?? ''}>

                {question?.isNumeric
                    ? <Flex direction="column"
                        align="center">
                        <Flex justify="space-between">
                            <EpistoFont>
                                {question.minLabel}
                            </EpistoFont>

                            <Box width="80px" />

                            <EpistoFont>
                                {question.maxLabel}
                            </EpistoFont>
                        </Flex>

                        <Slider
                            max={question.maxValue}
                            min={question.minValue}
                            step={question.stepValue}
                            valueLabelDisplay="auto"
                            valueLabelFormat={value => `${value} óra`}
                            marks={true}
                            style={{
                                color: 'var(--deepBlue)'
                            }}
                            onChange={(_, value) => setNumericValue(value as any)}
                            value={numericValue} />

                    </Flex>
                    : <Grid
                        templateColumns="repeat(2, 1fr)"
                        gridAutoRows="minmax(0,1fr)"
                        dir="column"
                        gridGap="10px"
                        flex="1">

                        {question && question
                            .answers
                            .map((answer, index) => {

                                const isAnswerSelected = answer.id === selectedAnswerId;

                                return <QuestionAnswer
                                    key={index}
                                    onClick={() => setSelectedAnswerId(answer.id)}
                                    answerText={answer.text}
                                    isSelected={isAnswerSelected} />;
                            })}
                    </Grid>}
            </ExamLayoutContent>
        </ExamLayout >
    );
};