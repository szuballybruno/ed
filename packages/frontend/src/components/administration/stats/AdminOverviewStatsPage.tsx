import { CompanyDTO } from '@episto/communication';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { AdminOverviewGraphs } from './AdminOverviewGraphs';
import { CourseCarouselStats, useCourseOverviewStatsLogic } from './CourseCarouselStats';
import { UserOverviewStats } from './UserOverviewStats';

export const AdminOverviewStatsPage = ({ activeCompany }: { activeCompany: CompanyDTO | null }) => {

    const courseOverviewStatsLogic = useCourseOverviewStatsLogic({ activeCompanyId: activeCompany?.id ?? null });

    return (
        <AdminSubpageHeader
            id={AdminOverviewStatsPage.name}
            isInverseBackground
            direction='column'>

            <EpistoFlex2
                id={`${AdminOverviewStatsPage.name}-inner`}
                justify='center'
                wrap="wrap">

                {/* user overview stats  */}
                <UserOverviewStats />

                {/* course overview stats  */}
                <CourseCarouselStats
                    logic={courseOverviewStatsLogic} />

                {/* graphs */}
                <AdminOverviewGraphs />

            </EpistoFlex2>
        </AdminSubpageHeader>
    );
};
