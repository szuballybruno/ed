import { GetParamByCodeType, GetPermissionScope } from '../shared/types/PermissionCodesType';
import { PermissionCodeType } from '../shared/types/sharedTypes';
import { VerboseError } from '../shared/types/VerboseError';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { AuthorizationResult } from '../utilities/XTurboExpress/XTurboExpressTypes';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { ContextOptions, PermissionService } from './PermissionService';

export class AuthorizationService {

    constructor(
        private _permissionService: PermissionService,
        private _ormService: ORMConnectionService) {

    }

    async checkPermissionAsync<TCode extends PermissionCodeType>(
        ...args: GetPermissionScope<TCode> extends 'USER'
            ? [PrincipalId, TCode]
            : [PrincipalId, TCode, GetParamByCodeType<TCode>]) {

        const [principalId, searchPermissionCode, params] = args;

        const hasPermission = await this
            .hasPermissionAsync(principalId, searchPermissionCode as any, params);

        if (!hasPermission)
            throw new VerboseError('User has no permission to access resource.', 'no permission');
    }

    async getCheckPermissionResultAsync<TCode extends PermissionCodeType>(
        ...args: GetPermissionScope<TCode> extends 'USER'
            ? [PrincipalId, TCode]
            : [PrincipalId, TCode, GetParamByCodeType<TCode>]) {

        const [principalId, searchPermissionCode, params] = args;

        const hasPermission = await this
            .hasPermissionAsync(principalId, searchPermissionCode as any, params);

        return hasPermission ? AuthorizationResult.ok : AuthorizationResult.failed;
    }

    async hasPermissionAsync<TCode extends PermissionCodeType>(
        ...args: GetPermissionScope<TCode> extends 'USER'
            ? [PrincipalId, TCode]
            : [PrincipalId, TCode, GetParamByCodeType<TCode>]) {

        const [principalId, searchPermissionCode, params] = args;

        const userId = principalId
            .getId();

        const perm = await this._permissionService
            .getPermissionAsync(userId, searchPermissionCode, params as ContextOptions | undefined);

        return !!perm;
    }
}