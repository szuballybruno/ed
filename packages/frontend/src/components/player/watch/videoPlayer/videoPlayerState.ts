import { VideoPlayerDataDTO } from '@episto/communication';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import { Responsivity } from '../../../../helpers/responsivity';
import { readVolumeSettings, writeVolumeSettings } from '../../../../services/core/storageService';
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
    const [showShouldRotatePhoneOverlay, setShowShouldRotatePhoneOverlay] = useState(false);

    const { isIPhone } = Responsivity
        .useIsIPhone();

    const { isMobile } = Responsivity
        .useIsMobileView();

    const { isLandscape } = Responsivity
        .useIsLandscape();

    const screenfullEnabled = screenfull.isFullscreen;

    const showMobilePlayButtonOverlay = (() => {

        if (!isMobile)
            return false;

        if (!isFullscreen && !isLandscape)
            return true;

        if (isLandscape && isFullscreen && !isPlaying && !isShowingOverlay)
            return true;

        if (isLandscape && !isFullscreen)
            return true;

        return false;

    })();

    const controlsVisible = (() => {

        if (showControls)
            return true;

        if (!isPlaying)
            return true;

        if (isSeeking)
            return true;

        if (isMobile && isLandscape)
            return true;

        return false;
    })();

    const isVideoEnded = (() => {

        if (isShowingOverlay)
            return false;

        if (playedSeconds > (videoLength - 0.1) && videoLength > 0)
            return true;

        return false;
    })();

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

            // hiding the body overflow which is necessary 
            // for the iPhone fake full screen mode
            document.body.style.overflow === 'hidden';
        }

        // Android and desktop
        if (!screenfullEnabled && !isIPhone) {

            // If screenfull is inactive, enable it
            //  @ts-ignore
            screenfull.toggle(playerContainerRef.current);
        }

        // Enabling fullscreen mode
        setIsFullscreen(true);

    }, [isIPhone, isMobile, screenfullEnabled, setIsFullscreen]);

    /**
     * Disable fullscreen mode
     */
    const disableFullscreenMode = useCallback(() => {

        Logger.logScoped('PLAYBACK', 'Disabling fullscreen mode');

        // iPhone
        if (isMobile && isIPhone) {

            // reenabling the body overflow
            document.body.style.overflow = '';
        }

        // Android and desktop
        if (screenfullEnabled && !isIPhone) {

            // If screenfull is active, disable it.
            //@ts-ignore
            screenfull.toggle(playerContainerRef.current);
        }

        // Disabling fullscreen mode
        setIsFullscreen(false);

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

        Logger.logScoped('PLAYBACK', 'Setting isPlaying to true.');
        setIsPlaying(true);
        showControlOverlay();
        flashVisualOverlay('start');
    }, [isFullscreen, isLandscape, isMobile, isShowingOverlay, showControlOverlay]);

    /**
     * Mobile playback control effect, which starts playing when
     * the mobile is rotated and the player is in fullscreen mode.
     * Stops playing when rotated back to portrait.
     */
    useEffect(() => {

        Logger.logScoped('PLAYBACK', 'Triggering mobile playback control effect...');

        if (!isReady) {
            Logger.logScoped('PLAYBACK', 'Not ready, doing nothing...');
            return;
        }

        if (!isMobile) {
            Logger.logScoped('PLAYBACK', 'Not mobile, doing nothing...');
            return;
        }

        if (isLandscape && isFullscreen) {

            Logger.logScoped('PLAYBACK', 'Landscape and fullscreen, start playing...');
            return startPlaying();
        };

        if (!isLandscape) {

            Logger.logScoped('PLAYBACK', 'Rotated back, stop playing');
            return stopPlaying();
        };

    }, [isLandscape, startPlaying, isFullscreen, stopPlaying, isMobile, enableFullscreenMode, isReady]);

    /**
     * Should rotate phone overlay effect, which either shows
     * or hides an overlay if the phone is not in landscape but 
     * is in fullscreen mode.
     */
    useEffect(() => {

        Logger.logScoped('PLAYBACK', 'Triggering rotate overlay effect...');

        if (isMobile && !isLandscape && isFullscreen) {

            stopPlaying();
            return setShowShouldRotatePhoneOverlay(true);
        }

        return setShowShouldRotatePhoneOverlay(false);
    }, [isFullscreen, isLandscape, isMobile, stopPlaying]);

    /**
     * Seeking effect, which stops playing when seeking
     * is active, resumes playing when seeking ended.
     * 
     * Note: It won't resume playing when not in fullscreen
     *       or there is an overlay showing 
     */
    useEffect(() => {

        Logger.logScoped('PLAYBACK', 'Triggering isSeeking effect...');

        if (isMobile && !isFullscreen) {

            Logger.logScoped('PLAYBACK', 'Mobile and not fullscreen returning...');
            return;
        }

        if (isSeeking) {

            Logger.logScoped('PLAYBACK', 'Seeking... Stop playing.');
            return stopPlaying();
        }

        if ((!isMobile && !isSeeking && !isShowingOverlay) || (isMobile && isFullscreen && !isSeeking && !isShowingOverlay)) {

            Logger.logScoped('PLAYBACK', 'Seeking... Stop playing.');
            return startPlaying();
        }
    }, [isSeeking, isMobile, isFullscreen, isShowingOverlay, startPlaying, stopPlaying]);

    /**
     * Overlay effect, which stops playing when an overlay
     * is active, resumes playing when overlay hides.
     * 
     * Note: It won't resume playing when not in fullscreen
     */
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

    /**
     * Screenfull trigger effect, which disables fullscreen
     * mode, when screenfull is disabled. (e.g.: User leaves the 
     * fullscreen mode with ESC key on desktop)
     */
    useEffect(() => {

        Logger.logScoped('PLAYBACK', 'Screenfull trigger effect runs...');
        if (!screenfullEnabled) {

            Logger.logScoped('PLAYBACK', 'Disabling fullscreen mode...');
            disableFullscreenMode();
        }
    }, [disableFullscreenMode, screenfullEnabled]);


    /**
     * Tricks unmuted autoplay on iPhone by starting the video
     * on user interaction. The goal here is to not really start
     * the video, which is achieved by the other effects. 
     * 
     * That way the iPhone thinks that it has started playing, 
     * but because it is not in fullsceen mode, and in landscape mode, 
     * the other effects will stop playing before the user notices, 
     * and the video will start without mute. 
     */
    const trickUnmutedAutoplay = useCallback(() => {

        Logger.logScoped('PLAYBACK', 'Trick unmuted autoplay callback runs...');
        if (isIPhone) {
            Logger.logScoped('PLAYBACK', 'iPhone, isPlaying has set to true');
            setIsPlaying(true);
        }
    }, [isIPhone]);

    /**
     * onReady function which is called every time the VideoPlayer can
     * start playing. It sets the video length, and assures that the
     * playing function is working as intended if the other effects fail.
     * 
     * TODO: Most of its functions could be deleted in the future 
     *       after proper testing on mobile platforms.
     */
    const handleOnReady = useCallback((e: {
        getDuration: () => React.SetStateAction<number>;
    }) => {

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

    }, [isPlaying, isSeeking, playedSeconds, isShowingOverlay, isMobile, isLandscape, stopPlaying, trickUnmutedAutoplay]);

    /**
     * Toggles fullscreen mode. Don't use it anywhere else but on
     * the player control, because it is unsafe. If there is a problem
     * with the fullscreen state somehow, it will create glitches in the player
     */
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

    /**
     * Toggles isPlaying. Don't use it anywhere else but on
     * the player control, because it is unsafe. If there is a problem
     * with the playing state somehow, it will create glitches in the player
     */
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
        setShowShouldRotatePhoneOverlay,
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

