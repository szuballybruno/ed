import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useEffect } from 'react';
import { VideoPlayerDataDTO } from '../../../../shared/dtos/VideoDTO';
import { useIsMobileView } from '../../../../static/frontendHelpers';
import { Logger } from '../../../../static/Logger';
import { EpistoDiv, EpistoDivProps } from '../../../controls/EpistoDiv';
import { EpistoReactPlayer } from '../../../controls/EpistoReactPlayer';
import { AbsoluteFlexOverlay } from '../AbsoluteFlexOverlay';
import { PlayerDebugInfo } from '../PlayerDebugInfo';
import { ShouldRotatePhoneOverlay } from '../ShouldRotatePhoneOverlay';
import { MobilePlayButtonOverlay } from './MobilePlayButtonOverlay';
import { VideoControls } from './VideoPlayerControls';
import { VideoPlayerStateType } from './videoPlayerState';
import { videoPlayerStyles } from './videoPlayerStyles';

export const VideoPlayer = (props: {
    videoItem: VideoPlayerDataDTO,
    videoPlayerState: VideoPlayerStateType
} & EpistoDivProps) => {

    const { videoPlayerState, children, videoItem, ...css } = props;
    const {
        playerContainerRef,
        playerRef,
        isVisualOverlayVisible,
        visualOverlayType,
        controlOverlayTimer,
        videoUrl,
        controlsVisible,
        playedSeconds,
        videoLength,
        isShowingOverlay,
        isPlaying,
        maxWatchedSeconds,
        volume,
        isMuted,
        isFullscreen,
        isLandscape,
        showMobilePlayButtonOverlay,
        showShouldRotatePhoneOverlay,
        toggleShouldBePlaying,
        showControlOverlay,
        setPlayedSeconds,
        toggleFullScreen,
        seekToSeconds,
        setIsSeeking,
        handleOnVideoEnded,
        disableFullscreenMode,
        enableFullscreenMode,
        setVolume,
        setIsMuted,
        onReady
    } = videoPlayerState;

    const isMobile = useIsMobileView();

    useEffect(() => {

        Logger.logScoped('PLAYER DEBUG', 'isPlaying: ' + isPlaying);
    }, [isPlaying]);

    /* styles */
    const {
        fullScreenRootPropsDesktop,
        fullScreenRootPropsMobile,
        videoWrapperPropsDesktop,
        videoWrapperPropsMobile,
        videoPlayerControlIconStyle
    } = videoPlayerStyles;

    const fullScreenRootProps = isFullscreen
        ? fullScreenRootPropsMobile
        : fullScreenRootPropsDesktop;

    const videoWrapperProps = isFullscreen
        ? videoWrapperPropsMobile
        : videoWrapperPropsDesktop;

    const marks = [maxWatchedSeconds];

    return (
        <EpistoDiv
            id="fullScreenRoot"
            ref={playerContainerRef}
            {...fullScreenRootProps}
            {...css}>

            {/* player debug info */}
            <PlayerDebugInfo
                videoPlayerState={videoPlayerState}
                videoTitle={videoItem.title} />

            {/* MOBILE ONLY: overlay on top of player,
                since we don't want the user to watch video
                in portrait */}
            {showMobilePlayButtonOverlay && <MobilePlayButtonOverlay
                videoPlayerState={videoPlayerState} />}

            {/* MOBILE ONLY: warning to rotate the mobile, the video
                should only starts in landscape */}
            {showShouldRotatePhoneOverlay && <ShouldRotatePhoneOverlay
                onExitFullScreen={disableFullscreenMode} />}

            {/* playback */}
            <EpistoDiv
                id="playbackWrapper"
                filter={isShowingOverlay ? 'blur(4px)' : 'blur(0px)'}
                transition="0.3s"
                position="relative"
                zIndex={12}
                className="whall">

                {/* video wrapper */}
                <EpistoDiv
                    id="videoWrapper"
                    onClick={toggleShouldBePlaying}
                    onMouseMove={() => {

                        if (!controlOverlayTimer)
                            showControlOverlay();
                    }}
                    {...videoWrapperProps}>

                    {/* the player */}
                    <EpistoReactPlayer
                        playbackRate={1}
                        playerRef={playerRef}
                        url={videoUrl}
                        style={{
                            borderRadius: 6,
                            overflow: 'hidden'
                        }}
                        width="100%"
                        height="100%"
                        playsinline
                        volume={volume}
                        muted={isMuted}
                        controls={false}
                        playing={isPlaying}
                        onProgress={(playedInfo) => {

                            setPlayedSeconds(playedInfo.playedSeconds);
                        }}
                        onReady={onReady}
                        config={{
                            file: {
                                attributes: {
                                    crossOrigin: 'true',
                                    onContextMenu: e => e.preventDefault()
                                },
                                // tracks: subtileTracks,
                            }
                        }}
                        loop={false}
                        onEnded={handleOnVideoEnded} />
                </EpistoDiv>

                {/* video controls */}
                <VideoControls
                    isFullscreen={isFullscreen}
                    controlsVisible={controlsVisible}
                    isPlaying={isPlaying}
                    markSeconds={marks}
                    playedSeconds={playedSeconds}
                    videoLength={videoLength}
                    volume={volume}
                    isMuted={isMuted}
                    setIsMuted={setIsMuted}
                    showControlOverlay={showControlOverlay}
                    seekToSeconds={seekToSeconds}
                    setIsSeeking={setIsSeeking}
                    toggleFullScreen={toggleFullScreen}
                    toggleShouldBePlaying={toggleShouldBePlaying}
                    setVolume={setVolume} />

            </EpistoDiv>

            {/* visual overlay */}
            <AbsoluteFlexOverlay isVisible={isVisualOverlayVisible}>
                {visualOverlayType === 'pause' && <PauseIcon style={videoPlayerControlIconStyle} />}
                {visualOverlayType === 'start' && <PlayArrowIcon style={videoPlayerControlIconStyle} />}
                {visualOverlayType === 'seekRight' && <FastForwardIcon style={videoPlayerControlIconStyle} />}
                {visualOverlayType === 'seekLeft' && <FastRewindIcon style={videoPlayerControlIconStyle} />}
            </AbsoluteFlexOverlay>

            {children}
        </EpistoDiv>
    );
};
