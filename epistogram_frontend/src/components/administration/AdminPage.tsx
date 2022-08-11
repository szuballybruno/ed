import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ContentPane } from '../ContentPane';
import { PageRootContainer } from '../PageRootContainer';
import { EpistoRoutes } from '../universal/EpistoRoutes';
import { AdminLeftPane } from './AdminLeftPane';
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

    const adminRoute = applicationRoutes.administrationRoute;

    return <PageRootContainer>

        {/* admin left pane */}
        <AdminLeftPane />

        {/* admin content pane */}
        <ContentPane
            isNavbarLowHeight
            noMaxWidth
            padding="0 10px 10px 10px">

            <EpistoRoutes
                renderRoutes={[

                    // administration home
                    {
                        route: adminRoute.homeRoute,
                        element: <EpistoRoutes
                            renderRoutes={[
                                {
                                    route: adminRoute.homeRoute.overviewRoute,
                                    element: <AdminHomeOverview />,
                                },
                                {
                                    route: adminRoute.homeRoute.detailsRoute,
                                    element: <AdminHomeDetails />
                                },
                            ]} />
                    },

                    // user administration
                    {
                        route: adminRoute.usersRoute,
                        element: <UserAdminSubpage />
                    },

                    // course administartion
                    {
                        route: adminRoute.coursesRoute,
                        element: <CourseAdministartionSubpage />
                    },

                    // shop administartion
                    {
                        route: adminRoute.shopRoute,
                        element: <ShopAdminSubpage />
                    },

                    // personality assessment administartion
                    {
                        route: adminRoute.personalityAssessmentRoute,
                        element: <EpistoRoutes
                            renderRoutes={[
                                {
                                    route: adminRoute.personalityAssessmentRoute.indexRoute,
                                    element: <PersonalityTraitCategoriesSubpage />
                                },
                                {
                                    route: adminRoute.personalityAssessmentRoute.editTipsRoute,
                                    element: <EditPersonalityTraitCategorySubpage />
                                },
                                {
                                    route: adminRoute.personalityAssessmentRoute.editTipsRoute.editTipRoute,
                                    element: <EditDailyTipSubpage />
                                }
                            ]} />,
                    },

                    {
                        route: adminRoute.companiesRoute,
                        element: <CompanyAdminPage />
                    },

                    {
                        route: adminRoute.rolesRoute,
                        element: <RoleAdminPage />
                    },

                    {
                        route: adminRoute.debugRoute,
                        element: <DebugPage />
                    }
                ]} />
        </ContentPane>
    </PageRootContainer>;
};
