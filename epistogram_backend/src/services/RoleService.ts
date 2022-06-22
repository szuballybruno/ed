import { PermissionAssignmentBridge } from '../models/entity/authorization/PermissionAssignmentBridge';
import { Role } from '../models/entity/authorization/Role';
import { RoleAssignmentBridge } from '../models/entity/authorization/RoleAssignmentBridge';
import { RolePermissionBridge } from '../models/entity/authorization/RolePermissionBridge';
import { AssignablePermissionView } from '../models/views/AssignablePermissionView';
import { AssignableRoleView } from '../models/views/AssignableRoleView';
import { RoleListView } from '../models/views/RoleListView';
import { UserPermissionView } from '../models/views/UserPermissionView';
import { UserRoleView } from '../models/views/UserRoleView';
import { AssignablePermissionDTO } from '../shared/dtos/AssignablePermissionDTO';
import { AssignableRoleDTO } from '../shared/dtos/AssignableRoleDTO';
import { ChangeSet } from '../shared/dtos/changeSet/ChangeSet';
import { PermissionListDTO } from '../shared/dtos/role/PermissionListDTO';
import { RoleAdminListDTO } from '../shared/dtos/role/RoleAdminListDTO';
import { RoleCreateDTO } from '../shared/dtos/role/RoleCreateDTO';
import { RoleEditDTO } from '../shared/dtos/role/RoleEditDTO';
import { UserPermissionDTO } from '../shared/dtos/role/UserPermissionDTO';
import { UserRoleDTO } from '../shared/dtos/role/UserRoleDTO';
import { noUndefined } from '../shared/logic/sharedLogic';
import { PermissionCodeType, PermissionScopeType } from '../shared/types/sharedTypes';
import { VerboseError } from '../shared/types/VerboseError';
import { PrincipalId } from '../utilities/ActionParams';
import { instatiateInsertEntity } from '../utilities/misc';
import { MapperService } from './MapperService';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class RoleService extends QueryServiceBase<Role> {

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService) {

        super(mapperService, ormService, Role);
    }

    async getRolesListAdminAsync(principalId: PrincipalId) {

        const userId = principalId.toSQLValue();

        const roles = await this._ormService
            .query(RoleListView, { userId })
            .where('userId', '=', 'userId')
            .getMany();

        return this._mapperService
            .mapTo(RoleAdminListDTO, [roles]);
    }

    async getAssignablePermissionsAsync(principalId: PrincipalId, courseId: number | null, companyId: number | null) {

        const scope: PermissionScopeType = courseId
            ? 'COURSE'
            : companyId
                ? 'COMPANY'
                : 'USER';

        const rolesAndPermissions = await this._ormService
            .query(AssignablePermissionView, { principalId, companyId, scope })
            .where('assigneeUserId', '=', 'principalId')
            .and('contextCompanyId', '=', 'companyId')
            .and('permissionScope', '=', 'scope')
            .getMany();

        return rolesAndPermissions
            .map((x): AssignablePermissionDTO => ({
                contextCompanyId: x.contextCompanyId,
                permissionCode: x.permissionCode,
                permissionId: x.permissionId,
                userId: x.assigneeUserId
            }));
    }

    async getAssignableRolesAsync(principalId: PrincipalId, assigneeUserId: number, companyId: number) {

        const roles = await this._ormService
            .query(AssignableRoleView, { principalId, assigneeUserId, companyId })
            .where('assignerUserId', '=', 'principalId')
            .and('assigneeUserId', '=', 'assigneeUserId')
            .and('contextCompanyId', '=', 'companyId')
            .getMany();

        const roleGroups = roles
            .groupBy(x => x.roleId);

        return roleGroups
            .map((viewAsRole): AssignableRoleDTO => ({
                roleId: viewAsRole.first.roleId,
                roleName: viewAsRole.first.roleName,
                contextCompanyName: viewAsRole.first.contextCompanyName,
                ownerCompanyId: viewAsRole.first.ownerCompanyId,
                ownerCompanyName: viewAsRole.first.ownerCompanyName,
                isCustom: viewAsRole.first.isCustom,
                canAssign: viewAsRole.first.canAssign,
                isAssigned: viewAsRole.first.isAssigned,
                permissions: viewAsRole
                    .items
                    .filter(x => x.permissionId !== null)
                    .map((viewAsPerm): PermissionListDTO => ({
                        id: viewAsPerm.permissionId,
                        code: viewAsPerm.permissionCode,
                        scope: 'COMPANY' // not used 
                    }))
            }));
    }

    async getUserRolesAsync(principalId: PrincipalId, userId: number) {

        const roles = await this._ormService
            .query(UserRoleView, { userId })
            .where('assigneeUserId', '=', 'userId')
            .getMany();

        const rg = roles
            .groupBy(x => `${x.roleId}${x.contextCompanyId}${x.assignmentBridgeId}${x.assigneeUserId}`);

        return rg
            .map((x): UserRoleDTO => ({
                ...(x.first),
                permissions: x
                    .items
                    .filter(x => x.permissionId !== null)
                    .map((x): PermissionListDTO => ({
                        id: x.permissionId,
                        code: x.permissionCode,
                        scope: 'COMPANY' // not used 
                    }))
            }));
    }

    async getUserPermissionsAsync(principalId: PrincipalId, userId: number) {

        const roles = await this._ormService
            .query(UserPermissionView, { userId })
            .where('assigneeUserId', '=', 'userId')
            .getMany();

        return roles
            .map((x): UserPermissionDTO => ({
                assigneeUserId: x.assigneeUserId,
                contextCompanyId: x.contextCompanyId,
                contextCompanyName: x.contextCompanyName,
                contextCourseId: x.contextCourseId,
                contextCourseName: x.contextCourseName,
                permissionId: x.permissionId,
                permissionCode: x.permissionCode,
                permissionAssignmentBridgeId: x.assignmentBridgeId,
                parentRoleId: x.parentRoleId,
                parentRoleName: x.parentRoleName
            }));
    }

    async saveUserAssignedAuthItemsAsync(
        principalId: PrincipalId,
        savedUserId: number,
        rolesChangeSet: ChangeSet<UserRoleDTO>,
        permissionsChangeSet: ChangeSet<UserPermissionDTO>) {

        // TODO authorize userId
        console.log('TODO Auth: ' + principalId);

        // save roles 
        await this._saveRolesAsync(
            principalId,
            savedUserId,
            rolesChangeSet);

        // save permissions
        await this._savePermissionsAsync(
            savedUserId,
            permissionsChangeSet);
    }

    async _saveRolesAsync(principalId: PrincipalId, savedUserId: number, assignedRoles: ChangeSet<UserRoleDTO>) {

        // TODO validation

        // ASSIGN
        const newBridges = assignedRoles
            .newItems
            .map(userRole => instatiateInsertEntity<RoleAssignmentBridge>({
                roleId: userRole.roleId,
                assigneeCompanyId: null,
                assigneeUserId: userRole.assigneeUserId,
                contextCompanyId: userRole.contextCompanyId,
            }));

        await this._ormService
            .createManyAsync(RoleAssignmentBridge, newBridges);

        // DEASSING
        const roleBridgeIdsToDeassign = assignedRoles
            .deletedItems
            .map(x => x.assignmentBridgeId);

        await this._ormService
            .hardDelete(RoleAssignmentBridge, roleBridgeIdsToDeassign);
    }

    async _savePermissionsAsync(
        savedUserId: number,
        changeset: ChangeSet<UserPermissionDTO>) {

        // DEASSIGN
        const idsToDeassign = changeset
            .deletedItems
            .filter(x => !!x.permissionAssignmentBridgeId)
            .map(x => x.permissionAssignmentBridgeId!);

        await this._ormService
            .hardDelete(PermissionAssignmentBridge, idsToDeassign);

        // ASSIGN
        const permBridges = changeset
            .newItems
            .map((x): PermissionAssignmentBridge => instatiateInsertEntity({
                assigneeUserId: savedUserId,
                assigneeCompanyId: null,
                assigneeGroupId: null,
                contextCompanyId: x.contextCompanyId,
                contextCourseId: x.contextCourseId,
                permissionId: x.permissionId
            }));

        await this._ormService
            .createManyAsync(PermissionAssignmentBridge, permBridges);
    }

    async createRoleAsync(principalId: PrincipalId, dto: RoleCreateDTO) {

        const userId = principalId.toSQLValue();

        // create role
        const role = await this.createAsync(instatiateInsertEntity<Role>({
            name: dto.name,
            companyId: dto.companyId,
            isCustom: dto.isCustom,
            deletionDate: null
        }));

        // create permission assignments 
        const permAssignemnts = dto
            .permissionIds
            .map(x => ({
                permissionId: x,
                roleId: role.id
            } as RolePermissionBridge));

        await this._ormService
            .save(RolePermissionBridge, permAssignemnts);
    }

    async getRoleEditDataAsync(principalId: PrincipalId, roleId: number): Promise<RoleEditDTO> {

        const userId = principalId.toSQLValue();

        type ResultType = {
            roleId: number,
            roleName: string,
            permissionId: number,
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
            throw new VerboseError('forbidden');

        const group = roles
            .groupBy(x => x.roleId)
            .single(x => true);

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
    }

    async deleteRoleAsync(principalId: PrincipalId, roleId: number) {

        const userId = principalId.toSQLValue();

        await this._ormService
            .softDelete(Role, [roleId]);
    }

    async saveRoleAsync(principalId: PrincipalId, dto: RoleEditDTO) {

        const userId = principalId.toSQLValue();

        // save role
        const role = await this._ormService
            .query(Role, { roleId: dto.roleId })
            .where('id', '=', 'roleId')
            .getSingle();

        await this._ormService
            .save(Role, [
                noUndefined({
                    id: role.id,
                    name: dto.name,
                    ownerCompanyId: dto.companyId
                })
            ]);

        // save role permission bridges
        await this._ormService
            .getRepository(RolePermissionBridge)
            .createQueryBuilder()
            .delete()
            .from(RolePermissionBridge)
            .where('roleId = :roleId', { roleId: dto.roleId })
            .execute();

        await this._ormService
            .save(RolePermissionBridge, dto
                .permissionIds
                .map(x => ({
                    permissionId: x,
                    roleId: dto.roleId
                })));
    }
}