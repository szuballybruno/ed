import { useState } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { UserApiService } from '../../../services/api/userApiService';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import AdminAddUserSubpage from './AdminAddUserSubpage';
import AdminEditUserSubpage from './AdminEditUserSubpage';
import { AdminUserCourseContentSubpage } from './AdminUserCourseContentSubpage';
import { AdminUserStatisticsSubpage } from './AdminUserLearningOverviewSubpage';
import { AdminUserTeacherInfoSubpage } from './AdminUserTeacherInfoSubpage';
import { AdminUserDataGridSubpage } from './dataGrids/AdminUsersDataGridSubpage';

export const UserAdminSubpage = () => {

    const userAdminRoute = applicationRoutes
        .administrationRoute
        .usersRoute;

    const [searchText, setSearchText] = useState<string | null>(null);

    const { users, usersStatus, usersError, refetchUsers } = UserApiService
        .useUserListQuery(searchText);

    const handleSearch = (value: string) => {

        if (value === '')
            setSearchText(null);

        if (value.length > 2)
            setSearchText(value);
    };

    return <>

        <EpistoRoutes
            renderRoutes={[
                {
                    route: userAdminRoute.indexRoute,
                    element: <AdminUserDataGridSubpage
                        users={users} />
                },
                {
                    route: userAdminRoute.addRoute,
                    element: <AdminAddUserSubpage
                        users={users}
                        refetchUsersFunction={refetchUsers} />
                },
                {
                    route: userAdminRoute.editRoute,
                    element: <AdminEditUserSubpage
                        users={users}
                        refetchUsersFunction={refetchUsers} />
                },
                {
                    route: userAdminRoute.statsRoute,
                    element: <AdminUserStatisticsSubpage
                        users={users} />
                },
                {
                    route: userAdminRoute.teacherInfoRoute,
                    element: <AdminUserTeacherInfoSubpage
                        users={users} />
                },
                {
                    route: userAdminRoute.courseContentRoute,
                    element: <AdminUserCourseContentSubpage
                        users={users}
                        refetchUsersFunction={refetchUsers} />
                }
            ]} />
    </>;
};