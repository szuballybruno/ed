import { CompanyDTO } from '@episto/communication';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { AdminActiveCompanyIdType, ButtonType } from '../../../models/types';
import { UserApiService } from '../../../services/api/UserApiService1';
import { Navigator } from '../../../services/core/navigatior';
import { EpistoIcons } from '../../../static/EpistoIcons';
import { ArrayBuilder } from '../../../static/frontendHelpers';
import { useRouteParams2 } from '../../../static/locationHelpers';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { AdminEditUserSubpage } from './addEditUser/AdminEditUserSubpage';
import { AdminUserStatisticsSubpage } from './adminUserStatisticsSubpage/UserStatisticsSubpage';
import { AdminUserTeacherInfoSubpage } from './teacherInfoSubpage/AdminUserTeacherInfoSubpage';

export const UserDetailsRootView = ({
    refetchUsers,
    activeCompany,
    companies,
    activeCompanyId
}: {
    refetchUsers: () => void,
    activeCompany: CompanyDTO | null,
    companies: CompanyDTO[],
    activeCompanyId: AdminActiveCompanyIdType
}) => {

    const params = useRouteParams2(applicationRoutes.administrationRoute.usersRoute.userRoute);
    const userId = params.getValue(x => x.userId, 'int');

    const usersAdminRoute = applicationRoutes.administrationRoute.usersRoute;
    const { userIsTeacher } = UserApiService.useUserIsTeacher(userId);

    const { navigate3 } = Navigator
        .useNavigation();

    const menuRoutes = new ArrayBuilder()
        .addMany([
            applicationRoutes.administrationRoute.usersRoute.userRoute.statsRoute,
            applicationRoutes.administrationRoute.usersRoute.userRoute.editRoute,
        ])
        .addIf(userIsTeacher, applicationRoutes.administrationRoute.usersRoute.userRoute.teacherInfoRoute)
        .getArray();

    const headerButtons: ButtonType[] = [
        {
            title: 'Vissza az Áttekintés nézetbe',
            icon: <EpistoIcons.Close />,
            action: () => navigate3(
                applicationRoutes.administrationRoute.usersRoute, {
                params: { activeCompanyId },
                query: { preset: undefined }
            })
        }
    ];

    return (
        <EpistoFlex2
            flex="3">

            <EpistoRoutes
                renderRoutes={[
                    {
                        route: usersAdminRoute.userRoute.statsRoute,
                        element: <AdminUserStatisticsSubpage
                            headerButtons={headerButtons}
                            tabMenuItems={menuRoutes}
                            userId={userId} />
                    },
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
                        route: usersAdminRoute.userRoute.teacherInfoRoute,
                        element: <AdminUserTeacherInfoSubpage
                            headerButtons={headerButtons}
                            tabMenuItems={menuRoutes}
                            userId={userId} />
                    }
                ]} />
        </EpistoFlex2>
    );
};