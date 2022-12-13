import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { AdminActiveCompanyType } from '../../../models/types';
import { CompanyApiService } from '../../../services/api/CompanyApiService';
import { UserApiService } from '../../../services/api/UserApiService1';
import { useIsMatchingCurrentRoute } from '../../../static/frontendHelpers';
import { useRouteParams2 } from '../../../static/locationHelpers';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { AdminBreadcrumbsHeader } from '../breadcrumbsHeader/AdminBreadcrumbsHeader';
import { AdminAddUserSubpage } from './AdminAddUserSubpage';
import { AminUserGridView, useAdminUserGridLogic, useGridFilterSettingsLogic } from './AminUserGridView';
import { UserDetailsRootView } from './UserDetailsRootView';

export const UserAdminSubpage = ({ activeCompany }: { activeCompany: AdminActiveCompanyType }) => {

    const activeCompanyId = activeCompany?.id ?? null;

    const userAdminRoute = applicationRoutes
        .administrationRoute
        .usersRoute;

    const params = useRouteParams2(applicationRoutes.administrationRoute.usersRoute.userRoute);
    const userId = params.getValueOrNull(x => x.userId, 'int');

    const isMatchingCurrentAppRoute = useIsMatchingCurrentRoute();
    const isSimpleView = isMatchingCurrentAppRoute(userAdminRoute.addRoute).isMatchingRouteExactly || !!userId;

    const { companies } = CompanyApiService.useCompanies();

    const filterLogic = useGridFilterSettingsLogic();

    const gridLogic = useAdminUserGridLogic({
        isSimpleView,
        filterLogic,
        selectedCompanyId: activeCompanyId,
        userId
    });

    const { briefUserData } = UserApiService.useBriefUserData(userId);
    const subRouteLabel = briefUserData?.fullName;

    return (
        <>
            <AdminBreadcrumbsHeader
                subRouteLabel={subRouteLabel}>
            </AdminBreadcrumbsHeader>

            <EpistoFlex2
                width="100%">

                <EpistoFlex2
                    flex="1"
                    minWidth="350px">

                    <AminUserGridView
                        logic={gridLogic}
                        activeCompanyId={activeCompanyId} />
                </EpistoFlex2>

                <EpistoRoutes
                    renderRoutes={[
                        {
                            route: userAdminRoute.addRoute,
                            element: <AdminAddUserSubpage
                                companies={companies}
                                headerButtons={[]}
                                tabMenuItems={[]}
                                activeCompany={activeCompany}
                                refetchUsersFunction={gridLogic.refetchUsers.bind(gridLogic)} />
                        },
                        {
                            route: userAdminRoute.userRoute,
                            element: <UserDetailsRootView
                                refetchUsers={gridLogic.refetchUsers.bind(gridLogic)}
                                activeCompany={activeCompany}
                                companies={companies}
                                activeCompanyId={activeCompanyId} />
                        }
                    ]} />
            </EpistoFlex2>
        </>
    );
};