import { Responsivity } from '../../helpers/responsivity';
import { Environment } from '../../static/Environemnt';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoProgressBar } from '../controls/EpistoProgressBar';

export const RecommendedItemQuota = ({
    isDaily,
    completedCount,
    recommendedItemCount,
    isDeadlineSet,
    ...css
}: {
    completedCount: number,
    recommendedItemCount: number | null,
    isDeadlineSet?: boolean,
    isDaily?: boolean,
} & EpistoFlex2Props) => {

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

    const completedCountSafe = completedCount ?? 0;
    const recommendedCountSafe = Math.ceil(recommendedItemCount || 0);

    const countLabel = (() => {

        if (isStrictMode)
            return `${completedCountSafe}/${recommendedCountSafe} videó`;

        return `${completedCountSafe} db`;
    })();

    return (
        <EpistoFlex2
            flex='1'
            mb="10px"
            direction="column"
            {...css}>

            {/* label  */}
            <EpistoFont
                fontSize="fontSmall">
                {label}
            </EpistoFont>

            {/* icon + count  */}
            <EpistoFlex2
                align="center">

                {/* icon */}
                <img
                    src={isDaily
                        ? Environment.getAssetUrl('/images/dailyquota.png')
                        : Environment.getAssetUrl('/images/weeklyquota.png')}
                    alt=""
                    className="square25"
                    style={{
                        marginRight: 5
                    }} />

                {/* count */}
                <EpistoFont
                    fontSize={'fontLargePlus'}
                    style={{
                        fontWeight: 500,
                        marginRight: 2
                    }}>

                    {countLabel}
                </EpistoFont>
            </EpistoFlex2>

            {/* progress bar */}
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