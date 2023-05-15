import { ErrorWithCode } from '@episto/commontypes';
import { GetParamByCodeType, GetPermissionScope, PermissionScopeParamType } from '@episto/commontypes';
import { PermissionCodeType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { PrincipalId } from '@episto/x-core';
import { ORMConnectionService } from './ORMConnectionService';
import { PermissionService } from './PermissionService';

export class AuthorizationService {

    constructor(
        private _permissionService: PermissionService,
        private _ormService: ORMConnectionService) {

    }

    async canAccessAdmin(userId: Id<'User'>) {

    }

    async checkPermissionAsync<TCode extends PermissionCodeType>(
        ...args: GetPermissionScope<TCode> extends 'USER'
            ? [PrincipalId, TCode]
            : [PrincipalId, TCode, GetParamByCodeType<TCode>]) {

        const [principalId, searchPermissionCode, params] = args;
        const contextCompanyId = (params as PermissionScopeParamType)?.companyId ?? null;
        const contextCourseId = (params as PermissionScopeParamType)?.courseId ?? null;

        const scope = await this
            ._permissionService
            .getPermissionScope(searchPermissionCode);

        if (scope === 'COMPANY' && contextCompanyId === null)
            throw new Error('Company context id is missing!');

        if (scope === 'COURSE' && contextCourseId === null)
            throw new Error('Course context id is missing!');

        const hasPermission = await this
            ._permissionService
            .getPermissionByOptionsAsync({
                userId: principalId.getId(),
                code: searchPermissionCode,
                contextCompanyId,
                contextCourseId
            });

        if (!hasPermission)
            throw new ErrorWithCode(`A következő felhasználónak: (${principalId.toSQLValue()}) nincs engedélye a megadott erőforráshoz, amelyet a következő kód véd: "${searchPermissionCode}"`, 'no permission');
    }
}