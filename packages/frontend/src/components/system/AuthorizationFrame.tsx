import { useMemo } from 'react';
import { EMPTY_ARRAY } from '../../helpers/emptyArray';
import { PropsWithChildren } from '../../static/frontendHelpers';
import { useAuthContextState } from './AuthenticationFrame';
import { AuthorizationContext, getAuthorizationContextLogic } from './AuthorizationContext';

export const AuthorizationFrame = ({ children }: PropsWithChildren) => {

    // start auth pooling
    const { authData } = useAuthContextState();

    const permissions = useMemo(() => authData?.permissions ?? EMPTY_ARRAY, [authData]);

    // authorization context 
    const authContextData = getAuthorizationContextLogic(permissions);

    return (
        <AuthorizationContext.Provider value={authContextData}>
            {children}
        </AuthorizationContext.Provider>
    );
};
