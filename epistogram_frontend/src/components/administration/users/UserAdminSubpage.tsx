import { useContext, useState } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { CompanyApiService } from '../../../services/api/companyApiService';
import { UserApiService } from '../../../services/api/userApiService';
import { Id } from '../../../shared/types/versionId';
import { CurrentUserContext } from '../../system/AuthenticationFrame';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import AdminAddUserSubpage from './AdminAddUserSubpage';
import AdminEditUserSubpage from './AdminEditUserSubpage';
import { AdminUserCoursesSubpage } from './adminUserCoursesSubpage/AdminUserCoursesSubpage';
import { AdminUserStatisticsSubpage } from './AdminUserLearningOverviewSubpage';
import { AdminUserTeacherInfoSubpage } from './AdminUserTeacherInfoSubpage';
import { AdminUserDataGridSubpage } from './dataGrids/AdminUsersDataGridSubpage';

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

    const handleSearch = (value: string) => {

        if (value === '')
            setSearchText(null);

        if (value.length > 2)
            setSearchText(value);
    };

    const handleSelectCompany = (companyId: Id<'Company'> | null) => {

        setSelectedCompanyId(companyId);
        refetchUsers();
    };

    return <>

        <EpistoRoutes
            renderRoutes={[
                {
                    route: userAdminRoute.indexRoute,
                    element: <AdminUserDataGridSubpage
                        selectedCompanyId={selectedCompanyId}
                        handleSelectCompany={handleSelectCompany}
                        companies={companies} />
                },
                {
                    route: userAdminRoute.addRoute,
                    element: <AdminAddUserSubpage
                        users={users}
                        refetchUsersFunction={refetchUsers}
                        selectedCompanyId={selectedCompanyId}
                        handleSelectCompany={handleSelectCompany}
                        companies={companies} />
                },
                {
                    route: userAdminRoute.editRoute,
                    element: <AdminEditUserSubpage
                        users={users}
                        selectedCompanyId={selectedCompanyId}
                        handleSelectCompany={handleSelectCompany}
                        companies={companies}
                        refetchUsersFunction={refetchUsers} />
                },
                {
                    route: userAdminRoute.statsRoute,
                    element: <AdminUserStatisticsSubpage
                        selectedCompanyId={selectedCompanyId}
                        handleSelectCompany={handleSelectCompany}
                        companies={companies}
                        users={users} />
                },
                {
                    route: userAdminRoute.teacherInfoRoute,
                    element: <AdminUserTeacherInfoSubpage
                        selectedCompanyId={selectedCompanyId}
                        handleSelectCompany={handleSelectCompany}
                        companies={companies}
                        users={users} />
                },
                {
                    route: userAdminRoute.courseContentRoute,
                    element: <AdminUserCoursesSubpage
                        users={users}
                        selectedCompanyId={selectedCompanyId}
                        handleSelectCompany={handleSelectCompany}
                        companies={companies}
                        refetchUsersFunction={refetchUsers} />
                }
            ]} />
    </>;
};