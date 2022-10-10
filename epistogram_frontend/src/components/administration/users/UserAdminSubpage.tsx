import { useContext, useState } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { CompanyApiService } from '../../../services/api/companyApiService';
import { UserApiService } from '../../../services/api/userApiService';
import { Id } from '../../../shared/types/versionId';
import { useRouteParams2 } from '../../../static/locationHelpers';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { CurrentUserContext } from '../../system/AuthenticationFrame';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import { AdminBreadcrumbsHeader, CompanySelectorDropdown } from '../AdminBreadcrumbsHeader';
import { AminUserGridView, useGridFilterSettingsLogic } from './AminUserGridView';
import { UserDetailsRootView } from './UserDetailsRootView';

export const UserAdminSubpage = () => {

    const userAdminRoute = applicationRoutes
        .administrationRoute
        .usersRoute;

    const currentUser = useContext(CurrentUserContext);

    const [searchText, setSearchText] = useState<string | null>(null);
    const [selectedCompanyId, setSelectedCompanyId] = useState<Id<'Company'> | null>(currentUser.companyId);

    const { companies } = CompanyApiService.useCompanies();

    const { users, usersStatus, usersError, refetchUsers } = UserApiService
        .useUserListQuery(searchText, selectedCompanyId);

    const handleSelectCompany = (companyId: Id<'Company'> | null) => {

        setSelectedCompanyId(companyId);
        refetchUsers();
    };

    const params = useRouteParams2(applicationRoutes.administrationRoute.usersRoute.userRoute);
    const userId = params.getValueOrNull(x => x.userId, 'int');

    const companiesHeaderComponent = companies.length > 1 && <CompanySelectorDropdown
        selectedCompanyId={selectedCompanyId}
        handleSelectCompany={handleSelectCompany}
        companies={companies} />;

    const filterLogic = useGridFilterSettingsLogic();

    return (
        <AdminBreadcrumbsHeader
            headerComponent={companiesHeaderComponent}>

            <EpistoFlex2
                width="100%">

                <EpistoFlex2
                    flex="1"
                    minWidth="350px">

                    <AminUserGridView
                        isSimpleView={!!userId}
                        filterLogic={filterLogic}
                        selectedCompanyId={selectedCompanyId} />
                </EpistoFlex2>

                <EpistoRoutes
                    renderRoutes={[
                        {
                            route: userAdminRoute.userRoute,
                            element: <UserDetailsRootView
                                refetchUsers={refetchUsers}
                                selectedCompanyId={selectedCompanyId} />
                        }
                    ]} />
            </EpistoFlex2>
        </AdminBreadcrumbsHeader>
    );
};