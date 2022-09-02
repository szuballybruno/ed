import { Company } from '../models/entity/Company';
import { User } from '../models/entity/User';
import { CompanyView } from '../models/views/CompanyView';
import { UserPermissionView } from '../models/views/UserPermissionView';
import { UserRoleAssignCompanyView } from '../models/views/UserRoleAssignCompanyView';
import { CompanyDTO } from '../shared/dtos/company/CompanyDTO';
import { CompanyEditDataDTO } from '../shared/dtos/company/CompanyEditDataDTO';
import { RoleAssignCompanyDTO } from '../shared/dtos/company/RoleAssignCompanyDTO';
import { PermissionCodeType } from '../shared/types/sharedTypes';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { AuthorizationService } from './AuthorizationService';
import { DomainProviderService } from './DomainProviderService';
import { MapperService } from './MapperService';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class CompanyService extends QueryServiceBase<Company> {

    private _authorizationService: AuthorizationService;

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService,
        private _authoirzationService: AuthorizationService,
        private _domainProviderService: DomainProviderService) {

        super(mapperService, ormService, Company);
    }

    /**
     * TODO
     * Does something wtf is this?
     */
    async getPrincipalCompaniesAsync(principalId: PrincipalId) {

        const companies = await this._ormService
            .query(CompanyView, { principalId })
            .where('userId', '=', 'principalId')
            .getMany();

        return this._mapperService
            .mapTo(CompanyDTO, [companies]);
    }

    /**
     * Returns the admin companies list  
     */
    async getCompaniesAdminAsync(principalId: PrincipalId) {

        await this._authorizationService
            .checkPermissionAsync(principalId, 'CREATE_COMPANIES');

        const companies = await this._ormService
            .query(CompanyView, { principalId })
            .where('userId', '=', 'principalId')
            .getMany();

        return this._mapperService
            .mapTo(CompanyDTO, [companies]);
    }

    /**
     * Returns a comapny by domain
     */
    async getCompanyByDomainAsync(domain: string) {

        const companies = await this
            ._ormService
            .query(Company)
            .getMany();

        const mapped = companies
            .filter(x => this
                ._domainProviderService
                .applyTemplate(x.domain) === domain);

        const result = mapped
            .firstOrNull();

        if (!result)
            throw new Error('Domain is unrecognised, no company found pointing to it.');

        return result;
    }

    getRoleAssignCompaniesAsync(principalId: PrincipalId) {

        return {
            action: async () => {
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
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'CREATE_COMPANIES');
            }
        };


    }

    getAvailableCompaniesForNewRolesAsync(principalId: PrincipalId) {

        return {
            action: async () => {
                const permissionCode: PermissionCodeType = 'ASSIGN_CUSTOM_ROLES';

                const companies = await this._ormService
                    .query(Company, { principalId, permissionCode })
                    .select(Company)
                    .innerJoin(User, builder => builder
                        .on('id', '=', 'principalId'))
                    .innerJoin(UserPermissionView, builder => builder
                        .on('assigneeUserId', '=', 'id', User)
                        .and('permissionCode', '=', 'permissionCode')
                        .and('contextCompanyId', '=', 'id', Company))
                    .getMany();

                return this._mapperService
                    .mapTo(CompanyDTO, [companies]);
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'CREATE_COMPANIES');
            }
        };


    }

    getCompanyEditDataAsync(principalId: PrincipalId, companyId: Id<'Company'>) {

        return {
            action: async () => {

                const comp = await this._ormService
                    .query(Company, { companyId })
                    .where('id', '=', 'companyId')
                    .getSingle();

                return this._mapperService
                    .mapTo(CompanyEditDataDTO, [comp]);
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'EDIT_COMPANY', { companyId });
            }
        };


    }

    createCompanyAsync(principalId: PrincipalId) {

        return {
            action: async () => {

                await this._ormService
                    .createAsync(Company, {
                        name: 'New company',
                        deletionDate: null,
                        domain: ''
                    });
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'CREATE_COMPANIES');
            }
        };


    }

    deleteCompanyAsync(principalId: PrincipalId, companyId: Id<'Company'>) {

        return {
            action: async () => {

                await this._ormService
                    .softDelete(Company, [companyId]);
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'DELETE_COMPANIES');
            }
        };


    }

    saveCompanyAsync(principalId: PrincipalId, dto: CompanyEditDataDTO) {

        return {
            action: async () => {
                await this._ormService
                    .save(Company, {
                        id: dto.id,
                        name: dto.name
                    });
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'EDIT_COMPANY', { companyId: dto.id });
            }
        };
    }
}