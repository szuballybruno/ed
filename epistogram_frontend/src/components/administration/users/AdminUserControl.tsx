import { useState } from 'react';
import { Route } from 'react-router-dom';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useUserListQuery } from '../../../services/api/userApiService';
import { EpistoRoutes } from '../../universal/EpistoRoutes';
import AdminAddUserSubpage from './AdminAddUserSubpage';
import AdminEditUserSubpage from './AdminEditUserSubpage';
import { AdminUserCourseContentSubpage } from './AdminUserCourseContentSubpage';
import { AdminUserStatisticsSubpage } from './AdminUserLearningOverviewSubpage';
import { AdminUserTeacherInfoSubpage } from './AdminUserTeacherInfoSubpage';
import { AdminUserDataGridSubpage } from './dataGrids/AdminUsersDataGridSubpage';

export const AdminUserControl = () => {
    const usersRoute = applicationRoutes.administrationRoute.usersRoute;

    const [searchText, setSearchText] = useState<string | null>(null);

    const { users, usersStatus, usersError, refetchUsers } = useUserListQuery(searchText);

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
                    route: usersRoute,
                    element: <AdminUserDataGridSubpage
                        users={users} />
                },
                {
                    route: usersRoute.addRoute,
                    element: <AdminAddUserSubpage
                        users={users}
                        refetchUsersFunction={refetchUsers} />
                },
                {
                    route: usersRoute.editRoute,
                    element: <AdminEditUserSubpage
                        users={users}
                        refetchUsersFunction={refetchUsers} />
                },
                {
                    route: usersRoute.statsRoute,
                    element: <AdminUserStatisticsSubpage
                        users={users} />
                },
                {
                    route: usersRoute.teacherInfoRoute,
                    element: <AdminUserTeacherInfoSubpage
                        users={users} />
                },
                {
                    route: usersRoute.courseContentRoute,
                    element: <AdminUserCourseContentSubpage
                        users={users}
                        refetchUsersFunction={refetchUsers} />
                }
            ]} />
    </>;
};