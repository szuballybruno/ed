import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { AdminActiveCompanyIdType } from '../../../models/types';
import { ArrayBuilder } from '../../../static/frontendHelpers';
import { useAuthorizationContext } from '../../system/AuthorizationContext';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { AdminCourseUserProgressSubpage } from './AdminCourseUserProgressSubpage';
import { AdminCourseContentSubpage } from './contentEditSubpage/AdminCourseContentSubpage';
import { CourseStatisticsSubpage } from './CourseStatisticsSubpage';
import { EditCourseDetailsSubpage } from './EditCourseDetailsSubpage';

export const CourseAdministartionSubpage = ({ activeCompanyId }: { activeCompanyId: AdminActiveCompanyIdType }) => {

    const { hasPermission } = useAuthorizationContext();

    return (
        <EpistoRoutes
            renderRoutes={new ArrayBuilder()
                .add({
                    route: applicationRoutes.administrationRoute.coursesRoute,
                    element: <AdminCourseContentSubpage />,
                    asIndexRoute: true
                })
                .addIf(hasPermission('EDIT_COURSE'), {
                    route: applicationRoutes.administrationRoute.coursesRoute.courseDetailsRoute,
                    element: <EditCourseDetailsSubpage
                        activeCompanyId={activeCompanyId} />
                })
                .addIf(hasPermission('EDIT_COURSE'), {
                    route: applicationRoutes.administrationRoute.coursesRoute.courseContentRoute,
                    element: <AdminCourseContentSubpage />
                })
                .add({
                    route: applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute,
                    element: <CourseStatisticsSubpage />
                })
                .add({
                    route: applicationRoutes.administrationRoute.coursesRoute.courseUserProgressRoute,
                    element: <AdminCourseUserProgressSubpage />
                })
                .getArray()
            } />
    );
};