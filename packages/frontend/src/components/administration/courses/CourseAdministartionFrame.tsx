import { Id } from '@episto/commontypes';
import { ReactNode, useCallback } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { AdminApiService } from '../../../services/api/AdminApiService';
import { CourseApiService } from '../../../services/api/courseApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { showNotification } from '../../../services/core/notifications';
import { setPageTitle, useIsMatchingCurrentRoute } from '../../../static/frontendHelpers';
import { useIntParam } from '../../../static/locationHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { useAdminBreadcrumbsContext } from '../breadcrumbsHeader/AdminBreadcrumbsContext';
import { AdminBreadcrumbsHeader } from '../breadcrumbsHeader/AdminBreadcrumbsHeader';
import { AdminCourseList } from './AdminCourseList';

export const CourseAdministartionFrame = ({
    children,
    isAnySelected,
    disabled
}: {
    children?: ReactNode,
    isAnySelected: boolean,
    disabled?: boolean
}) => {

    const { activeCompanyId } = useAdminBreadcrumbsContext();

    // util
    const { navigate3 } = useNavigation();
    const courseId = Id
        .create<'Course'>(useIntParam('courseId')!);
    const isMatchingCurrentUrl = useIsMatchingCurrentRoute();

    // http
    const { courses, coursesStatus, coursesError, refetchCoursesAsync } = AdminApiService
        .useAdminCourseList(activeCompanyId!, !!activeCompanyId);

    // dt
    const currentCourse = courses
        .firstOrNull(x => x.courseId === courseId);

    if (currentCourse)
        setPageTitle(`Kurzus szerkesztese - ${currentCourse.title}`);

    // func
    const navToCourse = useCallback((courseId: Id<'Course'>) => {

        const route = (() => {

            const base = applicationRoutes.administrationRoute.coursesRoute;

            if (isMatchingCurrentUrl(base.statisticsCourseRoute).isMatchingRoute)
                return base.statisticsCourseRoute;

            if (isMatchingCurrentUrl(base.courseContentRoute).isMatchingRoute)
                return base.courseContentRoute;

            return base.courseDetailsRoute;
        })();

        navigate3(route, { params: { activeCompanyId, courseId } });
    }, [navigate3, isMatchingCurrentUrl, activeCompanyId]);

    const { createCourseAsync, createCourseState } = CourseApiService
        .useCreateCourse();

    const handleCreateCourse = useCallback(async () => {

        await createCourseAsync({
            title: 'New course'
        });
        showNotification('Created successfully');
        await refetchCoursesAsync();
    }, [createCourseAsync, refetchCoursesAsync]);

    return (
        <EpistoFlex2
            id={CourseAdministartionFrame.name}
            flex="1"
            overflowY="scroll">

            {/* header */}
            <AdminBreadcrumbsHeader
                disabled={disabled}
                subRouteLabel={currentCourse?.title ?? ''}>

                <EpistoButton
                    onClick={handleCreateCourse}>

                    Kurzus hozzáadása
                </EpistoButton>
            </AdminBreadcrumbsHeader>

            {/* course list */}
            <EpistoFlex2
                flex="1"
                maxWidth={isAnySelected ? '100px' : '9999px'}>
                <AdminCourseList
                    onCourseClick={navToCourse}
                    courses={courses}
                    isSimpleView={isAnySelected} />
            </EpistoFlex2>

            {/* content pane */}
            <EpistoFlex2
                flex="1"
                overflow="hidden"
                maxWidth={isAnySelected ? '9999px' : '0px'}>

                {children}
            </EpistoFlex2>
        </EpistoFlex2>
    );
};