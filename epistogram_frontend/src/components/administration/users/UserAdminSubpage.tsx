import { useContext } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { CompanyApiService } from '../../../services/api/CompanyApiService1';
import { UserApiService } from '../../../services/api/UserApiService1';
import { useIsMatchingCurrentRoute } from '../../../static/frontendHelpers';
import { useRouteParams2 } from '../../../static/locationHelpers';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { CurrentUserContext } from '../../system/AuthenticationFrame';
import { useAuthorizationContext } from '../../system/AuthorizationContext';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { AdminBreadcrumbsHeader } from '../AdminBreadcrumbsHeader';
import { AdminAddUserSubpage } from './AdminAddUserSubpage';
import { AminUserGridView, useAdminUserGridLogic, useGridFilterSettingsLogic } from './AminUserGridView';
import { CompanySelectorDropdown, useCompanySelectorLogic } from './CompanySelectorDropdown';
import { UserDetailsRootView } from './UserDetailsRootView';

export const UserAdminSubpage = () => {

    const userAdminRoute = applicationRoutes
        .administrationRoute
        .usersRoute;

    const { hasPermission } = useAuthorizationContext();

    const params = useRouteParams2(applicationRoutes.administrationRoute.usersRoute.userRoute);
    const userId = params.getValueOrNull(x => x.userId, 'int');

    const isMatchingCurrentAppRoute = useIsMatchingCurrentRoute();
    const isSimpleView = isMatchingCurrentAppRoute(userAdminRoute.addRoute).isMatchingRouteExactly || !!userId;

    const currentUser = useContext(CurrentUserContext);

    const { companies } = CompanyApiService.useCompanies();

    const filterLogic = useGridFilterSettingsLogic();

    const companySelectorLogic = useCompanySelectorLogic({ companies });

    const gridLogic = useAdminUserGridLogic({
        isSimpleView,
        filterLogic,
        selectedCompanyId: companySelectorLogic.activeCompanyId,
        userId
    });

    const companiesHeaderComponent = hasPermission('CAN_VIEW_HIDDEN_MENUS') && <CompanySelectorDropdown
        logic={companySelectorLogic} />;

    const { briefUserData } = UserApiService.useBriefUserData(userId);
    const subRouteLabel = briefUserData?.fullName;

    return (
        <AdminBreadcrumbsHeader
            subRouteLabel={subRouteLabel}
            headerComponent={companiesHeaderComponent}>

            <EpistoFlex2
                width="100%">

                <EpistoFlex2
                    flex="1"
                    minWidth="350px">

                    <AminUserGridView
                        logic={gridLogic}
                        companySelectorLogic={companySelectorLogic} />
                </EpistoFlex2>

                <EpistoRoutes
                    renderRoutes={[
                        {
                            route: userAdminRoute.addRoute,
                            element: <AdminAddUserSubpage
                                companies={companies}
                                headerButtons={[]}
                                tabMenuItems={[]}
                                activeCompany={companySelectorLogic.activeCompany}
                                refetchUsersFunction={gridLogic.refetchUsers.bind(gridLogic)} />
                        },
                        {
                            route: userAdminRoute.userRoute,
                            element: <UserDetailsRootView
                                refetchUsers={gridLogic.refetchUsers.bind(gridLogic)}
                                activeCompany={companySelectorLogic.activeCompany}
                                companies={companies} />
                        }
                    ]} />
            </EpistoFlex2>
        </AdminBreadcrumbsHeader>
    );
};