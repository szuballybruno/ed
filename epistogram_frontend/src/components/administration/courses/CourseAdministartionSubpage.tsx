import { useEffect } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useNavigation } from '../../../services/core/navigatior';
import { useIsMatchingCurrentRoute } from '../../../static/frontendHelpers';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { AdminCourseContentSubpage } from './AdminCourseContentSubpage';
import { AdminCourseUserProgressSubpage } from './AdminCourseUserProgressSubpage';
import { AdminInteractiveCourseSubpage } from './AdminInteractiveCourseSubpage';
import { CourseStatisticsSubpage } from './CourseStatisticsSubpage';
import { AdminCourseDetailsSubpage } from './EditCourseDetailsSubpage';

export const CourseAdministartionSubpage = () => {

    const isMatching = useIsMatchingCurrentRoute();
    const { isMatchingRouteExactly } = isMatching(applicationRoutes.administrationRoute.coursesRoute);

    const { navigate } = useNavigation();

    useEffect(() => {

        if (!isMatchingRouteExactly)
            return;

        console.log('navigate');
        navigate(applicationRoutes.administrationRoute.coursesRoute.courseContentRoute, { courseId: -1 });
    }, [isMatchingRouteExactly]);

    return (
        <EpistoRoutes
            renderRoutes={[
                {
                    route: applicationRoutes.administrationRoute.coursesRoute.courseDetailsRoute,
                    element: <AdminCourseDetailsSubpage />
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