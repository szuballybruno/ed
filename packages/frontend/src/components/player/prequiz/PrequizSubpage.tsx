import { Grid } from '@chakra-ui/react';
import { Slider } from '@mui/material';
import { useEffect, useState } from 'react';
import { PrequizApiService } from '../../../services/api/prequizApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { Id } from '../../../shared/types/versionId';
import { Environment } from '../../../static/Environemnt';
import { ArrayBuilder, useIsMobileView, usePaging } from '../../../static/frontendHelpers';
import { useIntParam } from '../../../static/locationHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoFont } from '../../controls/EpistoFont';
import { ExamLayout } from '../../exam/ExamLayout';
import { ExamLayoutContent } from '../../exam/ExamLayoutContent';
import { QuestionAnswer } from '../../exam/QuestionAnswer';
import { CourseApiService } from '../../../services/api/courseApiService';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoDiv } from '../../controls/EpistoDiv';

export const PrequizSubpage = () => {

    const courseId = Id
        .create<'Course'>(useIntParam('courseId')!);

    const showError = useShowErrorDialog();
    const { navigate2 } = useNavigation();
    const { questions } = PrequizApiService.usePrequizQuestions(courseId);

    const { finishPrequiz } = PrequizApiService.useFinishPrequiz();
    const { courseBriefData } = CourseApiService.useCourseBriefData(courseId);

    const handleFinishPrequizAsync = async () => {

        await finishPrequiz({
            courseId
        });

        navigate2(applicationRoutes.playerRoute.pretestGreetingRoute, { courseId });
    };

    const paging = usePaging({
        items: questions,
        onNextOverNavigation: handleFinishPrequizAsync
    });
    const question = paging.currentItem;

    const { userAnswer, userAnswerError, userAnswerState } = PrequizApiService.usePrequizUserAnswer(courseId, question?.id ?? null);
    const { answerPrequizQuestionAsync, answerPrequizQuestionState } = PrequizApiService.useAnswerPrequizQuestion();

    const currentQuestionIndex = paging.currentIndex;
    const totalQuestionsCount = questions.length;

    const [selectedAnswerId, setSelectedAnswerId] = useState<Id<'Answer'> | null>();
    const canContinue = question?.isNumeric || !!selectedAnswerId;
    const progressPercentage = (currentQuestionIndex) / totalQuestionsCount * 100;
    const isMobile = useIsMobileView();
    const isLandscape = window.orientation === 90;

    const [numericValue, setNumericValue] = useState(0);

    const handleNextAsync = async () => {

        try {

            await answerPrequizQuestionAsync({
                answerId: selectedAnswerId ?? null,
                questionId: question?.id!,
                value: numericValue,
                courseId
            });

            paging.next();

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
            headerLeftItem={(
                <EpistoFlex2 align="center">

                    <img
                        alt=""
                        src={Environment.getAssetUrl('course_page_icons/curriculum_test.svg')}
                        className="square35" />

                    <EpistoFont style={{ marginLeft: '10px' }}>
                        {totalQuestionsCount}/{currentQuestionIndex + 1}
                    </EpistoFont>
                </EpistoFlex2>
            )}
            headerCenterText={'Kurzus előtti felmérő' + (courseBriefData?.title
                ? ' - ' + courseBriefData?.title
                : '')}
            footerButtons={new ArrayBuilder()
                .addIf(canContinue, {
                    title: translatableTexts.exam.nextQuestion,
                    action: handleNextAsync
                })
                .getArray()}
            handleBack={currentQuestionIndex !== 0
                ? handleBackAsync
                : undefined}>

            <ExamLayoutContent
                style={{
                    padding: isMobile ? '0 10px' : undefined
                }}
                title={paging.currentIndex === 0
                    ? question?.text + ' "' + courseBriefData?.title + '" témakörben?'
                    : question?.text!}>

                {question?.isNumeric
                    ? <EpistoFlex2 direction="column"
                        align="center">
                        <EpistoFlex2 justify="space-between">
                            <EpistoFont>
                                {question.minLabel}
                            </EpistoFont>

                            <EpistoDiv width="80px" />

                            <EpistoFont>
                                {question.maxLabel}
                            </EpistoFont>
                        </EpistoFlex2>

                        <EpistoFlex2
                            width='100%'
                            align='center'
                            justify='stretch'
                            mt='40px'>

                            <EpistoFont
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '60px',
                                    margin: '0 20px 0 0'
                                }}>

                                {paging.currentIndex === 2 ? '1 óra' : '1'}
                            </EpistoFont>

                            <Slider
                                max={question.maxValue}
                                min={question.minValue}
                                step={question.stepValue}
                                valueLabelDisplay="auto"
                                valueLabelFormat={value => `${value}${paging.currentIndex === 2 ? ' óra' : ''}`}
                                marks={true}
                                style={{
                                    color: 'var(--deepBlue)'
                                }}
                                onChange={(_, value) => setNumericValue(value as any)}
                                value={numericValue} />

                            <EpistoFont
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '60px',
                                    margin: '0 0 0 20px'
                                }}>

                                {paging.currentIndex === 2 ? '10 óra' : '10'}
                            </EpistoFont>
                        </EpistoFlex2>


                    </EpistoFlex2>
                    : (isMobile && !isLandscape)
                        ? <EpistoFlex2
                            direction='column'>

                            {question && question
                                .answers
                                .map((answer, index) => {

                                    const isAnswerSelected = answer.id === selectedAnswerId;

                                    return <QuestionAnswer
                                        mb='10px'
                                        key={index}
                                        onClick={() => setSelectedAnswerId(answer.id)}
                                        answerText={answer.text}
                                        isSelected={isAnswerSelected} />;
                                })}
                        </EpistoFlex2>
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
