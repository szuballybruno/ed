import { Flex } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { getRoute } from "../../MainRouting";
import { ApplicationRoute } from "../../models/types";
import { useNavigation } from "../../services/core/navigatior";
import { ArrayBuilder, getAssetUrl } from "../../static/frontendHelpers";
import { ContentPane } from "../ContentPane";
import { NavigationLinkList } from "../NavigationLinkList";
import { PageRootContainer } from "../PageRootContainer";
import { CurrentUserContext } from "../system/AuthenticationFrame";
import { ProtectedRoute } from "../universal/ProtectedRoute";
import { CourseAdministartionSubpage } from "./courses/CourseAdministartionSubpage";
import { AdminHomeDetails } from "./home/AdminHomeDetails";
import { AdminHomeOverview } from "./home/AdminHomeOverview";
import { EditDailyTipSubpage } from "./personalityAssessment/EditDailyTipSubpage";
import { EditPersonalityTraitCategorySubpage } from "./personalityAssessment/EditPersonalityTraitCategorySubpage";
import { PersonalityTraitCategoriesSubpage } from "./personalityAssessment/PersonalityTraitCategoriesSubpage";
import { ShopAdminEditSubpage } from "./shop/ShopAdminEditSubpage";
import { ShopAdminSubpage } from "./shop/ShopAdminSubpage";
import AdminStatistics from "./users/AdminStatisticsSubpage";
import { AdminUserControl } from "./users/AdminUserControl";

export const AdminPage = () => {

    const homeUrl = applicationRoutes.rootHomeRoute.route;
    const user = useContext(CurrentUserContext)!;
    const administrationRoutes = applicationRoutes.administrationRoute;
    const { navigate } = useNavigation();

    const menuItems = new ArrayBuilder<ApplicationRoute>()
        .add(administrationRoutes.homeRoute.overviewRoute)
        .add(administrationRoutes.usersRoute.editRoute)
        .addIf(user.userActivity.canAccessCourseAdministration, administrationRoutes.coursesRoute)
        .addIf(user.userActivity.canAccessShopAdministration, administrationRoutes.shopRoute)
        .addIf(user.userActivity.canAccessShopAdministration, administrationRoutes.personalityAssessmentRoute)
        //.add(administrationRoutes.myCompanyRoute)
        //.addIf(user.userActivity.canAccessCourseAdministration, administrationRoutes.overviewTableRoute)
        .getArray();

    return <PageRootContainer>

        {/* admin left pane */}
        <Flex
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
            boxShadow="3px 0px 15px 5px rgba(0,0,0,0.1)">

            {/* logo link */}
            <Flex width="100%"
                alignItems={"center"}
                justifyContent="center"
                mt="10px"
                mb="20px">
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

            <NavigationLinkList
                isNoText
                items={menuItems} />
        </Flex>

        {/* admin content pane */}
        <ContentPane
            isNavbarLowHeight
            noMaxWidth
            noPadding
            px="20px">

            {/* administration home */}
            {getRoute(administrationRoutes.homeRoute.overviewRoute, <AdminHomeOverview />)}
            {getRoute(administrationRoutes.homeRoute.detailsRoute, <AdminHomeDetails />)}


            {/* user administration */}
            <Route path={administrationRoutes.usersRoute.route}>

                <AdminUserControl />
            </Route>

            {/* course administartion */}
            <ProtectedRoute
                route={administrationRoutes.coursesRoute}
                isAuthorizedToView={x => x.canAccessCourseAdministration}
                render={() => <CourseAdministartionSubpage />} />

            {/* shop administartion */}
            <ProtectedRoute
                route={administrationRoutes.shopRoute}
                isAuthorizedToView={x => x.canAccessShopAdministration}
                render={() => <>
                    {getRoute(administrationRoutes.shopRoute, <ShopAdminSubpage />)}
                    {getRoute(administrationRoutes.shopRoute.editRoute, <ShopAdminEditSubpage />)}
                </>} />

            {/* personality assessment administartion */}
            <ProtectedRoute
                route={administrationRoutes.personalityAssessmentRoute}
                isAuthorizedToView={x => x.canAccessShopAdministration}
                render={() => <>
                    {getRoute(administrationRoutes.personalityAssessmentRoute, <PersonalityTraitCategoriesSubpage />)}
                    {getRoute(administrationRoutes.personalityAssessmentRoute.editTips, <EditPersonalityTraitCategorySubpage />)}
                    {getRoute(administrationRoutes.personalityAssessmentRoute.editTips.editTip, <EditDailyTipSubpage />)}
                </>} />

            {/* statistics */}
            <Route
                path={administrationRoutes.myCompanyRoute.route}>
                <AdminStatistics />
            </Route>

            {/* Disabled temporarily */}
            {/* <ProtectedRoute
                    exact
                    path={administrationRoutes.overviewTableRoute.route}
                    isAuthorizedToView={x => x.canAccessCourseAdministration}
                    render={() => <AdminOverviewTablePage />} /> */}
        </ContentPane>
    </PageRootContainer>;
};
