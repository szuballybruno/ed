import { Company } from '../models/entity/Company';
import { CompanyEditDataDTO } from '../shared/dtos/company/CompanyEditDataDTO';
import { CompanyDTO } from '../shared/dtos/company/CompanyDTO';
import { MapperService } from './MapperService';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { CompanyView } from '../models/views/CompanyView';
import { User } from '../models/entity/User';
import { UserPermissionView } from '../models/views/UserPermissionView';
import { PermissionCodeType } from '../shared/types/sharedTypes';
import { PrincipalId } from '../utilities/ActionParams';
import { PermissionService } from './PermissionService';
import { UserRoleAssignCompanyView } from '../models/views/UserRoleAssignCompanyView';
import { RoleAssignCompanyDTO } from '../shared/dtos/company/RoleAssignCompanyDTO';

export class CompanyService extends QueryServiceBase<Company> {

    private _permissionService: PermissionService;

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService,
        permissionService: PermissionService) {

        super(mapperService, ormService, Company);

        this._permissionService = permissionService;
    }

    async getPrincipalCompaniesAsync(principalId: PrincipalId) {

        const companies = await this._ormService
            .query(CompanyView, { principalId })
            .where('userId', '=', 'principalId')
            .getMany();

        return this._mapperService
            .mapMany(CompanyView, CompanyDTO, companies);
    }

    async getCompaniesAdminAsync(userId: PrincipalId) {

        const companies = await this._ormService
            .query(CompanyView, { userId })
            .where('userId', '=', 'userId')
            .getMany();

        return this._mapperService
            .mapMany(CompanyView, CompanyDTO, companies);
    }

    async getRoleAssignCompaniesAsync(principalId: PrincipalId) {

        const comapanies = await this
            ._ormService
            .query(UserRoleAssignCompanyView, { principalId })
            .where('userId', '=', 'principalId')
            .getMany();

        return comapanies
            .map((x): RoleAssignCompanyDTO => ({
                name: x.companyName,
                id: x.companyId,
                canAssignRole: x.canAssign
            }));
    }

    async getAvailableCompaniesForNewRolesAsync(userId: PrincipalId) {

        const companies = await this._ormService
            .query(Company, {
                userId,
                permissionCode: 'ASSIGN_CUSTOM_ROLES' as PermissionCodeType
            })
            .select(Company)
            .innerJoin(User, builder => builder
                .on('id', '=', 'userId'))
            .innerJoin(UserPermissionView, builder => builder
                .on('assigneeUserId', '=', 'id', User)
                .and('permissionCode', '=', 'permissionCode')
                .and('contextCompanyId', '=', 'id', Company))
            .getMany();

        return this._mapperService
            .mapMany(Company, CompanyDTO, companies);
    }

    async getCompanyEditDataAsync(principalId: PrincipalId, companyId: number) {

        await this._permissionService
            .checkPermissionAsync(principalId, companyId, 'EDIT_COMPANY');

        const comp = await this._ormService
            .query(Company, { companyId })
            .where('id', '=', 'companyId')
            .getSingle();

        return this._mapperService
            .map(Company, CompanyEditDataDTO, comp);
    }

    async createCompanyAsync(principalId: PrincipalId) {

        await this._permissionService
            .checkPermissionAsync(principalId, 'CREATE_COMPANIES');

        await this.createAsync({
            name: 'New company'
        });
    }

    async deleteCompanyAsync(principalId: PrincipalId, companyId: number) {

        await this._permissionService
            .checkPermissionAsync(principalId, 'DELETE_COMPANIES');

        await this._ormService
            .softDelete(Company, [companyId]);
    }

    async saveCompanyAsync(principalId: PrincipalId, dto: CompanyEditDataDTO) {

        await this._ormService
            .save(Company, [
                {
                    id: dto.id,
                    name: dto.name
                }
            ]);
    }
}