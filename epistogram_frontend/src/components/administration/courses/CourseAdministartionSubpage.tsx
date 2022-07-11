import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { AdminCourseUserProgressSubpage } from './AdminCourseUserProgressSubpage';
import { AdminInteractiveCourseSubpage } from './AdminInteractiveCourseSubpage';
import { AdminCourseContentSubpage } from './contentEditSubpage/AdminCourseContentSubpage';
import { CourseStatisticsSubpage } from './CourseStatisticsSubpage';
import { EditCourseDetailsSubpage } from './EditCourseDetailsSubpage';

export const CourseAdministartionSubpage = () => {

    return (
        <EpistoRoutes
            renderRoutes={[
                {
                    route: applicationRoutes.administrationRoute.coursesRoute.landingRoute,
                    element: <AdminCourseContentSubpage />
                },
                {
                    route: applicationRoutes.administrationRoute.coursesRoute.courseDetailsRoute,
                    element: <EditCourseDetailsSubpage />
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
                },
                {
                    route: applicationRoutes.administrationRoute.coursesRoute.interactiveCourseRoute,
                    element: <AdminInteractiveCourseSubpage />
                }
            ]} />
    );
};