import { ReactNode, useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ApplicationRoute } from '../../models/types';
import { UserActivityDTO } from '../../shared/dtos/UserActivityDTO';
import { loggingSettings } from '../../static/Environemnt';
import { setPageTitle } from '../../static/frontendHelpers';
import { AuthenticationStateContext, CurrentUserContext, RefetchUserAsyncContext } from '../system/AuthenticationFrame';

export type RenderRoute = {
    element: JSX.Element;
    route: ApplicationRoute;
    protectionLevel?: RouteProtectionLevelType;
    isAuthorizedToView?: (userActivity: UserActivityDTO) => boolean;
}

export type RouteProtectionLevelType = 'open' | 'justAuthenticate' | 'authorize';

const verboseLogging = loggingSettings.routing;

const RouteRenderer = (props: {
    route: ApplicationRoute,
    children: JSX.Element,
    isAuthorizedToView?: (userActivity: UserActivityDTO) => boolean,
    protectionLevel?: RouteProtectionLevelType;
}): JSX.Element => {

    const { children, route, isAuthorizedToView, protectionLevel: pl } = props;
    const protectionLevel = pl ?? 'open';

    const authState = useContext(AuthenticationStateContext);
    const refetchUserAsync = useContext(RefetchUserAsyncContext);
    const user = useContext(CurrentUserContext)!;

    if (verboseLogging) {

        console.log(`Route renderer: Abs: '${route.route.getAbsolutePath()}' Rel: '${route.route.getRelativePath()}'`);
        console.log(`-- Protection level '${protectionLevel}'`);
    }

    setPageTitle(route.title);

    // if open route, don't authorize 
    if (protectionLevel === 'open') {

        if (verboseLogging)
            console.log('-- Rendering children...');

        return children;
    }

    if (verboseLogging)
        console.log(`-- Auth state '${authState}'`);

    // if loading return blank page
    if (authState === 'loading') {

        if (verboseLogging)
            console.log('-- Rendering empty div until loaded.');

        return <div></div>;
    }

    // check authentication 
    if (authState === 'forbidden') {

        if (verboseLogging)
            console.log('-- Redirecting...');

        return <Navigate
            replace
            to={applicationRoutes.loginRoute.route.getAbsolutePath()} />;
    }

    // if just authenticate protection level, 
    // return since authentication is done.
    if (protectionLevel === 'justAuthenticate') {

        if (verboseLogging)
            console.log('-- Rendering children...');

        return children;
    }

    // redirect to signup if application is not accessable yet
    if (!user.userActivity.canAccessApplication) {

        if (verboseLogging)
            console.log('-- Accessing application is not yet aturhorized, redirecting...');

        return <Navigate
            replace
            to={applicationRoutes.signupRoute.route.getAbsolutePath()} />;
    }

    // redirect to home if external authorization check fails
    const authFuncCheck = isAuthorizedToView
        ? isAuthorizedToView(user.userActivity)
        : true;

    if (!authFuncCheck) {

        if (verboseLogging)
            console.log('-- Authorization function returned false, redirecting...');

        return <Navigate
            replace
            to={applicationRoutes.homeRoute.route.getAbsolutePath()} />;
    }

    if (verboseLogging)
        console.log('-- Rendering...');

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
                            isAuthorizedToView={renderRoute.isAuthorizedToView}
                            protectionLevel={renderRoute.protectionLevel}>
                            {renderRoute.element}
                        </RouteRenderer>
                    </>}
                    key={index} />;
            })}
    </Routes>;
};