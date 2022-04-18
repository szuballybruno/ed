import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useRedirectOnExactMatch } from '../../../static/frontendHelpers';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { AdminCourseContentSubpage } from './contentEditSubpage/AdminCourseContentSubpage';
import { AdminCourseUserProgressSubpage } from './AdminCourseUserProgressSubpage';
import { AdminInteractiveCourseSubpage } from './AdminInteractiveCourseSubpage';
import { CourseStatisticsSubpage } from './CourseStatisticsSubpage';
import { DetailsEditSubpage } from './DetailsEditSubpage';
import { MemoTest } from '../../MemoTest';
import { EpistoRoute } from '../../../models/types';

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