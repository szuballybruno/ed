import { Flex } from "@chakra-ui/react";
import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { useCourseRatingAnswers, useCourseRatingGroups, useSaveCourseRatingGroupAnswers } from "../../../services/api/courseRatingApiService";
import { usePaging } from "../../../static/frontendHelpers";
import { useIntParam } from "../../../static/locationHelpers";
import { translatableTexts } from "../../../static/translatableTexts";
import { EpistoEntry } from "../../controls/EpistoEntry";
import { EpistoFont } from "../../controls/EpistoFont";
import { ExamLayout } from "../../exam/ExamLayout";
import { ExamLayoutContent } from "../../exam/ExamLayoutContent";
import { LoadingFrame } from "../../system/LoadingFrame";
import { RatingStars } from "../../universal/RatingStars";

export const CourseRatingSubpage = () => {

    const courseId = useIntParam("courseId")!;

    const { courseRatingGroups, courseRatingGroupsError, courseRatingGroupsState } = useCourseRatingGroups(courseId);

    const paging = usePaging(courseRatingGroups ?? [])
    const [questionAnswers, setQuestionAnswers] = useState<{ quesitionId: number, value: number | null, text: string | null }[]>([]);
    const currentRatingGroup = paging.currentItem;
    const currentQuestions = currentRatingGroup?.questions ?? [];
    const currentGroupIndex = paging.currentIndex;
    const canContinue = true;
    const progressPercentage = paging.progressPercentage;

    const { saveCourseRatingGroupAnswers, saveCourseRatingGroupAnswersState } = useSaveCourseRatingGroupAnswers();

    const handleBackAsync = () => {

        paging.previous();
    }

    const handleNextAsync = () => {

        paging.next();
    }

    useEffect(() => {

        if (!currentQuestions)
            return;

        setQuestionAnswers(currentQuestions
            .map(question => {

                return {
                    quesitionId: question.id,
                    text: question.answerText,
                    value: question.answerValue
                }
            }));
    }, [currentQuestions]);

    return (
        <LoadingFrame
            loadingState={[courseRatingGroupsState, saveCourseRatingGroupAnswersState]}
            error={[courseRatingGroupsError]}
            height="100%">

            <ExamLayout
                headerCenterText="Kurzus ertekelese"
                handleNext={handleNextAsync}
                showNextButton={canContinue}
                nextButtonTitle={translatableTexts.exam.nextQuestion}
                progressValue={progressPercentage}
                handleBack={currentGroupIndex !== 0 ? handleBackAsync : undefined}>

                <ExamLayoutContent
                    style={{
                        background: "#ffffffbf",
                        borderRadius: "5px",
                        boxShadow: "white 0 0 20px 5px",
                        width: "95%"
                    }}
                    title={currentRatingGroup?.name ?? ""}>

                    <Flex
                        direction="column"
                        align="center"
                        width="100%">

                        {currentQuestions
                            .map(question => {

                                const currentAnswer = questionAnswers
                                    .firstOrNull(x => x.quesitionId === question.id);

                                const setCurrentAnswer = (value: number | null, text: string | null) => {

                                    const index = questionAnswers
                                        .findIndex(x => x.quesitionId === question.id);

                                    const newAnswers = [...questionAnswers];
                                    newAnswers[index].text = text;
                                    newAnswers[index].value = value;

                                    setQuestionAnswers(newAnswers);
                                }

                                return (
                                    <Flex
                                        direction="column"
                                        mb="25px"
                                        width="60%"
                                        align="center">

                                        <EpistoFont>
                                            {question.text}
                                        </EpistoFont>

                                        {question.type === "rating_stars" && <>
                                            <RatingStars
                                                setSelectedIndex={(index) => setCurrentAnswer(index, null)}
                                                selectedIndex={currentAnswer?.value ?? null} />
                                        </>}

                                        {question.type === "range_1_10" && <>
                                            <Slider
                                                max={10}
                                                valueLabelDisplay="auto"
                                                marks={true}
                                                style={{
                                                    color: "var(--deepBlue)"
                                                }}
                                                onChange={(_, value) => setCurrentAnswer(value as any, null)}
                                                value={currentAnswer?.value ?? 0} />
                                        </>}

                                        {question.type === "free_text" && <>
                                            <EpistoEntry
                                                isMultiline
                                                setValue={text => setCurrentAnswer(null, text)}
                                                value={currentAnswer?.text ?? ""}
                                                style={{
                                                    width: "100%"
                                                }} />
                                        </>}
                                    </Flex>
                                )
                            })}
                    </Flex>
                </ExamLayoutContent>
            </ExamLayout >
        </LoadingFrame >
    )
}