import { useRecommendedItemQuota } from '../../services/api/userProgressApiService';
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

    const { recommendedItemQuota } = useRecommendedItemQuota(courseId);

    return <EpistoGrid
        width='100%'
        auto='fill'
        gap='10px'
        mt='5px'
        minColumnWidth='150px'>

        <StatisticsCard
            isMobile
            title={'Napi videó teljesítve'}
            value={`${recommendedItemQuota?.completedToday}/${recommendedItemQuota?.recommendedItemsPerDay}` ?? '0'}
            suffix={''}
            iconPath={Environment.getAssetUrl('/images/dailyquota.png')}
            isOpenByDefault={false} />

        <StatisticsCard
            isMobile
            title={'Heti videó teljesítve'}
            value={`${recommendedItemQuota?.completedThisWeek}/${recommendedItemQuota?.recommendedItemsPerWeek}` ?? '0'}
            suffix={''}
            iconPath={Environment.getAssetUrl('/images/weeklyquota.png')}
            isOpenByDefault={false} />
    </EpistoGrid>;
};