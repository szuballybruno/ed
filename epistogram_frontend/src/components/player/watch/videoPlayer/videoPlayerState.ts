import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import browser from '../../../../services/core/browserSniffingService';
import { readVolumeSettings, writeVolumeSettings } from '../../../../services/core/storageService';
import { VideoPlayerDataDTO } from '../../../../shared/dtos/VideoDTO';
import { useIsMobileView, useScreenOrientation } from '../../../../static/frontendHelpers';
import screenfull from 'screenfull';

type VisualOverlayType = 'counter' | 'pause' | 'start' | 'seekRight' | 'seekLeft';

export type VideoPlayerStateType = ReturnType<typeof useVideoPlayerState>;

export const useVideoPlayerFullscreenState = () => {

    const [isFullscreen, setIsFullscreen] = useState(false);

    return {
        isFullscreen,
        setIsFullscreen
    };
};

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
    const [isPlaying, setIsPlaying] = useState(true);

    const { isFullscreen, setIsFullscreen } = useVideoPlayerFullscreenContext();

    const isIPhone = browser.isIPhone;
    const isMobile = useIsMobileView();
    const screenfullEnabled = screenfull.isFullscreen;
    const screenOrientation = useScreenOrientation();
    const isLandscape = screenOrientation === 90;
    const showMobilePlayButtonOverlay = isMobile && !isFullscreen && !isLandscape;
    const showShouldRotatePhoneOverlay = isMobile && isFullscreen && !isLandscape;

    const controlsVisible = (isMobile && isLandscape) || showControls || !shouldBePlaying || isSeeking;

    const isVideoEnded = (videoLength > 0) && (playedSeconds > (videoLength - 0.1));

    useEffect(() => {

        console.log('Triggering isIphone, isLandscape, isFullscreen...');

        if (!isMobile)
            return;

        if (isLandscape && isFullscreen) {

            console.log('Landscape and fullscreen, start playing...');
            setIsPlaying(true);
            setShouldBePlaying(true);
        }

        if (isLandscape && !isFullscreen) {

            console.log('Landscape and not fullscreen, enabling fullscreen mode and stop playing...');
            enableFullscreenMode();
            setIsPlaying(false);
            setShouldBePlaying(false);
        }

        if (!isLandscape) {

            console.log('Rotated back, stop playing');
            setIsPlaying(false);
            setShouldBePlaying(true);
        }

    }, [isLandscape]);

    useEffect(() => {

        console.log('Triggering isSeeking...');

        if (isSeeking) {

            setIsPlaying(false);
        } else {

            setIsPlaying(true);
        }
    }, [isSeeking]);

    useEffect(() => {

        console.log('Triggering isVideoEnded...');

        if (isVideoEnded) {

            setIsPlaying(false);
        }
    }, [isVideoEnded]);

    useEffect(() => {

        console.log('Triggering shouldBePlaying...');

        if (isMobile && !isLandscape)
            return;

        if (shouldBePlaying) {

            setIsPlaying(true);
        } else {

            setIsPlaying(false);
        }
    }, [shouldBePlaying]);

    useEffect(() => {

        console.log('Triggering isShowingOverlay...');

        if (isShowingOverlay) {

            setIsPlaying(false);
        } else {

            setIsPlaying(true);
        }
    }, [isShowingOverlay]);

    const handleOnReady = useCallback((e: {
        getDuration: () => React.SetStateAction<number>;
    }) => {

        console.log('handleOnReady runs...');

        if (isMobile && !isLandscape) {

            console.log('Setting isPlaying to off');
            return setIsPlaying(false);
        }

        setIsPlaying(false);
        setIsPlaying(true);

        setVideoLength(e.getDuration());
    }, [isMobile, isLandscape]);

    const enableFullscreenMode = () => {

        // iPhone
        if (isMobile && isIPhone) {

            document.body.style.overflow === 'hidden';
            setIsFullscreen(true);
        }

        // other mobile
        if (isMobile && !isIPhone) {

            !screenfullEnabled
                //@ts-ignore
                ? screenfull.toggle(playerContainerRef.current)
                : undefined;
            setIsFullscreen(true);
        }

        // desktop
        if (!isMobile && !isIPhone) {
            //@ts-ignore
            !screenfullEnabled
                //@ts-ignore
                ? screenfull.toggle(playerContainerRef.current)
                : undefined;
        }
    };

    const disableFullscreenMode = () => {

        console.log('screenfullEnabled: ' + screenfullEnabled);
        console.log('isMobile: ' + isMobile);
        console.log('isIphone: ' + isIPhone);

        // iPhone
        if (isMobile && isIPhone) {

            document.body.style.overflow = '';

            setIsFullscreen(false);
        }

        // other mobile
        if (isMobile && !isIPhone) {

            screenfullEnabled
                //@ts-ignore
                ? screenfull.toggle(playerContainerRef.current)
                : undefined;
            setIsFullscreen(false);
        }

        // desktop
        if (!isMobile && !isIPhone) {
            //@ts-ignore
            screenfullEnabled
                //@ts-ignore
                ? screenfull.toggle(playerContainerRef.current)
                : undefined;
        }
    };

    const toggleFullScreen = () => {

        isFullscreen
            ? disableFullscreenMode()
            : enableFullscreenMode();
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

    // TODO: conflicting with comments, disabled temporarly
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
        showMobilePlayButtonOverlay,
        showShouldRotatePhoneOverlay,
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
        enableFullscreenMode,
        disableFullscreenMode,
        setShouldBePlaying,
        onReady: handleOnReady
    };
};

export type VideoPlayerFullscreenContextType = ReturnType<typeof useVideoPlayerFullscreenState>;

export const VideoPlayerFullscreenContext = createContext<VideoPlayerFullscreenContextType>({} as VideoPlayerFullscreenContextType);

export const useVideoPlayerFullscreenContext = () => {

    return useContext(VideoPlayerFullscreenContext);
};

