import { useRecommendedItemQuota } from '../../services/api/userProgressApiService';
import { UserActiveCourseDTO } from '../../shared/dtos/UserActiveCourseDTO';
import { Environment } from '../../static/Environemnt';
import { PagingType } from '../../static/frontendHelpers';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import StatisticsCard from '../statisticsCard/StatisticsCard';

export const MobileRecommendedItemQuota = (props: {
    activeCoursesPaging: PagingType<UserActiveCourseDTO>;
}) => {

    const { activeCoursesPaging } = props;
    const courseId = activeCoursesPaging?.currentItem?.courseId;

    const { recommendedItemQuota } = useRecommendedItemQuota(courseId);

    return <EpistoFlex2
        maxWidth='100%'>

        <StatisticsCard
            minWidth={undefined}
            maxBlockSize='120px'
            isMobile
            marginRight='2.5px'
            title={'Napi videó teljesítve'}
            value={`${recommendedItemQuota?.completedToday}/${recommendedItemQuota?.recommendedItemsPerDay}` ?? '0'}
            suffix={''}
            iconPath={Environment.getAssetUrl('/images/dailyquota.png')}
            isOpenByDefault={false} />

        <StatisticsCard
            minWidth={undefined}
            maxBlockSize='120px'
            isMobile
            marginLeft='2.5px'
            title={'Heti videó teljesítve'}
            value={`${recommendedItemQuota?.completedThisWeek}/${recommendedItemQuota?.recommendedItemsPerWeek}` ?? '0'}
            suffix={''}
            iconPath={Environment.getAssetUrl('/images/weeklyquota.png')}
            isOpenByDefault={false} />
    </EpistoFlex2>;
};