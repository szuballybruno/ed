import { Environment } from '../static/Environemnt';
import { EpistoFlex2 } from './controls/EpistoFlex';
import { EpistoFont } from './controls/EpistoFont';
import { EpistoHeader } from './EpistoHeader';

export const UnderMaintanence = () => {

    return <EpistoFlex2 align="center"
        justify="center"
        width="100vw"
        height="100vh">

        <EpistoFlex2 direction="column"
            align="center">
            <img
                alt=""
                style={{
                    width: '400px',
                    objectFit: 'contain'
                }}
                src={Environment.getAssetUrl('images/maintenance3D.png')} />

            <EpistoHeader
                mt="20px"
                mb="5px"
                variant="giant"
                text="Ez egy előre tervezett leállás, és átlagosan maximum 30 percig tart."></EpistoHeader>

            <EpistoFont
                textColor='eduptiveDeepDarkGreen'>

                Ha bármilyen kérdésed lenne, írj bátran a <a style={{ color: 'blue' }}
                    href="mailto:support@dtraining.hu">support@dtraining.hu</a> e-mail címre
            </EpistoFont>
        </EpistoFlex2>
    </EpistoFlex2>;
};