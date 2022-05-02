import { Role } from '../models/entity/authorization/Role';
import { RoleAssignmentBridge } from '../models/entity/authorization/RoleAssignmentBridge';
import { RoleListView } from '../models/views/RoleListView';
import { PermissionListDTO } from '../shared/dtos/role/PermissionListDTO';
import { RoleAdminListDTO } from '../shared/dtos/role/RoleAdminListDTO';
import { RoleCreateDTO } from '../shared/dtos/role/RoleCreateDTO';
import { noUndefined } from '../shared/logic/sharedLogic';
import { PermissionCodeType } from '../shared/types/sharedTypes';
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
        } as Role;

        // create role
        await this.createAsync(role);

        // create owner assingnment 
        // await this._ormService
        //     .create(RoleAssignmentBridge, noUndefined<RoleAssignmentBridge>({
        //         roleId: role.id,
        //         userId: userId,
        //         contextCompanyId: dto.contextCompanyId
        //     }));
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