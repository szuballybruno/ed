import React, { ReactNode } from 'react';
import { useContext } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import Cookies from "universal-cookie";
import { IsAuthenticatedContext as AuthenticationStateContext } from '../../../../HOC/data_manager_frame/DataManagerFrame';

// interface PrivateRouteProps extends RouteProps {
//     // tslint:disable-next-line:no-any
//     component: any;
//     isSignedIn?: boolean;
// }


// const ProtectedRoute = (props: PrivateRouteProps) => {
//     const { component: Component, ...rest } = props;
//     const cookies = new Cookies();

//     return (
//         <Route
//             {...rest}
//             render={(routeProps) =>
//                 cookies.get("userId") ? (
//                     <Component {...routeProps} />
//                 ) : (
//                     <Redirect
//                         to={{
//                             pathname: '/login',
//                             state: { from: routeProps.location }
//                         }}
//                     />
//                 )
//             }
//         />
//     );
// };


const ProtectedRoute = (props: {
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
                    return render();

                // if still loading 
                if (authState.isLoading)
                    return <div>asd</div>;

                // if not, leave
                return <Redirect to={{ pathname: "/asd" }} />
            }} />
    );
};


export default ProtectedRoute;
