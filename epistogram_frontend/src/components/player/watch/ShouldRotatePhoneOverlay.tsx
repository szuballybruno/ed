import { Player } from '@lottiefiles/react-lottie-player';
import { Environment } from '../../../static/Environemnt';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';

export const ShouldRotatePhoneOverlay = (props: {
    onExitFullScreen: () => void
}) => {

    const { onExitFullScreen } = props;

    return <EpistoFlex2
        direction='column'
        position='fixed'
        top='0'
        width='100vw'
        height='100vh'
        align='center'
        justify='center'
        background='#FFFFFF99'
        backdropFilter='blur(10px)'
        zIndex='100000'>

        <EpistoFlex2
            width='100%'
            justify='center'>

            <Player
                autoplay
                loop
                src={Environment.getAssetUrl('lottie_json/rotate_phone_black.json')}
                style={{ width: '150px', height: '150px' }} />
        </EpistoFlex2>

        <EpistoFont
            style={{
                margin: '10px 20px 0 20px',
                textAlign: 'center'
            }}>

            A videó elindításához kérlek fordítsd el a telefonod.
        </EpistoFont>

        <EpistoButton
            style={{
                marginTop: '50px',
                borderColor: 'grey',
                maxWidth: 'calc(100% - 20px)',
                whiteSpace: 'normal',
                overflow: 'visible'
            }}
            onClick={() => {
                onExitFullScreen();
            }}
            variant='outlined'>

            Kilépés a teljes képernyős módból
        </EpistoButton>


    </EpistoFlex2>;
};