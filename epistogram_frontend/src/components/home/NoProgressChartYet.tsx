
import { Flex } from '@chakra-ui/react';
import { Environment } from '../../static/Environemnt';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFont } from '../controls/EpistoFont';

export const NoProgressChartYet = () => {

    return <Flex
        flex='1'
        direction='column'
        justify='center'>

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
    </Flex>;
};