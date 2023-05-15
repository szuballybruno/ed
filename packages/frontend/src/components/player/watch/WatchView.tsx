import { CourseItemStateType, CourseModeType, Id } from '@episto/commontypes';
import { QuestionDTO, VideoPlayerDataDTO } from '@episto/communication';
import { useCallback, useEffect, useState } from 'react';
import { useReactTimer } from '../../../helpers/reactTimer';
import { Responsivity } from '../../../helpers/responsivity';
import { StillWatchingDialogMarker } from '../../../models/types';
import { PlaybackApiService } from '../../../services/api/playbackApiService';
import { getRandomInteger, isBetweenThreshold, iterate, usePaging } from '../../../static/frontendHelpers';
import { Logger } from '../../../static/Logger';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoDiv } from '../../controls/EpistoDiv';
import { EpistoDivider } from '../../controls/EpistoDivider';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoSearch } from '../../controls/EpistoSearch';
import { SegmentedButton } from '../../controls/SegmentedButton';
import { NavigateToCourseItemActionType } from '../../playlist/Playlist';
import { PlaylistFilterLogicType } from '../../playlist/playlistFilterLogic';
import { useScrollIntoView } from '../../system/AutoScrollContext';
import { EpistoPaging } from '../../universal/EpistoPaging';
import { TimeoutFrame } from '../../universal/TimeoutFrame';
import { VideoQuestionnaire } from '../../universal/VideoQuestionnaire';
import Comments from '../comments/Comments';
import PlayerDescription from '../description/PlayerDescription';
import { AbsoluteFlexOverlay } from './AbsoluteFlexOverlay';
import { CourseItemSelector } from './CourseItemSelector';
import { OverlayDialog } from './OverlayDialog';
import { usePlaybackWatcher } from './PlaybackWatcherLogic';
import { PlayerTitleBlock } from './PlayerTitleBlock';
import { StillWatching } from './StillWatching';
import { VideoPlayer } from './videoPlayer/VideoPlayer';
import { useVideoPlayerState } from './videoPlayer/videoPlayerState';
const autoplayTimeoutInS = 3;

export const WatchView = ({
    nextItemState,
    currentItemCode,
    videoPlayerData,
    playlistFilterLogic,
    answerSessionId,
    courseMode,
    isVideoReady,
    courseId,
    continueCourse,
    refetchPlayerData
}: {
    videoPlayerData: VideoPlayerDataDTO,
    answerSessionId: Id<'AnswerSession'>,
    playlistFilterLogic: PlaylistFilterLogicType,
    courseMode: CourseModeType,
    courseId: Id<'Course'>,
    continueCourse: () => void,
    navigateToCourseItem: NavigateToCourseItemActionType,
    refetchPlayerData: () => Promise<void>,
    currentItemCode: string,
    nextItemState: CourseItemStateType | null,
    isVideoReady: boolean
}) => {

    const { questions } = videoPlayerData;
    const { isMobile } = Responsivity
        .useIsMobileView();
    const descCommentPaging = usePaging<string>({ items: ['Leírás', 'Hozzászólások'] });
    const mobilePaging = usePaging<string>({ items: ['Tartalom', 'Leírás'] });
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
    }, [postVideoSeekEvent, videoPlaybackSessionId, videoVersionId]);


    const { disableAutoScroll, enableAutoScroll } = useScrollIntoView();

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
    const { playedSeconds, videoLength, isSeeking, isPlaying, isVideoEnded, stopPlaying } = videoPlayerState;

    const MobileCourseItemSelector = () => <EpistoFlex2
        direction='column'>
        <EpistoFlex2
            background='var(--transparentWhite70)'
            width='100%'>
            <EpistoSearch
                boxShadow='none'
                border='none'
                borderRadius='0'
                value={playlistFilterLogic.playlistFilters.keyword}
                onKeywordChanged={x => {

                    if (typeof x === 'string' && x.length > 0) {

                        disableAutoScroll();
                    }

                    if (typeof x === 'string' && x.length === 0) {

                        enableAutoScroll();
                    }

                    scroll();

                    return playlistFilterLogic.setFilterKeyword(x);
                }} />
        </EpistoFlex2>

        <CourseItemSelector
            isMobile={isMobile}
            isVideoReady={isVideoReady}
            currentItemCode={currentItemCode}
            nextItemState={nextItemState}
            courseId={courseId}
            mode={courseMode}
            refetchPlayerData={refetchPlayerData}
            playlistFilterLogic={playlistFilterLogic} />

    </EpistoFlex2>;

    const MobileVideoDescription = () => <EpistoFlex2
        flex='1'
        minHeight='500px'
        background='white'>
        {videoPlayerData.description}
    </EpistoFlex2>;

    const VideoDescription = () => <PlayerDescription
        paging={descCommentPaging}
        description={videoPlayerData.description} />;

    const VideoComments = () => <Comments
        paging={descCommentPaging}
        currentItemCode={currentItemCode} />;

    const enableNewDialogPopups = () => {

        setTimeout(() => setShowNewDialogsEnabled(true), 2000);
    };

    const handleVideoCompletedStateChanged = useCallback(() => {

        refetchPlayerData();
    }, [refetchPlayerData]);

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
            stopPlaying();
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
    }, [hasQuestions, videoLength]);

    // playback watcher
    usePlaybackWatcher({
        playedSeconds,
        isPlaying,
        setMaxWatchedSeconds,
        isSamplingEnabled: !isSeeking,
        onVideoWatchedStateChanged: handleVideoCompletedStateChanged,
        videoVersionId,
        videoPlaybackSessionId
    });

    return <>

        {/* video player */}
        <EpistoFlex2
            direction='column'
            zIndex={12}
            position={isMobile ? 'sticky' : undefined}
            top={isMobile ? '0' : undefined}
            align="center">

            <VideoPlayer
                videoPlayerState={videoPlayerState}
                isVideoReady={isVideoReady}>

                {/* next video */}
                <AbsoluteFlexOverlay
                    isVisible={isVideoEnded}
                    hasPointerEvents={false}
                    zIndex='21'
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
                    zIndex={17}
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
                    zIndex={17}
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

            {isMobile && <PlayerTitleBlock
                title={videoPlayerData!.title}
                subTitle={videoPlayerData!.subTitle}
                videoVersionId={videoPlayerData!.videoVersionId}
                isMobile={isMobile}
                courseId={courseId} />}

            {isMobile && <EpistoFlex2
                background='white'
                padding='10px'
                width='100%'>

                <SegmentedButton
                    variant='tab'
                    additionalWrapperStyle={{
                        width: '100%'
                    }}
                    additionalButtonStyle={{
                        width: '100%'
                    }}
                    paging={mobilePaging} />
            </EpistoFlex2>}

        </EpistoFlex2>

        {/* under video info */}
        <EpistoDiv
            className="roundBorders largeSoftShadow"
            mt={isMobile ? '0' : '10px'}
            px="20px"
            pb="100px"
            background="var(--transparentWhite70)">

            {!isMobile && <PlayerTitleBlock
                title={videoPlayerData!.title}
                subTitle={videoPlayerData!.subTitle}
                videoVersionId={videoPlayerData!.videoVersionId}
                isMobile={isMobile}
                courseId={courseId} />}

            {isMobile && <EpistoPaging
                index={mobilePaging.currentIndex}
                slides={[
                    MobileCourseItemSelector,
                    MobileVideoDescription
                ]} />}

            {!isMobile && <EpistoDivider
                style={{
                    background: 'var(--epistoTeal)',
                    width: '100%',
                    height: '4px',
                    borderRadius: '10px',
                    boxShadow: 'inset -1px -2px 1px 1px rgba(0,0,0,0.10)'
                }} />}

            {!isMobile && (
                <EpistoPaging
                    index={descCommentPaging.currentIndex}
                    slides={[
                        VideoDescription,
                        VideoComments
                    ]} />
            )}
        </EpistoDiv>
    </>;
};

