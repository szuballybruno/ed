import { useDailyTip } from '../../services/api/dailyTipApiService';
import { useCourseProgressOverview } from '../../services/api/userProgressApiService';
import { UserActiveCourseDTO } from '@episto/communication';
import { PagingType } from '../../static/frontendHelpers';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';
import { RecommendedItemQuota } from './RecommendedItemQuota';

/* TODO: THIS COMPONENT IS NOT USED */
export const RecommendedQuota = (props: { activeCoursesPaging: PagingType<UserActiveCourseDTO> } & EpistoFlex2Props) => {

    const { activeCoursesPaging, ...css } = props;
    const { dailyTipData } = useDailyTip();

    const currentCourse = activeCoursesPaging.currentItem;
    const { courseProgressOverviewData: recommendedItemQuota } = useCourseProgressOverview(currentCourse?.courseId);

    const completedToday = recommendedItemQuota?.completedToday || 0;
    const completedThisWeek = recommendedItemQuota?.completedThisWeek || 0;

    const recommendedItemsPerDay = recommendedItemQuota?.recommendedItemsPerDay || null;
    const recommendedItemsPerWeek = recommendedItemQuota?.recommendedItemsPerWeek || null;

    const tempomatMode = recommendedItemQuota?.tempomatMode || 'strict';

    if (!currentCourse)
        return <EpistoFlex2>
            TODO NO ACTIVE COURSE SCREEN
        </EpistoFlex2>;

    return <EpistoFlex2
        direction="column"
        height="100%"
        justify="center"
        {...css}>

        {/* recommended item quota */}
        <EpistoFlex2 align="center">

            {/* quota */}
            <EpistoFlex2
                flex="1"
                align="flex-start"
                padding="10px 10px 10px 20px"
                direction="column"
                minWidth="150px"
                justify="center">

                {/* daily recommended videos count */}
                <RecommendedItemQuota
                    completedCount={completedToday}
                    recommendedItemCount={recommendedItemsPerDay}
                    isDaily />

                {/* weekly recommended videos count */}
                <RecommendedItemQuota
                    completedCount={completedThisWeek}
                    recommendedItemCount={recommendedItemsPerWeek} />
            </EpistoFlex2>

            {/* active course thumbnail */}
            <EpistoFlex2
                minWidth="250px"
                flex="1"
                padding="20px">
                <img
                    src={currentCourse?.coverFilePath ?? ''}
                    alt=""
                    className="roundBorders" />
            </EpistoFlex2>
        </EpistoFlex2>



        {/* text daily tip */}
        {dailyTipData?.description && <EpistoFlex2
            direction="column"
            align="center"
            justify="flex-start"
            flex="1"
            padding="10px"
            fontSize="13px">

            {/* <EpistoFont>
                {dailyTipData?.description}
            </EpistoFont> */}
        </EpistoFlex2>}
    </EpistoFlex2 >;
};
