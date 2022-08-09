import { Permission } from '../models/entity/authorization/Permission';
import { UserPermissionView } from '../models/views/UserPermissionView';
import { PermissionListDTO } from '../shared/dtos/role/PermissionListDTO';
import { PermissionCodeType } from '../shared/types/sharedTypes';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { AuthorizationResult } from '../utilities/XTurboExpress/XTurboExpressTypes';
import { MapperService } from './MapperService';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export type ContextOptions = {
    companyId?: Id<'Company'>,
    courseId?: Id<'Course'>,
    commentId?: Id<'Comment'>
}

export class PermissionService extends QueryServiceBase<Permission> {

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService) {

        super(mapperService, ormService, Permission);
    }

    async getPermissionAsync(
        assigneeUserId: Id<'User'>,
        permissionsCode: PermissionCodeType,
        context?: ContextOptions) {

        return await this
            ._ormService
            .query(UserPermissionView, {
                userId: assigneeUserId,
                permissionsCode,
                contextCompanyId: context?.companyId ?? null,
                contextCourseId: context?.courseId ?? null,
                contextCommentId: context?.commentId ?? null,
            })
            .where('assigneeUserId', '=', 'userId')
            .and('permissionCode', '=', 'permissionsCode')
            .and('contextCompanyId', '=', 'contextCompanyId')
            .and('contextCourseId', '=', 'contextCourseId')
            .and('contextCommentId', '=', 'contextCommentId')
            .getOneOrNull();
    }

    getPermissionsAsync(principalId: PrincipalId) {

        return {
            action: async () => {
                const permissions = await this
                    ._ormService
                    .query(Permission)
                    .getMany();

                return this._mapperService
                    .mapTo(PermissionListDTO, [permissions]);
            },
            auth: async () => {
                return AuthorizationResult.ok;
            }
        };


    }

    async getPermissionMatrixAsync(userId: Id<'User'>, contextCompanyId: Id<'Company'>) {

        const perms = await this._ormService
            .query(UserPermissionView, { userId, contextCompanyId })
            .where('assigneeUserId', '=', 'userId')
            .openBracket()
            .and('contextCompanyId', '=', 'contextCompanyId')
            .or('contextCompanyId', 'IS', 'NULL')
            .closeBracket()
            .getMany();

        return perms

            .groupBy(x => x.permissionCode)
            .map(x => x.first.permissionCode);

        // return perms
        //     .map((x): PermissionMatrixDTO => ({
        //         code: x.permissionCode,
        //         companyId: x.contextCompanyId
        //     }));
    }
}