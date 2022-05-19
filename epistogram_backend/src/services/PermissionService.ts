import { Permission } from '../models/entity/authorization/Permission';
import { UserPermissionView } from '../models/views/UserPermissionView';
import { PermissionListDTO } from '../shared/dtos/role/PermissionListDTO';
import { PermissionMatrixDTO } from '../shared/dtos/role/PermissionMatrixDTO';
import { PermissionCodeType } from '../shared/types/sharedTypes';
import { VerboseError } from '../shared/types/VerboseError';
import { PrincipalId } from '../utilities/ActionParams';
import { MapperService } from './MapperService';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class PermissionService extends QueryServiceBase<Permission> {

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService) {

        super(mapperService, ormService, Permission);
    }
    async checkPermissionAsync(userId: PrincipalId, permissionsCode: PermissionCodeType): Promise<void>;
    async checkPermissionAsync(userId: PrincipalId, companyId: number, permissionsCode: PermissionCodeType): Promise<void>;
    async checkPermissionAsync(userId: PrincipalId, companyId_or_permissionCode: number | PermissionCodeType, permissionsCodeOrUndefined?: PermissionCodeType) {

        const companyId = permissionsCodeOrUndefined ? companyId_or_permissionCode as number : null;
        const permissionCode = permissionsCodeOrUndefined ? permissionsCodeOrUndefined : companyId_or_permissionCode as PermissionCodeType;

        const hasPermission = await this.hasPermissionAsync(userId.toSQLValue(), companyId, permissionCode);
        if (!hasPermission)
            throw new VerboseError('User has no permission to access resource.', 'no permission');
    }

    async getPermissionMatrixAsync(userId: number, contextCompanyId: number) {

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

    async hasPermissionAsync(userId: number, companyId: number | null, permissionsCode: PermissionCodeType) {

        const permission = await this
            ._ormService
            .query(UserPermissionView, { userId, companyId, permissionsCode })
            .where('assigneeUserId', '=', 'userId')
            .and('contextCompanyId', '=', 'companyId')
            .and('permissionCode', '=', 'permissionsCode')
            .getOneOrNull();

        return !!permission;
    }

    async getPermissionsAsync() {

        const permissions = await this
            ._ormService
            .query(Permission)
            .getMany();

        return this._mapperService
            .mapMany(Permission, PermissionListDTO, permissions);
    }
}