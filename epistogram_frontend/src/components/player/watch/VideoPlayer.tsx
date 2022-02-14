import { Box, BoxProps } from "@chakra-ui/react";
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { TrackProps } from "react-player/file";
import useEventListener from 'react-use-event-listener';
import screenfull from "screenfull";
import { SubtitleDTO } from "../../../models/shared_models/SubtitleDTO";
import { VideoDTO } from "../../../models/shared_models/VideoDTO";
import { readVolumeSettings, writeVolumeSettings } from "../../../services/core/storageService";
import { AbsoluteFlexOverlay } from "./AbsoluteFlexOverlay";
import { VideoControls } from "./VideoControls";

type VisualOverlayType = "counter" | "pause" | "start" | "seekRight" | "seekLeft";

export const useVideoPlayerState = (
    videoItem: VideoDTO,
    isShowingOverlay: boolean,
    maxWatchedSeconds: number,
    limitSeek: boolean) => {

    const { url: videoUrl } = videoItem;
    const { subtitles } = { subtitles: [] as SubtitleDTO[] };
    const playerContainerRef = useRef(null);
    const playerRef = useRef<ReactPlayer>(null);
    const [shouldBePlaying, setShouldBePlaying] = React.useState(true);
    const [playedSeconds, setPlayedSeconds] = React.useState(0);
    const [videoLength, setVideoLength] = React.useState(0);
    const [showControls, setShowControls] = useState(true);
    const [controlOverlayTimer, setControlOverlayTimer] = useState<NodeJS.Timeout | null>(null);
    const [visualOverlayType, setVisualOverlayType] = useState<VisualOverlayType>("start");
    const [isVisualOverlayVisible, setIsVisualOverlayVisible] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const controlsVisible = showControls || !shouldBePlaying || isSeeking;
    // const [isVideoEnded, setIsVideoEnded] = useState(false);

    const isVideoEnded = (videoLength > 0) && (playedSeconds > (videoLength - 0.1));
    const isPlaying = !isVideoEnded && shouldBePlaying && !isShowingOverlay && !isSeeking;

    const subtileTracks = subtitles
        .map(x => ({

        } as TrackProps))

    const toggleFullScreen = () => {

        // @ts-ignore
        screenfull.toggle(playerContainerRef.current);
    };

    const seekToSeconds = (seconds: number) => {

        // limit from seeking too far forward
        if ((seconds > maxWatchedSeconds) && limitSeek)
            return;

        setPlayedSeconds(seconds);

        // @ts-ignore
        playerRef.current.seekTo(seconds);
    }

    const flashVisualOverlay = (visualOverlayType: VisualOverlayType) => {

        setIsVisualOverlayVisible(true);
        setVisualOverlayType(visualOverlayType);

        setTimeout(() => {

            setIsVisualOverlayVisible(false);
        }, 200);
    }

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
    }

    const toggleShouldBePlaying = () => {

        const targetShouldBePlaying = !shouldBePlaying;
        setShouldBePlaying(targetShouldBePlaying);
        showControlOverlay();
        flashVisualOverlay(targetShouldBePlaying ? "start" : "pause");
    }

    const jump = (right?: boolean) => {

        const jumpSeconds = 20;
        let seekSeconds = 0;

        if (right) {

            seekSeconds = playedSeconds + jumpSeconds;
            if (seekSeconds > videoLength)
                return;

            flashVisualOverlay("seekRight");
        }
        else {

            seekSeconds = playedSeconds - jumpSeconds;
            if (seekSeconds < 0)
                return;

            flashVisualOverlay("seekLeft");
        }

        // limit from seeking too far forward
        if ((seekSeconds > maxWatchedSeconds) && limitSeek)
            return;

        showControlOverlay();
        seekToSeconds(seekSeconds);
    }

    const handleOnVideoEnded = () => {

        // setIsVideoEnded(true);

        // if (onVideoEnded)
        //     onVideoEnded();
    }

    //
    // effect
    //

    useEventListener('keydown', (e) => {

        if (e.key === " " || e.key === "ArrowLeft" || e.key === "ArrowRight") {

            e.preventDefault();

            if (isShowingOverlay)
                return;

            if (e.key === " ")
                toggleShouldBePlaying();

            if (e.key === "ArrowLeft")
                jump();

            if (e.key === "ArrowRight")
                jump(true);
        }
    });

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
        subtileTracks,
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
        toggleShouldBePlaying,
        showControlOverlay,
        setPlayedSeconds,
        setVideoLength,
        toggleFullScreen,
        seekToSeconds,
        setIsSeeking,
        handleOnVideoEnded,
        setVolume,
        setIsMuted
    }
}

export type VideoPlayerStateType = ReturnType<typeof useVideoPlayerState>;

export const VideoPlayer = (props: {
    videoItem: VideoDTO,
    videoPlayerState: VideoPlayerStateType
} & BoxProps) => {

    const { videoPlayerState, children, videoItem, ...css } = props;
    const {
        playerContainerRef,
        playerRef,
        isVisualOverlayVisible,
        visualOverlayType,
        controlOverlayTimer,
        videoUrl,
        subtileTracks,
        controlsVisible,
        playedSeconds,
        videoLength,
        isShowingOverlay,
        isPlaying,
        maxWatchedSeconds,
        volume,
        isMuted,
        toggleShouldBePlaying,
        showControlOverlay,
        setPlayedSeconds,
        setVideoLength,
        toggleFullScreen,
        seekToSeconds,
        setIsSeeking,
        handleOnVideoEnded,
        setVolume,
        setIsMuted
    } = videoPlayerState;

    const iconStyle = { width: "70px", height: "70px", color: "white" } as CSSProperties;

    const marks = [maxWatchedSeconds];

    return (
        <Box
            id="fullScreenRoot"
            position="relative"
            ref={playerContainerRef}
            {...css}>

            {/* playback */}
            <Box
                id="playbackWrapper"
                filter={isShowingOverlay ? "blur(4px)" : "blur(0px)"}
                transition="0.3s"
                position="relative"
                className="whall">

                {/* video wrapper */}
                <Box
                    id="videoWrapper"
                    className="whall"
                    // pt="56.25%" // to keep 16:9 ratio
                    onClick={toggleShouldBePlaying}
                    onMouseMove={() => {

                        if (!controlOverlayTimer)
                            showControlOverlay();
                    }}
                    position="relative">

                    {/* the player */}
                    <ReactPlayer
                        playbackRate={1}
                        ref={playerRef}
                        url={videoUrl}
                        style={{
                            borderRadius: 6,
                            overflow: "hidden"
                        }}
                        width="100%"
                        height="100%"
                        volume={volume}
                        muted={isMuted}
                        controls={false}
                        playing={isPlaying}
                        onProgress={(playedInfo) => {

                            setPlayedSeconds(playedInfo.playedSeconds);
                        }}
                        onReady={(e) => {

                            setVideoLength(e.getDuration());
                        }}
                        config={{
                            file: {
                                attributes: {
                                    crossOrigin: "true",
                                    onContextMenu: e => e.preventDefault()
                                },
                                tracks: subtileTracks,
                            }
                        }}
                        loop={false}
                        onEnded={handleOnVideoEnded} />
                </Box>

                {/* video controls */}
                <VideoControls
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

            </Box>

            {/* visual overlay */}
            <AbsoluteFlexOverlay isVisible={isVisualOverlayVisible}>
                {visualOverlayType === "pause" && <PauseIcon style={iconStyle} />}
                {visualOverlayType === "start" && <PlayArrowIcon style={iconStyle} />}
                {visualOverlayType === "seekRight" && <FastForwardIcon style={iconStyle} />}
                {visualOverlayType === "seekLeft" && <FastRewindIcon style={iconStyle} />}
            </AbsoluteFlexOverlay>

            {children}
        </Box>
    )
};
