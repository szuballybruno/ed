
import { Environment } from '../../static/Environemnt';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoHeader } from '../EpistoHeader';

export const NoProgressChartYet = () => {

    return <>
        {/* locked overlay */}
        <EpistoHeader
            text={translatableTexts.homePage.statsSummary.mostImportantStatistics}
            showDivider
            variant="strongSub"
            m="5px 10px 20px 10px" />

        {/* bar chart */}
        <img
            src={Environment.getAssetUrl('/images/learningcurve3D.png')}
            alt={''}
            style={{
                maxHeight: 180,
                objectFit: 'contain',
                margin: '0 10px 0 0',
            }} />

        <EpistoFont fontSize="fontSmall"
            style={{
                textAlign: 'center',
                margin: '0 20px'
            }}>
            {translatableTexts.homePage.noStatsYet}
        </EpistoFont>
    </>;
};