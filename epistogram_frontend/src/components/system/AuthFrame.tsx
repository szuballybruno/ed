import { createContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthenticationStateType, useRenewUserSessionPooling, useUserFetching } from '../../services/api/authenticationApiService';
import { UserDTO } from '../../shared/dtos/UserDTO';
import { PermissionCodeType } from '../../shared/types/sharedTypes';
import { Environment } from '../../static/Environemnt';

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
    'canAccessAdministration',
    'canAccessApplication',
    'canChangeCourseMode',
    'canAccessCourseAdministration',
    'canAccessShopAdministration',
];

export const AuthorizationContext = createContext<AuthorizationContextDataType>(getAuthorizationContextData(authDefaultPermissions));
export const CurrentUserContext = createContext<UserDTO>(userDefaults);
export const RefetchUserAsyncContext = createContext<() => Promise<void>>(() => Promise.resolve());
export const AuthenticationStateContext = createContext<AuthenticationStateType>('loading');

export const AuthenticationFrame = (props) => {

    // start auth pooling
    const { isSuccess } = useRenewUserSessionPooling();

    if (Environment.verboseLogging)
        console.log('Renewing token: ' + isSuccess);

    // fetch current user
    const { currentUser, refetchUserAsync, authState } = useUserFetching(isSuccess);

    if (Environment.verboseLogging)
        console.log('Authentication state: ' + authState);

    // refetch user on route change
    const location = useLocation();

    useEffect(() => {

        refetchUserAsync();
    }, [location.pathname]);

    // authorization context 
    const authContextData: AuthorizationContextDataType = getAuthorizationContextData(authDefaultPermissions);

    return <AuthenticationStateContext.Provider value={authState}>
        <RefetchUserAsyncContext.Provider value={refetchUserAsync}>
            <CurrentUserContext.Provider value={currentUser}>
                <AuthorizationContext.Provider value={authContextData}>
                    {props.children}
                </AuthorizationContext.Provider>
            </CurrentUserContext.Provider>
        </RefetchUserAsyncContext.Provider>
    </AuthenticationStateContext.Provider> as JSX.Element;
};
