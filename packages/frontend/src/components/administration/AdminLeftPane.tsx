import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ApplicationRoute } from '../../models/types';
import { useNavigation } from '../../services/core/navigatior';
import { ArrayBuilder } from '../../static/frontendHelpers';
import { LeftPane } from '../LeftPane';
import { NavigationLinkList } from '../NavigationLinkList';
import { useAuthorizationContext } from '../system/AuthorizationContext';

export const AdminLeftPane = () => {

    const { navigate2 } = useNavigation();
    const { hasPermission } = useAuthorizationContext();
    const administrationRoutes = applicationRoutes.administrationRoute;

    const menuItems = new ArrayBuilder<ApplicationRoute<any, any>>()
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
                    routes={menuItems} />
        </LeftPane>
    );
};