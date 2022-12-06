import { Id } from '@episto/commontypes';
import { AuthDataDTO, UserDTO } from '@episto/communication';
import { createContext, useContext } from 'react';
import { AuthenticationStateType, useAuthHandshake } from '../../services/api/authenticationApiService';
import { PropsWithChildren } from '../../static/frontendHelpers';
import { Logger } from '../../static/Logger';
import { useEventManagerContext } from './EventManagerFrame';

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

type RefetchUserAuthhandshakeContextType = {
    authData: AuthDataDTO | null;
    authState: AuthenticationStateType;
    refetchAuthHandshake: () => Promise<AuthDataDTO>;
}

export const CurrentUserContext = createContext<UserDTO>(userDefaults);
const RefetchUserAsyncContext = createContext<RefetchUserAuthhandshakeContextType>({
    authData: null,
    authState: 'loading',
    refetchAuthHandshake: Promise.reject
});

export const useCurrentUserId = () => {

    const ct = useContext(CurrentUserContext);
    return { userId: ct.id };
};

export const useCurrentUserContext = () => {

    return useContext(CurrentUserContext);
};

export const useAuthContextState = () => {

    return useContext(RefetchUserAsyncContext);
};

export const AuthenticationFrame = ({ children }: PropsWithChildren) => {

    // start auth pooling
    const globalEventManager = useEventManagerContext();
    const authHanshakeState = useAuthHandshake(globalEventManager);
    const { authData, authState } = authHanshakeState;

    Logger.logScoped('AUTH', `Auth state is: '${authState}'...`, authData ?? 'undef');

    return (
        <RefetchUserAsyncContext.Provider value={authHanshakeState}>
            <CurrentUserContext.Provider value={authData?.currentUser ?? userDefaults}>
                {children}
            </CurrentUserContext.Provider>
        </RefetchUserAsyncContext.Provider>
    );
};
