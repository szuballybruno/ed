import { Box, Flex } from "@chakra-ui/react";
import { Divider, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getRandomInteger, isBetweenThreshold, useIsDesktopView, usePaging } from "../../frontendHelpers";
import { CourseItemDTO } from "../../models/shared_models/CourseItemDTO";
import { QuestionDTO } from "../../models/shared_models/QuestionDTO";
import { CourseModeType } from "../../models/shared_models/types/sharedTypes";
import { VideoDTO } from "../../models/shared_models/VideoDTO";
import { StillWatchingDialogMarker } from "../../models/types";
import { NavigateToCourseItemActionType } from "../universal/CourseItemList";
import { Copyright } from "../universal/footers/copyright/Copyright";
import { SegmentedButton } from "../universal/SegmentedButton";
import { SlidesDisplay } from "../universal/SlidesDisplay";
import { VideoQuestionnaire } from "../universal/VideoQuestionnaire";
import { AbsoluteFlexOverlay } from "./AbsoluteFlexOverlay";
import { CourseItemSelector } from "./CourseItemSelector";
import PlayerDescription from "./description/PlayerDescription";
import { OverlayDialog } from "./OverlayDialog";
import { usePlaybackWatcher } from "./PlaybackWatcherLogic";
import { StillWatching } from "./StillWatching";
import { useVideoPlayerState, VideoPlayer } from "./VideoPlayer";

export const WatchView = (props: {
    video: VideoDTO,
    answerSessionId: number,
    courseItems: CourseItemDTO[],
    courseMode: CourseModeType,
    courseId: number,
    refetchCourseItemList: () => void,
    navigateToCourseItem: NavigateToCourseItemActionType,
    refetchPlayerData: () => Promise<void>,
}) => {

    const {
        video,
        courseItems,
        answerSessionId,
        courseMode,
        courseId,
        refetchCourseItemList,
        refetchPlayerData
    } = props;
    const { questions } = video;
    const isDesktopView = useIsDesktopView();
    const descCommentPaging = usePaging<string>(["Leírás", "Hozzászólások"]);
    const [isShowNewDialogsEnabled, setShowNewDialogsEnabled] = useState(true);
    const dialogThresholdSecs = 1;
    const [maxWatchedSeconds, setMaxWatchedSeconds] = useState(video.maxWatchedSeconds);

    // questions
    const [currentQuestion, setCurrentQuestion] = useState<QuestionDTO | null>(null);
    const isQuestionVisible = !!currentQuestion;
    const [answeredQuestionIds, setAnsweredQuestionIds] = useState<number[]>([]);
    const hasQuestions = questions.length > 0;

    // still watching
    const [currentStillWatchingMarker, setCurrentStillWatchingMarker] = useState<StillWatchingDialogMarker | null>(null);
    const [stillWatchingDilalogMarkers, setStillWatchingDilalogMarkers] = useState<StillWatchingDialogMarker[]>([]);
    const stillWatchingDialogDelaySecs = 60 * 2; // 2 mins

    const isShowingOverlay = isQuestionVisible || !!currentStillWatchingMarker;
    const limitSeek = courseMode === "beginner";
    const videoPlayerState = useVideoPlayerState(video, isShowingOverlay, maxWatchedSeconds, limitSeek);
    const { playedSeconds, videoLength, isSeeking, isPlaying } = videoPlayerState;

    const VideoDescription = () => <PlayerDescription description={video!.description} />;
    const VideoComments = () => <Box bg="red" />;

    const currentQuestionAnswered = answeredQuestionIds
        .some(qid => currentQuestion?.questionId === qid);

    const enableNewDialogPopups = () => {

        setTimeout(() => setShowNewDialogsEnabled(true), 2000);
    }

    const handleVideoCompletedStateChanged = () => {

        refetchCourseItemList();
        // showNotification("Video unlocked!");
    }

    // show dialogs 
    useEffect(() => {

        // if not allowed to show new dialogs
        if (!isShowNewDialogsEnabled)
            return;

        // don't show dialogs while seeking
        if (isSeeking)
            return;

        // questions that are past the current video progress
        // and have not been answered during this video session
        const unansweredQuestion = questions
            .filter(x => x.showUpTimeSeconds! < playedSeconds
                && !answeredQuestionIds.some(qid => x.questionId === qid))[0];

        if (unansweredQuestion) {

            setShowNewDialogsEnabled(false);
            setCurrentQuestion(unansweredQuestion);
        }

        // only show when there are no questions
        if (hasQuestions)
            return;

        // show "still watching" dialog
        const showStillPlayingDialog = stillWatchingDilalogMarkers
            .filter(x => isBetweenThreshold(playedSeconds, x.showUpTimeSeconds, dialogThresholdSecs))[0];

        if (showStillPlayingDialog) {

            setShowNewDialogsEnabled(false);
            setCurrentStillWatchingMarker(showStillPlayingDialog);
        }
    }, [playedSeconds]);

    // when video length is set, 
    // calculate are you still watching dialog seconds
    useEffect(() => {

        // only show when there are no questions
        if (hasQuestions)
            return;

        // only calculate when video is longer than delay
        // and when video length is loaded by the player
        if (videoLength < stillWatchingDialogDelaySecs)
            return;

        const remainingLength = videoLength - stillWatchingDialogDelaySecs;
        const dialogCount = Math.floor(remainingLength / stillWatchingDialogDelaySecs);

        let dialogShowUpSeconds = [] as StillWatchingDialogMarker[];
        for (let index = 1; index < dialogCount + 1; index++) {

            dialogShowUpSeconds.push({
                showUpTimeSeconds: index * stillWatchingDialogDelaySecs,
                answerOptionIndex: getRandomInteger(0, 2)
            });
        }

        setStillWatchingDilalogMarkers(dialogShowUpSeconds);
    }, [videoLength]);

    // playback watcher
    usePlaybackWatcher(playedSeconds, isPlaying, handleVideoCompletedStateChanged, setMaxWatchedSeconds);

    return <>

        {/* video player */}
        <VideoPlayer videoItem={video} videoPlayerState={videoPlayerState}>

            {/* questionnaire */}
            <AbsoluteFlexOverlay isVisible={isQuestionVisible} hasPointerEvents={true}>
                <OverlayDialog
                    showCloseButton={currentQuestionAnswered}
                    closeButtonAction={() => {

                        setCurrentQuestion(null);
                        enableNewDialogPopups();
                    }}>
                    <VideoQuestionnaire
                        answerSessionId={answerSessionId}
                        question={currentQuestion!}
                        onAnswered={() => setAnsweredQuestionIds([
                            ...answeredQuestionIds,
                            currentQuestion?.questionId!
                        ])} />
                </OverlayDialog>
            </AbsoluteFlexOverlay>

            {/* still watching */}
            <AbsoluteFlexOverlay isVisible={!!currentStillWatchingMarker} hasPointerEvents={true}>
                <OverlayDialog showCloseButton={false}>
                    <StillWatching
                        optionIndex={currentStillWatchingMarker?.answerOptionIndex!}
                        onClose={() => {

                            const removed = [...stillWatchingDilalogMarkers]
                                .filter(x => !isBetweenThreshold(playedSeconds, x.showUpTimeSeconds, dialogThresholdSecs));

                            setStillWatchingDilalogMarkers(removed);
                            setCurrentStillWatchingMarker(null);
                            enableNewDialogPopups();
                        }} />
                </OverlayDialog>
            </AbsoluteFlexOverlay>
        </VideoPlayer>

        {/* under video info */}
        <Box>
            {/* <GeneratedInfo videoLength={video!.length!} videoTitle={video!.title!} /> */}
            {!isDesktopView && <CourseItemSelector
                courseId={courseId}
                mode={courseMode}
                refetchPlayerData={refetchPlayerData}
                courseItems={courseItems} />}

            <Flex id="titleAndSegmentedButtonFlex" justify="space-between" padding="20px" flexWrap="wrap">
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