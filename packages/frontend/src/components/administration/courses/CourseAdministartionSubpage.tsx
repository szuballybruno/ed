import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { AdminActiveCompanyIdType } from '../../../models/types';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { AdminCourseUserProgressSubpage } from './AdminCourseUserProgressSubpage';
import { AdminCourseContentSubpage } from './contentEditSubpage/AdminCourseContentSubpage';
import { CourseStatisticsSubpage } from './CourseStatisticsSubpage';
import { EditCourseDetailsSubpage } from './EditCourseDetailsSubpage';

export const CourseAdministartionSubpage = ({ activeCompanyId }: { activeCompanyId: AdminActiveCompanyIdType }) => {

    return (
        <EpistoRoutes
            renderRoutes={[
                {
                    route: applicationRoutes.administrationRoute.coursesRoute.landingRoute,
                    element: <AdminCourseContentSubpage />
                },
                {
                    route: applicationRoutes.administrationRoute.coursesRoute.courseDetailsRoute,
                    element: <EditCourseDetailsSubpage
                        activeCompanyId={activeCompanyId} />
                },
                {
                    route: applicationRoutes.administrationRoute.coursesRoute.courseContentRoute,
                    element: <AdminCourseContentSubpage />
                },
                {
                    route: applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute,
                    element: <CourseStatisticsSubpage />
                },
                {
                    route: applicationRoutes.administrationRoute.coursesRoute.courseUserProgressRoute,
                    element: <AdminCourseUserProgressSubpage />
                }
            ]} />
    );
};