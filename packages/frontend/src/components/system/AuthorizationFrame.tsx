import { useMemo } from 'react';
import { EMPTY_ARRAY } from '../../helpers/emptyArray';
import { PropsWithChildren } from '../../static/frontendHelpers';
import { useAuthContextStateAsync } from './AuthenticationFrame';
import { AuthorizationContext, getAuthorizationContextLogic } from './AuthorizationContext';

export const AuthorizationFrame = ({ children }: PropsWithChildren) => {

    // start auth pooling
    const { authData } = useAuthContextStateAsync();

    const permissions = useMemo(() => authData?.permissions ?? EMPTY_ARRAY, [authData]);

    // authorization context 
    const authContextData = getAuthorizationContextLogic(permissions);

    return (
        <AuthorizationContext.Provider value={authContextData}>
            {children}
        </AuthorizationContext.Provider>
    );
};
