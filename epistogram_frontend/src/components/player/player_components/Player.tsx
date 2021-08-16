import React, {useRef} from "react";
import classes from "./player.module.scss";
import ReactPlayer from "react-player";
import {useState} from "@hookstate/core";
import Overlay from "./overlay/Overlay";
import userDetailsState from "../../../store/user/userSideState";
import applicationRunningState from "../../../store/application/applicationRunningState";
import Exam from "./exam/Exam";
import screenfull from "screenfull";
import {ClosedCaption, Done, Fullscreen, Pause, PlayArrow} from "@material-ui/icons";
import {ListItem, Slider, Switch, Typography} from "@material-ui/core";

const Player = (props: {id: string}) => {
    console.log("[Player] Started...")
    const user = useState(userDetailsState);
    const app = useState(applicationRunningState)
    const playerContainerRef = useRef(null);
    const playerRef = useRef<ReactPlayer>(null);
    const seeking = useState(false)

    const downloadedTracks = [
        {
            kind: 'subtitles',
            src: 'http://abydosai.com/hajacska.vtt',
            srcLang: 'hu',
            label: "Magyar",
            mode: "showing"
        },{
            kind: 'subtitles',
            src: 'http://abydosai.com/hajacska.vtt',
            srcLang: 'en',
            label: "Angol",
            mode: "hidden"
        }
    ]

            function secondsToTime(e){
        let h = Math.floor(e / 3600).toString().padStart(2,'0'),
            m = Math.floor(e % 3600 / 60).toString().padStart(2,'0'),
            s = Math.floor(e % 60).toString().padStart(2,'0');

        return h !== '00' ? h + ':' + m + ':' + s : m + ':' + s;
    }

    const handlePlayPause = () => {
      app.shouldPlayVideo.set(p => !p)
    }


    const toggleFullScreen = () => {
        // @ts-ignore
        screenfull.toggle(playerContainerRef.current);
    };
    const handleSeekMouseDown = e => {
        seeking.set(true)
    }

    const handleSeekMouseUp = e => {
        seeking.set(false)
        console.log(e.currentTarget.value)
        // @ts-ignore
        //
    }
    const handleSeek = (event: any, newValue: number | number[]) => {
        app.currentSeekSliderValue.set(newValue as number);
        console.log(newValue)
        // @ts-ignore
        playerRef.current.seekTo(newValue)
    };
    return <div className={classes.playerWrapper}>
        {app.showPlayerOrExam.get() ?
            <Exam /> :
            <div className={classes.playerInnerWrapper} ref={playerContainerRef}>
                <Overlay currentSeekSliderValue={app.currentSeekSliderValue.get()}>
                    <ReactPlayer
                        playbackRate={1}
                        ref={playerRef}
                        className={classes.player}
                        url={props.id === user.userData.currentItem._id.get() ? user.userData.currentItem.url.get() : ""}
                        width={"100%"}
                        height={"100%"}
                        controls={false}
                        playing={app.shouldPlayVideo.get()}
                        onPlay={() => {app.shouldPlayVideo.set(true)}}
                        onProgress={
                            ({played})=>{
                                app.currentSeekSliderValue.set(~~(user.userData.currentItem.length.get() * played))
                            }
                        }
                        onReady={(e) => {
                            const player = e.getInternalPlayer()
                            console.log(player)
                        }}
                        config={{
                            file: {
                                attributes: { crossOrigin: "true" },
                                tracks: downloadedTracks,
                            }}
                        }
                    />
                    <div className={classes.playerControllerWrapper}>
                        <button onClick={(e) => handlePlayPause()}>
                            {app.shouldPlayVideo.get() ? <Pause /> : <PlayArrow />}
                        </button>
                        <Typography className={classes.playerTimestamp}>
                            {`${secondsToTime(app.currentSeekSliderValue.get())}/${secondsToTime(playerRef.current?.getDuration())}`}
                        </Typography>

                        <Slider className={classes.slider}
                                defaultValue={0}
                                aria-labelledby="discrete-slider"
                                value={app.currentSeekSliderValue.get()}
                                min={0}
                                max={playerRef.current?.getDuration()}
                                onMouseUp={handleSeekMouseUp}
                                onMouseDown={handleSeekMouseDown}
                                onChange={handleSeek}/>
                        <button onClick={(e) => {

                        }}>
                            <ClosedCaption />
                        </button>
                        <button onClick={(e) => toggleFullScreen()}>
                            <Fullscreen />
                        </button>
                        {/*<div className={classes.tracksList}>
                            <ListItem className={classes.showCaptionSwitchWrapper}>
                                <Typography className={classes.showCaptionSwitchLabel}>Felirat</Typography>
                                <Switch className={classes.showCaptionSwitch} />
                            </ListItem>
                            {downloadedTracks.map((track) => {
                                return <ListItem className={classes.trackListItemWrapper}>
                                    <Done />
                                    <Typography>{track.label}</Typography>
                                </ListItem>
                            })}
                        </div>*/}
                    </div>
                </Overlay>
            </div>
        }
    </div>
};

export default Player
