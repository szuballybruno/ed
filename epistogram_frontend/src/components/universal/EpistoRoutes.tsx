import { Navigate, Route, Routes } from 'react-router-dom';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ApplicationRoute } from '../../models/types';
import { Logger } from '../../static/Logger';
import { HasPermissionFnType, useAuthorizationContext } from '../system/AuthorizationContext';

export type RenderRoute = {
    element: JSX.Element;
    route: ApplicationRoute;
    isAuthorizedToView?: (hasPermission: HasPermissionFnType) => boolean;
}

const RouteRenderer = (props: {
    route: ApplicationRoute,
    children: JSX.Element,
    isAuthorizedToView?: (userActivity: any) => boolean,
}): JSX.Element => {

    const { children, route, isAuthorizedToView } = props;

    const { hasPermission } = useAuthorizationContext();
    const isAuthorizedToViewResult = route.isAuthoirziedToVisit
        ? route.isAuthoirziedToVisit(hasPermission)
        : isAuthorizedToView
            ? isAuthorizedToView(hasPermission)
            : true;

    Logger.logScoped('ROUTING', `Route renderer: Abs: '${route.route.getAbsolutePath()}' Rel: '${route.route.getRelativePath()}'`);

    // AUTH check, redirect
    if (!isAuthorizedToViewResult) {

        Logger.logScoped('ROUTING', '-- Authorization function returned false, redirecting...');

        return <Navigate
            replace
            to={applicationRoutes.homeRoute.route.getAbsolutePath()} />;
    }

    // RENDER 
    Logger.logScoped('ROUTING', '-- Rendering...');
    return children;
};

export const EpistoRoutes = (props: {
    renderRoutes: RenderRoute[]
}) => {

    const { renderRoutes } = props;

    return <Routes>
        {renderRoutes
            .map((renderRoute, index) => {

                return <Route
                    path={renderRoute.route.route.getRelativePath()}
                    element={<>
                        <RouteRenderer
                            route={renderRoute.route}
                            isAuthorizedToView={renderRoute.isAuthorizedToView}>

                            {renderRoute.element}
                        </RouteRenderer>
                    </>}
                    key={index} />;
            })}
    </Routes>;
};