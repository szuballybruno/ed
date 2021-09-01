import { Box } from "@chakra-ui/react";
import { Slider, Typography } from "@material-ui/core";
import { ClosedCaption, Fullscreen, Pause, PlayArrow } from "@material-ui/icons";
import React, { useRef } from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import { secondsToTime } from "../../../frontendHelpers";
import { VideoDTO } from "../../../models/shared_models/VideoDTO";
import { OverlayQuestionnaire } from "./overlay/OverlayQuestionnaire";
import classes from "./player.module.scss";

const downloadedTracks = [
    {
        kind: 'subtitles',
        src: 'http://abydosai.com/hajacska.vtt',
        srcLang: 'hu',
        label: "Magyar",
        mode: "showing"
    }, {
        kind: 'subtitles',
        src: 'http://abydosai.com/hajacska.vtt',
        srcLang: 'en',
        label: "Angol",
        mode: "hidden"
    }
]

const VideoPlayer = (props: {
    videoItem: VideoDTO
}) => {

    const videoUrl = props.videoItem.url;
    // const videoLength = props.videoItem.length;

    const playerContainerRef = useRef(null);
    const playerRef = useRef<ReactPlayer>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [playedSeconds, setPlayedSeconds] = React.useState(0);
    const [videoLength, setVideoLength] = React.useState(0);
    const [showControls, setShowControls] = useState(true);
    const controlsOpacity = showControls || !isPlaying ? 1 : 0;

    const handlePlayPause = () => setIsPlaying(isPlaying => !isPlaying);

    const toggleFullScreen = () => {

        // @ts-ignore
        screenfull.toggle(playerContainerRef.current);
    };

    console.log("Played secs: " + playedSeconds + " Length: " + videoLength);

    return (
        <div className={classes.playerInnerWrapper} ref={playerContainerRef}>

            <OverlayQuestionnaire currentSeekSliderValue={playedSeconds}>

                <Box
                    id="videoWrapper"
                    width="100%"
                    height="100%"
                    onClick={() => handlePlayPause()}>
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
                        onPlay={() => setIsPlaying(true)}
                        onProgress={(playedInfo) => {

                            setPlayedSeconds(playedInfo.playedSeconds);
                        }}
                        onReady={(e) => {

                            setVideoLength(e.getDuration());
                        }}
                        config={{
                            file: {
                                attributes: { crossOrigin: "true" },
                                tracks: downloadedTracks,
                            }
                        }} />
                </Box>

                {/* video controls */}
                <Box
                    className={classes.playerControllerWrapper}
                    onMouseEnter={() => setShowControls(true)}
                    onMouseLeave={() => setShowControls(false)}
                    opacity={controlsOpacity}
                    transition="0.15s">

                    {/* play/pause */}
                    <button onClick={(e) => handlePlayPause()}>
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
                        onChange={(event, targetSeconds) => {

                            setPlayedSeconds(targetSeconds as number);

                            // @ts-ignore
                            playerRef.current.seekTo(targetSeconds as number)
                        }} />

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
            </OverlayQuestionnaire>
        </div>
    )
};

export default VideoPlayer
