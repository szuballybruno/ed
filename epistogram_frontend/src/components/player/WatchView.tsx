import { Box, Flex } from "@chakra-ui/react";
import { Divider, Typography } from "@material-ui/core";
import { Copyright } from "../universal/footers/copyright/Copyright";
import { Questionnaire } from "../universal/Questionnaire";
import { SegmentedButton } from "../universal/SegmentedButton";
import { SlidesDisplay } from "../universal/SlidesDisplay";
import { AbsoluteFlexOverlay } from "./AbsoluteFlexOverlay";
import { CourseItemList } from "./courseItemList/CourseItemList";
import { OverlayDialog } from "./OverlayDialog";
import { VideoPlayer } from "./VideoPlayer";

export const WatchView = () => {

    return <>

        {/* video player */}
        <VideoPlayer videoItem={video} subtitles={subtitles} >

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
                currentCourseItemId={courseItemId}
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