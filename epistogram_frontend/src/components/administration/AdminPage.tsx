import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ApplicationRoute } from '../../models/types';
import { useNavigation } from '../../services/core/navigatior';
import { Environment } from '../../static/Environemnt';
import { ArrayBuilder } from '../../static/frontendHelpers';
import { RouteHelpers } from '../../static/RouteHelpers';
import { ContentPane } from '../ContentPane';
import { NavigationLinkList } from '../NavigationLinkList';
import { PageRootContainer } from '../PageRootContainer';
import { useAuthorizationContext } from '../system/AuthorizationContext';
import { EpistoRoutes } from '../universal/EpistoRoutes';
import { CompanyAdminPage } from './companies/CompanyAdminPage';
import { CourseAdministartionSubpage } from './courses/CourseAdministartionSubpage';
import { DebugPage } from './debug/DebugPage';
import { AdminHomeDetails } from './home/AdminHomeDetails';
import { AdminHomeOverview } from './home/AdminHomeOverview';
import { EditDailyTipSubpage } from './personalityAssessment/EditDailyTipSubpage';
import { EditPersonalityTraitCategorySubpage } from './personalityAssessment/EditPersonalityTraitCategorySubpage';
import { PersonalityTraitCategoriesSubpage } from './personalityAssessment/PersonalityTraitCategoriesSubpage';
import { RoleAdminPage } from './roles/RoleAdminPage';
import { ShopAdminSubpage } from './shop/ShopAdminSubpage';
import { UserAdminSubpage } from './users/UserAdminSubpage';

export const AdminPage = () => {

    const { hasPermission } = useAuthorizationContext();
    const administrationRoutes = applicationRoutes.administrationRoute;

    const menuItems = new ArrayBuilder<ApplicationRoute>()
        .add(administrationRoutes.homeRoute.overviewRoute)
        .add(administrationRoutes.usersRoute.editRoute)
        .addIf(RouteHelpers.isRouteAuthoirzedToVisit(administrationRoutes.coursesRoute, hasPermission), administrationRoutes.coursesRoute)
        .addIf(RouteHelpers.isRouteAuthoirzedToVisit(administrationRoutes.shopRoute, hasPermission), administrationRoutes.shopRoute)
        .addIf(RouteHelpers.isRouteAuthoirzedToVisit(administrationRoutes.personalityAssessmentRoute, hasPermission), administrationRoutes.personalityAssessmentRoute)
        .add(administrationRoutes.companiesRoute)
        .add(administrationRoutes.rolesRoute)
        .add(administrationRoutes.debugRoute)
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
                alignItems={'center'}
                justifyContent="center"
                mt="10px"
                mb="20px">
                <img
                    src={Environment.getAssetUrl('/images/logo_min.svg')}
                    style={{
                        height: '50px',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        padding: 0
                    }}
                    alt=""
                    onClick={() => {

                        // navigate(homeUrl);
                    }} />
            </Flex>

            <NavigationLinkList
                isNoText
                routes={menuItems} />
        </Flex>

        {/* admin content pane */}
        <ContentPane
            isNavbarLowHeight
            noMaxWidth
            padding="0 10px 10px 10px">

            <EpistoRoutes
                renderRoutes={[

                    // administration home
                    {
                        route: administrationRoutes.homeRoute,
                        element: <EpistoRoutes
                            renderRoutes={[
                                {
                                    route: administrationRoutes.homeRoute.overviewRoute,
                                    element: <AdminHomeOverview />,
                                },
                                {
                                    route: administrationRoutes.homeRoute.detailsRoute,
                                    element: <AdminHomeDetails />
                                },
                            ]} />
                    },

                    // user administration
                    {
                        route: administrationRoutes.usersRoute,
                        element: <UserAdminSubpage />
                    },

                    // course administartion
                    {
                        route: administrationRoutes.coursesRoute,
                        element: <CourseAdministartionSubpage />
                    },

                    // shop administartion
                    {
                        route: administrationRoutes.shopRoute,
                        element: <ShopAdminSubpage />
                    },

                    // personality assessment administartion
                    {
                        route: administrationRoutes.personalityAssessmentRoute,
                        element: <EpistoRoutes
                            renderRoutes={[
                                {
                                    route: administrationRoutes.personalityAssessmentRoute.indexRoute,
                                    element: <PersonalityTraitCategoriesSubpage />
                                },
                                {
                                    route: administrationRoutes.personalityAssessmentRoute.editTipsRoute,
                                    element: <EditPersonalityTraitCategorySubpage />
                                },
                                {
                                    route: administrationRoutes.personalityAssessmentRoute.editTipsRoute.editTipRoute,
                                    element: <EditDailyTipSubpage />
                                }
                            ]} />,
                    },

                    {
                        route: administrationRoutes.companiesRoute,
                        element: <CompanyAdminPage />
                    },

                    {
                        route: administrationRoutes.rolesRoute,
                        element: <RoleAdminPage />
                    },

                    {
                        route: administrationRoutes.debugRoute,
                        element: <DebugPage />
                    }
                ]} />
        </ContentPane>
    </PageRootContainer>;
};
