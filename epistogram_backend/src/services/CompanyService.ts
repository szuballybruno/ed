import { UploadedFile } from 'express-fileupload';
import { Company } from '../models/entity/misc/Company';
import { CourseAccessBridge } from '../models/entity/misc/CourseAccessBridge';
import { StorageFile } from '../models/entity/misc/StorageFile';
import { User } from '../models/entity/misc/User';
import { CompanyAssociatedCoursesView } from '../models/views/CompanyAssociatedCoursesView';
import { CompanyView } from '../models/views/CompanyView';
import { UserPermissionView } from '../models/views/UserPermissionView';
import { UserRoleAssignCompanyView } from '../models/views/UserRoleAssignCompanyView';
import { CompanyAssociatedCourseDTO } from '../shared/dtos/company/CompanyAssociatedCourseDTO';
import { CompanyDTO } from '../shared/dtos/company/CompanyDTO';
import { CompanyEditDataDTO } from '../shared/dtos/company/CompanyEditDataDTO';
import { CompanyPublicDTO } from '../shared/dtos/company/CompanyPublicDTO';
import { RoleAssignCompanyDTO } from '../shared/dtos/company/RoleAssignCompanyDTO';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { PermissionCodeType } from '../shared/types/sharedTypes';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { AuthorizationService } from './AuthorizationService';
import { DomainProviderService } from './DomainProviderService';
import { FileService } from './FileService';
import { MapperService } from './MapperService';
import { XMutatorHelpers } from './misc/XMutatorHelpers';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class CompanyService {

    constructor(
        private _ormService: ORMConnectionService,
        private _mapperService: MapperService,
        private _authorizationService: AuthorizationService,
        private _domainProviderService: DomainProviderService,
        private _fileService: FileService) {
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
            .filter(x => x.domain && this
                ._domainProviderService
                .applyTemplate(x.domain) === domain);

        const result = mapped
            .firstOrNull();

        if (!result)
            throw new Error('Domain is unrecognised, no company found pointing to it.');

        return result;
    }

    /**
     * Get companies for role assign list 
     */
    async getRoleAssignCompaniesAsync(principalId: PrincipalId) {

        await this._authorizationService
            .checkPermissionAsync(principalId, 'CREATE_COMPANIES');

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

    /**
     * Get new role companies list 
     */
    async getAvailableCompaniesForNewRolesAsync(principalId: PrincipalId) {

        await this._authorizationService
            .checkPermissionAsync(principalId, 'CREATE_COMPANIES');

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
    }

    /**
     * Get edit data
     */
    async getCompanyEditDataAsync(principalId: PrincipalId, companyId: Id<'Company'>) {

        await this._authorizationService
            .checkPermissionAsync(principalId, 'EDIT_COMPANY', { companyId });

        const comp = await this._ormService
            .withResType<Company>()
            .query(Company, { companyId })
            .where('id', '=', 'companyId')
            .getSingle();

        const logoFile = comp.logoFileId
            ? await this
                ._ormService
                .getSingleById(StorageFile, comp.logoFileId)
            : null;

        const coverFile = comp.coverFileId
            ? await this
                ._ormService
                .getSingleById(StorageFile, comp.coverFileId)
            : null;

        return this._mapperService
            .mapTo(CompanyEditDataDTO, [
                comp,
                logoFile?.filePath ?? null,
                coverFile?.filePath ?? null
            ]);
    }

    /**
     * Create new company 
     */
    async createCompanyAsync(principalId: PrincipalId) {

        await this._authorizationService
            .checkPermissionAsync(principalId, 'CREATE_COMPANIES');

        await this._ormService
            .createAsync(Company, {
                name: 'New company',
                deletionDate: null,
                domain: '',
                backdropColor: null,
                coverFileId: null,
                legalName: null,
                isCustomDomainCompany: false,
                logoFileId: null,
                primaryColor: null,
                secondaryColor: null
            });
    }

    /**
     * Delete company 
     */
    async deleteCompanyAsync(principalId: PrincipalId, companyId: Id<'Company'>) {

        await this._authorizationService
            .checkPermissionAsync(principalId, 'DELETE_COMPANIES');

        await this._ormService
            .softDelete(Company, [companyId]);
    }

    /**
     * Save updated company 
     */
    async saveCompanyAsync(
        principalId: PrincipalId,
        dto: CompanyEditDataDTO,
        logoFile: UploadedFile | null,
        coverFile: UploadedFile | null) {

        await this._authorizationService
            .checkPermissionAsync(principalId, 'EDIT_COMPANY', { companyId: dto.id });

        if (logoFile)
            await this
                ._fileService
                .uploadAssigendFileAsync({
                    entitySignature: Company,
                    entityId: dto.id,
                    fileBuffer: logoFile.data,
                    fileCode: 'company_logo',
                    storageFileIdField: 'logoFileId'
                });

        if (coverFile)
            await this
                ._fileService
                .uploadAssigendFileAsync({
                    entitySignature: Company,
                    entityId: dto.id,
                    fileBuffer: coverFile.data,
                    fileCode: 'company_cover',
                    storageFileIdField: 'coverFileId'
                });

        await this._ormService
            .save(Company, {
                id: dto.id,
                name: dto.name,
                legalName: dto.legalName,
                domain: dto.domain,
                backdropColor: dto.backdropColor,
                primaryColor: dto.primaryColor,
                secondaryColor: dto.secondaryColor,
            });
    }

    /**
     * getCompanyDetailsByDomainAsync
     */
    async getCompanyDetailsByDomainAsync(domain: string) {

        const comps = await this
            ._ormService
            .query(Company)
            .getMany();

        const comp = comps
            .firstOrNull(x => this
                ._domainProviderService
                .applyTemplate(x.domain) === domain);

        if (!comp)
            return null;

        const logoFile = comp.logoFileId
            ? await this
                ._ormService
                .getSingleById(StorageFile, comp.logoFileId)
            : null;

        const coverFile = comp.coverFileId
            ? await this
                ._ormService
                .getSingleById(StorageFile, comp.coverFileId)
            : null;

        return this
            ._mapperService
            .mapTo(CompanyPublicDTO, [comp, logoFile?.filePath ?? null, coverFile?.filePath ?? null]);
    }

    /**
     * Get company associated courses 
     */
    async getCompanyAssociatedCoursesAsync(companyId: Id<'Company'>): Promise<CompanyAssociatedCourseDTO[]> {

        const views = await this
            ._ormService
            .query(CompanyAssociatedCoursesView, { companyId })
            .where('companyId', '=', 'companyId')
            .getMany();

        return this
            ._mapperService
            .mapTo(CompanyAssociatedCourseDTO, [views]);
    }

    /**
     * Get company associated courses 
     */
    async saveCompanyAssociatedCoursesAsync(companyId: Id<'Company'>, mutations: Mutation<CompanyAssociatedCourseDTO, 'courseId'>[]): Promise<void> {

        // delete bridges 
        const deassignedCourseIds = XMutatorHelpers
            .filterByFieldMutaitonKeyValue(mutations, 'isAssociated', false)
            .map(x => x.key);

        const deletedBridges = await this
            ._ormService
            .query(CourseAccessBridge, { companyId, deassignedCourseIds })
            .where('companyId', '=', 'companyId')
            .and('courseId', '=', 'deassignedCourseIds')
            .getMany();

        await this
            ._ormService
            .hardDelete(CourseAccessBridge, deletedBridges.map(x => x.id));

        // added bridges 
        const assignedCourseIds = XMutatorHelpers
            .filterByFieldMutaitonKeyValue(mutations, 'isAssociated', true)
            .map(x => x.key);

        await this
            ._ormService
            .createManyAsync(CourseAccessBridge, assignedCourseIds
                .map(assignedCourseId => ({
                    companyId,
                    userId: null,
                    courseId: assignedCourseId
                })));
    }
}