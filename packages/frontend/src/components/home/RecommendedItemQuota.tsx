import { Responsivity } from '../../helpers/responsivity';
import { Environment } from '../../static/Environemnt';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoProgressBar } from '../controls/EpistoProgressBar';


export const RecommendedItemQuota = (props: {
    completedCount: number,
    recommendedItemCount: number | null,
    isDeadlineSet?: boolean,
    isDaily?: boolean,
} & EpistoFlex2Props) => {

    const { isDaily, completedCount, recommendedItemCount, isDeadlineSet, ...css } = props;

    const isStrictMode = recommendedItemCount;
    const isLightMode = !recommendedItemCount && completedCount;
    const isMobile = Responsivity.useIsMobileView();

    const label = (() => {

        if (isStrictMode && isDaily)
            return 'Napi ajánlott videók';

        if (isLightMode && isDaily)
            return 'Ma megtekintett videók';

        if (isStrictMode && !isDaily)
            return 'Heti ajánlott videók';

        if (isLightMode && !isDaily)
            return 'A héten megtekintett videók';

        return 'Ma megtekintett videók';

    })();

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

                        {(() => {

                            if (isStrictMode)
                                return `${completedCount || 0}/${recommendedItemCount || 0} videó`;

                            if (isLightMode)
                                return `${completedCount} db`;

                            return '0';
                        })()}
                    </EpistoFont>
                </EpistoFlex2>
            </EpistoFlex2>

            {!!recommendedItemCount && <EpistoProgressBar
                value={Math.min(100, completedCount / recommendedItemCount * 100)}
                variant="determinate"
                style={{
                    width: isDeadlineSet || isMobile
                        ? '100%'
                        : '80%',
                    marginTop: 10,
                    height: '5px'
                }} />}
        </EpistoFlex2>
    );
};