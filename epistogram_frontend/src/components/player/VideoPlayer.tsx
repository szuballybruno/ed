import { Box } from "@chakra-ui/react";
import { Slider, Typography } from "@mui/material";
import { ClosedCaption, Fullscreen, Pause, PlayArrow } from "@mui/icons-material";
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { TrackProps } from "react-player/file";
import useEventListener from 'react-use-event-listener';
import screenfull from "screenfull";
import { secondsToTime } from "../../frontendHelpers";
import { SubtitleDTO } from "../../models/shared_models/SubtitleDTO";
import { VideoDTO } from "../../models/shared_models/VideoDTO";
import { AbsoluteFlexOverlay } from "./AbsoluteFlexOverlay";
import classes from "./player.module.scss";

type VisualOverlayType = "counter" | "pause" | "start" | "seekRight" | "seekLeft";

export const useVideoPlayerState = (
    videoItem: VideoDTO,
    isShowingOverlay: boolean,
    maxWatchedSeconds: number,
    limitSeek: boolean,
    onVideoEnded?: () => void) => {

    const { url: videoUrl } = videoItem;
    const { subtitles } = { subtitles: [] as SubtitleDTO[] };
    const playerContainerRef = useRef(null);
    const playerRef = useRef<ReactPlayer>(null);
    const [shouldBePlaying, setShouldBePlaying] = React.useState(false);
    const [playedSeconds, setPlayedSeconds] = React.useState(0);
    const [videoLength, setVideoLength] = React.useState(0);
    const [showControls, setShowControls] = useState(true);
    const [controlOverlayTimer, setControlOverlayTimer] = useState<NodeJS.Timeout | null>(null);
    const [visualOverlayType, setVisualOverlayType] = useState<VisualOverlayType>("start");
    const [isVisualOverlayVisible, setIsVisualOverlayVisible] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false);
    const controlsOpacity = showControls || !shouldBePlaying || isSeeking ? 1 : 0;
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

    useEventListener('keydown', (e) => {

        e.preventDefault();

        if (isShowingOverlay)
            return;

        if (e.key == " ")
            toggleShouldBePlaying();

        if (e.key == "ArrowLeft")
            jump();

        if (e.key == "ArrowRight")
            jump(true);
    });

    // TODO start at specific time
    // useEffect(() => seekToSeconds(maxWatchedSeconds), [])

    return {
        playerContainerRef,
        playerRef,
        isVisualOverlayVisible,
        visualOverlayType,
        controlOverlayTimer,
        videoUrl,
        shouldBePlaying,
        subtileTracks,
        controlsOpacity,
        playedSeconds,
        videoLength,
        isShowingOverlay,
        isSeeking,
        isPlaying,
        maxWatchedSeconds,
        limitSeek,
        isVideoEnded,
        toggleShouldBePlaying,
        showControlOverlay,
        setPlayedSeconds,
        setVideoLength,
        toggleFullScreen,
        seekToSeconds,
        setIsSeeking,
        handleOnVideoEnded
    }
}

export type VideoPlayerStateType = ReturnType<typeof useVideoPlayerState>;

export const VideoPlayer = (props: {
    videoItem: VideoDTO,
    videoPlayerState: VideoPlayerStateType,
    children?: ReactNode
}) => {

    const { videoPlayerState } = props;
    const {
        playerContainerRef,
        playerRef,
        isVisualOverlayVisible,
        visualOverlayType,
        controlOverlayTimer,
        videoUrl,
        shouldBePlaying,
        subtileTracks,
        controlsOpacity,
        playedSeconds,
        videoLength,
        isShowingOverlay,
        isPlaying,
        maxWatchedSeconds,
        limitSeek,
        toggleShouldBePlaying,
        showControlOverlay,
        setPlayedSeconds,
        setVideoLength,
        toggleFullScreen,
        seekToSeconds,
        setIsSeeking,
        handleOnVideoEnded
    } = videoPlayerState;

    const iconStyle = { width: "70px", height: "70px", color: "white" } as CSSProperties;

    const marks = [
        {
            value: maxWatchedSeconds,
        },
    ];

    return (
        <Box
            id="fullScreenRoot"
            position="relative"
            p="6px"
            ref={playerContainerRef}>

            {/* playback */}
            <Box
                id="playbackWrapper"
                filter={isShowingOverlay ? "blur(4px)" : "blur(0px)"}
                transition="0.3s"
                position="relative"
                height="100%"
                width="100%">

                {/* video wrapper */}
                <Box
                    id="videoWrapper"
                    width="100%"
                    height="100%"
                    pt="56.25%" // to keep 16:9 ratio
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
                        className={classes.player}
                        url={videoUrl}
                        width={"100%"}
                        height={"100%"}
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
                                attributes: { crossOrigin: "true" },
                                tracks: subtileTracks,
                            }
                        }}
                        loop={false}
                        onEnded={handleOnVideoEnded} />
                </Box>

                {/* video controls */}
                <Box
                    className={classes.playerControllerWrapper}
                    onMouseEnter={() => showControlOverlay(true)}
                    onMouseLeave={() => showControlOverlay()}
                    opacity={controlsOpacity}
                    transition="0.15s">

                    {/* play/pause */}
                    <button onClick={toggleShouldBePlaying}>
                        {isPlaying ? <Pause /> : <PlayArrow />}
                    </button>

                    {/* timestamp */}
                    <Typography className={classes.playerTimestamp}>
                        {`${secondsToTime(playedSeconds)}/${secondsToTime(videoLength)}`}
                    </Typography>

                    {/* slider */}
                    <Slider
                        className={classes.slider}
                        defaultValue={0}
                        aria-labelledby="discrete-slider"
                        value={playedSeconds}
                        min={0}
                        max={videoLength}
                        onMouseDown={() => setIsSeeking(true)}
                        onChangeCommitted={() => setIsSeeking(false)}
                        onChange={(event, targetSeconds) => {

                            seekToSeconds(targetSeconds as number);
                        }}
                        marks={marks} />

                    {/* wtf */}
                    <button onClick={(e) => {

                    }}>
                        <ClosedCaption />
                    </button>

                    {/* Fullscreen */}
                    <button onClick={(e) => toggleFullScreen()}>
                        <Fullscreen />
                    </button>
                </Box>

            </Box>

            {/* visual overlay */}
            <AbsoluteFlexOverlay isVisible={isVisualOverlayVisible}>
                {visualOverlayType == "pause" && <PauseIcon style={iconStyle} />}
                {visualOverlayType == "start" && <PlayArrowIcon style={iconStyle} />}
                {visualOverlayType == "seekRight" && <FastForwardIcon style={iconStyle} />}
                {visualOverlayType == "seekLeft" && <FastRewindIcon style={iconStyle} />}
            </AbsoluteFlexOverlay>

            {props.children}
        </Box>
    )
};
