import { Permission } from '../models/entity/authorization/Permission';
import { PermissionAssignmentBridge } from '../models/entity/authorization/PermissionAssignmentBridge';
import { UserPermissionView } from '../models/views/UserPermissionView';
import { PermissionListDTO } from '@episto/communication';
import { GetPermissionScope, GetParamByCodeType, PermissionScopeParamType } from '@episto/commontypes';
import { PermissionCodeType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
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

    /**
     * [API ACTION] Gets permissions 
     */
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

    /**
     * Gets a permission in a more advanced way
     */
    async getPermissionAsync<TCode extends PermissionCodeType>(...args: GetPermissionScope<TCode> extends 'USER'
        ? [Id<'User'>, TCode]
        : [Id<'User'>, TCode, GetParamByCodeType<TCode>]) {

        const { code, contextCompanyId, contextCourseId, userId } = this._getParams(args);

        return this.getPermissionByOptionsAsync({
            code,
            contextCompanyId,
            contextCourseId,
            userId
        });
    }

    /**
     * Get permission scope by permission code 
     */
    async getPermissionScope(permissionCode: string) {

        const perm = await this
            ._ormService
            .query(Permission, { permissionCode })
            .where('code', '=', 'permissionCode')
            .getSingle();

        return perm.scope;
    }

    /**
     * Gets a permission by the 
     * supplied search options  
     */
    async getPermissionByOptionsAsync({
        code,
        contextCompanyId,
        contextCourseId,
        userId
    }: {
        code: PermissionCodeType;
        userId: Id<'User'>;
        contextCompanyId: Id<'Company'> | null;
        contextCourseId: Id<'Course'> | null;
    }) {

        return await this
            ._ormService
            .query(UserPermissionView, {
                userId,
                permissionsCode: code,
                contextCompanyId,
                contextCourseId,
                contextCommentId: null,
            })
            .where('assigneeUserId', '=', 'userId')
            .and('permissionCode', '=', 'permissionsCode')
            .and('contextCompanyId', '=', 'contextCompanyId')
            .and('contextCourseId', '=', 'contextCourseId')
            .and('contextCommentId', '=', 'contextCommentId')
            .getOneOrNull();
    }

    /**
     * TODO wtf 
     */
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

    /**
     * Assignes a permission  
     */
    async assignPermission<TCode extends PermissionCodeType>(...args: GetPermissionScope<TCode> extends 'USER'
        ? [Id<'User'>, TCode]
        : [Id<'User'>, TCode, GetParamByCodeType<TCode>]) {

        const { code, contextCompanyId, contextCourseId, userId } = this._getParams(args);

        const permission = await this
            ._ormService
            .query(Permission, { code })
            .where('code', '=', 'code')
            .getSingle();

        const permissionId = permission.id;

        const exists = await this
            ._getPermissionAssignment(permissionId, userId, contextCompanyId, contextCourseId);

        if (exists)
            throw new Error(`Permission ${permission.code} (${permission.id}) is already assigned to user ${userId}!`);

        await this
            ._ormService
            .createAsync(PermissionAssignmentBridge, {
                permissionId: permission.id,
                assigneeUserId: userId,
                assigneeCompanyId: null,
                assigneeGroupId: null,
                contextCompanyId,
                contextCourseId
            });
    }

    /**
     * Deassigns a permission 
     */
    async removePersmission<TCode extends PermissionCodeType>(...args: GetPermissionScope<TCode> extends 'USER'
        ? [Id<'User'>, TCode]
        : [Id<'User'>, TCode, GetParamByCodeType<TCode>]) {

        const { code, contextCompanyId, contextCourseId, userId } = this._getParams(args);

        const permission = await this
            ._ormService
            .query(Permission, { code })
            .where('code', '=', 'code')
            .getSingle();

        const permissionId = permission.id;

        const assignment = await this
            ._getPermissionAssignment(permissionId, userId, contextCompanyId, contextCourseId);

        if (!assignment)
            return;
        // throw new Error(`Trying to remove permission ${permissionId}, but it is not assigned to user ${userId}!`);

        await this
            ._ormService
            .hardDelete(PermissionAssignmentBridge, [assignment.id]);
    }

    // --------------- PRIVATE

    /**
     * Get params  
     */
    private _getParams(args: any) {

        const [userId, code] = args;
        const scopeParam = args[2] as PermissionScopeParamType | undefined;
        const contextCompanyId = scopeParam?.companyId ?? null;
        const contextCourseId = scopeParam?.courseId ?? null;

        return {
            userId,
            code,
            contextCompanyId,
            contextCourseId
        };
    }

    /**
     * Get permission assignment  
     */
    private async _getPermissionAssignment(
        permissionId: Id<'Permission'>,
        userId: Id<'User'>,
        contextCompanyId: Id<'Company'> | null,
        contextCourseId: Id<'Course'> | null) {

        const assignemnt = await this
            ._ormService
            .query(PermissionAssignmentBridge, { permissionId, userId, contextCompanyId, contextCourseId })
            .where('permissionId', '=', 'permissionId')
            .and('assigneeUserId', '=', 'userId')
            .and('contextCompanyId', '=', 'contextCompanyId')
            .and('contextCourseId', '=', 'contextCourseId')
            .getOneOrNull();

        return assignemnt;
    }
}