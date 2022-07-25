
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { Flex } from '@chakra-ui/react';
import { Fullscreen, Pause, PlayArrow } from '@mui/icons-material';
import { Slider } from '@mui/material';
import { secondsToTime } from '../../../static/frontendHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFont } from '../../controls/EpistoFont';

export const VideoControls = (props: {
    controlsVisible: boolean,
    isPlaying: boolean,
    playedSeconds: number,
    videoLength: number,
    markSeconds: number[],
    volume: number,
    isMuted: boolean,
    setIsMuted: (isMuted: boolean) => void,
    toggleShouldBePlaying: () => void,
    setIsSeeking: (isSeeking: boolean) => void,
    seekToSeconds: (seconds: number) => void,
    toggleFullScreen: () => void,
    showControlOverlay: (indefinate?: boolean) => void,
    setVolume: (volume: number) => void
}) => {

    const {
        controlsVisible,
        playedSeconds,
        videoLength,
        isPlaying,
        markSeconds,
        volume,
        isMuted,
        setIsMuted,
        showControlOverlay,
        toggleShouldBePlaying,
        setIsSeeking,
        seekToSeconds,
        toggleFullScreen,
        setVolume
    } = props;

    return <Flex
        background="linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6814075972185749) 100%)"
        color="white"
        display="flex"
        justify="flex-start"
        align="center"
        position="absolute"
        zIndex={99}
        bottom={0}
        left={0}
        px="10px"
        width="100%"
        height="40px"
        onMouseEnter={() => showControlOverlay(true)}
        onMouseLeave={() => showControlOverlay()}
        opacity={controlsVisible ? 1 : 0}
        transition="0.15s">

        {/* play/pause */}
        <button
            onClick={toggleShouldBePlaying}>

            {isPlaying ? <Pause /> : <PlayArrow />}
        </button>

        {/* timestamp */}
        <EpistoFont>
            {`${secondsToTime(playedSeconds)}/${secondsToTime(videoLength)}`}
        </EpistoFont>

        {/* slider */}
        <Slider
            size="small"
            style={{
                margin: '0 0px 0 15px',
                color: 'white'
            }}
            defaultValue={0}
            aria-labelledby="discrete-slider"
            value={playedSeconds}
            min={0}
            max={videoLength}
            onMouseDown={() => setIsSeeking(true)}
            onChangeCommitted={() => setIsSeeking(false)}
            onChange={(event, value) => {

                seekToSeconds(value as number);
            }}
            marks={
                markSeconds
                    .map(x => ({
                        value: x
                    }))
            } />

        {/* volume slider  */}
        <Slider
            style={{
                color: 'white',
                width: '100px',
                margin: '0 15px 0 15px'
            }}
            step={0.05}
            size="small"
            defaultValue={1}
            value={volume}
            min={0}
            max={1}
            onChange={(event, value) => {

                setVolume(value as number);
            }} />

        {/* volume */}
        <EpistoButton
            style={{
                height: '100%',
                margin: '0 5px 0 0'
            }}
            onClick={() => {

                setIsMuted(!isMuted);
            }}>

            {(() => {

                if (isMuted)
                    return <VolumeOffIcon className="square25"
                        style={{ color: 'white' }}></VolumeOffIcon>;

                if (volume > 0.7)
                    return <VolumeUpIcon className="square25"
                        style={{ color: 'white' }}></VolumeUpIcon>;

                if (volume <= 0.7 && volume >= 0.3)
                    return <VolumeDownIcon className="square25"
                        style={{ color: 'white' }}></VolumeDownIcon>;

                if (volume < 0.3)
                    return <VolumeMuteIcon className="square25"
                        style={{ color: 'white' }}></VolumeMuteIcon>;
            })()}
        </EpistoButton>

        {/* Fullscreen */}
        <button
            onClick={(e) => toggleFullScreen()}>

            <Fullscreen />
        </button>
    </Flex >;
};