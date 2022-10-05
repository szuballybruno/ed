import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import browser from '../../../../services/core/browserSniffingService';
import { readVolumeSettings, writeVolumeSettings } from '../../../../services/core/storageService';
import { VideoPlayerDataDTO } from '../../../../shared/dtos/VideoDTO';
import { useIsMobileView, useScreenOrientation } from '../../../../static/frontendHelpers';
import { Logger } from '../../../../static/Logger';
import { useVideoPlayerFullscreenContext } from './VideoPlayerFullscreenFrame';

type VisualOverlayType = 'counter' | 'pause' | 'start' | 'seekRight' | 'seekLeft';

export type VideoPlayerStateType = ReturnType<typeof useVideoPlayerState>;

export const useVideoPlayerState = (
    videoItem: VideoPlayerDataDTO,
    isShowingOverlay: boolean,
    maxWatchedSeconds: number,
    limitSeek: boolean,
    onSeek?: (fromSeconds: number, toSeconds: number) => void) => {

    const { url: videoUrl } = videoItem;
    const playerContainerRef = useRef(null);
    const playerRef = useRef<ReactPlayer | null>(null);
    const [playedSeconds, setPlayedSeconds] = React.useState(0);
    const [videoLength, setVideoLength] = React.useState(0);
    const [showControls, setShowControls] = useState(true);
    const controlOverlayTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [visualOverlayType, setVisualOverlayType] = useState<VisualOverlayType>('start');
    const [isVisualOverlayVisible, setIsVisualOverlayVisible] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isReady, setIsReady] = useState(false);

    const [isFullscreen, setIsFullscreen] = useVideoPlayerFullscreenContext();

    const isIPhone = browser.isIPhone;
    const isMobile = useIsMobileView();
    const screenfullEnabled = screenfull.isFullscreen;
    const screenOrientation = useScreenOrientation();
    const isLandscape = screenOrientation === 90;
    const showMobilePlayButtonOverlay = (isMobile && !isFullscreen && !isLandscape) || (isMobile && isLandscape && isFullscreen && !isPlaying && !isShowingOverlay) || (isMobile && isLandscape && !isFullscreen);
    const showShouldRotatePhoneOverlay = isMobile && isFullscreen && !isLandscape;

    // TODO:
    const controlsVisible = (isMobile && isLandscape) || showControls || !isPlaying || isSeeking;

    const isVideoEnded = (videoLength > 0) && (playedSeconds > (videoLength - 0.1)) && !isShowingOverlay;

    /**
     * Show control overlay
     */
    const showControlOverlay = useCallback((indefinate?: boolean) => {

        if (controlOverlayTimerRef.current)
            clearTimeout(controlOverlayTimerRef.current);

        setShowControls(true);

        if (!indefinate) {

            const timeout = setTimeout(() => {

                controlOverlayTimerRef.current = null;
                setShowControls(false);
            }, 2000);
            controlOverlayTimerRef.current = timeout;
        }
    }, [controlOverlayTimerRef]);

    /**
     * Enable fullscreen mode
     */
    const enableFullscreenMode = useCallback(() => {

        Logger.logScoped('PLAYBACK', 'Enabling fullscreen mode');

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
            setIsFullscreen(true);
        }
    }, [isIPhone, isMobile, screenfullEnabled, setIsFullscreen]);

    const disableFullscreenMode = useCallback(() => {

        Logger.logScoped('PLAYBACK', 'Disabling fullscreen mode');

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
            setIsFullscreen(false);
        }
    }, [isIPhone, isMobile, screenfullEnabled, setIsFullscreen]);


    /**
     * Stop playing
     */
    const stopPlaying = useCallback(() => {

        Logger.logScoped('PLAYBACK', 'Stop playing...');
        setIsPlaying(false);
        showControlOverlay();
        flashVisualOverlay('pause');
    }, [showControlOverlay]);

    /**
     * Start playing
     */
    const startPlaying = useCallback(() => {

        Logger.logScoped('PLAYBACK', 'Start playing...');
        if (isMobile && !isFullscreen) {

            Logger.logScoped('PLAYBACK', 'Can\'t start playing, because it\'s not in fullscreen mode.');
            return;
        }

        if (isMobile && !isLandscape) {

            Logger.logScoped('PLAYBACK', 'Can\'t start playing, because it\'s not in landscape mode.');
            return;
        }

        if (isShowingOverlay) {

            Logger.logScoped('PLAYBACK', 'Can\'t start playing, because there is an overlay showing.');
            return;
        }

        setIsPlaying(true);
        showControlOverlay();
        flashVisualOverlay('start');
    }, [isFullscreen, isLandscape, isMobile, isShowingOverlay, showControlOverlay]);

    useEffect(() => {

        Logger.logScoped('PLAYBACK', 'Triggering isIphone, isLandscape, isFullscreen effect...');

        if (!isMobile)
            return;

        if (isLandscape && isFullscreen) {

            Logger.logScoped('PLAYBACK', 'Landscape and fullscreen, start playing...');
            stopPlaying();
            startPlaying();
        };

        if (!isLandscape) {

            Logger.logScoped('PLAYBACK', 'Rotated back, stop playing');
            stopPlaying();
        };

    }, [isLandscape, startPlaying, isFullscreen, stopPlaying, isMobile, enableFullscreenMode]);

    useEffect(() => {

        Logger.logScoped('PLAYBACK', 'Triggering isSeeking effect...');

        if (isMobile && !isFullscreen) {

            Logger.logScoped('PLAYBACK', 'Mobile and not fullscreen returning...');
            return;
        }

        if (isSeeking) {

            Logger.logScoped('PLAYBACK', 'Setting isPlaying to false.');
            return stopPlaying();
        }

        if ((!isMobile && !isSeeking && !isShowingOverlay) || (isMobile && isFullscreen && !isSeeking && !isShowingOverlay)) {

            Logger.logScoped('PLAYBACK', 'Setting isPlaying to true.');
            return startPlaying();
        }
    }, [isSeeking, isMobile, isFullscreen, isShowingOverlay, startPlaying, stopPlaying]);

    useEffect(() => {

        Logger.logScoped('PLAYBACK', 'Triggering isShowingOverlay effect...');

        if (isShowingOverlay) {

            Logger.logScoped('PLAYBACK', 'Setting isPlaying to false');
            return stopPlaying();
        }

        if (!isShowingOverlay && isFullscreen) {

            Logger.logScoped('PLAYBACK', 'Setting isPlaying to true');
            return startPlaying();
        }
    }, [isShowingOverlay, isFullscreen, startPlaying, stopPlaying]);

    useEffect(() => {

        Logger.logScoped('PLAYBACK', 'Screenfull trigger effect runs...');
        if (!screenfullEnabled) {

            disableFullscreenMode();
        }
    }, [disableFullscreenMode, screenfullEnabled]);

    const trickUnmutedAutoplay = useCallback(() => {

        Logger.logScoped('PLAYBACK', 'Trick unmuted autoplay callback runs...');
        stopPlaying();
        return startPlaying();
    }, [startPlaying, stopPlaying]);

    const handleOnReady = useCallback((e: {
        getDuration: () => React.SetStateAction<number>;
    }) => {

        if (isReady)
            return;

        Logger.logScoped('PLAYBACK', 'handleOnReady runs...');
        Logger.logScoped('PLAYBACK', 'Setting video length to: ' + e.getDuration());
        setIsReady(true);
        setVideoLength(e.getDuration());

        if (isPlaying === false || isSeeking || playedSeconds > 1 || isShowingOverlay) {

            Logger.logScoped('PLAYBACK', 'isPlaying has set to false, returning');
            return;
        }

        if (isMobile && !isLandscape) {

            Logger.logScoped('PLAYBACK', 'Setting isPlaying to false');
            return stopPlaying();
        }

        if (isShowingOverlay) {

            Logger.logScoped('PLAYBACK', 'Setting isPlaying to false');
            return stopPlaying();
        }

        if (!isShowingOverlay && playedSeconds < 1) {

            Logger.logScoped('PLAYBACK', 'Tricking unmuted autoplay by setting isPlaying to false and true');
            trickUnmutedAutoplay();
        }

    }, [isReady, isPlaying, isSeeking, playedSeconds, isShowingOverlay, isMobile, isLandscape, stopPlaying, trickUnmutedAutoplay]);

    const toggleFullScreen = () => {

        Logger.logScoped('PLAYBACK', 'Toggling fullscreen mode');

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

    const toggleIsPlaying = () => {

        Logger.logScoped('PLAYBACK', 'toggleIsPlaying runs...');

        if (isShowingOverlay)
            return;

        isPlaying
            ? stopPlaying()
            : startPlaying();
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
                   toggleisPlaying();
     
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
        videoUrl,
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
        isIPhone,
        isMobile,
        isLandscape,
        isReady,
        showMobilePlayButtonOverlay,
        showShouldRotatePhoneOverlay,
        trickUnmutedAutoplay,
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
        stopPlaying,
        toggleIsPlaying,
        onReady: handleOnReady
    };
};

