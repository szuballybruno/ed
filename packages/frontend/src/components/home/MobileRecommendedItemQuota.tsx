import { useCourseProgressOverview } from '../../services/api/userProgressApiService';
import { UserActiveCourseDTO } from '@episto/communication';
import { Environment } from '../../static/Environemnt';
import { PagingType } from '../../static/frontendHelpers';
import { EpistoGrid } from '../controls/EpistoGrid';
import StatisticsCard from '../statisticsCard/StatisticsCard';
export const MobileRecommendedItemQuota = (props: {
    activeCoursesPaging: PagingType<UserActiveCourseDTO>;
}) => {

    const { activeCoursesPaging } = props;
    const courseId = activeCoursesPaging?.currentItem?.courseId;

    const { courseProgressOverviewData: recommendedItemQuota } = useCourseProgressOverview(courseId);

    const completedToday = (() => {

        if (!recommendedItemQuota?.completedToday && recommendedItemQuota?.recommendedItemsPerDay)
            return '0/' + recommendedItemQuota.recommendedItemsPerDay;

        if (!recommendedItemQuota?.completedToday && !recommendedItemQuota?.recommendedItemsPerDay)
            return '-';

        return `${recommendedItemQuota.completedToday}/${recommendedItemQuota.recommendedItemsPerDay}`;
    })();

    const completedThisWeek = (() => {

        if (!recommendedItemQuota?.completedThisWeek && recommendedItemQuota?.recommendedItemsPerWeek)
            return '0/' + recommendedItemQuota.recommendedItemsPerWeek;

        if (!recommendedItemQuota?.completedThisWeek && !recommendedItemQuota?.recommendedItemsPerWeek)
            return '-';

        return `${recommendedItemQuota.completedThisWeek}/${recommendedItemQuota.recommendedItemsPerWeek}`;
    })();

    return <EpistoGrid
        width='100%'
        auto='fill'
        gap='10px'
        mt='5px'
        minColumnWidth='150px'>

        <StatisticsCard
            isMobile
            title={'Napi videó teljesítve'}
            value={completedToday}
            suffix={''}
            iconPath={Environment.getAssetUrl('/images/dailyquota.png')}
            isOpenByDefault={false} />

        <StatisticsCard
            isMobile
            title={'Heti videó teljesítve'}
            value={completedThisWeek}
            suffix={''}
            iconPath={Environment.getAssetUrl('/images/weeklyquota.png')}
            isOpenByDefault={false} />
    </EpistoGrid>;
};