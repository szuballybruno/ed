import { useEffect } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useAuthHandshake } from '../../services/api/authenticationApiService';
import { useNavigation } from '../../services/core/navigatior';
import { PropsWithChildren, useCurrentUrlPathname, useGetCurrentAppRoute } from '../../static/frontendHelpers';
import { Logger } from '../../static/Logger';
import { useAuthorizationContext } from './AuthorizationContext';
import { useEventManagerContext } from './EventManagerFrame';

export const AuthFirewallFrame = ({ children }: PropsWithChildren): JSX.Element => {

    const globalEventManager = useEventManagerContext();
    const authHanshakeState = useAuthHandshake(globalEventManager);
    const { authState } = authHanshakeState;
    
    const dest = useCurrentUrlPathname();
    const { loginRoute, surveyRoute } = applicationRoutes;
    const { navigate2 } = useNavigation();
    const currentRoute = useGetCurrentAppRoute();
    const { hasPermission } = useAuthorizationContext();
    const isUnauthorized = !!currentRoute.isUnauthorized;

    // check for error before render, 
    // redirect to login if necessary
    useEffect(() => {

        const isCurrentRouteLogin = currentRoute.route.getAbsolutePath() === applicationRoutes.loginRoute.route.getAbsolutePath();

        // error
        if (authState === 'error' && !isCurrentRouteLogin) {

            Logger.logScoped('AUTH', `Auth state: ${authState}. Redirecting to login.`);

            navigate2(loginRoute);
        }
    }, [authState, navigate2, loginRoute, currentRoute]);

    Logger.logScoped('AUTH', `Current route: ${currentRoute.route.getAbsolutePath()} IsUnrestricted: ${isUnauthorized}`);

    // if loading return blank page
    if (authState === 'loading') {

        Logger.logScoped('AUTH', `Auth state: ${authState}. Rendering empty div until loaded.`);

        return <div></div>;
    }

    // check authentication 
    if (authState === 'forbidden' && !isUnauthorized) {

        Logger.logScoped('AUTH', `Auth state: ${authState}. Redirecting...`);

        navigate2(loginRoute, {}, { dest });

        return <div></div>;
    }

    // check authorization
    const authCheckResult = (() => {

        // if skip survey is enabled, let execution continue
        const bypassSurvey = hasPermission('BYPASS_SURVEY');
        if (bypassSurvey)
            return;

        // access app restriction is ignored, 
        // for example on the survey route itself, 
        // let execution continue
        const ignoreAccessAppRestriction = !!currentRoute.isSurvey;
        if (ignoreAccessAppRestriction)
            return;

        // if route is unauthorized, 
        // for example on register routes, 
        // let execution continue
        if (isUnauthorized)
            return;

        /**
         * No conditions matched, nothing left to do 
         * but to navigate user back to survey
         */
        Logger.logScoped('AUTH', 'Redirecting to survey...');
        navigate2(surveyRoute);

        return <div></div>;
    })();

    if (authCheckResult)
        return authCheckResult;

    Logger.logScoped('AUTH', `Auth state: ${authState}. Rendering content...`);

    return <>
        {children}
    </>;
};