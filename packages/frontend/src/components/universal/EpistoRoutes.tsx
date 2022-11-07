import { Navigate, Route, Routes } from 'react-router-dom';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ApplicationRoute } from '../../models/types';
import { Logger } from '../../static/Logger';
import { HasPermissionFnType, useAuthorizationContext } from '../system/AuthorizationContext';

export type RenderRoute = {
    element: JSX.Element;
    route: ApplicationRoute<any, any>;

    /**
     * @deprecated
     */
    isAuthorizedToView?: (hasPermission: HasPermissionFnType) => boolean;
}

const RouteRenderer = ({
    children,
    route,
    isAuthorizedToView
}: {
    route: ApplicationRoute,
    children: JSX.Element,
    isAuthorizedToView?: (userActivity: any) => boolean,
}): JSX.Element => {

    const { hasPermission } = useAuthorizationContext();
    const isAuthorizedToViewResult = route.isAuthoirziedToVisit
        ? route.isAuthoirziedToVisit(hasPermission)
        : isAuthorizedToView
            ? isAuthorizedToView(hasPermission)
            : true;

    Logger.logScoped('ROUTING', `Route (${route.name}) matched: '${route.route.getRelativePath()}'`);

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

export const EpistoRoutes = ({
    renderRoutes
}: {
    renderRoutes: RenderRoute[]
}) => {

    return <Routes>
        {renderRoutes
            .map((renderRoute, index) => {

                const relativePath = renderRoute
                    .route
                    .route
                    .getRelativePath();

                return <Route
                    path={relativePath}
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