import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Logger } from '../../../../static/Logger';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { useVideoPlayerFullscreenContext } from './VideoPlayerFullscreenFrame';
import { VideoPlayerStateType } from './videoPlayerState';
import { videoPlayerStyles } from './videoPlayerStyles';

export const MobilePlayButtonOverlay = (props: {
    videoPlayerState: VideoPlayerStateType
}) => {

    const { videoPlayerState } = props;

    const [isFullscreen] = useVideoPlayerFullscreenContext();
    const { enableFullscreenMode, isLandscape, toggleIsPlaying } = videoPlayerState;

    Logger.logScoped('PLAYBACK', 'isFullscreen (MobilePlayButtonOverlay): ' + isFullscreen);

    return <EpistoFlex2
        top='0'
        background={isFullscreen ? '#00000033' : 'black'}
        position={isLandscape ? 'fixed' : 'absolute'}
        paddingTop={isFullscreen ? '40px' : '0'}
        align='center'
        justify='center'
        width={'100%'}
        height={isFullscreen ? 'calc(100% - 40px)' : '100%'}
        zIndex={isFullscreen ? 18 : 16}>

        <PlayArrowIcon
            onClick={() => {
                isFullscreen
                    ? toggleIsPlaying()
                    : enableFullscreenMode();
            }}
            style={{
                ...videoPlayerStyles.videoPlayerControlIconStyle,
                zIndex: 19,
            }} />
    </EpistoFlex2>;
}; 