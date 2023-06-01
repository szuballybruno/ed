
import { Fullscreen, Pause, PlayArrow } from '@mui/icons-material';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { secondsToTime } from '../../../../static/frontendHelpers';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { EpistoFont } from '../../../controls/EpistoFont';
import { EpistoSlider } from '../../../controls/EpistoSlider';

export const VideoControls = (props: {
    isFullscreen: boolean,
    controlsVisible: boolean,
    isPlaying: boolean,
    playedSeconds: number,
    videoLength: number,
    markSeconds: number[],
    volume: number,
    isMuted: boolean,
    isMobile: boolean,
    isIPhone: boolean,
    setIsMuted: (isMuted: boolean) => void,
    toggleIsPlaying: () => void,
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
        isMobile,
        isIPhone,
        setIsMuted,
        showControlOverlay,
        toggleIsPlaying,
        setIsSeeking,
        seekToSeconds,
        toggleFullScreen,
        setVolume
    } = props;


    const iconStyle = isMobile
        ? {
            height: '30px',
            width: '30px',
            maxHeight: '30px',
            maxWidth: '30px',
            lineHeight: 0,
            color: 'white',
            zIndex: 21
        }
        : {
            color: 'white'
        };

    return <EpistoFlex2
        background="linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)"
        color="white"
        display="flex"
        justify="flex-start"
        align="center"
        position="absolute"
        zIndex={21}
        bottom={0}
        left={0}
        px={isMobile ? '20px' : '10px'}
        pb={isIPhone ? '30px' : '0'}
        width="100%"
        height={'40px'}
        onMouseEnter={() => showControlOverlay(true)}
        onMouseLeave={() => showControlOverlay()}
        opacity={controlsVisible ? 1 : 0}
        transition="0.15s">

        {/* play/pause */}
        <EpistoButton
            style={{
                color: 'white'
            }}
            onClick={toggleIsPlaying}>

            {isPlaying
                ? <Pause style={iconStyle} />
                : <PlayArrow style={iconStyle} />}
        </EpistoButton>

        {/* timestamp */}
        <EpistoFont
            textColor='white'
            fontSize={isMobile ? 'fontLarge' : 'fontSmall'} >
            {`${secondsToTime(playedSeconds)}/${secondsToTime(videoLength)}`}
        </EpistoFont>

        {/* slider */}
        <EpistoSlider
            size={isMobile ? 'medium' : 'small'}
            style={{
                margin: '0 0px 0 15px',
                color: 'white',
            }}
            defaultValue={0}
            aria-labelledby="discrete-slider"
            value={playedSeconds}
            min={0}
            max={videoLength}
            onChangeCommitted={() => setIsSeeking(false)}
            onChange={(event, value) => {

                setIsSeeking(true);
                seekToSeconds(value as number);
            }}
            marks={
                markSeconds
                    .map(x => ({
                        value: x
                    }))
            } />

        {/* volume slider  */}
        <EpistoSlider
            style={{
                color: 'white',
                width: '100px',
                margin: '0 15px 0 15px'
            }}
            step={0.05}
            size={isMobile ? 'medium' : 'small'}
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
                color: 'white',
                height: '100%',
                margin: '0 5px 0 0'
            }}
            onClick={() => {

                setIsMuted(!isMuted);
            }}>

            {(() => {

                if (isMuted)
                    return <VolumeOffIcon
                        style={{
                            ...iconStyle
                        }} />;

                if (volume > 0.7)
                    return <VolumeUpIcon
                        style={{
                            ...iconStyle
                        }} />;

                if (volume <= 0.7 && volume >= 0.3)
                    return <VolumeDownIcon
                        style={{
                            ...iconStyle
                        }} />;

                if (volume < 0.3)
                    return <VolumeMuteIcon
                        style={{
                            ...iconStyle
                        }} />;
            })()}
        </EpistoButton>

        {/* Fullscreen */}
        {!isMobile && <EpistoButton
            onClick={() => toggleFullScreen()}>

            <Fullscreen
                style={iconStyle} />
        </EpistoButton>}
    </EpistoFlex2 >;
};