import { createContext, useContext } from 'react';
import { PermissionCodeType } from '@episto/commontypes';

export const getAuthorizationContextLogic = (_permissionCodes: PermissionCodeType[]) => {

    const hasPermission = <TCode extends PermissionCodeType>(code: TCode) => {

        const isFound = _permissionCodes
            .some(userPermissionCode => userPermissionCode === code);

        return isFound;
    };

    return {
        hasPermission,
        isAuthenticated: true
    };
};

type AuthorizationContextDataType = ReturnType<typeof getAuthorizationContextLogic>;
export type HasPermissionFnType = AuthorizationContextDataType['hasPermission'];

export const AuthorizationContext = createContext<AuthorizationContextDataType>(getAuthorizationContextLogic([]));

export const useAuthorizationContext = () => useContext(AuthorizationContext);