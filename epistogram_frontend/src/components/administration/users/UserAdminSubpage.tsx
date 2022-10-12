import { useContext, useState } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { CompanyApiService } from '../../../services/api/CompanyApiService1';
import { UserApiService } from '../../../services/api/userApiService';
import { Id } from '../../../shared/types/versionId';
import { useIsMatchingCurrentRoute } from '../../../static/frontendHelpers';
import { useRouteParams2 } from '../../../static/locationHelpers';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { CurrentUserContext } from '../../system/AuthenticationFrame';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { AdminBreadcrumbsHeader } from '../AdminBreadcrumbsHeader';
import { AdminAddUserSubpage } from './AdminAddUserSubpage';
import { AminUserGridView, useAdminUserGridLogic, useGridFilterSettingsLogic } from './AminUserGridView';
import { CompanySelectorDropdown } from './CompanySelectorDropdown';
import { UserDetailsRootView } from './UserDetailsRootView';

export const UserAdminSubpage = () => {

    const userAdminRoute = applicationRoutes
        .administrationRoute
        .usersRoute;

    const params = useRouteParams2(applicationRoutes.administrationRoute.usersRoute.userRoute);
    const userId = params.getValueOrNull(x => x.userId, 'int');

    const isMatchingCurrentAppRoute = useIsMatchingCurrentRoute();
    const isSimpleView = isMatchingCurrentAppRoute(userAdminRoute.addRoute).isMatchingRouteExactly || !!userId;

    const currentUser = useContext(CurrentUserContext);

    const [selectedCompanyId, setSelectedCompanyId] = useState<Id<'Company'> | null>(currentUser.companyId);

    const { companies } = CompanyApiService.useCompanies();

    const filterLogic = useGridFilterSettingsLogic();
    const gridLogic = useAdminUserGridLogic({
        isSimpleView,
        filterLogic,
        selectedCompanyId,
        userId
    });

    const handleSelectCompany = (companyId: Id<'Company'> | null) => {

        setSelectedCompanyId(companyId);
        gridLogic.refetchUsers();
    };

    const companiesHeaderComponent = companies.length > 1 && <CompanySelectorDropdown
        selectedCompanyId={selectedCompanyId}
        handleSelectCompany={handleSelectCompany}
        companies={companies} />;

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
                        logic={gridLogic} />
                </EpistoFlex2>

                <EpistoRoutes
                    renderRoutes={[
                        {
                            route: userAdminRoute.addRoute,
                            element: <AdminAddUserSubpage
                                headerButtons={[]}
                                tabMenuItems={[]}
                                refetchUsersFunction={gridLogic.refetchUsers.bind(gridLogic)}
                                selectedCompanyId={selectedCompanyId} />
                        },
                        {
                            route: userAdminRoute.userRoute,
                            element: <UserDetailsRootView
                                refetchUsers={gridLogic.refetchUsers.bind(gridLogic)}
                                selectedCompanyId={selectedCompanyId} />
                        }
                    ]} />
            </EpistoFlex2>
        </AdminBreadcrumbsHeader>
    );
};