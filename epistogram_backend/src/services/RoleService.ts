import { Role } from '../models/entity/authorization/Role';
import { RoleAssignmentBridge } from '../models/entity/authorization/RoleAssignmentBridge';
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
            .query(Role)
            .getMany();

        return this._mapperService
            .mapMany(Role, RoleAdminListDTO, roles);
    }

    async getUserRoles(userId: number) {

        // this._ormService
        //     .query(Role)
    }

    async getUserPermissionsAsync(userId: number): Promise<PermissionListDTO[]> {

        return [];
    }

    async findPermissionAsync(userId: number, companyId: number, permissionsCode: PermissionCodeType) {

        const permissions = await this
            .getUserPermissionsAsync(userId);

        return permissions
            .any(x => x.code === permissionsCode && x.companyId === companyId);
    }

    // async getRoleEditDataAsync(roleId: number) {

    //     const comp = await this._ormService
    //         .query(Role, { roleId })
    //         .where('id', '=', 'roleId')
    //         .getSingle();

    //     return this._mapperService
    //         .map(Role, RoleEditDataDTO, comp);
    // }

    async createRoleAsync(dto: RoleCreateDTO) {

        const role = {
            name: dto.name,
        } as Role;

        // create role
        await this.createAsync(role);

        // create owner assingnment 
        await this._ormService
            .create(RoleAssignmentBridge, noUndefined<RoleAssignmentBridge>({
                roleId: role.id,
                userId: dto.ownerUserId,
                companyId: dto.ownerCompanyId,
            }));
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