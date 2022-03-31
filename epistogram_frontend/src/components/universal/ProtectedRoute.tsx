import React, { ReactNode, useContext, useEffect } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { verboseLogging } from '../../static/Environemnt';
import { UserActivityDTO } from '../../shared/dtos/UserActivityDTO';
import { AuthenticationStateContext, CurrentUserContext, RefetchUserAsyncContext } from '../system/AuthenticationFrame';
import { setPageTitle, useIsMatchingCurrentRoute, useSetPageTitle } from '../../static/frontendHelpers';
import { ApplicationRoute } from '../../models/types';

export const ProtectedRoute = (props: {
    route: ApplicationRoute,
    // path: string,
    // exact?: boolean,
    isAuthorizedToView?: (userActivity: UserActivityDTO) => boolean
    render: () => ReactNode,
    ignoreAppAccessProtection?: boolean
}) => {

    const authState = useContext(AuthenticationStateContext);
    const refetchUserAsync = useContext(RefetchUserAsyncContext);
    const user = useContext(CurrentUserContext);
    const { render, isAuthorizedToView, ignoreAppAccessProtection, route } = props;

    if (verboseLogging)
        console.log(`Navigated to protected route '${route.route}'. Authentication state: ${authState}`);

    const isMatchingCurrent = useIsMatchingCurrentRoute();

    const isCurrent = isMatchingCurrent(route);

    useEffect(() => {

        if (isCurrent)
            setPageTitle(route.title);
    }, [isCurrent])

    return (
        <Route
            exact={route.exact}
            path={route.route}
            render={x => {

                if (verboseLogging)
                    console.log("Auth state: " + authState);

                // if loading return blank page
                if (authState === "loading") {

                    console.log("Returning loading div...");
                    return <div></div>
                }

                // check authentication 
                if (authState === "forbidden") {

                    console.log("Forbidden, redirecting...");
                    return <Redirect to={applicationRoutes.loginRoute.route} />
                }

                // redirect to signup if application is not accessable yets
                if (!user!.userActivity.canAccessApplication && !ignoreAppAccessProtection)
                    return <Redirect to={applicationRoutes.signupRoute.route} />

                // redirect to home if external authorization check fails
                const externalCheck = isAuthorizedToView
                    ? isAuthorizedToView(user!.userActivity)
                    : true;

                if (!externalCheck)
                    return <Redirect to={applicationRoutes.homeRoute.route} />

                return render();
            }} />
    );
};
