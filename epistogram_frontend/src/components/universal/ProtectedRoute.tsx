import React, { ReactNode, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { globalConfig } from '../../configuration/config';
import { UserActivityDTO } from '../../models/shared_models/UserActivityDTO';
import { AuthenticationStateContext as AuthenticationStateContext, CurrentUserContext } from '../HOC/AuthenticationFrame';

export const ProtectedRoute = (props: {
    path: string,
    exact?: boolean,
    isAuthorizedToView?: (userActivity: UserActivityDTO) => boolean
    render: () => ReactNode
}) => {

    const authState = useContext(AuthenticationStateContext);
    const user = useContext(CurrentUserContext);
    const { render, ...routeProps } = props;

    if (globalConfig.verboseLogging)
        console.log(`Navigated to protected route '${props.path}'. Authentication state: ${authState}`);

    const handleIsAuthorizedToView = props.isAuthorizedToView
        ? props.isAuthorizedToView
        : (activity: UserActivityDTO) => true

    return (
        <Route
            {...routeProps}
            render={x => {

                if (globalConfig.verboseLogging)
                    console.log("Protected router loading state: " + authState);

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

                // check authorization 
                if (!handleIsAuthorizedToView(user!.userActivity)) {

                    console.log("Forbidden, redirecting...");
                    return <Redirect to={applicationRoutes.loginRoute.route} />
                }

                return render();
            }} />
    );
};
