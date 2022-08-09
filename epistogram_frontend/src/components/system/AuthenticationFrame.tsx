import { createContext, useEffect } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { AuthenticationStateType, useGetAuthHandshake } from '../../services/api/authenticationApiService';
import { useNavigation } from '../../services/core/navigatior';
import { UserDTO } from '../../shared/dtos/UserDTO';
import { PermissionCodeType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';
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
    jobTitle: {
        id: Id.create<'JobTitle'>(-1),
        name: ''
    },
    lastName: '',
    name: '',
    phoneNumber: ''
};

export const CurrentUserContext = createContext<UserDTO>(userDefaults);
export const RefetchUserAsyncContext = createContext<() => Promise<void>>(() => Promise.resolve());
export const AuthenticationStateContext = createContext<AuthenticationStateType>('loading');

const AuthFirewall = (props: PropsWithChildren & {
    authState: AuthenticationStateType
}): JSX.Element => {

    const { authState, children } = props;
    const dest = useCurrentUrlPathname();
    const loginRoute = applicationRoutes.loginRoute;
    const signupRoute = applicationRoutes.signupRoute;
    const { navigate } = useNavigation();
    const currentRoute = useGetCurrentAppRoute();
    const { hasPermission } = useAuthorizationContext();
    const isUnauthorized = !!currentRoute.isUnauthorized;

    // check for error before render, redirect to login if necessary
    useEffect(() => {

        // error
        if (authState === 'error') {

            Logger.logScoped('AUTH', `Auth state: ${authState}. Redirecting to login.`);

            navigate(loginRoute);
        }
    }, [authState]);

    Logger.logScoped('AUTH', `Current route: ${currentRoute.route.getAbsolutePath()} IsUnrestricted: ${isUnauthorized}`);

    // if loading return blank page
    if (authState === 'loading') {

        Logger.logScoped('AUTH', `Auth state: ${authState}. Rendering empty div until loaded.`);

        return <div></div>;
    }

    // check authentication 
    if (authState === 'forbidden' && !isUnauthorized) {

        Logger.logScoped('AUTH', `Auth state: ${authState}. Redirecting...`);

        navigate(loginRoute, undefined, { dest });

        return <div></div>;
    }

    // check authorization
    const canAccess = hasPermission('ACCESS_APPLICATION');
    const ignoreAccessAppRestriction = !!currentRoute.ignoreAccessAppRestriction;
    if (!canAccess && !ignoreAccessAppRestriction && !isUnauthorized) {

        Logger.logScoped('AUTH', `canaccess: ${canAccess} ignore: ${ignoreAccessAppRestriction} isunauth: ${isUnauthorized}`);
        Logger.logScoped('AUTH', `Auth state: ${authState}. No ${'ACCESS_APPLICATION' as PermissionCodeType} permission. Redirecting...`);

        navigate(signupRoute, undefined);

        return <div></div>;
    }

    Logger.logScoped('AUTH', `Auth state: ${authState}. Rendering content...`);

    return <>
        {children}
    </>;
};

export const AuthenticationFrame = (props) => {

    // start auth pooling
    const { authData, authState, refetchAuthHandshake } = useGetAuthHandshake();

    Logger.logScoped('AUTH', `Auth state is: '${authState}'...`);

    // authorization context 
    const authContextData = getAuthorizationContextLogic(authData?.permissions ?? []);

    return <AuthenticationStateContext.Provider value={authState}>
        <RefetchUserAsyncContext.Provider value={() => refetchAuthHandshake()}>
            <CurrentUserContext.Provider value={authData?.currentUser ?? userDefaults}>
                <AuthorizationContext.Provider value={authContextData}>
                    <AuthFirewall authState={authState}>
                        {props.children}
                    </AuthFirewall>
                </AuthorizationContext.Provider>
            </CurrentUserContext.Provider>
        </RefetchUserAsyncContext.Provider>
    </AuthenticationStateContext.Provider> as JSX.Element;
};
