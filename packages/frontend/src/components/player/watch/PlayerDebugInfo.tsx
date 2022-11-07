import { secondsToTime } from '../../../static/frontendHelpers';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { useVideoPlayerFullscreenContext } from './videoPlayer/VideoPlayerFullscreenFrame';
import { VideoPlayerStateType } from './videoPlayer/videoPlayerState';
export const PlayerDebugInfo = (props: {
    videoPlayerState: VideoPlayerStateType,
    videoTitle: string
}) => {

    const { videoPlayerState, videoTitle } = props;

    const [isFullscreen] = useVideoPlayerFullscreenContext();

    const {
        isIPhone,
        isMuted,
        isLandscape,
        isPlaying,
        isSeeking,
        isShowingOverlay,
        playedSeconds,
        controlsVisible,
        isMobile,
        showMobilePlayButtonOverlay,
        showShouldRotatePhoneOverlay,
        videoLength
    } = videoPlayerState;

    return <EpistoFlex2
        position='fixed'
        top='0'
        left='0'
        color='red'
        fontWeight='bold'
        background='#FFFFFFAA'
        maxWidth='40%'
        overflow='hidden'
        zIndex={31}>

        {'isFulls.: ' + isFullscreen}<br />
        {'isIPhone: ' + isIPhone}<br />
        {'isMuted. ' + isMuted}<br />
        {'isLands.: ' + isLandscape}<br />
        {'isPlayi.: ' + isPlaying}<br />
        {'isSeeki.: ' + isSeeking}<br />
        {'isShowOv.: ' + isShowingOverlay}<br />
        {'showMob.: ' + showMobilePlayButtonOverlay}<br />
        {'showSho.: ' + showShouldRotatePhoneOverlay}<br />
        {'playedS.: ' + playedSeconds}<br />
        {'control.: ' + controlsVisible}<br />
        {'isMobil.: ' + isMobile}<br />
        {'videoLe.: ' + secondsToTime(videoLength)}<br />
        {'videoTi.: ' + videoTitle}<br />
    </EpistoFlex2>;
};