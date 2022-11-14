import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ArrayBuilder } from '../../static/frontendHelpers';
import { ContentPane } from '../ContentPane';
import { useAuthorizationContext } from '../system/AuthorizationContext';
import { EpistoRoutes } from '../universal/EpistoRoutes';
import { ActivationCodesAdminPage } from './activationCodes/ActivationCodesAdminPage';
import { AdminLeftPane } from './AdminLeftPane';
import { CompanyAdminPage } from './companies/CompanyAdminPage';
import { CourseAdministartionSubpage } from './courses/CourseAdministartionSubpage';
import { DebugPage } from './debug/DebugPage';
import { EditDailyTipSubpage } from './personalityAssessment/EditDailyTipSubpage';
import { EditPersonalityTraitCategorySubpage } from './personalityAssessment/EditPersonalityTraitCategorySubpage';
import { PersonalityTraitCategoriesSubpage } from './personalityAssessment/PersonalityTraitCategoriesSubpage';
import { RoleAdminPage } from './roles/RoleAdminPage';
import { ShopAdminSubpage } from './shop/ShopAdminSubpage';
import { AdminStatsSubpage } from './stats/AdminStatsSubpage';
import { UserAdminSubpage } from './users/UserAdminSubpage';

export const AdminPage = () => {

    const adminRoute = applicationRoutes.administrationRoute;
    const { hasPermission } = useAuthorizationContext();

    return <>

        {/* admin left pane */}
        <AdminLeftPane />

        {/* admin content pane */}
        <ContentPane
            isNavbarLowHeight
            noMaxWidth
            padding="0 10px 10px 10px">

            <EpistoRoutes
                renderRoutes={new ArrayBuilder()

                    // administration home
                    .add({
                        route: adminRoute.statsRoute,
                        element: <AdminStatsSubpage />
                    })

                    // user administration
                    .add({
                        route: adminRoute.usersRoute,
                        element: <UserAdminSubpage />
                    })

                    // course administartion
                    .add({
                        route: adminRoute.coursesRoute,
                        element: <CourseAdministartionSubpage />
                    })

                    // shop administartion
                    .addIf(hasPermission('CAN_VIEW_HIDDEN_MENUS'), {
                        route: adminRoute.shopRoute,
                        element: <ShopAdminSubpage />
                    })

                    // personality assessment administartion
                    .addIf(hasPermission('CAN_VIEW_HIDDEN_MENUS'), {
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
                    })

                    .addIf(hasPermission('CAN_VIEW_HIDDEN_MENUS'), {
                        route: adminRoute.companiesRoute,
                        element: <CompanyAdminPage />
                    })

                    .addIf(hasPermission('CAN_VIEW_HIDDEN_MENUS'), {
                        route: adminRoute.rolesRoute,
                        element: <RoleAdminPage />
                    })

                    .addIf(hasPermission('CAN_VIEW_HIDDEN_MENUS'), {
                        route: adminRoute.activationCodesRoute,
                        element: <ActivationCodesAdminPage />
                    })

                    .addIf(hasPermission('CAN_VIEW_HIDDEN_MENUS'), {
                        route: adminRoute.debugRoute,
                        element: <DebugPage />
                    })

                    .getArray()} />
        </ContentPane>
    </>;
};
