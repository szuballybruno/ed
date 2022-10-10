import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ApplicationRoute } from '../../models/types';
import { useNavigation } from '../../services/core/navigatior';
import { Environment } from '../../static/Environemnt';
import { ArrayBuilder } from '../../static/frontendHelpers';
import { RouteHelpers } from '../../static/RouteHelpers';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { NavigationLinkList } from '../NavigationLinkList';
import { useAuthorizationContext } from '../system/AuthorizationContext';

export const AdminLeftPane = () => {

    const { navigate2 } = useNavigation();
    const { hasPermission } = useAuthorizationContext();
    const administrationRoutes = applicationRoutes.administrationRoute;

    const menuItems = new ArrayBuilder<ApplicationRoute<any, any>>()
        .add(administrationRoutes.usersRoute.userRoute)
        .addIf(RouteHelpers.isRouteAuthoirzedToVisit(administrationRoutes.coursesRoute, hasPermission), administrationRoutes.coursesRoute)
        .addIf(RouteHelpers.isRouteAuthoirzedToVisit(administrationRoutes.shopRoute, hasPermission), administrationRoutes.shopRoute)
        .addIf(RouteHelpers.isRouteAuthoirzedToVisit(administrationRoutes.personalityAssessmentRoute, hasPermission), administrationRoutes.personalityAssessmentRoute)
        .add(administrationRoutes.companiesRoute)
        .add(administrationRoutes.rolesRoute)
        .add(administrationRoutes.debugRoute)
        .getArray();

    return (
        <EpistoFlex2
            id={AdminLeftPane.name}
            borderRadius="none"
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
            <EpistoFlex2 width="100%"
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

                        navigate2(applicationRoutes.homeRoute);
                    }} />
            </EpistoFlex2>

            <NavigationLinkList
                isNoText
                routes={menuItems} />
        </EpistoFlex2>
    );
};