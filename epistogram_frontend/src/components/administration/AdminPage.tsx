import React, { ReactNode, useContext } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ApplicationRoute } from "../../models/types";
import { CurrentUserContext } from "../system/AuthenticationFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "../system/MainPanels";
import { NavigationLinkList } from '../NavigationLinkList';
import Navbar from "../navbar/Navbar";
import { ProtectedRoute } from '../universal/ProtectedRoute';
import { AdminCourseListSubpage } from "./courses/AdminCourseListSubpage";
import AdminStatistics from "./users/AdminStatisticsSubpage";
import AdminAddUserSubpage from "./users/AdminAddUserSubpage";
import { AdminUserListSubpage } from "./users/AdminUserListSubpage";
import { AdminUserStatisticsSubpage } from "./users/AdminUserStatisticsSubpage";
import CourseStatisticsSubpage from "./courses/CourseStatisticsSubpage";
import AdminEditUserSubpage from './users/AdminEditUserSubpage';
import { AdminGroupListSubpage } from "./groups/AdminGroupListSubpage";
import { AdminAddGroupSubpage } from "./groups/AdminAddGroupSubpage";
import { AdminEditGroupSubpage } from "./groups/AdminEditGroupSubpage";
import { AdminGroupStatisticsSubpage } from "./groups/AdminGroupStatisticsSubpage";
import { EditVideoSubpage } from './courses/EditVideoSubpage';
import { EditQuestionSubpage } from './courses/EditQuesttionSubpage';
import { EditExamSubpage } from './courses/EditExamSubpage';
import { getRoute } from "../../MainRouting";
import { EditModuleSubpage } from './courses/EditModuleSubpage';
import { AdminCourseDetailsSubpage } from "./courses/AdminCourseDetailsSubpage";
import { AdminUserTeacherInfoSubpage } from "./users/AdminUserTeacherInfoSubpage";
import { AdminCourseContentSubpage } from './courses/AdminCourseContentSubpage';

const AdminPage = () => {

    // const user = useState(userDetailsState)

    const user = useContext(CurrentUserContext)!;
    const administrationRoutes = applicationRoutes.administrationRoute;

    const menuItems = [
        administrationRoutes.usersRoute,
    ] as ApplicationRoute[];

    if (user.userActivity.canAccessCourseAdministration)
        menuItems.push(administrationRoutes.coursesRoute);

    menuItems.push(...[/*administrationRoutes.groupsRoute,*/ administrationRoutes.myCompanyRoute]);

    return <MainWrapper>
        
        <ContentWrapper>

            <LeftPanel p="20px" flexBasis="300px">
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

                            <Route exact path={applicationRoutes.administrationRoute.usersRoute.teacherInfoRoute.route}>
                                <AdminUserTeacherInfoSubpage />
                            </Route>
                        </Switch>
                    </Route>

                    {/* course administartion */}
                    <ProtectedRoute
                        path={administrationRoutes.coursesRoute.route}
                        isAuthorizedToView={x => x.canAccessCourseAdministration}
                        render={() => <Switch>
                            {getRoute(administrationRoutes.coursesRoute, <AdminCourseListSubpage />)}
                            {getRoute(administrationRoutes.coursesRoute.courseDetailsRoute, <AdminCourseDetailsSubpage />)}
                            {getRoute(administrationRoutes.coursesRoute.courseContentRoute, <AdminCourseContentSubpage />)}
                            {getRoute(administrationRoutes.coursesRoute.statisticsCourseRoute, <CourseStatisticsSubpage />)}
                            {getRoute(administrationRoutes.coursesRoute.editVideoRoute, <EditVideoSubpage />)}
                            {getRoute(administrationRoutes.coursesRoute.editVideoQuestionRoute, <EditQuestionSubpage />)}
                            {getRoute(administrationRoutes.coursesRoute.editExamRoute, <EditExamSubpage />)}
                            {getRoute(administrationRoutes.coursesRoute.editExamQuestionRoute, <EditQuestionSubpage />)}
                            {getRoute(administrationRoutes.coursesRoute.editModuleRoute, <EditModuleSubpage />)}
                        </Switch>} />

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
                        } />

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
