import { LinearProgress } from '@mui/material';
import { Environment } from '../../static/Environemnt';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';


export const RecommendedItemQuota = (props: {
    completedCount: number,
    recommendedItemCount: number,
    isDeadlineSet?: boolean,
    isDaily?: boolean
} & EpistoFlex2Props) => {

    const { isDaily, completedCount, recommendedItemCount, isDeadlineSet, ...css } = props;

    const label = isDaily
        ? 'Napi ajánlott videók'
        : 'Heti ajánlott videók';

    return (
        <EpistoFlex2
            flex='1'
            mb="10px"
            direction="column"
            {...css}>

            <EpistoFlex2
                direction={isDeadlineSet ? 'row' : 'column'}
                justify='space-between'
                align={isDeadlineSet ? 'center' : 'flex-start'}>

                <EpistoFont fontSize="fontSmall">
                    {label}
                </EpistoFont>

                <EpistoFlex2
                    align="center">

                    <img
                        src={isDaily
                            ? Environment.getAssetUrl('/images/dailyquota.png')
                            : Environment.getAssetUrl('/images/weeklyquota.png')}
                        alt=""
                        className="square25"
                        style={{
                            marginRight: 5
                        }} />

                    <EpistoFont
                        fontSize={'fontLargePlus'}
                        style={{
                            fontWeight: 500,
                            marginRight: 2
                        }}>

                        {completedCount}/{recommendedItemCount}
                    </EpistoFont>

                    <EpistoFont
                        fontSize="fontSmall">
                        videó
                    </EpistoFont>
                </EpistoFlex2>
            </EpistoFlex2>

            <LinearProgress
                value={Math.min(100, completedCount / recommendedItemCount * 100)}
                variant="determinate"
                style={{
                    width: isDeadlineSet
                        ? '100%'
                        : '80%',
                    marginTop: 10,
                    height: '5px'
                }} />
        </EpistoFlex2>
    );
};