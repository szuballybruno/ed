import { Divider } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useReactTimer } from '../../../helpers/reactTimer';
import { StillWatchingDialogMarker } from '../../../models/types';
import { PlaybackApiService } from '../../../services/api/playbackApiService';
import { PlaylistModuleDTO } from '../../../shared/dtos/PlaylistModuleDTO';
import { QuestionDTO } from '../../../shared/dtos/QuestionDTO';
import { VideoPlayerDataDTO } from '../../../shared/dtos/VideoDTO';
import { CourseItemStateType, CourseModeType } from '../../../shared/types/sharedTypes';
import { Id } from '../../../shared/types/versionId';
import {
    getRandomInteger,
    isBetweenThreshold,
    iterate,
    useIsMobileView,
    usePaging
} from '../../../static/frontendHelpers';
import { Logger } from '../../../static/Logger';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoDiv } from '../../controls/EpistoDiv';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { NavigateToCourseItemActionType } from '../../courseItemList/Playlist';
import { EpistoHeader } from '../../EpistoHeader';
import { EpistoPaging } from '../../universal/EpistoPaging';
import { TimeoutFrame } from '../../universal/TimeoutFrame';
import { VideoQuestionnaire } from '../../universal/VideoQuestionnaire';
import Comments from '../comments/Comments';
import PlayerDescription from '../description/PlayerDescription';
import { AbsoluteFlexOverlay } from './AbsoluteFlexOverlay';
import { CourseItemSelector } from './CourseItemSelector';
import { OverlayDialog } from './OverlayDialog';
import { usePlaybackWatcher } from './PlaybackWatcherLogic';
import { StillWatching } from './StillWatching';
import { useVideoPlayerState, VideoPlayer } from './VideoPlayer';
import { VideoRating } from './VideoRating';

const autoplayTimeoutInS = 3;

export const WatchView = (props: {
    videoPlayerData: VideoPlayerDataDTO,
    answerSessionId: Id<'AnswerSession'>,
    modules: PlaylistModuleDTO[],
    courseMode: CourseModeType,
    courseId: Id<'Course'>,
    continueCourse: () => void,
    navigateToCourseItem: NavigateToCourseItemActionType,
    refetchPlayerData: () => Promise<void>,
    currentItemCode: string,
    nextItemState: CourseItemStateType | null,
    isPlayerLoaded: boolean
}) => {

    const {
        nextItemState,
        currentItemCode,
        videoPlayerData,
        modules,
        answerSessionId,
        courseMode,
        isPlayerLoaded,
        courseId,
        continueCourse,
        refetchPlayerData
    } = props;

    const { questions } = videoPlayerData;
    const isMobile = useIsMobileView();
    const descCommentPaging = usePaging<string>({ items: ['Leírás', 'Hozzászólások'] });
    const [isShowNewDialogsEnabled, setShowNewDialogsEnabled] = useState(true);
    const dialogThresholdSecs = 1;
    const [maxWatchedSeconds, setMaxWatchedSeconds] = useState(videoPlayerData.maxWatchedSeconds);
    const reactTimer = useReactTimer(continueCourse, autoplayTimeoutInS * 1000);
    const videoPlaybackSessionId = videoPlayerData.videoPlaybackSessionId;
    const videoVersionId = videoPlayerData.videoVersionId;

    // http
    const { postVideoSeekEvent } = PlaybackApiService.usePostVideoSeekEvent();

    const handleVideoSeekEvent = useCallback((fromSeconds: number, toSeconds: number) => {

        postVideoSeekEvent({
            fromSeconds,
            toSeconds,
            videoVersionId,
            videoPlaybackSessionId
        });
    }, [currentItemCode, videoPlaybackSessionId]);

    // questions
    const [currentQuestion, setCurrentQuestion] = useState<QuestionDTO | null>(null);
    const isQuestionVisible = !!currentQuestion;
    const [answeredQuestionIds, setAnsweredQuestionIds] = useState<Id<'QuestionVersion'>[]>([]);
    const hasQuestions = questions.length > 0;

    // still watching
    const [currentStillWatchingMarker, setCurrentStillWatchingMarker] = useState<StillWatchingDialogMarker | null>(null);
    const [stillWatchingDilalogMarkers, setStillWatchingDilalogMarkers] = useState<StillWatchingDialogMarker[]>([]);
    const stillWatchingDialogDelaySecs = 120; // 2 mins
    const stillWatchingDialogShowUpThresholdSecs = 120; // 2 mins

    // video player
    const isShowingOverlay = isQuestionVisible || !!currentStillWatchingMarker;
    const limitSeek = courseMode === 'beginner';
    const videoPlayerState = useVideoPlayerState(videoPlayerData, isShowingOverlay, maxWatchedSeconds, limitSeek, handleVideoSeekEvent);
    const { playedSeconds, videoLength, isSeeking, isPlaying, isVideoEnded } = videoPlayerState;

    const VideoDescription = () => <PlayerDescription
        paging={descCommentPaging}
        description={videoPlayerData.description} />;

    const VideoComments = () => <Comments
        paging={descCommentPaging}
        currentItemCode={currentItemCode} />;

    /*   const VideoNotes = () => <PlayerNotes
           paging={descCommentPaging} />;*/


    // const currentQuestionAnswered = answeredQuestionIds
    //     .some(qid => currentQuestion?.questionId === qid);

    const enableNewDialogPopups = () => {

        setTimeout(() => setShowNewDialogsEnabled(true), 2000);
    };

    const handleVideoCompletedStateChanged = () => {

        refetchPlayerData();
    };

    // handle autoplay timeout if video ended
    useEffect(() => {

        if (isVideoEnded) {

            reactTimer.restart();
        }
        else {

            reactTimer.pause();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVideoEnded]);

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
                && !answeredQuestionIds.some(qid => x.questionVersionId === qid))[0];

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playedSeconds]);

    // when video length is set,
    // calculate are you still watching dialog seconds
    useEffect(() => {

        // only show when there are no questions
        if (hasQuestions) {

            Logger.logScoped('VIDEO_POPUPS', 'Video has pupup questions, adding focus popups is cancelled.');
            return;
        }

        // only calculate when video is longer than delay
        // and when video length is loaded by the player
        if (videoLength < stillWatchingDialogDelaySecs) {

            Logger.logScoped('VIDEO_POPUPS', 'Video length is less than focus popup delay, adding focus popups is cancelled.');
            return;
        }

        Logger.logScoped('VIDEO_POPUPS', 'Calculating...');

        const remainingLength = videoLength - stillWatchingDialogShowUpThresholdSecs;
        Logger.logScoped('VIDEO_POPUPS', `\nVideo length: ${videoLength} \nThreshold: ${stillWatchingDialogShowUpThresholdSecs}`);

        const dialogCount = Math.floor(remainingLength / stillWatchingDialogDelaySecs) + 1;
        Logger.logScoped('VIDEO_POPUPS', `\nRemaining length: ${remainingLength} \nDelay: ${stillWatchingDialogDelaySecs}`);

        Logger.logScoped('VIDEO_POPUPS', 'Focus dialog count calculated: ' + dialogCount);

        const dialogShowUpSeconds: StillWatchingDialogMarker[] = iterate(dialogCount, index => {

            return {
                showUpTimeSeconds: (index + 1) * stillWatchingDialogDelaySecs,
                answerOptionIndex: getRandomInteger(0, 2)
            };
        });

        if (dialogShowUpSeconds.length > 0)
            Logger.logScoped('VIDEO_POPUPS', 'Focus dialog show up seconds calculated: ' + dialogShowUpSeconds
                .map(x => x.showUpTimeSeconds)
                .join(', '));

        setStillWatchingDilalogMarkers(dialogShowUpSeconds);
    }, [videoLength]);


    // playback watcher
    usePlaybackWatcher(
        playedSeconds,
        isPlaying,
        handleVideoCompletedStateChanged,
        setMaxWatchedSeconds,
        !isSeeking,
        videoVersionId,
        videoPlaybackSessionId);

    return <>

        {/* video player */}
        <EpistoFlex2 justify="center">
            <VideoPlayer
                //height="calc((var(--playerWidth) - 420px) / 1.80)"
                className="largeSoftShadow"
                zIndex="5"
                videoItem={videoPlayerData}
                videoPlayerState={videoPlayerState}>

                {/* next video */}
                <AbsoluteFlexOverlay
                    isVisible={isVideoEnded}
                    hasPointerEvents={false}
                    align="flex-end"
                    justify="flex-end">

                    <EpistoButton
                        style={{
                            pointerEvents: 'all',
                            margin: '100px',
                            padding: '0'
                        }}
                        onClick={continueCourse}
                        variant="colored">

                        <TimeoutFrame reactTimer={reactTimer}>

                            <EpistoFont
                                isUppercase
                                style={{
                                    margin: '10px'
                                }}>

                                {translatableTexts.misc.next}
                            </EpistoFont>
                        </TimeoutFrame>
                    </EpistoButton>
                </AbsoluteFlexOverlay>

                {/* questionnaire */}
                <AbsoluteFlexOverlay
                    isVisible={isQuestionVisible}
                    hasPointerEvents={true}>

                    <OverlayDialog
                        showCloseButton={false}>
                        <VideoQuestionnaire
                            answerSessionId={answerSessionId}
                            question={currentQuestion!}
                            isShowing={isQuestionVisible}
                            onAnswered={() => setAnsweredQuestionIds([
                                ...answeredQuestionIds,
                                currentQuestion?.questionVersionId!
                            ])}
                            onClosed={() => {
                                setCurrentQuestion(null);
                                enableNewDialogPopups();
                            }} />
                    </OverlayDialog>
                </AbsoluteFlexOverlay>

                {/* still watching */}
                <AbsoluteFlexOverlay
                    isVisible={!!currentStillWatchingMarker}
                    hasPointerEvents={true}>
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
        </EpistoFlex2>

        {/* under video info */}
        <EpistoDiv
            className="roundBorders largeSoftShadow"
            zIndex="10"
            mt="10px"
            px="20px"
            pb="200px"
            background="var(--transparentWhite70)">

            {isMobile && <CourseItemSelector
                isPlayerLoaded={isPlayerLoaded}
                currentItemCode={currentItemCode}
                nextItemState={nextItemState}
                courseId={courseId}
                mode={courseMode}
                refetchPlayerData={refetchPlayerData}
                modules={modules} />}

            <EpistoFlex2
                id="titleAndSegmentedButtonFlex"
                justify="space-between"
                py="20px"
                flexWrap="wrap"
                align="center">

                <EpistoFlex2 direction="column"
                    flex="5">

                    <EpistoFont
                        fontSize="fontLargePlus"
                        style={{
                            fontWeight: 500
                        }}>

                        {videoPlayerData!.title}
                    </EpistoFont>

                    <EpistoHeader variant="sub"
                        text={videoPlayerData!.subTitle} />
                </EpistoFlex2>

                {/* ratings */}
                <VideoRating videoVersionId={videoPlayerData!.videoVersionId} />
            </EpistoFlex2>

            <Divider
                style={{
                    background: 'var(--epistoTeal)',
                    width: '100%',
                    height: '4px',
                    borderRadius: '10px',
                    boxShadow: 'inset -1px -2px 1px 1px rgba(0,0,0,0.10)'
                }} />

            <EpistoPaging
                index={descCommentPaging.currentIndex}
                slides={[
                    VideoDescription,
                    VideoComments
                ]}>

            </EpistoPaging>
        </EpistoDiv>
    </>;
};

