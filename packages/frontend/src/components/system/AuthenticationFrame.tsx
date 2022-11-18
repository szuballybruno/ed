import { Id } from '@episto/commontypes';
import { AuthDataDTO, UserDTO } from '@episto/communication';
import { createContext, useContext, useEffect } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { AuthenticationStateType, useAuthHandshake } from '../../services/api/authenticationApiService';
import { useNavigation } from '../../services/core/navigatior';
import { useEventManagerContext } from './EventManagerFrame';
import { PropsWithChildren, useCurrentUrlPathname, useGetCurrentAppRoute } from '../../static/frontendHelpers';
import { Logger } from '../../static/Logger';
import { AuthorizationContext, getAuthorizationContextLogic, useAuthorizationContext } from './AuthorizationContext';

const userDefaults: UserDTO = {
    avatarUrl: '',
    companyId: Id.create<'Company'>(-1),
    email: '',
    firstName: '',
    id: Id.create<'User'>(-1),
    isInvitationAccepted: true,
    isTrusted: true,
    department: {
        id: Id.create<'Department'>(-1),
        name: ''
    },
    lastName: '',
    name: '',
    phoneNumber: '',
    username: ''
};

export const CurrentUserContext = createContext<UserDTO>(userDefaults);
const RefetchUserAsyncContext = createContext<() => Promise<AuthDataDTO>>(null as any);
export const AuthenticationStateContext = createContext<AuthenticationStateType>('loading');

export const useCurrentUserId = () => {

    const ct = useContext(CurrentUserContext);
    return { userId: ct.id };
};

export const useCurrentUserContext = () => {

    return useContext(CurrentUserContext);
};

export const useAuthStateContext = () => {

    return useContext(AuthenticationStateContext);
};

export const useRefetchUserAsync = () => {

    const refetchAuthHandshake = useContext(RefetchUserAsyncContext);
    return { refetchAuthHandshake };
};

const AuthFirewall = (props: PropsWithChildren & {
    authState: AuthenticationStateType
}): JSX.Element => {

    const { authState, children } = props;
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
        const ignoreAccessAppRestriction = !!currentRoute.ignoreAccessAppRestriction;
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

export const AuthenticationFrame = ({ children }: PropsWithChildren) => {

    // start auth pooling
    const globalEventManager = useEventManagerContext();
    const { authData, authState, refetchAuthHandshake } = useAuthHandshake(globalEventManager);

    Logger.logScoped('AUTH', `Auth state is: '${authState}'...`);

    // authorization context 
    const authContextData = getAuthorizationContextLogic(authData?.permissions ?? []);

    return (
        <AuthenticationStateContext.Provider value={authState}>
            <RefetchUserAsyncContext.Provider value={refetchAuthHandshake}>
                <CurrentUserContext.Provider value={authData?.currentUser ?? userDefaults}>
                    <AuthorizationContext.Provider value={authContextData}>
                        <AuthFirewall authState={authState}>
                            {children}
                        </AuthFirewall>
                    </AuthorizationContext.Provider>
                </CurrentUserContext.Provider>
            </RefetchUserAsyncContext.Provider>
        </AuthenticationStateContext.Provider>
    );
};
