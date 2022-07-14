import { createContext, useContext } from 'react';
import { GetParamByCodeType, GetPermissionScope } from '../../shared/types/PermissionCodesType';
import { PermissionCodeType } from '../../shared/types/sharedTypes';

export class AuthorizationContextLogic {

    public isAuthenticated: boolean = true;

    constructor(private _permissionCodes: PermissionCodeType[]) {

    }

    hasPermission<TCode extends PermissionCodeType>(...args: GetPermissionScope<TCode> extends 'USER' ? [TCode] : [TCode, GetParamByCodeType<TCode>]) {

        const [searchPermissionCode, params] = args;

        const isFound = this._permissionCodes
            .any(userPermissionCode => userPermissionCode === searchPermissionCode);

        return isFound;
    };
};

type AuthorizationContextDataType = AuthorizationContextLogic;

export const AuthorizationContext = createContext<AuthorizationContextDataType>(new AuthorizationContextLogic([]));

export const useAuthorizationContext = () => useContext(AuthorizationContext);