import { Role } from '../models/entity/authorization/Role';
import { RolePermissionBridge } from '../models/entity/authorization/RolePermissionBridge';
import { RoleListView } from '../models/views/RoleListView';
import { UserPermissionView } from '../models/views/UserPermissionView';
import { PermissionListDTO } from '../shared/dtos/role/PermissionListDTO';
import { RoleAdminListDTO } from '../shared/dtos/role/RoleAdminListDTO';
import { RoleCreateDTO } from '../shared/dtos/role/RoleCreateDTO';
import { RoleEditDTO } from '../shared/dtos/role/RoleEditDTO';
import { PermissionCodeType } from '../shared/types/sharedTypes';
import { VerboseError } from '../shared/types/VerboseError';
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
                    ownerName: viewAsRole.ownerName,
                    ownerType: viewAsRole.isCompanyOwned ? 'company' : 'user',
                    companyId: viewAsRole.companyId,
                    companyName: viewAsRole.companyName,
                    permissions: grouping
                        .items
                        .map(x => ({
                            code: x.permissionCode,
                            id: x.permissionId,
                            isGlobal: false
                        }))
                };
            });
    }

    async getUserPermissionsAsync(userId: number): Promise<PermissionListDTO[]> {

        return [];
    }

    // async getRoleEditDataAsync(roleId: number) {

    //     const comp = await this._ormService
    //         .query(Role, { roleId })
    //         .where('id', '=', 'roleId')
    //         .getSingle();

    //     return this._mapperService
    //         .map(Role, RoleEditDataDTO, comp);
    // }

    async createRoleAsync(userId: number, dto: RoleCreateDTO) {

        const role = {
            name: dto.name,
            ownerCompanyId: dto.ownerCompanyId
        } as Role;

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

    async getRoleEditDataAsync(userId: number, roleId: number) {

        type ResultType = {
            roleId: number,
            roleName: string,
            permissionId: number,
            ownerCompanyId: number
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
                    ownerCompanyId: 'ownerCompanyId'
                })
                .columns(RolePermissionBridge, {
                    permissionId: 'permissionId'
                }))
            .innerJoin(UserPermissionView, x => x
                .on('userId', '=', 'userId')
                .openBracket()
                .and('contextCompanyId', '=', 'ownerCompanyId', Role)
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
            name: viewAsRole.roleName,
            ownerCompanyId: viewAsRole.ownerCompanyId,
            permissionIds: group
                .items
                .map(x => x.permissionId)
        } as RoleEditDTO;
    }

    async deleteRoleAsync(roleId: number) {

        await this._ormService
            .softDelete(Role, [roleId]);
    }

    // async saveRoleAsync(dto: RoleEditDataDTO) {

    //     await this._ormService
    //         .save(Role, [
    //             {
    //                 id: dto.id,
    //                 name: dto.name
    //             }
    //         ]);
    // }
}