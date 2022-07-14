import { createContext, useContext } from 'react';
import { GetParamByCodeType, GetPermissionScope } from '../../shared/types/PermissionCodesType';
import { PermissionCodeType } from '../../shared/types/sharedTypes';

export const getAuthorizationContextLogic = (_permissionCodes: PermissionCodeType[]) => {

    const hasPermission = <TCode extends PermissionCodeType>(
        ...args: GetPermissionScope<TCode> extends 'USER'
            ? [TCode]
            : [TCode, GetParamByCodeType<TCode>]) => {

        const [searchPermissionCode, params] = args;

        const isFound = _permissionCodes
            .any(userPermissionCode => userPermissionCode === searchPermissionCode);

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