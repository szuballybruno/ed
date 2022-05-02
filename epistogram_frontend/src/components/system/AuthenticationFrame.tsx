import { Flex } from '@chakra-ui/react';
import { createContext } from 'react';
import { Navigate } from 'react-router-dom';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { AuthenticationStateType, useGetAuthHandshake } from '../../services/api/authenticationApiService';
import { UserDTO } from '../../shared/dtos/UserDTO';
import { PermissionCodeType } from '../../shared/types/sharedTypes';
import { Environment } from '../../static/Environemnt';
import { ChildPropsType } from '../../static/frontendHelpers';

const getAuthorizationContextData = (permissions: PermissionCodeType[]) => {

    return {
        hasPermission: (perm: PermissionCodeType) => {

            const isFound = permissions.any(x => x === perm);

            // console.log(permissions);

            // console.log(`Looking for permission '${perm}'. Found: ${isFound}.`);

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
    if (authState === 'forbidden') {

        if (Environment.loggingSettings.auth)
            console.log('Redirecting...');

        return <Navigate
            replace
            to={applicationRoutes.loginRoute.route.getAbsolutePath()} />;
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
    const authContextData: AuthorizationContextDataType = getAuthorizationContextData(authDefaultPermissions);

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
