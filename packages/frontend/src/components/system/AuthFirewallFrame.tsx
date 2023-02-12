import { useEffect, useMemo } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useNavigation } from '../../services/core/navigatior';
import { PropsWithChildren, useCurrentUrlPathname, useGetCurrentAppRoute } from '../../static/frontendHelpers';
import { Logger } from '../../static/Logger';
import { useAuthContextState } from './AuthenticationFrame';
import { useAuthorizationContext } from './AuthorizationContext';

export const AuthFirewallFrame = ({ children }: PropsWithChildren): JSX.Element => {

    const { authState } = useAuthContextState();
    const dest = useCurrentUrlPathname();
    const { loginRoute, surveyRoute } = applicationRoutes;
    const { navigate2 } = useNavigation();
    const currentRoute = useGetCurrentAppRoute();
    const { hasPermission } = useAuthorizationContext();
    const isUnauthorized = !!currentRoute.isUnauthorized;

    /**
     * Check authentication 
     */
    const authorizationResult = useMemo((): 'OK' | 'WAIT' | 'ERROR' | (() => void) => {

        const isCurrentRouteLogin = currentRoute
            .route
            .getAbsolutePath() === applicationRoutes
                .loginRoute
                .route
                .getAbsolutePath();

        Logger.logScoped('AUTH', `Current route: ${currentRoute.route.getAbsolutePath()} IsUnrestricted: ${isUnauthorized}`);

        // unauthorized
        if (authState === 'unauthorized' && !isCurrentRouteLogin) {

            Logger.logScoped('AUTH', `Auth state: ${authState}. Redirecting to login.`);
            return () => navigate2(loginRoute);
        }

        // error
        if (authState === 'error' && !isCurrentRouteLogin) {

            Logger.logScoped('AUTH', `Auth state: ${authState}. Returning error for page to handle...`);
            return 'ERROR';
        }

        // if loading return blank page
        if (authState === 'loading') {

            Logger.logScoped('AUTH', `Auth state: ${authState}. Rendering empty div until loaded.`);
            return 'WAIT';
        }

        // check authentication 
        if (authState === 'forbidden' && !isUnauthorized) {

            Logger.logScoped('AUTH', `Auth state: ${authState}. Redirecting...`);
            return () => navigate2(loginRoute, {}, { dest });
        }

        // if skip survey is enabled, let execution continue
        if (hasPermission('BYPASS_SURVEY')) {

            Logger.logScoped('AUTH', `Auth state: ${authState}. Survey bypassed. Rendering...`);
            return 'OK';
        }

        // current route is unauthorized
        if (isUnauthorized) {

            Logger.logScoped('AUTH', `Auth state: ${authState}. Route unauthoirized. Rendering...`);
            return 'OK';
        }

        // current route is survey
        if (currentRoute.isSurvey) {

            Logger.logScoped('AUTH', `Auth state: ${authState}. Route isSurvey. Rendering...`);
            return 'OK';
        }

        /**
         * No exception matched, redirecting to survey
         */
        Logger.logScoped('AUTH', 'Redirecting to survey...');
        return () => navigate2(surveyRoute);

    }, [authState, navigate2, loginRoute, currentRoute, dest, isUnauthorized, hasPermission, surveyRoute]);

    /**
     * Exec auth returned navigation function 
     */
    useEffect(() => {

        if (typeof authorizationResult === 'function')
            authorizationResult();
    }, [authorizationResult]);


    Logger.logScoped('AUTH', `Auth frame computed result is: '${authorizationResult}'...`);

    /**
     * Render
     */
    return (
        <>
            {authorizationResult === 'OK'
                ? children
                : <></>}
        </>
    );
};