import { Permission } from '../models/entity/authorization/Permission';
import { UserPermissionView } from '../models/views/UserPermissionView';
import { PermissionCodeType } from '../shared/types/sharedTypes';
import { ErrorCode } from '../utilities/helpers';
import { MapperService } from './MapperService';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class PermissionService extends QueryServiceBase<Permission> {

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService) {

        super(mapperService, ormService, Permission);
    }

    async checkPermissionAsync(userId: number, companyId: number, permissionsCode: PermissionCodeType) {

        const hasPermission = await this.hasPermissionAsync(userId, companyId, permissionsCode);
        if (!hasPermission)
            throw new ErrorCode('User has no permission to access resource.', 'no permission');
    }

    async hasPermissionAsync(userId: number, companyId: number, permissionsCode: PermissionCodeType) {

        const permission = await this
            ._ormService
            .query(UserPermissionView, { userId, companyId, permissionsCode })
            .where('userId', '=', 'userId')
            .and('companyId', '=', 'companyId')
            .and('permissionCode', '=', 'permissionsCode')
            .getOneOrNull();

        return !!permission;
    }
}