import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ArrayBuilder } from '../../static/frontendHelpers';
import { ContentPane } from '../pageRootContainer/ContentPane';
import { useAuthorizationContext } from '../system/AuthorizationContext';
import { EpistoRoutes } from '../universal/EpistoRoutes';
import { ActivationCodesAdminPage } from './activationCodes/ActivationCodesAdminPage';
import { AdminLeftPane } from './AdminLeftPane';
import { AdminBreadcrumbsHeaderRoot, useAdminBreadcrumbsRootLogic } from './breadcrumbsHeader/AdminBreadcrumbsHeaderRoot';
import { CompanyAdminPage } from './companies/CompanyAdminPage';
import { CourseAdministartionSubpage } from './courses/CourseAdministartionSubpage';
import { DebugPage } from './debug/DebugPage';
import { AdminOverviewStatsPage } from './stats/AdminOverviewStatsPage';
import { EditDailyTipSubpage } from './personalityAssessment/EditDailyTipSubpage';
import { EditPersonalityTraitCategorySubpage } from './personalityAssessment/EditPersonalityTraitCategorySubpage';
import { PersonalityTraitCategoriesSubpage } from './personalityAssessment/PersonalityTraitCategoriesSubpage';
import { RoleAdminPage } from './roles/RoleAdminPage';
import { ShopAdminSubpage } from './shop/ShopAdminSubpage';
import { UserAdminSubpage } from './users/UserAdminSubpage';

export const AdminPage = () => {

    const adminRoute = applicationRoutes.administrationRoute;
    const { hasPermission } = useAuthorizationContext();
    const logic = useAdminBreadcrumbsRootLogic();
    const { activeCompany } = logic;
    const activeCompanyId = activeCompany?.id ?? null;

    return <>

        {/* admin left pane */}
        <AdminLeftPane
            activeCompanyId={activeCompanyId} />

        {/* admin content pane */}
        <ContentPane
            isNavbarLowHeight
            padding="0 10px 10px 10px">

            <AdminBreadcrumbsHeaderRoot
                logic={logic}>

                <EpistoRoutes
                    renderRoutes={new ArrayBuilder()

                        // administration home
                        .add({
                            route: adminRoute.statsRoute,
                            element: <AdminOverviewStatsPage
                                activeCompany={activeCompany} />
                        })

                        // user administration
                        .add({
                            route: adminRoute.usersRoute,
                            element: <UserAdminSubpage
                                activeCompany={activeCompany} />
                        })

                        // course administartion
                        .add({
                            route: adminRoute.coursesRoute,
                            element: <CourseAdministartionSubpage
                                activeCompanyId={activeCompanyId} />
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
                            element: <ActivationCodesAdminPage
                                activeCompany={activeCompany} />
                        })

                        .addIf(hasPermission('CAN_VIEW_HIDDEN_MENUS'), {
                            route: adminRoute.debugRoute,
                            element: <DebugPage />
                        })

                        .getArray()} />
            </AdminBreadcrumbsHeaderRoot>
        </ContentPane>
    </>;
};
