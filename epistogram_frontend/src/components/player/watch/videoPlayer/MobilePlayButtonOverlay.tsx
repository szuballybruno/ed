import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { videoPlayerStyles } from './videoPlayerStyles';

export const MobilePlayButtonOverlay = (props: {
    toggleFullScreen: () => void
}) => {

    const { toggleFullScreen } = props;

    return <EpistoFlex2
        onClick={() => { toggleFullScreen(); }}
        top='0'
        className='whall'
        background='black'
        position='absolute'
        align='center'
        justify='center'
        zIndex={16}>

        <PlayArrowIcon
            style={videoPlayerStyles.videoPlayerControlIconStyle} />
    </EpistoFlex2>;
};