import { Role } from '../models/entity/authorization/Role';
import { RoleAssignmentBridge } from '../models/entity/authorization/RoleAssignmentBridge';
import { RolePermissionBridge } from '../models/entity/authorization/RolePermissionBridge';
import { User } from '../models/entity/misc/User';
import { UserPermissionView } from '../models/views/UserPermissionView';
import { UserRoleView } from '../models/views/UserRoleView';
import { PermissionListDTO } from '@episto/communication';
import { RoleCreateDTO } from '@episto/communication';
import { RoleEditDTO } from '@episto/communication';
import { UserRoleDTO } from '@episto/communication';
import { RoleDTO } from '@episto/communication';
import { ErrorWithCode } from '@episto/commontypes';
import { PermissionCodeType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { instatiateInsertEntity } from '../utilities/misc';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { AuthorizationService } from './AuthorizationService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class RoleService {

    constructor(
        private _ormService: ORMConnectionService,
        private _mapperService: MapperService,
        private _authorizationService: AuthorizationService) {
    }

    /**
     * Retrieve the user's permissions 
     */
    async getUserRolesAsync(principalId: PrincipalId, userId: Id<'User'> | null) {

        const roles = await this._ormService
            .query(UserRoleView, { userId })
            .where('assigneeUserId', '=', 'userId')
            .getMany();

        const roleGroups = roles
            .groupBy(x => `${x.roleId}${x.contextCompanyId}${x.assignmentBridgeId}${x.assigneeUserId}`);

        return roleGroups
            .map(({ first, items }): UserRoleDTO => ({
                isInherited: first.isInherited,
                roleId: first.roleId,
                roleName: first.roleName,
                permissions: items
                    .filter(x => x.permissionId !== null)
                    .map((x): PermissionListDTO => ({
                        code: x.permissionCode,
                        scope: 'COMPANY' // not used 
                    }))
            }));
    }

    /**
     * Retrieve the user's permissions 
     */
    async getAllRolesAsync(principalId: PrincipalId) {

        const roles = await this._ormService
            .query(Role, {})
            .where('isCustom', '=', 'false')
            .getMany();

        return roles
            .map((x): RoleDTO => ({
                id: x.id,
                name: x.name
            }));
    }

    /**
     * Saves user assigned roles
     */
    async saveUserRolesAsync(principalId: PrincipalId, targetUserId: Id<'User'>, assignedRoleIds: Id<'Role'>[]) {

        const { companyId } = await this
            ._ormService
            .getSingleById(User, targetUserId);

        const oldBridges = await this
            ._ormService
            .query(RoleAssignmentBridge, { targetUserId })
            .where('assigneeUserId', '=', 'targetUserId')
            .getMany();

        // DELETE BRIDGES
        await this
            ._ormService
            .hardDelete(RoleAssignmentBridge, oldBridges
                .filter(x => !assignedRoleIds
                    .some(y => y === x.roleId))
                .map(x => x.id));

        // ASSIGN
        const newBridges = assignedRoleIds
            .filter(x => !oldBridges
                .some(o => o.roleId === x))
            .map(assignedRoleId => instatiateInsertEntity<RoleAssignmentBridge>({
                roleId: assignedRoleId,
                assigneeCompanyId: null,
                assigneeUserId: targetUserId,
                contextCompanyId: companyId,
            }));

        await this._ormService
            .createManyAsync(RoleAssignmentBridge, newBridges);
    }

    createRoleAsync(principalId: PrincipalId, dto: RoleCreateDTO) {

        return {
            action: async () => {
                const userId = principalId.toSQLValue();

                // create role
                const { id: roleId } = await this._ormService
                    .createAsync(Role, {
                        name: dto.name,
                        companyId: dto.companyId,
                        isCustom: dto.isCustom,
                        deletionDate: null
                    });

                // create permission assignments 
                const permAssignemnts = dto
                    .permissionIds
                    .map(x => ({
                        permissionId: x,
                        roleId: roleId
                    } as RolePermissionBridge));

                await this._ormService
                    .save(RolePermissionBridge, permAssignemnts);
            },
            auth: async () => {

                const { companyId } = await this._ormService
                    .query(User, { userId: principalId.toSQLValue() })
                    .where('id', '=', 'userId')
                    .getSingle();

                return this._authorizationService
                    .checkPermissionAsync(principalId, 'EDIT_CUSTOM_ROLES', { companyId });
            }
        };
    }

    getRoleEditDataAsync(principalId: PrincipalId, roleId: Id<'Role'>) {

        return {
            action: async (): Promise<RoleEditDTO> => {
                const userId = principalId.toSQLValue();

                type ResultType = {
                    roleId: Id<'Role'>,
                    roleName: string,
                    permissionId: Id<'Permission'>,
                    isCustom: boolean,
                    companyId: Role['companyId']
                }

                const roles = await this._ormService
                    .withResType<ResultType>()
                    .query(Role, {
                        userId,
                        roleId,
                        editCoCode: 'EDIT_CUSTOM_ROLES' as PermissionCodeType,
                        editGlobCode: 'EDIT_PREDEFINED_ROLES' as PermissionCodeType
                    })
                    .selectFrom(x => x
                        .columns(Role, {
                            roleId: 'id',
                            roleName: 'name',
                            companyId: 'companyId',
                            isCustom: 'isCustom'
                        })
                        .columns(RolePermissionBridge, {
                            permissionId: 'permissionId'
                        }))
                    .innerJoin(UserPermissionView, x => x
                        .on('assigneeUserId', '=', 'userId')
                        .openBracket()
                        .and('contextCompanyId', '=', 'companyId', Role)
                        .and('permissionCode', '=', 'editCoCode')
                        .or('permissionCode', '=', 'editGlobCode')
                        .and('contextCompanyId', 'IS', 'NULL')
                        .closeBracket())
                    .leftJoin(RolePermissionBridge, x => x
                        .on('roleId', '=', 'id', Role))
                    .where('id', '=', 'roleId')
                    .getMany();

                if (roles.none())
                    throw new ErrorWithCode('forbidden');

                const group = roles
                    .groupBy(x => x.roleId)
                    .single();

                const resultGroupFirst = group.first;

                return {
                    roleId: resultGroupFirst.roleId,
                    name: resultGroupFirst.roleName,
                    companyId: resultGroupFirst.companyId,
                    isCustom: resultGroupFirst.isCustom,
                    permissionIds: group
                        .items
                        .map(x => x.permissionId)
                };
            },
            auth: async () => {

                const { companyId } = await this._ormService
                    .query(User, { userId: principalId.toSQLValue() })
                    .where('id', '=', 'userId')
                    .getSingle();

                return this._authorizationService
                    .checkPermissionAsync(principalId, 'VIEW_CUSTOM_ROLES', { companyId });
            }
        };

    }

    deleteRoleAsync(principalId: PrincipalId, roleId: Id<'Role'>) {

        return {
            action: async () => {
                const userId = principalId.toSQLValue();

                await this._ormService
                    .softDelete(Role, [roleId]);
            },
            auth: async () => {

                const { companyId } = await this._ormService
                    .query(User, { userId: principalId.toSQLValue() })
                    .where('id', '=', 'userId')
                    .getSingle();

                return this._authorizationService
                    .checkPermissionAsync(principalId, 'DELETE_CUSTOM_ROLES', { companyId });
            }
        };

    }

    saveRoleAsync(principalId: PrincipalId, dto: RoleEditDTO) {

        return {
            action: async () => {
                const userId = principalId.toSQLValue();

                // save role
                const role = await this._ormService
                    .query(Role, { roleId: dto.roleId })
                    .where('id', '=', 'roleId')
                    .getSingle();

                await this._ormService
                    .save(Role, {
                        id: role.id,
                        name: dto.name,
                        companyId: dto.companyId
                    });

                const bridgesToDelete = await this._ormService
                    .query(RolePermissionBridge, { roleId: dto.roleId })
                    .where('roleId', '=', 'roleId')
                    .getMany();

                // save role permission bridges
                await this._ormService
                    .hardDelete(RolePermissionBridge, bridgesToDelete.map(x => x.id));

                await this._ormService
                    .createManyAsync(RolePermissionBridge, dto
                        .permissionIds
                        .map(x => ({
                            permissionId: x,
                            roleId: dto.roleId
                        })));
            },
            auth: async () => {

                const { companyId } = await this._ormService
                    .query(User, { userId: principalId.toSQLValue() })
                    .where('id', '=', 'userId')
                    .getSingle();

                return this._authorizationService
                    .checkPermissionAsync(principalId, 'EDIT_CUSTOM_ROLES', { companyId });
            }
        };

    }
}