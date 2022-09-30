import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { VideoPlayerStateType } from './videoPlayer/videoPlayerState';

export const PlayerDebugInfo = (props: {
    videoPlayerState: VideoPlayerStateType,
    videoTitle: string
}) => {

    const { videoPlayerState, videoTitle } = props;

    const {
        isFullscreen,
        isIPhone,
        isMuted,
        isLandscape,
        isPlaying,
        isSeeking,
        isShowingOverlay,
        playedSeconds,
        controlsVisible,
        shouldBePlaying,
        videoLength
    } = videoPlayerState;

    return <EpistoFlex2
        position='fixed'
        top='0'
        left='0'
        color='red'
        fontWeight='bold'
        background='#FFFFFF33'
        maxWidth='40%'
        zIndex={17}>


        {'isFullscreen: ' + isFullscreen}<br />
        {'isIPhone: ' + isIPhone}<br />
        {'isMuted: ' + isMuted}<br />
        {'isLandscape: ' + isLandscape}<br />
        {'isPlaying: ' + isPlaying}<br />
        {'isSeeking: ' + isSeeking}<br />
        {'isShowingOverlay: ' + isShowingOverlay}<br />
        {'playedSeconds: ' + playedSeconds}<br />
        {'controlsVisible: ' + controlsVisible}<br />
        {'shouldBePlaying: ' + shouldBePlaying}<br />
        {'videoLength: ' + videoLength}<br />
        {'videoTitle: ' + videoTitle}<br />
    </EpistoFlex2>;
};