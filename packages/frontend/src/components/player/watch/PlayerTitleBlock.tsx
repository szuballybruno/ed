import { Id } from '@episto/commontypes';
import { useCourseProgressOverview } from '../../../services/api/userProgressApiService';
import { coalesce } from '../../../static/frontendHelpers';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { RecommendedItemQuota } from '../../home/RecommendedItemQuota';
import { PlayerTitleSubtitle } from './PlayerTitleSubtitle';
import { VideoRating } from './VideoRating';

export const PlayerTitleBlock = (props: {
    title: string,
    subTitle: string,
    videoVersionId: Id<'VideoVersion'>,
    courseId: Id<'Course'>,
    isMobile: boolean
}) => {

    const {
        title,
        subTitle,
        videoVersionId,
        isMobile,
        courseId
    } = props;

    const { courseProgressOverviewData } = useCourseProgressOverview(courseId);

    const {
        recommendedItemsPerDay,
        completedToday,
        deadlineDate
    } = coalesce(courseProgressOverviewData, {
        recommendedItemsPerDay: 0,
        completedToday: 0,
        deadlineDate: null
    });

    const isDeadlineSet = !!deadlineDate;

    return <EpistoFlex2
        id="playerTitleBlock"
        justify="space-between"
        py={isMobile ? '0' : '20px'}
        px={isMobile ? '10px' : undefined}
        pb={isMobile ? '10px' : undefined}
        flexWrap={isMobile ? undefined : 'wrap'}
        minHeight={isMobile ? '80px' : '0'}
        background={isMobile ? 'white' : undefined}
        width={isMobile ? '100%' : undefined}
        zIndex={14}
        align='center'>

        {/* video title and subtitle */}
        <PlayerTitleSubtitle
            title={title}
            subTitle={subTitle}
            isMobile={isMobile} />


        {isMobile && <RecommendedItemQuota
            minWidth='130px'
            mb='0'
            isDaily
            isDeadlineSet={isDeadlineSet}
            completedCount={completedToday}
            recommendedItemCount={recommendedItemsPerDay} />}

        {/* ratings */}
        {!isMobile && <VideoRating videoVersionId={videoVersionId} />}
    </EpistoFlex2>;
};