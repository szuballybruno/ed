import { Flex } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ApplicationRoute } from '../../models/types';
import { useNavigation } from '../../services/core/navigatior';
import { Environment } from '../../static/Environemnt';
import { ArrayBuilder } from '../../static/frontendHelpers';
import { ContentPane } from '../ContentPane';
import { NavigationLinkList } from '../NavigationLinkList';
import { PageRootContainer } from '../PageRootContainer';
import { AuthorizationContext } from '../system/AuthenticationFrame';
import { EpistoRoutes } from '../universal/EpistoRoutes';
import { CompanyAdminPage } from './companies/CompanyAdminPage';
import { CourseAdministartionSubpage } from './courses/CourseAdministartionSubpage';
import { AdminHomeDetails } from './home/AdminHomeDetails';
import { AdminHomeOverview } from './home/AdminHomeOverview';
import { EditDailyTipSubpage } from './personalityAssessment/EditDailyTipSubpage';
import { EditPersonalityTraitCategorySubpage } from './personalityAssessment/EditPersonalityTraitCategorySubpage';
import { PersonalityTraitCategoriesSubpage } from './personalityAssessment/PersonalityTraitCategoriesSubpage';
import { RoleAdminPage } from './roles/RoleAdminPage';
import { ShopAdminSubpage } from './shop/ShopAdminSubpage';
import { UserAdminSubpage } from './users/UserAdminSubpage';

export const AdminPage = () => {

    const { hasPermission } = useContext(AuthorizationContext);
    const administrationRoutes = applicationRoutes.administrationRoute;
    const { navigate } = useNavigation();

    const menuItems = new ArrayBuilder<ApplicationRoute>()
        .add(administrationRoutes.homeRoute.overviewRoute)
        .add(administrationRoutes.usersRoute.editRoute)
        .addIf(hasPermission('ACCESS_ADMIN'), administrationRoutes.coursesRoute)
        .addIf(hasPermission('MANAGE_SHOP'), administrationRoutes.shopRoute)
        .addIf(hasPermission('ACCESS_ADMIN'), administrationRoutes.personalityAssessmentRoute)
        .add(administrationRoutes.companiesRoute)
        .add(administrationRoutes.rolesRoute)
        .getArray();

    useEffect(() => {

        if (!hasPermission('ACCESS_ADMIN'))
            navigate(applicationRoutes.homeRoute);
    }, []);

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
            noPadding
            px="20px">

            <EpistoRoutes
                renderRoutes={[

                    // administration home
                    {
                        route: administrationRoutes.homeRoute,
                        element: <EpistoRoutes
                            renderRoutes={[
                                {
                                    route: administrationRoutes.homeRoute.overviewRoute,
                                    element: <AdminHomeOverview />
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
                        element: <CourseAdministartionSubpage />,
                        isAuthorizedToView: x => x.canAccessCourseAdministration
                    },

                    // shop administartion
                    {
                        route: administrationRoutes.shopRoute,
                        element: <ShopAdminSubpage />,
                        isAuthorizedToView: x => x.canAccessShopAdministration
                    },

                    // personality assessment administartion
                    {
                        route: administrationRoutes.personalityAssessmentRoute,
                        element: <EpistoRoutes
                            renderRoutes={[
                                {
                                    route: administrationRoutes.personalityAssessmentRoute,
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
                        isAuthorizedToView: x => x.canAccessShopAdministration
                    },

                    {
                        route: administrationRoutes.companiesRoute,
                        element: <CompanyAdminPage />
                    },

                    {
                        route: administrationRoutes.rolesRoute,
                        element: <RoleAdminPage />
                    }

                    // statistics
                    // {
                    //     route: administrationRoutes.myCompanyRoute,
                    //     element: <AdminStatistics />,
                    //     protectionLevel: 'authorize',
                    //     isAuthorizedToView: x => x.canAccessShopAdministration
                    // }
                ]} />
        </ContentPane>
    </PageRootContainer>;
};
