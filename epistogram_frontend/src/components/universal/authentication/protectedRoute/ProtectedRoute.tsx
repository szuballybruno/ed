import React from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';
import Cookies from "universal-cookie";

interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
    isSignedIn?: boolean;
}


const ProtectedRoute = (props: PrivateRouteProps) => {
    const { component: Component, ...rest } = props;
    const cookies = new Cookies();

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                cookies.get("userId") ? (
                    <Component {...routeProps} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: routeProps.location }
                        }}
                    />
                )
            }
        />
    );
};

export default ProtectedRoute;
