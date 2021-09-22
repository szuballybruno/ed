import React, { ReactNode } from 'react';
import { useContext } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { globalConfig } from '../../configuration/config';
import { AuthenticationStateContext as AuthenticationStateContext } from '../HOC/AuthenticationFrame';

export const ProtectedRoute = (props: {
    path: string,
    exact?: boolean,
    render: () => ReactNode
}) => {

    const authState = useContext(AuthenticationStateContext);
    const { render, ...routeProps } = props;

    if (globalConfig.verboseLogging)
        console.log(`Navigated to protected route '${props.path}'. Authenticated: ${authState.asString()}`);

    return (
        <Route
            {...routeProps}
            render={x => {

                // if authenticated stay on route 
                if (authState.isAuthenticated)
                    //TODO: Implement WithRouter
                    return render();

                // if still loading
                if (authState.isLoading)
                    return <div></div>

                // if not, leave
                return <Redirect to={applicationRoutes.loginRoute.route} />
            }} />
    );
};
