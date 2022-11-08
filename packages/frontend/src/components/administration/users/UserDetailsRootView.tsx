import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { ButtonType } from '../../../models/types';
import { UserApiService } from '../../../services/api/UserApiService1';
import { useNavigation } from '../../../services/core/navigatior';
import { CompanyDTO } from '@episto/communication';
import { EpistoIcons } from '../../../static/EpistoIcons';
import { ArrayBuilder } from '../../../static/frontendHelpers';
import { useRouteParams2 } from '../../../static/locationHelpers';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { AdminEditUserSubpage } from './AdminEditUserSubpage';
import { AdminUserCoursesSubpage } from './adminUserCoursesSubpage/AdminUserCoursesSubpage';
import { AdminUserStatisticsSubpage } from './AdminUserLearningOverviewSubpage';
import { AdminUserTeacherInfoSubpage } from './AdminUserTeacherInfoSubpage';

export const UserDetailsRootView = ({
    refetchUsers,
    activeCompany,
    companies
}: {
    refetchUsers: () => void,
    activeCompany: CompanyDTO | null,
    companies: CompanyDTO[]
}) => {

    const params = useRouteParams2(applicationRoutes.administrationRoute.usersRoute.userRoute);
    const userId = params.getValue(x => x.userId, 'int');

    const usersAdminRoute = applicationRoutes.administrationRoute.usersRoute;
    const { userIsTeacher } = UserApiService.useUserIsTeacher(userId);

    const { navigate2 } = useNavigation();

    const menuRoutes = new ArrayBuilder()
        .addMany([
            applicationRoutes.administrationRoute.usersRoute.userRoute.editRoute,
            applicationRoutes.administrationRoute.usersRoute.userRoute.statsRoute,
            applicationRoutes.administrationRoute.usersRoute.userRoute.courseContentRoute
        ])
        .addIf(userIsTeacher, applicationRoutes.administrationRoute.usersRoute.userRoute.teacherInfoRoute)
        .getArray();

    const headerButtons: ButtonType[] = [
        {
            title: 'Vissza az Áttekintés nézetbe',
            icon: <EpistoIcons.Close />,
            action: () => navigate2(applicationRoutes.administrationRoute.usersRoute, { preset: undefined })
        }
    ];

    return (
        <EpistoFlex2
            flex="3">

            <EpistoRoutes
                renderRoutes={[
                    {
                        route: usersAdminRoute.userRoute.editRoute,
                        element: <AdminEditUserSubpage
                            headerButtons={headerButtons}
                            companies={companies}
                            refetchUsersFunction={refetchUsers}
                            tabMenuItems={menuRoutes}
                            activeCompany={activeCompany}
                            userId={userId} />
                    },
                    {
                        route: usersAdminRoute.userRoute.statsRoute,
                        element: <AdminUserStatisticsSubpage
                            headerButtons={headerButtons}
                            tabMenuItems={menuRoutes}
                            userId={userId} />
                    },
                    {
                        route: usersAdminRoute.userRoute.teacherInfoRoute,
                        element: <AdminUserTeacherInfoSubpage
                            headerButtons={headerButtons}
                            tabMenuItems={menuRoutes}
                            userId={userId} />
                    },
                    {
                        route: usersAdminRoute.userRoute.courseContentRoute,
                        element: <AdminUserCoursesSubpage
                            headerButtons={headerButtons}
                            tabMenuItems={menuRoutes}
                            userId={userId} />
                    }
                ]} />
        </EpistoFlex2>
    );
};