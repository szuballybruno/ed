import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { AdminCourseUserProgressSubpage } from './AdminCourseUserProgressSubpage';
import { AdminInteractiveCourseSubpage } from './AdminInteractiveCourseSubpage';
import { AdminCourseContentSubpage } from './contentEditSubpage/AdminCourseContentSubpage';
import { CourseStatisticsSubpage } from './CourseStatisticsSubpage';
import { DetailsEditSubpage } from './DetailsEditSubpage';

export const CourseAdministartionSubpage = () => {

    // useRedirectOnExactMatch({
    //     route: applicationRoutes.administrationRoute.coursesRoute,
    //     redirectRoute: applicationRoutes.administrationRoute.coursesRoute.courseContentRoute,
    //     params: { courseId: -1 }
    // });

    return (
        <EpistoRoutes
            renderRoutes={[
                {
                    route: applicationRoutes.administrationRoute.coursesRoute.landingRoute,
                    element: <AdminCourseContentSubpage />
                },
                {
                    route: applicationRoutes.administrationRoute.coursesRoute.courseDetailsRoute,
                    element: <DetailsEditSubpage />
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