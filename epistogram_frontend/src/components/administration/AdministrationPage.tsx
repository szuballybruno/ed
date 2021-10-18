import React, { useContext } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { RouteItemType } from "../../models/types";
import { CurrentUserContext } from "../HOC/AuthenticationFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "../HOC/MainPanels";
import { NavigationLinkList } from '../NavigationLinkList';
import Navbar from "../navbar/Navbar";
import { ProtectedRoute } from '../universal/ProtectedRoute';
import { AddCourse } from "./courses/addCourse/AddCourse";
import { AddVideo } from "./courses/addVideo/AddVideo";
import { CourseAdministration } from "./courses/courseList/CourseAdministration";
import { EditCourse } from "./courses/editCourse/EditCourse";
import { EditVideo } from "./courses/editVideo/EditVideo";
import AdminStatistics from "./statistics/AdminStatistics";
import AddUser from "../AddUser";
import { UserAdministration } from "../UserAdministration";
import EditUser from "../EditUser";
import { AdminUserStatistics } from "./users/adminUserStatistics/AdminUserStatistics";
import AdminUserTasks from "./users/adminUserTasks/AdminUserTasks";
import CourseStatistics from "./courses/courseStatistics/CourseStatistics";

const AdministrationPage = () => {

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
                                <UserAdministration />
                            </Route>

                            <Route path={administrationRoutes.usersRoute.addRoute.route}>
                                <AddUser />
                            </Route>

                            <Route exact path={administrationRoutes.usersRoute.editRoute.route}>
                                <EditUser />
                            </Route>

                            <Route exact path={administrationRoutes.usersRoute.statsRoute.route}>
                                <AdminUserStatistics />
                            </Route>

                            <Route exact path={administrationRoutes.usersRoute.tasksRoute.route}>
                                <AdminUserTasks />
                            </Route>
                        </Switch>
                    </Route>

                    {/* course administartion */}
                    <ProtectedRoute
                        path={administrationRoutes.coursesRoute.route}
                        isAuthorizedToView={x => x.canAccessCourseAdministration}
                        render={() => <Switch>
                            <Route exact path={administrationRoutes.coursesRoute.route}>
                                <CourseAdministration />
                            </Route>
                            <Route path={administrationRoutes.coursesRoute.addRoute.route}>
                                <AddCourse />
                            </Route>
                            <Route path={administrationRoutes.coursesRoute.editCourseRoute.route}>
                                <EditCourse />
                            </Route>
                            <Route path={administrationRoutes.coursesRoute.statisticsCourseRoute.route}>
                                <CourseStatistics />
                            </Route>
                            <Route path={administrationRoutes.coursesRoute.addVideoRoute.route} exact>
                                <AddVideo />
                            </Route>
                            <Route path={administrationRoutes.coursesRoute.editVideoRoute.route}>
                                <EditVideo />
                            </Route>
                        </Switch>} />

                    {/* statistics */}
                    <Route exact path={administrationRoutes.myCompanyRoute.route}>
                        <AdminStatistics />
                    </Route>
                </Switch>
            </RightPanel>
        </ContentWrapper>
    </MainWrapper>
};

export default withRouter(AdministrationPage);
