import { Role } from '../models/entity/authorization/Role';
import { RolePermissionBridge } from '../models/entity/authorization/RolePermissionBridge';
import { AssignablePermissionAndRoleView } from '../models/views/AssignablePermissionAndRoleView';
import { RoleListView } from '../models/views/RoleListView';
import { UserAssignedAuthItemView } from '../models/views/UserAssignedAuthItemView';
import { UserPermissionView } from '../models/views/UserPermissionView';
import { AssignablePermissionAndRoleDTO } from '../shared/dtos/AssignablePermissionAndRoleDTO';
import { PermissionListDTO } from '../shared/dtos/role/PermissionListDTO';
import { RoleAdminListDTO } from '../shared/dtos/role/RoleAdminListDTO';
import { RoleCreateDTO } from '../shared/dtos/role/RoleCreateDTO';
import { RoleEditDTO } from '../shared/dtos/role/RoleEditDTO';
import { UserAssignedAuthItemDTO } from '../shared/dtos/role/UserAssignedAuthItemDTO';
import { noUndefined } from '../shared/logic/sharedLogic';
import { PermissionCodeType, RoleScopeType } from '../shared/types/sharedTypes';
import { VerboseError } from '../shared/types/VerboseError';
import { createAsMinimal, MinimalEntity } from '../utilities/misc';
import { MapperService } from './MapperService';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class RoleService extends QueryServiceBase<Role> {

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService) {

        super(mapperService, ormService, Role);
    }

    async getRolesListAdminAsync(userId: number) {

        const roles = await this._ormService
            .query(RoleListView, { userId })
            .where('userId', '=', 'userId')
            .getMany();

        return roles
            .groupBy(x => x.roleId)
            .map((grouping): RoleAdminListDTO => {

                const viewAsRole = grouping.first;

                return {
                    roleId: viewAsRole.roleId,
                    roleName: viewAsRole.roleName,
                    roleScope: viewAsRole.roleScope,
                    ownerName: viewAsRole.ownerName,
                    ownerType: viewAsRole.isCompanyOwned ? 'company' : 'user',
                    companyId: viewAsRole.companyId,
                    companyName: viewAsRole.companyName,
                    permissions: grouping
                        .items
                        .map((viewAsPermission): PermissionListDTO => ({
                            code: viewAsPermission.permissionCode,
                            id: viewAsPermission.permissionId,
                            scope: 'GLOBAL' // not used 
                        }))
                };
            });
    }

    async getAvailablePermissionsAndRolesAsync(userId: number, companyId: number) {

        const rolesAndPermissions = await this._ormService
            .query(AssignablePermissionAndRoleView, { userId, companyId })
            .where('userId', '=', 'userId')
            .and('contextCompanyId', '=', 'companyId')
            .getMany();

        return rolesAndPermissions
            .map((x): AssignablePermissionAndRoleDTO => ({
                ...x,
                isRole: !!x.roleId
            }));
    }

    async getUserAssignedAuthItemsAsync(userId: number, authItemUserId: number) {

        // TODO check permissions of userId

        const views = await this._ormService
            .query(UserAssignedAuthItemView, { authItemUserId })
            .where('userId', '=', 'authItemUserId')
            .getMany();

        return views
            .map((x): UserAssignedAuthItemDTO => ({
                isRole: x.isRole,
                id: x.isRole ? x.roleId! : x.permissionId!
            }));
    }

    async getUserPermissionsAsync(userId: number): Promise<PermissionListDTO[]> {

        return [];
    }

    async createRoleAsync(userId: number, dto: RoleCreateDTO) {

        const role = createAsMinimal<Role>({
            name: dto.name,
            companyId: dto.companyId,
            scope: 'COMPANY'
        });

        // create role
        await this.createAsync(role);

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

    async getRoleEditDataAsync(userId: number, roleId: number): Promise<RoleEditDTO> {

        type ResultType = {
            roleId: number,
            roleName: string,
            permissionId: number,
            companyId: Role['companyId'],
            scope: Role['scope']
        }

        const roles = await this._ormService
            .withResType<ResultType>()
            .query(Role, {
                userId,
                roleId,
                editCoCode: 'EDIT_COMPANY_ROLES' as PermissionCodeType,
                editGlobCode: 'EDIT_GLOBAL_ROLES' as PermissionCodeType
            })
            .selectFrom(x => x
                .columns(Role, {
                    roleId: 'id',
                    roleName: 'name',
                    companyId: 'companyId',
                    scope: 'scope'
                })
                .columns(RolePermissionBridge, {
                    permissionId: 'permissionId'
                }))
            .innerJoin(UserPermissionView, x => x
                .on('userId', '=', 'userId')
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

        const viewAsRole = group.first;

        return {
            roleId: viewAsRole.roleId,
            name: viewAsRole.roleName,
            companyId: viewAsRole.companyId,
            scope: viewAsRole.scope,
            permissionIds: group
                .items
                .map(x => x.permissionId)
        };
    }

    async deleteRoleAsync(userId: number, roleId: number) {

        await this._ormService
            .softDelete(Role, [roleId]);
    }

    async saveRoleAsync(userId: number, dto: RoleEditDTO) {

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
                    ownerCompanyId: role.scope === 'GLOBAL'
                        ? undefined
                        : dto.companyId
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