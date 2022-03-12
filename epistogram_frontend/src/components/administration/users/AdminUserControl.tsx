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
        <Route exact path={usersRoute.route}>
            {/*<AdminUserListSubpage />*/}
            <AdminUserDataGridSubpage users={users} />
        </Route>

        <Route path={usersRoute.addRoute.route}>
            <AdminAddUserSubpage users={users} />
        </Route>

        <Route exact path={usersRoute.editRoute.route}>
            <AdminEditUserSubpage users={users} refetchUsersFunction={refetchUsers} />
        </Route>

        <Route exact path={usersRoute.statsRoute.route}>
            <AdminUserStatisticsSubpage users={users} />
        </Route>

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