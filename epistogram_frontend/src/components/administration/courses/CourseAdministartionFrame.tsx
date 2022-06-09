import { Flex } from '@chakra-ui/react';
import { memo, ReactNode, useCallback } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useAdminCourseList } from '../../../services/api/courseApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { setPageTitle, useIsMatchingCurrentRoute } from '../../../static/frontendHelpers';
import { useIntParam } from '../../../static/locationHelpers';
import { EpistoFont } from '../../controls/EpistoFont';
import { AdminBreadcrumbsHeader, BreadcrumbLink } from '../AdminBreadcrumbsHeader';
import { AdminCourseList } from './AdminCourseList';

export const CourseAdministartionFrame = (params: {
    children?: ReactNode,
    isAnySelected: boolean
}) => {

    const { children, isAnySelected } = params;

    // util
    const { navigate } = useNavigation();
    const courseId = useIntParam('courseId');
    const { isMatchingCurrentRoute } = useIsMatchingCurrentRoute();

    // http
    const { courses, coursesStatus, coursesError, refetchCoursesAsync } = useAdminCourseList('');

    // dt
    const currentCourse = courses
        .firstOrNull(x => x.courseId === courseId);

    if (currentCourse)
        setPageTitle(`Kurzus szerkesztese - ${currentCourse.title}`);

    // func
    const navToCourse = useCallback((courseId: number) => {

        const url = (() => {

            const base = applicationRoutes.administrationRoute.coursesRoute;

            if (isMatchingCurrentRoute(base.statisticsCourseRoute).isMatchingRoute)
                return base.statisticsCourseRoute;

            if (isMatchingCurrentRoute(base.courseContentRoute).isMatchingRoute)
                return base.courseContentRoute;

            return base.courseDetailsRoute;
        })();

        navigate(url, { courseId });
    }, [courseId, navigate, isMatchingCurrentRoute, applicationRoutes]);

    return (
        <Flex
            id="CourseAdministartionFrame"
            className="whall">

            {/* header */}
            <AdminBreadcrumbsHeader>

                {/* course list */}
                <AdminCourseList
                    onCourseClick={navToCourse}
                    courses={courses} />

                {/* content pane */}
                {isAnySelected
                    ? children
                    : <Flex
                        justify="center"
                        className="whall"
                        bg="white">

                        <EpistoFont
                            style={{
                                marginTop: '50px'
                            }}>
                            Kérlek válassz ki egy kurzust
                        </EpistoFont>
                    </Flex>}

            </AdminBreadcrumbsHeader>
        </Flex>
    );
};