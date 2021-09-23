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
    const isLoading = authState.isLoading || !user;

    if (globalConfig.verboseLogging)
        console.log(`Navigated to protected route '${props.path}'. Authenticated: ${authState.asString()}`);

    const handleIsAuthorizedToView = props.isAuthorizedToView
        ? props.isAuthorizedToView
        : (activity: UserActivityDTO) => true

    return (
        <Route
            {...routeProps}
            render={x => {

                if (globalConfig.verboseLogging)
                    console.log("Protected router loading state: " + isLoading);

                // if loading return blank page
                if (isLoading)
                    return <div></div>

                // if not authenticated or not authorized, redirect to login  
                if (!authState.isAuthenticated || !handleIsAuthorizedToView(user.userActivity))
                    return <Redirect to={applicationRoutes.loginRoute.route} />

                console.log(user);

                return render();
            }} />
    );
};
