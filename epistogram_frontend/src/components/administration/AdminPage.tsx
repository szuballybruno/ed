import React, { useContext } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { RouteItemType } from "../../models/types";
import { CurrentUserContext } from "../HOC/AuthenticationFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "../HOC/MainPanels";
import { NavigationLinkList } from '../NavigationLinkList';
import Navbar from "../navbar/Navbar";
import { ProtectedRoute } from '../universal/ProtectedRoute';
import { CourseAdministration } from "./courses/AdminCourseListSubpage";
import { AdminEditCourseSubpage } from "./courses/AdminEditCourseSubpage";
import AdminStatistics from "./users/AdminStatisticsSubpage";
import AdminAddUserSubpage from "./users/AdminAddUserSubpage";
import { AdminUserListSubpage } from "./users/AdminUserListSubpage";
import { AdminUserStatisticsSubpage } from "./users/AdminUserStatisticsSubpage";
import CourseStatisticsSubpage from "./courses/CourseStatisticsSubpage";
import AdminUserTasksSubpage from './users/AdminUserTasksSubpage';
import AdminEditUserSubpage from './users/AdminEditUserSubpage';
import { AdminGroupListSubpage } from "./groups/AdminGroupListSubpage";
import { AdminAddGroupSubpage } from "./groups/AdminAddGroupSubpage";
import { AdminEditGroupSubpage } from "./groups/AdminEditGroupSubpage";
import { AdminGroupStatisticsSubpage } from "./groups/AdminGroupStatisticsSubpage";
import { EditVideoSubpage } from './courses/EditVideoSubpage';

const AdminPage = () => {

    // const user = useState(userDetailsState)

    const user = useContext(CurrentUserContext)!;
    const administrationRoutes = applicationRoutes.administrationRoute;

    const menuItems = [
        administrationRoutes.usersRoute,
    ] as RouteItemType[];

    if (user.userActivity.canAccessCourseAdministration)
        menuItems.push(administrationRoutes.coursesRoute);

    menuItems.push(...[administrationRoutes.groupsRoute, administrationRoutes.myCompanyRoute])

    return <MainWrapper>
        <Navbar />
        <ContentWrapper>

            <LeftPanel p="20px">
                <NavigationLinkList
                    items={menuItems} />
            </LeftPanel>

            <RightPanel noPadding bg="white">

                {/* admin subpages */}
                <Switch>

                    {/* user administration */}
                    <Route path={administrationRoutes.usersRoute.route}>
                        <Switch>
                            <Route exact path={administrationRoutes.usersRoute.route}>
                                <AdminUserListSubpage />
                            </Route>

                            <Route path={administrationRoutes.usersRoute.addRoute.route}>
                                <AdminAddUserSubpage />
                            </Route>

                            <Route exact path={administrationRoutes.usersRoute.editRoute.route}>
                                <AdminEditUserSubpage />
                            </Route>

                            <Route exact path={administrationRoutes.usersRoute.statsRoute.route}>
                                <AdminUserStatisticsSubpage />
                            </Route>

                            <Route exact path={administrationRoutes.usersRoute.tasksRoute.route}>
                                <AdminUserTasksSubpage />
                            </Route>
                        </Switch>
                    </Route>

                    {/* course administartion */}
                    <ProtectedRoute
                        path={administrationRoutes.coursesRoute.route}
                        isAuthorizedToView={x => x.canAccessCourseAdministration}
                        render={
                            () => <Switch>

                                <Route exact path={administrationRoutes.coursesRoute.route}>
                                    <CourseAdministration />
                                </Route>

                                <Route path={administrationRoutes.coursesRoute.editCourseRoute.route}>
                                    <AdminEditCourseSubpage />
                                </Route>

                                <Route path={administrationRoutes.coursesRoute.statisticsCourseRoute.route}>
                                    <CourseStatisticsSubpage />
                                </Route>

                                <Route path={administrationRoutes.coursesRoute.editVideoRoute.route}>
                                    <EditVideoSubpage />
                                </Route>
                            </Switch>
                        }
                    />

                    {/* group administartion */}
                    <Route
                        path={administrationRoutes.groupsRoute.route}
                        render={
                            () => <Switch>
                                <Route exact path={administrationRoutes.groupsRoute.route}>
                                    <AdminGroupListSubpage />
                                </Route>
                                <Route path={administrationRoutes.groupsRoute.addRoute.route}>
                                    <AdminAddGroupSubpage />
                                </Route>
                                <Route path={administrationRoutes.groupsRoute.editRoute.route}>
                                    <AdminEditGroupSubpage />
                                </Route>
                                <Route path={administrationRoutes.groupsRoute.statisticsRoute.route}>
                                    <AdminGroupStatisticsSubpage />
                                </Route>
                            </Switch>
                        }
                    />

                    {/* statistics */}
                    <Route exact path={administrationRoutes.myCompanyRoute.route}>
                        <AdminStatistics />
                    </Route>
                </Switch>
            </RightPanel>
        </ContentWrapper>
    </MainWrapper>
};

export default withRouter(AdminPage);
