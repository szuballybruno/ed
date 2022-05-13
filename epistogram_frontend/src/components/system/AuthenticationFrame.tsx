import { Flex } from '@chakra-ui/react';
import { createContext } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { AuthenticationStateType, useGetAuthHandshake } from '../../services/api/authenticationApiService';
import { useNavigation } from '../../services/core/navigatior';
import { UserDTO } from '../../shared/dtos/UserDTO';
import { PermissionCodeType } from '../../shared/types/sharedTypes';
import { Environment } from '../../static/Environemnt';
import { ChildPropsType, useCurrentUrlPathname, useIsMatchingCurrentRoute } from '../../static/frontendHelpers';

const getAuthorizationContextData = (permissionCodes: PermissionCodeType[]) => {

    return {
        hasPermission: (permCode: PermissionCodeType) => {

            const isFound = permissionCodes
                .any(code => code === permCode);

            console.log(`Checking permission: ${permCode} found: ${isFound}`);

            return isFound;
        },
        isAuthenticated: true
    };
};

type AuthorizationContextDataType = ReturnType<typeof getAuthorizationContextData>;

const userDefaults: UserDTO = {
    avatarUrl: '',
    companyId: -1,
    email: '',
    firstName: '',
    id: -1,
    isInvitationAccepted: true,
    isTrusted: true,
    jobTitle: {
        id: -1,
        name: ''
    },
    lastName: '',
    name: '',
    phoneNumber: ''
};

const authDefaultPermissions: PermissionCodeType[] = [
    'ACCESS_ADMIN',
    'ACCESS_APPLICATION',
    'MANAGE_SHOP',
];

export const AuthorizationContext = createContext<AuthorizationContextDataType>(getAuthorizationContextData(authDefaultPermissions));
export const CurrentUserContext = createContext<UserDTO>(userDefaults);
export const RefetchUserAsyncContext = createContext<() => Promise<void>>(() => Promise.resolve());
export const AuthenticationStateContext = createContext<AuthenticationStateType>('loading');

const AuthFirewall = (props: ChildPropsType & {
    authState: AuthenticationStateType
}): JSX.Element => {

    const { authState, children } = props;
    const isMatchingCurrent = useIsMatchingCurrentRoute();
    const dest = useCurrentUrlPathname();
    const loginRoute = applicationRoutes.loginRoute;
    const { isMatchingRoute: isLoginRoute } = isMatchingCurrent(loginRoute);
    const { navigate } = useNavigation();

    // if loading return blank page
    if (authState === 'loading') {

        if (Environment.loggingSettings.auth)
            console.log('Rendering empty div until loaded.');

        return <div></div>;
    }

    // error
    if (authState === 'error') {

        if (Environment.loggingSettings.auth)
            console.log('Rendering error page.');

        return <Flex
            className="whall"
            align="center"
            justify="center">

            Error!
        </Flex>;
    }

    // check authentication 
    if (authState === 'forbidden' && !isLoginRoute) {

        if (Environment.loggingSettings.auth)
            console.log('Redirecting...');

        navigate(loginRoute, undefined, { dest });

        return <div></div>;
    }

    if (Environment.loggingSettings.auth)
        console.log('Children...');

    return <>
        {children}
    </>;
};

export const AuthenticationFrame = (props) => {

    // start auth pooling
    const { authData, authState, refetchAuthHandshake } = useGetAuthHandshake();

    if (Environment.loggingSettings.auth)
        console.log(`Auth state is: '${authState}'...`);

    // authorization context 
    const authContextData: AuthorizationContextDataType = getAuthorizationContextData(authData?.permissions ?? []);

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
