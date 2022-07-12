import { User } from '../models/entity/User';
import { PermissionCodeType } from '../shared/types/sharedTypes';
import { VerboseError } from '../shared/types/VerboseError';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/ActionParams';
import { log } from './misc/logger';
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

        if (!hasPermission)
            throw new VerboseError('User has no permission to access resource.', 'no permission');
    }

    async hasPermissionAsync(
        principalId: PrincipalId,
        permissionCode: PermissionCodeType,
        context?: ContextOptions) {

        const userId = Id
            .create<'User'>(principalId.toSQLValue())

        const perm = await this._permissionService
            .getPermissionAsync(userId, permissionCode, context);

        return !!perm;
    }
}