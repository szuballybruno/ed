
import { Environment } from '../../static/Environemnt';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { PreviewOverlay } from '../universal/PreviewOverlay';

export const NoProgressChartYet = () => {

    return (
        <EpistoFlex2
            flex='1'
            direction='column'
            justify='center'
            position="relative">

            <PreviewOverlay />

            <img
                src={Environment.getAssetUrl('/images/learningcurve3D.png')}
                alt={''}
                style={{
                    maxHeight: 180,
                    objectFit: 'contain',
                    margin: '0 10px 0 0',
                }} />

            <EpistoFont
                fontSize="fontSmall"
                style={{
                    textAlign: 'center',
                    margin: '0 20px'
                }}>
                {translatableTexts.homePage.noStatsYet}
            </EpistoFont>
        </EpistoFlex2>
    );
};