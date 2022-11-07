import { createContext, useContext } from 'react';
import { PermissionCodeType } from '../../shared/types/sharedTypes';

export const getAuthorizationContextLogic = (_permissionCodes: PermissionCodeType[]) => {

    const hasPermission = <TCode extends PermissionCodeType>(code: TCode) => {

        const isFound = _permissionCodes
            .any(userPermissionCode => userPermissionCode === code);

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