import { Box } from '@chakra-ui/layout';
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
    render: () => ReactNode,
    ignoreAppAccessProtection?: boolean
}) => {

    const authState = useContext(AuthenticationStateContext);
    const user = useContext(CurrentUserContext);
    const { render, isAuthorizedToView, ignoreAppAccessProtection, ...routeProps } = props;

    if (globalConfig.verboseLogging)
        console.log(`Navigated to protected route '${props.path}'. Authentication state: ${authState}`);

    const handleIsAuthorizedToView = (userActivity: UserActivityDTO) => {

        const externalCheck = isAuthorizedToView
            ? isAuthorizedToView(userActivity)
            : true;

        if (!externalCheck)
            return false;

        if (ignoreAppAccessProtection)
            return true;

        return userActivity.canAccessApplication;
    }

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

                    console.log("Forbidden.");
                    return <Box>Forbidden.</Box>
                }

                return render();
            }} />
    );
};
