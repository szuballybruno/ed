import React, { useContext } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { getRoute } from "../../MainRouting";
import { ApplicationRoute } from "../../models/types";
import { ArrayBuilder } from '../../static/frontendHelpers';
import { ContentPane } from '../ContentPane';
import { LeftPane } from '../LeftPane';
import { NavigationLinkList } from '../NavigationLinkList';
import { PageRootContainer } from "../PageRootContainer";
import { CurrentUserContext } from "../system/AuthenticationFrame";
import { ProtectedRoute } from '../universal/ProtectedRoute';
import { AdminCourseContentSubpage } from './courses/AdminCourseContentSubpage';
import { AdminCourseListSubpage } from "./courses/AdminCourseListSubpage";
import CourseStatisticsSubpage from "./courses/CourseStatisticsSubpage";
import { AdminCourseDetailsSubpage } from "./courses/EditCourseDetailsSubpage";
import { EditExamSubpage } from './courses/EditExamSubpage';
import { EditModuleSubpage } from './courses/EditModuleSubpage';
import { EditQuestionSubpage } from './courses/EditQuesttionSubpage';
import { EditVideoSubpage } from './courses/EditVideoSubpage';
import { ShopAdminEditSubpage } from './shop/ShopAdminEditSubpage';
import { ShopAdminSubpage } from './shop/ShopAdminSubpage';
import AdminAddUserSubpage from "./users/AdminAddUserSubpage";
import AdminEditUserSubpage from './users/AdminEditUserSubpage';
import AdminStatistics from "./users/AdminStatisticsSubpage";
import { AdminUserListSubpage } from "./users/AdminUserListSubpage";
import { AdminUserStatisticsSubpage } from "./users/AdminUserStatisticsSubpage";
import { AdminUserTeacherInfoSubpage } from "./users/AdminUserTeacherInfoSubpage";

const AdminPage = () => {

    // const user = useState(userDetailsState)

    const user = useContext(CurrentUserContext)!;
    const administrationRoutes = applicationRoutes.administrationRoute;

    const menuItems = new ArrayBuilder<ApplicationRoute>()
        .add(administrationRoutes.usersRoute)
        .addIf(user.userActivity.canAccessCourseAdministration, administrationRoutes.coursesRoute)
        .addIf(user.userActivity.canAccessShopAdministration, administrationRoutes.shopRoute)
        .add(administrationRoutes.myCompanyRoute)
        .getArray();

    return <PageRootContainer>

        <LeftPane>
            <NavigationLinkList
                items={menuItems} />
        </LeftPane>

        <ContentPane>

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

                {/* shop administartion */}
                <ProtectedRoute
                    path={administrationRoutes.shopRoute.route}
                    isAuthorizedToView={x => x.canAccessShopAdministration}
                    render={() => <Switch>
                        {getRoute(administrationRoutes.shopRoute, <ShopAdminSubpage />)}
                        {getRoute(administrationRoutes.shopRoute.editRoute, <ShopAdminEditSubpage />)}
                    </Switch>} />

                {/* statistics */}
                <Route exact path={administrationRoutes.myCompanyRoute.route}>
                    <AdminStatistics />
                </Route>
            </Switch>
        </ContentPane>
    </PageRootContainer>
};

export default withRouter(AdminPage);
