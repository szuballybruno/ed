import { Flex, FlexProps } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { getRoute } from "../../MainRouting";
import { ApplicationRoute } from "../../models/types";
import { useNavigation } from '../../services/core/navigatior';
import { ArrayBuilder, getAssetUrl } from '../../static/frontendHelpers';
import { ContentPane } from '../ContentPane';
import { NavigationLinkList } from '../NavigationLinkList';
import { PageRootContainer } from "../PageRootContainer";
import { CurrentUserContext } from "../system/AuthenticationFrame";
import { ProtectedRoute } from '../universal/ProtectedRoute';
import { AdminOverviewTablePage } from './AdminOverviewTablePage';
import { AdminCourseContentSubpage } from './courses/AdminCourseContentSubpage';
import { AdminCourseListSubpage } from "./courses/AdminCourseListSubpage";
import { AdminInteractiveCourseSubpage } from './courses/AdminInteractiveCourseSubpage';
import CourseStatisticsSubpage from "./courses/CourseStatisticsSubpage";
import { AdminCourseDetailsSubpage } from "./courses/EditCourseDetailsSubpage";
import { EditExamSubpage } from './courses/EditExamSubpage';
import { EditModuleSubpage } from './courses/EditModuleSubpage';
import { EditQuestionSubpage } from './courses/EditQuesttionSubpage';
import { EditVideoSubpage } from './courses/EditVideoSubpage';
import { VideoStatisticsSubpage } from './courses/VideoStatisticsSubpage';
import { EditDailyTipSubpage } from './personalityAssessment/EditDailyTipSubpage';
import { EditPersonalityTraitCategorySubpage } from './personalityAssessment/EditPersonalityTraitCategorySubpage';
import { PersonalityTraitCategoriesSubpage } from './personalityAssessment/PersonalityTraitCategoriesSubpage';
import { ShopAdminEditSubpage } from './shop/ShopAdminEditSubpage';
import { ShopAdminSubpage } from './shop/ShopAdminSubpage';
import AdminAddUserSubpage from "./users/AdminAddUserSubpage";
import AdminEditUserSubpage from './users/AdminEditUserSubpage';
import AdminStatistics from "./users/AdminStatisticsSubpage";
import { AdminUserListSubpage } from "./users/AdminUserListSubpage";
import { AdminUserStatisticsSubpage } from "./users/AdminUserStatisticsSubpage";
import { AdminUserTeacherInfoSubpage } from "./users/AdminUserTeacherInfoSubpage";

const AdminPage = () => {

    const homeUrl = applicationRoutes.rootHomeRoute.route;
    const user = useContext(CurrentUserContext)!;
    const administrationRoutes = applicationRoutes.administrationRoute;
    const { navigate } = useNavigation();

    const menuItems = new ArrayBuilder<ApplicationRoute>()
        .add(administrationRoutes.usersRoute.editRoute)
        .addIf(user.userActivity.canAccessCourseAdministration, administrationRoutes.coursesRoute.courseDetailsRoute)
        .addIf(user.userActivity.canAccessShopAdministration, administrationRoutes.shopRoute)
        .addIf(user.userActivity.canAccessShopAdministration, administrationRoutes.personalityAssessmentRoute)
        .add(administrationRoutes.myCompanyRoute)
        .addIf(user.userActivity.canAccessCourseAdministration, administrationRoutes.overviewTableRoute)
        .getArray();

    const AdminLeftPane = (props: FlexProps) => {
        return <Flex
            borderRadius="none"
            id="leftPane"
            bg="white"
            zIndex={2}
            flexBasis="60px"
            maxW="320px"
            direction="column"
            align="stretch"
            padding="25px 15px 0 15px"
            className="dividerBorderRight"
            position="relative"
            boxShadow="3px 0px 15px 5px rgba(0,0,0,0.1)"
            {...props}>

            {/* logo link */}
            <Flex width="100%" alignItems={"center"} justifyContent="center" mt="10px" mb="20px">
                <img
                    src={getAssetUrl("/images/logo_min.svg")}
                    style={{
                        height: "50px",
                        objectFit: "cover",
                        cursor: "pointer",
                        padding: 0
                    }}
                    alt=""
                    onClick={() => {

                        if (user?.userActivity?.canAccessApplication)
                            navigate(homeUrl);
                    }} />
            </Flex>

            {props.children}
        </Flex>
    }

    return <PageRootContainer>

        <AdminLeftPane>
            <NavigationLinkList
                isNoText
                items={menuItems} />
        </AdminLeftPane>

        <ContentPane isNavbarLowHeight noMaxWidth noPadding px="20px">

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
                        {getRoute(administrationRoutes.coursesRoute.courseDetailsRoute, <AdminCourseDetailsSubpage />)}
                        {getRoute(administrationRoutes.coursesRoute.courseContentRoute, <AdminCourseContentSubpage />)}
                        {getRoute(administrationRoutes.coursesRoute.statisticsCourseRoute, <CourseStatisticsSubpage />)}
                        {getRoute(administrationRoutes.coursesRoute.interactiveCourseRoute, <AdminInteractiveCourseSubpage />)}
                        {getRoute(administrationRoutes.coursesRoute.editVideoRoute, <EditVideoSubpage />)}
                        {getRoute(administrationRoutes.coursesRoute.videoStatsRoute, <VideoStatisticsSubpage />)}
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

                {/* personality assessment administartion */}
                <ProtectedRoute
                    path={administrationRoutes.personalityAssessmentRoute.route}
                    isAuthorizedToView={x => x.canAccessShopAdministration}
                    render={() => <Switch>
                        {getRoute(administrationRoutes.personalityAssessmentRoute, <PersonalityTraitCategoriesSubpage />)}
                        {getRoute(administrationRoutes.personalityAssessmentRoute.editTips, <EditPersonalityTraitCategorySubpage />)}
                        {getRoute(administrationRoutes.personalityAssessmentRoute.editTips.editTip, <EditDailyTipSubpage />)}
                    </Switch>} />

                {/* statistics */}
                <Route exact path={administrationRoutes.myCompanyRoute.route}>
                    <AdminStatistics />
                </Route>

                <ProtectedRoute
                    exact
                    path={administrationRoutes.overviewTableRoute.route}
                    isAuthorizedToView={x => x.canAccessCourseAdministration}
                    render={() => <AdminOverviewTablePage />} />
            </Switch>
        </ContentPane>
    </PageRootContainer>
};

export default withRouter(AdminPage);
