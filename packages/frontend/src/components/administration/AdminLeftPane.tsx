import { applicationRoutes } from '../../configuration/applicationRoutes';
import { AdminActiveCompanyIdType, AdminActiveCompanyRouteParamType, ApplicationRoute } from '../../models/types';
import { Navigator } from '../../services/core/navigatior';
import { ArrayBuilder } from '../../static/frontendHelpers';
import { NavigationLinkList } from '../NavigationLinkList';
import { LeftPane } from '../pageRootContainer/LeftPane';
import { useAuthorizationContext } from '../system/AuthorizationContext';

export const AdminLeftPane = ({
    activeCompanyId
}: {
    activeCompanyId: AdminActiveCompanyIdType
}) => {

    const { hasPermission } = useAuthorizationContext();
    const administrationRoutes = applicationRoutes.administrationRoute;

    const { navigate3 } = Navigator
        .useNavigation();

    const navToAdminPage = (route: ApplicationRoute<AdminActiveCompanyRouteParamType, any>) => {

        if (!activeCompanyId)
            throw new Error(`No active company id!`);

        navigate3<any, any>(route, { params: { activeCompanyId } });
    }

    const menuItems = new ArrayBuilder<ApplicationRoute<AdminActiveCompanyRouteParamType, any>>()
        .addIf(hasPermission('ADMINISTRATE_COMPANY'), administrationRoutes.usersRoute)
        .addIf(hasPermission('ADMINISTRATE_COMPANY'), administrationRoutes.statsRoute)
        .addIf(hasPermission('ADMINISTRATE_COMPANY'), administrationRoutes.coursesRoute)
        .addIf(hasPermission('CAN_VIEW_HIDDEN_MENUS'), administrationRoutes.shopRoute)
        .addIf(hasPermission('CAN_VIEW_HIDDEN_MENUS'), administrationRoutes.personalityAssessmentRoute)
        .addIf(hasPermission('CAN_VIEW_HIDDEN_MENUS'), administrationRoutes.companiesRoute)
        .addIf(hasPermission('CAN_VIEW_HIDDEN_MENUS'), administrationRoutes.rolesRoute)
        .addIf(hasPermission('CAN_VIEW_HIDDEN_MENUS'), administrationRoutes.activationCodesRoute)
        .addIf(hasPermission('CAN_VIEW_HIDDEN_MENUS'), administrationRoutes.debugRoute)
        .getArray();

    return (
        <LeftPane
            collapsed>

            <NavigationLinkList
                isNoText
                onNav={route => navToAdminPage(route)}
                routes={menuItems} />
        </LeftPane>
    );
};