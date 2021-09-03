import { Box, Flex } from "@chakra-ui/react";
import { Divider, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useIsDesktopView, usePaging } from "../../frontendHelpers";
import { CourseItemDTO } from "../../models/shared_models/CourseItemDTO";
import { QuestionDTO } from "../../models/shared_models/QuestionDTO";
import { VideoDTO } from "../../models/shared_models/VideoDTO";
import { Copyright } from "../universal/footers/copyright/Copyright";
import { Questionnaire } from "../universal/Questionnaire";
import { SegmentedButton } from "../universal/SegmentedButton";
import { SlidesDisplay } from "../universal/SlidesDisplay";
import { AbsoluteFlexOverlay } from "./AbsoluteFlexOverlay";
import { CourseItemList, NavigateToCourseItemActionType } from "./courseItemList/CourseItemList";
import PlayerDescription from "./description/PlayerDescription";
import { OverlayDialog } from "./OverlayDialog";
import { useVideoPlayerState, VideoPlayer } from "./VideoPlayer";

export const WatchView = (props: {
    video: VideoDTO,
    courseItems: CourseItemDTO[],
    navigateToCourseItem: NavigateToCourseItemActionType
}) => {

    const { video, courseItems, navigateToCourseItem } = props;
    const { questions } = video;
    const hasQuestions = questions.length > 0;
    const [currentQuestion, setCurrentQuestion] = useState<QuestionDTO | null>(null);
    const [isShowingStillWatching, setShowingStillWatching] = useState(false);
    const isQuestionVisible = !!currentQuestion;
    const [answeredQuestionIds, setAnsweredQuestionIds] = useState<number[]>([]);
    const isDesktopView = useIsDesktopView();
    const descCommentPaging = usePaging<string>(["Leírás", "Hozzászólások"]);
    const isShowingOverlay = isQuestionVisible || isShowingStillWatching;
    const videoPlayerState = useVideoPlayerState(video, isShowingOverlay);
    const { playedSeconds } = videoPlayerState;

    const VideoDescription = () => <PlayerDescription description={video!.description} />;
    const VideoComments = () => <Box bg="red" />;

    const currentQuestionAnswered = answeredQuestionIds
        .some(qid => currentQuestion?.questionId === qid);

    useEffect(() => {

        if (hasQuestions) {

            // questions that are past the current video progress
            // and have not been answered during this video session
            const unansweredQuestion = questions
                .filter(x => x.showUpTimeSeconds! < playedSeconds
                    && !answeredQuestionIds.some(qid => x.questionId === qid))[0];

            if (unansweredQuestion)
                setCurrentQuestion(unansweredQuestion);
        }
        else {


        }
    }, [playedSeconds]);

    return <>

        {/* video player */}
        <VideoPlayer videoItem={video} videoPlayerState={videoPlayerState}>

            {/* questionnaire */}
            <AbsoluteFlexOverlay isVisible={isQuestionVisible} hasPointerEvents={true}>
                <OverlayDialog
                    showCloseButton={currentQuestionAnswered}
                    closeButtonAction={() => setCurrentQuestion(null)}>
                    {isQuestionVisible && <Questionnaire
                        question={currentQuestion!}
                        onAnswered={() => setAnsweredQuestionIds([
                            ...answeredQuestionIds,
                            currentQuestion?.questionId!
                        ])} />}
                </OverlayDialog>
            </AbsoluteFlexOverlay>

            {/* questionnaire */}
            <AbsoluteFlexOverlay isVisible={false} hasPointerEvents={true}>
                <OverlayDialog showCloseButton={false}>
                    {isQuestionVisible && <Questionnaire
                        question={currentQuestion!}
                        onAnswered={() => setAnsweredQuestionIds([
                            ...answeredQuestionIds,
                            currentQuestion?.questionId!
                        ])} />}
                </OverlayDialog>
            </AbsoluteFlexOverlay>
        </VideoPlayer>

        {/* under video info */}
        <Box>
            {/* <GeneratedInfo videoLength={video!.length!} videoTitle={video!.title!} /> */}
            {!isDesktopView && <CourseItemList
                courseItems={courseItems}
                navigateToCourseItem={navigateToCourseItem} />}

            <Flex justify="space-between" padding="20px">
                <Typography variant={"h4"}>{video!.title}</Typography>
                <SegmentedButton paging={descCommentPaging}></SegmentedButton>
            </Flex>
            <Divider style={{ width: "100%" }} />
            <SlidesDisplay
                index={descCommentPaging.currentIndex}
                slides={[
                    VideoDescription,
                    VideoComments
                ]}></SlidesDisplay>
            <Copyright />
        </Box>
    </>
}