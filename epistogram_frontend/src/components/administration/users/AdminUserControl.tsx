import { useState } from "react"
import { Switch, Route } from "react-router"
import { applicationRoutes } from "../../../configuration/applicationRoutes"
import { useUserListQuery } from "../../../services/api/userApiService"
import AdminAddUserSubpage from "./AdminAddUserSubpage"
import AdminEditUserSubpage from "./AdminEditUserSubpage"
import { AdminUserCourseContentSubpage } from "./AdminUserCourseContentSubpage"
import { AdminUserCourseStatisticsSubpage } from "./AdminUserCourseStatisticsSubpage"
import { AdminUserDataGridSubpage } from "./AdminUserDataGridSubpage"
import { AdminUserListSubpage } from "./AdminUserListSubpage"
import { AdminUserStatisticsSubpage } from "./AdminUserStatisticsSubpage"
import { AdminUserTeacherInfoSubpage } from "./AdminUserTeacherInfoSubpage"
import { AdminUserVideoStatistics } from "./AdminUserVideoStatistics"

export const AdminUserControl = () => {
    const usersRoute = applicationRoutes.administrationRoute.usersRoute

    const [searchText, setSearchText] = useState<string | null>(null);

    const { users, usersStatus, usersError, refetchUsers } = useUserListQuery(searchText);

    const handleSearch = (value: string) => {

        if (value === "")
            setSearchText(null);

        if (value.length > 2)
            setSearchText(value);
    }


    return <Switch>

        {/* Route /administration/users */}
        <Route exact path={usersRoute.route}>

            <AdminUserDataGridSubpage users={users} />
        </Route>

        {/* Route /administration/users/add */}
        <Route path={usersRoute.addRoute.route}>

            <AdminAddUserSubpage
                users={users}
                refetchUsersFunction={refetchUsers} />
        </Route>

        {/* Route /administration/users/:userId/edit */}
        <Route
            exact
            path={usersRoute.editRoute.route}>

            <AdminEditUserSubpage
                users={users}
                refetchUsersFunction={refetchUsers} />
        </Route>

        {/* Route /administration/users/:userId/statistics */}
        <Route
            exact
            path={usersRoute.statsRoute.route}>

            <AdminUserStatisticsSubpage users={users} />
        </Route>

        {/* Route /administration/users/:userId/teacherinfo */}
        <Route exact path={usersRoute.teacherInfoRoute.route}>
            <AdminUserTeacherInfoSubpage users={users} />
        </Route>

        <Route exact path={usersRoute.courseStatisticsRoute.route}>
            <AdminUserCourseStatisticsSubpage />
        </Route>

        <Route exact path={usersRoute.courseContentRoute.route}>
            <AdminUserCourseContentSubpage />
        </Route>

        <Route exact path={usersRoute.moduleStatisticsRoute.route}>
            <AdminUserVideoStatistics />
        </Route>

        <Route exact path={usersRoute.videoStatisticsRoute.route}>
            <AdminUserVideoStatistics />
        </Route>

        <Route exact path={usersRoute.examStatisticsRoute.route}>
            <AdminUserVideoStatistics />
        </Route>
    </Switch >
}