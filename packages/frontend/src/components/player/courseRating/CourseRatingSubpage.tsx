import { Slider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCourseRatingGroups, useSaveCourseRatingGroupAnswers } from '../../../services/api/courseRatingApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { Id } from '../../../shared/types/versionId';
import { ArrayBuilder, usePaging } from '../../../static/frontendHelpers';
import { useIntParam } from '../../../static/locationHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { ExamLayout } from '../../exam/ExamLayout';
import { ExamLayoutContent } from '../../exam/ExamLayoutContent';
import { LoadingFrame } from '../../system/LoadingFrame';
import { EpistoDialogLogicType } from '../../universal/epistoDialog/EpistoDialogTypes';
import { RatingStars } from '../../universal/RatingStars';

export const CourseRatingSubpage = (props: {
    coinAcquiredDialogLogic: EpistoDialogLogicType
}) => {

    const { coinAcquiredDialogLogic } = props;

    const courseId = Id
        .create<'Course'>(useIntParam('courseId')!);

    const { navigateToCourseOverview } = useNavigation();

    const { courseRatingGroups, courseRatingGroupsError, courseRatingGroupsState, refetchCourseRatingGroupsAsync } = useCourseRatingGroups(courseId);

    const showError = useShowErrorDialog();

    const paging = usePaging({
        items: courseRatingGroups ?? [],
        onNextOverNavigation: () => navigateToCourseOverview(courseId)
    });

    const [questionAnswers, setQuestionAnswers] = useState<{ quesitionId: Id<'CourseRatingQuestion'>, value: number | null, text: string | null }[]>([]);
    const currentRatingGroup = paging.currentItem;
    const currentQuestions = currentRatingGroup?.questions ?? [];
    const currentGroupIndex = paging.currentIndex;
    const canContinue = true;
    const progressPercentage = paging.progressPercentage;

    const { saveCourseRatingGroupAnswers, saveCourseRatingGroupAnswersState } = useSaveCourseRatingGroupAnswers();

    const handleBackAsync = () => {

        paging.previous();
    };

    const handleNextAsync = async () => {

        try {

            await saveCourseRatingGroupAnswers({
                answers: questionAnswers
                    .map(x => ({
                        quesitonId: x.quesitionId,
                        text: x.text,
                        value: x.value
                    })),
                courseId
            });

            if (paging.isLast) {

                coinAcquiredDialogLogic.openDialog();
            }

            await refetchCourseRatingGroupsAsync();

            paging.next();
        } catch (e) {

            showError(e);
        }
    };

    useEffect(() => {

        if (!currentQuestions)
            return;

        setQuestionAnswers(currentQuestions
            .map(question => {

                return {
                    quesitionId: question.id,
                    text: question.answerText,
                    value: question.answerValue
                };
            }));
    }, [currentQuestions]);

    return (
        <LoadingFrame
            error={[courseRatingGroupsError]}
            height="100%">

            <ExamLayout
                maxH='calc(100vh - 120px)'
                headerCenterText="Kurzus értékelése"
                footerButtons={new ArrayBuilder()
                    .addIf(canContinue, {
                        title: translatableTexts.exam.nextQuestion,
                        action: handleNextAsync
                    })
                    .getArray()}
                handleBack={currentGroupIndex !== 0 ? handleBackAsync : undefined}>

                <ExamLayoutContent
                    style={{
                        overflowY: 'scroll'
                    }}
                    title={currentRatingGroup?.name ?? ''}>

                    <EpistoFlex2
                        direction="column"
                        align="center"
                        width="100%">

                        {currentQuestions
                            .map((question, index) => {

                                const currentAnswer = questionAnswers
                                    .firstOrNull(x => x.quesitionId === question.id);

                                const setCurrentAnswer = (value: number | null, text: string | null) => {

                                    const index = questionAnswers
                                        .findIndex(x => x.quesitionId === question.id);

                                    const newAnswers = [...questionAnswers];
                                    newAnswers[index].text = text;
                                    newAnswers[index].value = value;

                                    setQuestionAnswers(newAnswers);
                                };

                                return (
                                    <EpistoFlex2
                                        key={index}
                                        direction="column"
                                        mb="25px"
                                        width="60%"
                                        minWidth='500px'
                                        align="center">

                                        <EpistoFont>
                                            {question.text}
                                        </EpistoFont>

                                        {question.type === 'rating_stars' && <>
                                            <RatingStars
                                                setSelectedIndex={(index) => setCurrentAnswer(index, null)}
                                                selectedIndex={currentAnswer?.value ?? null} />
                                        </>}

                                        {question.type === 'range_1_10' && <>
                                            <Slider
                                                max={10}
                                                valueLabelDisplay="auto"
                                                marks={true}
                                                style={{
                                                    color: 'var(--deepBlue)'
                                                }}
                                                onChange={(_, value) => setCurrentAnswer(value as any, null)}
                                                value={currentAnswer?.value ?? 0} />
                                        </>}

                                        {question.type === 'free_text' && <>
                                            <EpistoEntry
                                                isMultiline
                                                height='400px'
                                                setValue={text => setCurrentAnswer(null, text)}
                                                value={currentAnswer?.text ?? ''}
                                                style={{
                                                    width: '100%'
                                                }} />
                                        </>}
                                    </EpistoFlex2>
                                );
                            })}
                    </EpistoFlex2>
                </ExamLayoutContent>
            </ExamLayout >
        </LoadingFrame >
    );
};