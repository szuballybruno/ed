import { Slider, Typography } from "@material-ui/core";
import { ClosedCaption, Fullscreen, Pause, PlayArrow } from "@material-ui/icons";
import React, { useRef } from "react";
import ReactPlayer from "react-player";
import { TrackProps } from "react-player/file";
import screenfull from "screenfull";
import { secondsToTime } from "../../../frontendHelpers";
import { VideoDTO } from "../../../models/shared_models/VideoDTO";
import Overlay from "./overlay/Overlay";
import classes from "./player.module.scss";

const VideoPlayer = (props: {
    isPlaying: boolean,
    setIsPlaying: (x: boolean) => void
    videoUrl: string,
    subtitleTracks: TrackProps[],
    videoLength: number,
    setSleekSliderValue: (x: any) => void,
    playerRef: any
}) => {

    return <ReactPlayer
        playbackRate={1}
        ref={props.playerRef}
        className={classes.player}
        url={props.videoUrl}
        width={"100%"}
        height={"100%"}
        controls={false}
        playing={props.isPlaying}
        onPlay={() => props.setIsPlaying(true)}
        onProgress={

            // TODO wtf
            ({ played }) => {
                props.setSleekSliderValue(~~(props.videoLength * played))
            }
        }
        onReady={(e) => {
            const player = e.getInternalPlayer()
            console.log(player)
        }}
        config={{
            file: {
                attributes: { crossOrigin: "true" },
                tracks: props.subtitleTracks,
            }
        }} />
}

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

const Player = (props: { videoItem: VideoDTO }) => {

    const videoUrl = props.videoItem.url;
    const videoLength = props.videoItem.length;

    const playerContainerRef = useRef(null);
    const playerRef = useRef<ReactPlayer>(null);
    const [seeking, setSeeking] = React.useState(false)
    const [isPlaying, setIsPlaying] = React.useState(true);
    const [seekSliderValue, setSeekSliderValue] = React.useState(0);
    const playerDuration = playerRef.current?.getDuration();

    const handlePlayPause = () => setIsPlaying(isPlaying => !isPlaying);

    const toggleFullScreen = () => {

        // @ts-ignore
        screenfull.toggle(playerContainerRef.current);
    };

    const handleSeekMouseDown = e => {

        setSeeking(true)
    }

    const handleSeekMouseUp = e => {

        setSeeking(false)
        console.log(e.currentTarget.value)
        // @ts-ignore
        //
    }

    const handleSeek = (event: any, newValue: number | number[]) => {

        setSeekSliderValue(newValue as number);
        // @ts-ignore
        playerRef.current.seekTo(newValue)
    };

    return (
        <div className={classes.playerWrapper} >
            <div className={classes.playerInnerWrapper} ref={playerContainerRef}>

                <Overlay currentSeekSliderValue={seekSliderValue}>

                    {/* the player */}
                    <VideoPlayer
                        playerRef={playerRef}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        setSleekSliderValue={setSeekSliderValue}
                        subtitleTracks={downloadedTracks}
                        videoLength={videoLength}
                        videoUrl={videoUrl} />

                    {/* video controls */}
                    <div className={classes.playerControllerWrapper}>

                        {/* play/pause */}
                        <button onClick={(e) => handlePlayPause()}>
                            {isPlaying ? <Pause /> : <PlayArrow />}
                        </button>

                        {/* timestamp */}
                        <Typography className={classes.playerTimestamp}>
                            {`${secondsToTime(seekSliderValue)}/${secondsToTime(playerDuration)}`}
                        </Typography>

                        {/* slider */}
                        <Slider className={classes.slider}
                            defaultValue={0}
                            aria-labelledby="discrete-slider"
                            value={seekSliderValue}
                            min={0}
                            max={playerRef.current?.getDuration()}
                            onMouseUp={handleSeekMouseUp}
                            onMouseDown={handleSeekMouseDown}
                            onChange={handleSeek} />

                        {/* wtf */}
                        <button onClick={(e) => {

                        }}>
                            <ClosedCaption />
                        </button>

                        {/* Fullscreen */}
                        <button onClick={(e) => toggleFullScreen()}>
                            <Fullscreen />
                        </button>
                    </div>
                </Overlay>
            </div>
        </div>
    )
};

export default Player
