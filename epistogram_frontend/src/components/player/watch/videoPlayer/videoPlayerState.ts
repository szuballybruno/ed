import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import browser from '../../../../services/core/browserSniffingService';
import { readVolumeSettings, writeVolumeSettings } from '../../../../services/core/storageService';
import { VideoPlayerDataDTO } from '../../../../shared/dtos/VideoDTO';
import { useIsMobileView, useScreenOrientation } from '../../../../static/frontendHelpers';
import screenfull from 'screenfull';
import { Logger } from '../../../../static/Logger';

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
    const showMobilePlayButtonOverlay = (isMobile && !isFullscreen && !isLandscape) || (isMobile && isLandscape && isFullscreen && !isPlaying && !isShowingOverlay);
    const showShouldRotatePhoneOverlay = isMobile && isFullscreen && !isLandscape;

    const controlsVisible = (isMobile && isLandscape) || showControls || !shouldBePlaying || isSeeking;

    const isVideoEnded = (videoLength > 0) && (playedSeconds > (videoLength - 0.1)) && !isShowingOverlay;

    useEffect(() => {

        Logger.logScoped('PLAYBACK', 'Triggering isIphone, isLandscape, isFullscreen effect...');

        if (!isMobile)
            return;

        if (isLandscape && isFullscreen) {

            Logger.logScoped('PLAYBACK', 'Landscape and fullscreen, start playing...');
            setIsPlaying(true);
            setShouldBePlaying(true);
        }

        if (isLandscape && !isFullscreen) {

            Logger.logScoped('PLAYBACK', 'Landscape and not fullscreen, enabling fullscreen mode and stop playing...');
            enableFullscreenMode();
            setIsPlaying(false);
            setShouldBePlaying(false);
        }

        if (!isLandscape) {

            Logger.logScoped('PLAYBACK', 'Rotated back, stop playing');
            setIsPlaying(false);
            setShouldBePlaying(true);
        }

    }, [isLandscape]);

    useEffect(() => {

        Logger.logScoped('PLAYBACK', 'Triggering isSeeking effect...');

        if (isShowingOverlay) {

            Logger.logScoped('PLAYBACK', 'Setting isPlaying to false.');
            return setIsPlaying(false);
        }

        if (isSeeking) {

            Logger.logScoped('PLAYBACK', 'Setting isPlaying to false.');
            setIsPlaying(false);
        } else {

            Logger.logScoped('PLAYBACK', 'Setting isPlaying to true.');
            setIsPlaying(true);
        }
    }, [isSeeking]);

    useEffect(() => {

        Logger.logScoped('PLAYBACK', 'Triggering shouldBePlaying effect...');

        if (isMobile && !isLandscape)
            return;

        if (shouldBePlaying) {

            Logger.logScoped('PLAYBACK', 'Setting isPlaying to true');
            setIsPlaying(true);
        } else {

            Logger.logScoped('PLAYBACK', 'Setting isPlaying to false');
            setIsPlaying(false);
        }
    }, [shouldBePlaying]);

    useEffect(() => {

        Logger.logScoped('PLAYBACK', 'Triggering isShowingOverlay effect...');

        if (isShowingOverlay) {

            Logger.logScoped('PLAYBACK', 'Setting isPlaying to false');
            setIsPlaying(false);
        } else {

            Logger.logScoped('PLAYBACK', 'Setting isPlaying to true');
            setIsPlaying(true);
        }
    }, [isShowingOverlay]);

    const handleOnReady = useCallback((e: {
        getDuration: () => React.SetStateAction<number>;
    }) => {

        Logger.logScoped('PLAYBACK', 'handleOnReady runs...');

        Logger.logScoped('PLAYBACK', 'Setting video length to: ' + e.getDuration());
        setVideoLength(e.getDuration());

        if (isMobile && !isLandscape) {

            Logger.logScoped('PLAYBACK', 'Setting isPlaying to false');
            return setIsPlaying(false);
        }

        if (isShowingOverlay) {

            Logger.logScoped('PLAYBACK', 'Setting isPlaying and shouldBePlaying to false');
            setShouldBePlaying(false);
            return setIsPlaying(false);
        }

        if (!isShowingOverlay) {

            Logger.logScoped('PLAYBACK', 'Tricking unmuted autoplay by setting isPlaying to false and true');
            setIsPlaying(false);
            setIsPlaying(true);
        }


    }, [isMobile, isLandscape]);

    const enableFullscreenMode = () => {

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
        }
    };

    const disableFullscreenMode = () => {

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
        }
    };

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

        Logger.logScoped('PLAYBACK', 'toggleShouldBePlaying runs...');
        if (isShowingOverlay)
            return;
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

