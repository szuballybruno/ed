import { Flex } from '@chakra-ui/react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { AdminCourseContentSubpage } from './AdminCourseContentSubpage';
import { AdminCourseUserProgressSubpage } from './AdminCourseUserProgressSubpage';
import { AdminInteractiveCourseSubpage } from './AdminInteractiveCourseSubpage';
import { CourseAdministartionFrame } from './CourseAdministartionFrame';
import { CourseStatisticsSubpage } from './CourseStatisticsSubpage';
import { AdminCourseDetailsSubpage } from './EditCourseDetailsSubpage';

export const CourseAdministartionSubpage = () => {

    return (
        <Flex>
            <EpistoRoutes
                renderRoutes={[
                    {
                        route: applicationRoutes.administrationRoute.coursesRoute,
                        element: <CourseAdministartionFrame />
                    },
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
        </Flex>
    );
};