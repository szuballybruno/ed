import { useRecommendedItemQuota } from '../../../services/api/userProgressApiService';
import { Id } from '../../../shared/types/versionId';
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

    const { recommendedItemQuota, refetchRecommendedItemQuota } = useRecommendedItemQuota(courseId);

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
        align="center">

        {/* video title and subtitle */}
        <PlayerTitleSubtitle
            title={title}
            subTitle={subTitle}
            isMobile={isMobile} />

        {isMobile && <RecommendedItemQuota
            flex={'2'}
            minWidth='120px'
            mb='0'
            isDaily
            isDeadlineSet={recommendedItemQuota?.isDeadlineSet ?? false}
            completedCount={recommendedItemQuota?.completedToday ?? 0}
            recommendedItemCount={recommendedItemQuota?.recommendedItemsPerDay ?? 0} />}

        {/* ratings */}
        {!isMobile && <VideoRating videoVersionId={videoVersionId} />}
    </EpistoFlex2>;
};