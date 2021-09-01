import React, { ReactNode } from 'react';
import { useContext } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { AuthenticationStateContext as AuthenticationStateContext } from '../../HOC/AuthenticationFrame';
import { LoadingComponent } from "../../HOC/LoadingComponent";

export const ProtectedRoute = (props: {
    path: string,
    exact?: boolean,
    render: () => ReactNode
}) => {

    const authState = useContext(AuthenticationStateContext);
    const { render, ...routeProps } = props;

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
                    return <LoadingComponent />;

                // if not, leave
                return <Redirect to={{ pathname: "/login" }} />
            }} />
    );
};
