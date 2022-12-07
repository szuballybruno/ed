import { useAdminHomeOverviewStatsData } from '../../../services/api/userStatsApiService';
import { coalesce } from '../../../static/frontendHelpers';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { AdminOverviewGraphs } from './AdminOverviewGraphs';
import { CourseOverviewStats, useCourseOverviewStatsLogic } from './CourseOverviewStats';
import { UserOverviewStats } from './UserOverviewStats';

export const AdminHomeOverview = () => {

    const { adminOverviewStatsData } = useAdminHomeOverviewStatsData();
    const { flaggedUsers: flaggedUsersCount } = coalesce(adminOverviewStatsData, { flaggedUsers: 0 });
    const courseOverviewStatsLogic = useCourseOverviewStatsLogic({ adminOverviewStatsData });

    return (
        <AdminSubpageHeader
            isInverseBackground
            direction='column'>

            <EpistoFlex2
                justify='center'
                wrap="wrap">

                {/* user overview stats  */}
                <UserOverviewStats
                    flaggedUsersCount={flaggedUsersCount} />

                {/* course overview stats  */}
                <CourseOverviewStats
                    logic={courseOverviewStatsLogic} />

                {/* graphs */}
                <AdminOverviewGraphs />
            </EpistoFlex2>
        </AdminSubpageHeader>
    );
};
