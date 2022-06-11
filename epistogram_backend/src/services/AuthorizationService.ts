import { PermissionCodeType } from '../shared/types/sharedTypes';
import { VerboseError } from '../shared/types/VerboseError';
import { PrincipalId } from '../utilities/ActionParams';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { ContextOptions, PermissionService } from './PermissionService';

export class AuthorizationService {

    constructor(
        private _permissionService: PermissionService,
        private _ormService: ORMConnectionService) {

    }

    async checkPermissionAsync(
        principalId: PrincipalId,
        permissionCode: PermissionCodeType,
        context?: ContextOptions) {

        const hasPermission = await this
            .hasPermissionAsync(principalId, permissionCode, context);

        console.log(`User: ${principalId.toSQLValue()} Perm: ${permissionCode} ${JSON.stringify(context)} ${hasPermission}`)

        if (!hasPermission)
            throw new VerboseError('User has no permission to access resource.', 'no permission');
    }

    async hasPermissionAsync(
        principalId: PrincipalId,
        permissionCode: PermissionCodeType,
        context?: ContextOptions) {

        const perm = await this._permissionService
            .getPermissionAsync(principalId.toSQLValue(), permissionCode, context);

        return !!perm;
    }
}