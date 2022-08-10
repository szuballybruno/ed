import { ErrorWithCode } from '../shared/types/ErrorWithCode';
import { GetParamByCodeType, GetPermissionScope, PermissionScopeParamType } from '../shared/types/PermissionCodesType';
import { PermissionCodeType } from '../shared/types/sharedTypes';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { AuthorizationResult } from '../utilities/XTurboExpress/XTurboExpressTypes';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { PermissionService } from './PermissionService';

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
        const contextCompanyId = (params as PermissionScopeParamType)?.companyId ?? null;
        const contextCourseId = (params as PermissionScopeParamType)?.courseId ?? null;

        const hasPermission = await this
            ._permissionService
            .getPermissionByOptionsAsync({
                userId: principalId.getId(),
                code: searchPermissionCode,
                contextCompanyId,
                contextCourseId
            });

        if (!hasPermission)
            throw new ErrorWithCode(`User (${principalId.toSQLValue()}) has no permission to access resource, protected by: "${searchPermissionCode}" permission.`, 'no permission');

        return hasPermission ? AuthorizationResult.ok : AuthorizationResult.failed;
    }
}