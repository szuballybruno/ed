import { useDailyTip } from '../../services/api/dailyTipApiService';
import { useRecommendedItemQuota } from '../../services/api/userProgressApiService';
import { UserActiveCourseDTO } from '../../shared/dtos/UserActiveCourseDTO';
import { PagingType } from '../../static/frontendHelpers';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';
import { RecommendedItemQuota } from './RecommendedItemQuota';

export const RecommendedQuota = (props: { activeCoursesPaging: PagingType<UserActiveCourseDTO> } & EpistoFlex2Props) => {

    const { activeCoursesPaging, ...css } = props;
    const { dailyTipData } = useDailyTip();

    const currentCourse = activeCoursesPaging.currentItem;
    const { recommendedItemQuota } = useRecommendedItemQuota(currentCourse?.courseId);

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
                p="10px 10px 10px 20px"
                direction="column"
                minWidth="150px"
                justify="center">

                {/* daily recommended videos count */}
                <RecommendedItemQuota
                    completedCount={recommendedItemQuota?.completedToday ?? 0}
                    recommendedItemCount={recommendedItemQuota?.recommendedItemsPerDay ?? 0}
                    isDaily />

                {/* weekly recommended videos count */}
                <RecommendedItemQuota
                    completedCount={recommendedItemQuota?.completedThisWeek ?? 0}
                    recommendedItemCount={recommendedItemQuota?.recommendedItemsPerWeek ?? 0} />
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
            p="10px"
            fontSize="13px">

            {/* <EpistoFont>
                {dailyTipData?.description}
            </EpistoFont> */}
        </EpistoFlex2>}
    </EpistoFlex2 >;
};
