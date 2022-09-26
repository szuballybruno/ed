import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import browser from '../../../services/core/browserSniffingService';
import { readVolumeSettings, writeVolumeSettings } from '../../../services/core/storageService';
import { VideoPlayerDataDTO } from '../../../shared/dtos/VideoDTO';
import { useScreenOrientation } from '../../../static/frontendHelpers';
import { EpistoDiv, EpistoDivProps } from '../../controls/EpistoDiv';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoReactPlayer } from '../../controls/EpistoReactPlayer';
import { AbsoluteFlexOverlay } from './AbsoluteFlexOverlay';
import { ShouldRotatePhoneOverlay } from './ShouldRotatePhoneOverlay';
import { VideoControls } from './VideoControls';
type VisualOverlayType = 'counter' | 'pause' | 'start' | 'seekRight' | 'seekLeft';

export const useVideoPlayerState = (
    videoItem: VideoPlayerDataDTO,
    isShowingOverlay: boolean,
    maxWatchedSeconds: number,
    limitSeek: boolean,
    onSeek?: (fromSeconds: number, toSeconds: number) => void) => {

    const { url: videoUrl } = videoItem;
    const playerContainerRef = useRef(null);
    const playerRef = useRef<ReactPlayer | null>(null);
    const [shouldBePlaying, setShouldBePlaying] = React.useState(true);
    const [playedSeconds, setPlayedSeconds] = React.useState(0);
    const [videoLength, setVideoLength] = React.useState(0);
    const [showControls, setShowControls] = useState(true);
    const [controlOverlayTimer, setControlOverlayTimer] = useState<NodeJS.Timeout | null>(null);
    const [visualOverlayType, setVisualOverlayType] = useState<VisualOverlayType>('start');
    const [isVisualOverlayVisible, setIsVisualOverlayVisible] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);

    const isIPhone = browser.isIPhone;

    const screenOrientation = useScreenOrientation();
    const isLandscape = screenOrientation === 90;

    const controlsVisible = (isIPhone && isLandscape) || showControls || !shouldBePlaying || isSeeking;

    const isVideoEnded = (videoLength > 0) && (playedSeconds > (videoLength - 0.1));

    /*  const isPlaying = isIPhone
         ? (isIPhone && isLandscape && shouldBePlaying && !isVideoEnded && !isSeeking && !isShowingOverlay)
         : (!isVideoEnded && shouldBePlaying && !isShowingOverlay && !isSeeking); */
    useEffect(() => {

        if (isLandscape && isIPhone) {

            setIsPlaying(true);
        } else {

            setIsPlaying(false);
        }
    }, [isIPhone, isLandscape]);

    useEffect(() => {

        if (isSeeking) {

            setIsPlaying(false);
        } else {

            setIsPlaying(true);
        }
    }, [isSeeking]);

    useEffect(() => {

        if (isVideoEnded) {

            setIsPlaying(false);
        }
    }, [isVideoEnded]);

    useEffect(() => {

        if (shouldBePlaying) {

            setIsPlaying(true);
        } else {

            setIsPlaying(false);
        }
    }, [shouldBePlaying]);

    useEffect(() => {

        if (isShowingOverlay) {

            setIsPlaying(false);
        } else {

            setIsPlaying(true);
        }
    }, [isShowingOverlay]);

    const handleOnReady = useCallback(() => {

        console.log('handleOnReady runs...');

        if (isIPhone && !isLandscape) {

            setIsPlaying(false);
        }
    }, [isIPhone, isLandscape]);

    const toggleFullScreen = () => {

        if (browser.isIPhone) {

            document.body.style.overflow === 'hidden'
                ? document.body.style.overflow = ''
                : document.body.style.overflow = 'hidden';

            setIsFullscreen(x => !x);
        } else {

            //@ts-ignore
            screenfull.toggle(playerContainerRef.current);
            //setIsFullscreen(x => !x);
        }

    };

    const seekToSeconds = (seconds: number) => {

        // limit from seeking too far forward
        if ((seconds > maxWatchedSeconds) && limitSeek)
            return;

        setPlayedSeconds(seconds);

        // @ts-ignore
        playerRef.current.seekTo(seconds);

        if (onSeek)
            onSeek(playedSeconds, seconds);
    };

    const flashVisualOverlay = (visualOverlayType: VisualOverlayType) => {

        setIsVisualOverlayVisible(true);
        setVisualOverlayType(visualOverlayType);

        setTimeout(() => {

            setIsVisualOverlayVisible(false);
        }, 200);
    };

    const showControlOverlay = (indefinate?: boolean) => {

        if (controlOverlayTimer)
            clearTimeout(controlOverlayTimer);

        setShowControls(true);

        if (!indefinate) {

            const timeout = setTimeout(() => {

                setControlOverlayTimer(null);
                setShowControls(false);
            }, 2000);
            setControlOverlayTimer(timeout);
        }
    };

    const toggleShouldBePlaying = () => {

        const targetShouldBePlaying = !shouldBePlaying;
        setShouldBePlaying(targetShouldBePlaying);
        showControlOverlay();
        flashVisualOverlay(targetShouldBePlaying ? 'start' : 'pause');
    };



    const jump = (right?: boolean) => {

        const jumpSeconds = 20;
        let seekSeconds = 0;

        if (right) {

            seekSeconds = playedSeconds + jumpSeconds;
            if (seekSeconds > videoLength)
                return;

            flashVisualOverlay('seekRight');
        }
        else {

            seekSeconds = playedSeconds - jumpSeconds;
            if (seekSeconds < 0)
                return;

            flashVisualOverlay('seekLeft');
        }

        // limit from seeking too far forward
        if ((seekSeconds > maxWatchedSeconds) && limitSeek)
            return;

        showControlOverlay();
        seekToSeconds(seekSeconds);
    };

    const handleOnVideoEnded = () => {

        // setIsVideoEnded(true);

        // if (onVideoEnded)
        //     onVideoEnded();
    };

    //
    // effect
    //

    // conflicting with comments, disabled temporarly
    /*    useEventListener('keydown', (e) => {
     
           if (e.key === ' ' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
     
               e.preventDefault();
     
               if (isShowingOverlay)
                   return;
     
               if (e.key === ' ')
                   toggleShouldBePlaying();
     
               if (e.key === 'ArrowLeft')
                   jump();
     
               if (e.key === 'ArrowRight')
                   jump(true);
           }
       });
    */
    useEffect(() => {

        const volumeSettings = readVolumeSettings();
        if (!volumeSettings)
            return;

        setVolume(volumeSettings.volume);
        setIsMuted(volumeSettings.isMuted);
    }, []);

    useEffect(() => {

        writeVolumeSettings({ isMuted, volume });
    }, [isMuted, volume]);

    return {
        playerContainerRef,
        playerRef,
        isVisualOverlayVisible,
        visualOverlayType,
        controlOverlayTimer,
        videoUrl,
        shouldBePlaying,
        controlsVisible,
        playedSeconds,
        videoLength,
        isShowingOverlay,
        isSeeking,
        isPlaying,
        maxWatchedSeconds,
        limitSeek,
        isVideoEnded,
        volume,
        isMuted,
        isFullscreen,
        isIPhone,
        isLandscape,
        toggleShouldBePlaying,
        showControlOverlay,
        setPlayedSeconds,
        setVideoLength,
        toggleFullScreen,
        seekToSeconds,
        setIsSeeking,
        handleOnVideoEnded,
        setVolume,
        setIsMuted,
        setIsFullscreen,
        setShouldBePlaying,
        onReady: handleOnReady
    };
};

export type VideoPlayerStateType = ReturnType<typeof useVideoPlayerState>;

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
        isIPhone,
        isLandscape,
        toggleShouldBePlaying,
        showControlOverlay,
        setPlayedSeconds,
        setVideoLength,
        toggleFullScreen,
        seekToSeconds,
        setIsSeeking,
        handleOnVideoEnded,
        setVolume,
        setIsMuted,
        setIsFullscreen,
        setShouldBePlaying,
        onReady
    } = videoPlayerState;

    const iconStyle = { width: '70px', height: '70px', color: 'white' } as CSSProperties;

    const fullScreenStyleRootProps = {
        bottom: 0,
        display: 'block',
        left: 0,
        position: 'fixed',
        background: 'black',
        right: 0,
        top: 0,
        zIndex: 100
    } as CSSProperties;

    const fullScreenStyleWrapperProps = {
        top: '0',
        left: '0',
        position: 'absolute',
        width: '100vw',
        height: '100vh'
    } as CSSProperties;

    const marks = [maxWatchedSeconds];

    return (
        <EpistoDiv
            id="fullScreenRoot"
            position="relative"
            ref={playerContainerRef}
            style={
                isFullscreen
                    ? { ...fullScreenStyleRootProps }
                    : undefined
            }
            {...css}>

            {/* playback */}
            <EpistoDiv
                id="playbackWrapper"
                filter={isShowingOverlay ? 'blur(4px)' : 'blur(0px)'}
                transition="0.3s"
                position="relative"
                className="whall">

                {/* video wrapper */}
                <EpistoDiv
                    id="videoWrapper"
                    className="whall"
                    // pt="56.25%" // to keep 16:9 ratio
                    background='black'
                    style={
                        isFullscreen
                            ? { ...fullScreenStyleWrapperProps }
                            : undefined
                    }
                    onClick={toggleShouldBePlaying}
                    onMouseMove={() => {

                        if (!controlOverlayTimer)
                            showControlOverlay();
                    }}
                    position="relative">

                    {/* the player */}
                    <EpistoReactPlayer
                        playbackRate={1}
                        playerRef={playerRef}
                        url={videoUrl}
                        style={{
                            borderRadius: 6,
                            overflow: 'hidden',
                            zIndex: 13
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
                        onReady={(e) => {

                            onReady();
                            setVideoLength(e.getDuration());
                        }}
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

                {(isIPhone && !isFullscreen && !isLandscape) && <EpistoFlex2
                    onClick={() => { setIsFullscreen(x => !x); }}
                    top='0'
                    className='whall'
                    background='black'
                    position='absolute'
                    zIndex='15'
                    align='center'
                    justify='center'>

                    <PlayArrowIcon
                        style={iconStyle} />
                </EpistoFlex2>}

            </EpistoDiv>


            {(isIPhone && isFullscreen && !isLandscape) && <ShouldRotatePhoneOverlay setIsFullscreen={setIsFullscreen} />}

            {/* visual overlay */}
            <AbsoluteFlexOverlay isVisible={isVisualOverlayVisible}>
                {visualOverlayType === 'pause' && <PauseIcon style={iconStyle} />}
                {visualOverlayType === 'start' && <PlayArrowIcon style={iconStyle} />}
                {visualOverlayType === 'seekRight' && <FastForwardIcon style={iconStyle} />}
                {visualOverlayType === 'seekLeft' && <FastRewindIcon style={iconStyle} />}
            </AbsoluteFlexOverlay>

            {children}
        </EpistoDiv>
    );
};
