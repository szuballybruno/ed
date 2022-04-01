import React, { ReactNode } from "react";
import { Route } from "react-router-dom";
import { ApplicationRoute } from "../../models/types";
import { UserActivityDTO } from "../../shared/dtos/UserActivityDTO";

export const Proute2 = (props: {
    route: ApplicationRoute,
    isAuthorizedToView?: (userActivity: UserActivityDTO) => boolean
    render: () => ReactNode,
    ignoreAppAccessProtection?: boolean
}) => {

    const { render, isAuthorizedToView, ignoreAppAccessProtection, route } = props;

    return <Route
        path={"/asd"}>

        <div>proute 2</div>
    </Route>;
};

export const ProtectedRoute = (props: {
    route: ApplicationRoute,
    isAuthorizedToView?: (userActivity: UserActivityDTO) => boolean
    render: () => ReactNode,
    ignoreAppAccessProtection?: boolean
}) => {

    const { render, isAuthorizedToView, ignoreAppAccessProtection, route } = props;

    // const authState = useContext(AuthenticationStateContext);
    // const refetchUserAsync = useContext(RefetchUserAsyncContext);
    // const user = useContext(CurrentUserContext);

    // if (verboseLogging)
    //     console.log(`Navigated to protected route '${route.route}'. Authentication state: ${authState}`);

    // const isMatchingCurrent = useIsMatchingCurrentRoute();

    // const isCurrent = isMatchingCurrent(route);

    // useEffect(() => {

    //     if (isCurrent)
    //         setPageTitle(route.title);
    // }, [isCurrent]);

    return (
        <Route
            // exact={route.exact}
            // path={route.route}
            path={"/asd"}
            element={x => {

                return <div>{route.route}</div>;
                // if (verboseLogging)
                //     console.log("Auth state: " + authState);

                // // if loading return blank page
                // if (authState === "loading") {

                //     console.log("Returning loading div...");
                //     return <div></div>;
                // }

                // // check authentication 
                // if (authState === "forbidden") {

                //     console.log("Forbidden, redirecting...");
                //     return <Redirect to={applicationRoutes.loginRoute.route} />;
                // }

                // // redirect to signup if application is not accessable yets
                // if (!user!.userActivity.canAccessApplication && !ignoreAppAccessProtection)
                //     return <Redirect to={applicationRoutes.signupRoute.route} />;

                // // redirect to home if external authorization check fails
                // const externalCheck = isAuthorizedToView
                //     ? isAuthorizedToView(user!.userActivity)
                //     : true;

                // if (!externalCheck)
                //     return <Redirect to={applicationRoutes.homeRoute.route} />;

                // return render();
            }} />
    );
};
