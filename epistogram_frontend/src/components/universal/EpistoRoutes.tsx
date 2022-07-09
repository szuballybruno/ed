import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ApplicationRoute } from '../../models/types';
import { Logger } from '../../static/Logger';
import { AuthenticationStateContext, AuthorizationContext, RefetchUserAsyncContext } from '../system/AuthenticationFrame';

export type RenderRoute = {
    element: JSX.Element;
    route: ApplicationRoute;
    isAuthorizedToView?: (userActivity: any) => boolean;
}

const RouteRenderer = (props: {
    route: ApplicationRoute,
    children: JSX.Element,
    isAuthorizedToView?: (userActivity: any) => boolean,
}): JSX.Element => {

    const { children, route, isAuthorizedToView } = props;

    const authState = useContext(AuthenticationStateContext);
    const refetchUserAsync = useContext(RefetchUserAsyncContext);
    const { hasPermission } = useContext(AuthorizationContext)!;

    Logger.logScoped('ROUTING', `Route renderer: Abs: '${route.route.getAbsolutePath()}' Rel: '${route.route.getRelativePath()}'`);

    // redirect to home if external authorization check fails
    const authFuncCheck = true;

    if (!authFuncCheck) {

        Logger.logScoped('ROUTING', '-- Authorization function returned false, redirecting...');

        return <Navigate
            replace
            to={applicationRoutes.homeRoute.route.getAbsolutePath()} />;
    }

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