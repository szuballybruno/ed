import { Flex } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ApplicationRoute } from '../../models/types';
import { useNavigation } from '../../services/core/navigatior';
import { ArrayBuilder, getAssetUrl } from '../../static/frontendHelpers';
import { ContentPane } from '../ContentPane';
import { MemoTest } from '../MemoTest';
import { NavigationLinkList } from '../NavigationLinkList';
import { PageRootContainer } from '../PageRootContainer';
import { CurrentUserContext } from '../system/AuthenticationFrame';
import { EpistoRoutes } from '../universal/EpistoRoutes';
import { CourseAdministartionSubpage } from './courses/CourseAdministartionSubpage';
import { AdminHomeDetails } from './home/AdminHomeDetails';
import { AdminHomeOverview } from './home/AdminHomeOverview';
import { EditDailyTipSubpage } from './personalityAssessment/EditDailyTipSubpage';
import { EditPersonalityTraitCategorySubpage } from './personalityAssessment/EditPersonalityTraitCategorySubpage';
import { PersonalityTraitCategoriesSubpage } from './personalityAssessment/PersonalityTraitCategoriesSubpage';
import { ShopAdminEditSubpage } from './shop/ShopAdminEditSubpage';
import { ShopAdminSubpage } from './shop/ShopAdminSubpage';
import AdminStatistics from './users/AdminStatisticsSubpage';
import { AdminUserControl } from './users/AdminUserControl';

export const AdminPage = () => {

    const user = useContext(CurrentUserContext)!;
    const administrationRoutes = applicationRoutes.administrationRoute;
    const { navigate } = useNavigation();

    const menuItems = new ArrayBuilder<ApplicationRoute>()
        .add(administrationRoutes.homeRoute.overviewRoute)
        .add(administrationRoutes.usersRoute.editRoute)
        .addIf(user.userActivity.canAccessCourseAdministration, administrationRoutes.coursesRoute)
        .addIf(user.userActivity.canAccessShopAdministration, administrationRoutes.shopRoute)
        .addIf(user.userActivity.canAccessShopAdministration, administrationRoutes.personalityAssessmentRoute)
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
                    src={getAssetUrl('/images/logo_min.svg')}
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
                        element: <AdminUserControl />
                    },

                    // course administartion
                    {
                        route: administrationRoutes.coursesRoute,
                        element: <CourseAdministartionSubpage />,
                        protectionLevel: 'authorize',
                        isAuthorizedToView: x => x.canAccessCourseAdministration
                    },

                    // shop administartion
                    {
                        route: administrationRoutes.shopRoute,
                        element: <ShopAdminSubpage />,
                        protectionLevel: 'authorize',
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
                                    route: administrationRoutes.personalityAssessmentRoute.editTips,
                                    element: <EditPersonalityTraitCategorySubpage />
                                },
                                {
                                    route: administrationRoutes.personalityAssessmentRoute.editTips.editTip,
                                    element: <EditDailyTipSubpage />
                                }
                            ]} />,
                        protectionLevel: 'authorize',
                        isAuthorizedToView: x => x.canAccessShopAdministration
                    },

                    // statistics
                    {
                        route: administrationRoutes.myCompanyRoute,
                        element: <AdminStatistics />,
                        protectionLevel: 'authorize',
                        isAuthorizedToView: x => x.canAccessShopAdministration
                    }
                ]} />
        </ContentPane>
    </PageRootContainer>;
};
