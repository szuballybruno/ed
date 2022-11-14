import { UploadedFile } from 'express-fileupload';
import { Permission } from '../models/entity/authorization/Permission';
import { PermissionAssignmentBridge } from '../models/entity/authorization/PermissionAssignmentBridge';
import { Company } from '../models/entity/misc/Company';
import { CourseAccessBridge } from '../models/entity/misc/CourseAccessBridge';
import { StorageFile } from '../models/entity/misc/StorageFile';
import { User } from '../models/entity/misc/User';
import { CompanyAssociatedCoursesView } from '../models/views/CompanyAssociatedCoursesView';
import { CompanyView } from '../models/views/CompanyView';
import { UserPermissionView } from '../models/views/UserPermissionView';
import { UserRoleAssignCompanyView } from '../models/views/UserRoleAssignCompanyView';
import { CompanyAssociatedCourseDTO } from '@episto/communication';
import { CompanyDTO } from '@episto/communication';
import { CompanyEditDataDTO } from '@episto/communication';
import { CompanyPublicDTO } from '@episto/communication';
import { RoleAssignCompanyDTO } from '@episto/communication';
import { Mutation } from '@episto/communication';
import { ErrorWithCode } from '@episto/commontypes';
import { PermissionCodeType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { InsertEntity } from '../utilities/misc';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { ActivationCodeService } from './ActivationCodeService';
import { AuthorizationService } from './AuthorizationService';
import { DomainProviderService } from './DomainProviderService';
import { FileService } from './FileService';
import { MapperService } from './MapperService';
import { ClassType } from './misc/advancedTypes/ClassType';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { XDBMSchemaService } from './XDBManager/XDBManagerTypes';
import { throwNotImplemented } from '../utilities/helpers';

export class CompanyService {

    constructor(
        private _ormService: ORMConnectionService,
        private _mapperService: MapperService,
        private _authorizationService: AuthorizationService,
        private _domainProviderService: DomainProviderService,
        private _fileService: FileService,
        private _schema: XDBMSchemaService,
        private _activationCodeService: ActivationCodeService) {
    }

    /**
     * Get all companies accessable by principal
     * these are used in a dropdown in admin,
     * tho select the active company, the principal is viewing. 
     * Non admin users useually should have only one (their) company available 
     * to them.
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
     * Get principal's company id  
     */
    async getPrincipalCompanyId(principalId: PrincipalId): Promise<Id<'Company'>> {

        const user = await this._ormService
            .query(User, { principalId })
            .where('id', '=', 'principalId')
            .getOneOrNull();

        if (!user)
            throw new ErrorWithCode('internal server error');

        return user.companyId;
    }

    /**
     * Get company info such as isSurveyRequired etc
     * this is used for user invitation, since it will need to 
     * set user's isSurveyRequired prop to an initial state 
     */
    async getUserInvitationCompanyDataAsync(principalId: PrincipalId) {

        const { isSurveyRequired, id: companyId } = await this
            ._ormService
            .query(Company, { principalId })
            .innerJoin(User, x => x
                .on('companyId', '=', 'id', Company)
                .and('id', '=', 'principalId'))
            .getSingle();

        return { isSurveyRequired, companyId };
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
                secondaryColor: null,
                isSurveyRequired: true
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

        const {
            id: companyId,
            backdropColor,
            domain,
            legalName,
            name,
            primaryColor,
            secondaryColor,
            isSurveyRequired
        } = dto;

        if (logoFile)
            await this
                ._fileService
                .uploadAssigendFileAsync({
                    entitySignature: Company,
                    entityId: companyId,
                    fileBuffer: logoFile.data,
                    fileCode: 'company_logo',
                    storageFileIdField: 'logoFileId'
                });

        if (coverFile)
            await this
                ._fileService
                .uploadAssigendFileAsync({
                    entitySignature: Company,
                    entityId: companyId,
                    fileBuffer: coverFile.data,
                    fileCode: 'company_cover',
                    storageFileIdField: 'coverFileId'
                });

        await this._ormService
            .save(Company, {
                id: companyId,
                name,
                legalName,
                domain,
                backdropColor,
                primaryColor,
                secondaryColor,
                isSurveyRequired
            });

        // set users isSurveyRequired according to company's 
        const userUpdateSet = (await this
            ._ormService
            .query(User, { companyId })
            .where('companyId', '=', 'companyId')
            .getMany())
            .map(x => ({
                id: x.id,
                isSurveyRequired
            } as User));

        await this
            ._ormService
            .save(User, userUpdateSet);
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
            .and('isDeleted', '=', 'false')
            .getMany();

        return this
            ._mapperService
            .mapTo(CompanyAssociatedCourseDTO, [views]);
    }

    /**
     * Get company associated courses 
     */
    async saveCompanyAssociatedCoursesAsync(companyId: Id<'Company'>, mutations: Mutation<CompanyAssociatedCourseDTO, 'courseId'>[]): Promise<void> {

        type ActionType = { id: Id<'Course'>, action: 'DETACH' | 'ATTACH' };

        const handleRelationChangeAsync = async <TBridge extends { id: Id<string> }>({
            bridge,
            createBridge,
            getCourseIdActions,
            getDeletedBridgesAsync
        }: {
            bridge: ClassType<TBridge>,
            getCourseIdActions: () => ActionType[],
            getDeletedBridgesAsync: (courseIds: Id<'Course'>[]) => Promise<TBridge[]>,
            createBridge: (courseId: Id<'Course'>) => InsertEntity<TBridge>
        }) => {

            const actions = getCourseIdActions();

            // delete bridges 
            const deletedBridges = await getDeletedBridgesAsync(actions
                .filter(x => x.action === 'DETACH')
                .map(x => x.id));

            await this
                ._ormService
                .hardDelete(bridge, deletedBridges.map(x => x.id));

            // added bridges 
            const assignedCourseIds = actions
                .filter(x => x.action === 'ATTACH')
                .map(x => x.id);

            await this
                ._ormService
                .createManyAsync(bridge, assignedCourseIds
                    .map(createBridge));
        };

        const assignActions: ActionType[] = mutations
            .filter(mut => mut
                .fieldMutators
                .some(x => x.field === 'isAssociated'))
            .map(mut => ({
                id: mut.key,
                action: mut
                    .fieldMutators
                    .single(x => x.field === 'isAssociated').value ? 'ATTACH' : 'DETACH'
            }));

        /**
         * Save course access bridges according to mutations 
         */
        await handleRelationChangeAsync({
            bridge: CourseAccessBridge,
            getCourseIdActions: () => assignActions,
            getDeletedBridgesAsync: async (courseIds) => await this
                ._ormService
                .query(CourseAccessBridge, { companyId, courseIds })
                .where('companyId', '=', 'companyId')
                .and('courseId', '=', 'courseIds')
                .getMany(),
            createBridge: courseId => ({
                companyId,
                userId: null,
                courseId: courseId
            })
        });

        /**
         * Save permission assignment bridges according to mutations 
         */
        const { id: watchCoursePermissionId } = await this
            ._ormService
            .query(Permission, { code: 'WATCH_COURSE' })
            .where('code', '=', 'code')
            .getSingle();

        const courseAccessBridges = await this._ormService
            .query(CourseAccessBridge, { companyId })
            .where('companyId', '=', 'companyId')
            .getMany();

        const assignedCourseIds = courseAccessBridges
            .map(x => x.courseId);

        const defaultActions: ActionType[] = mutations
            .filter(mut => mut
                .fieldMutators
                .some(x => x.field === 'isDefault'))
            .map(mut => ({
                id: mut.key,
                action: mut
                    .fieldMutators
                    .single(x => x.field === 'isDefault').value && assignedCourseIds.includes(mut.key) ? 'ATTACH' : 'DETACH'
            }));

        await handleRelationChangeAsync({
            bridge: PermissionAssignmentBridge,
            getCourseIdActions: () => assignActions
                .filter(x => x.action === 'DETACH')
                .concat(defaultActions),
            getDeletedBridgesAsync: async (courseIds) => await this
                ._ormService
                .query(PermissionAssignmentBridge, { companyId, courseIds, watchCoursePermissionId })
                .where('assigneeCompanyId', '=', 'companyId')
                .and('contextCourseId', '=', 'courseIds')
                .and('permissionId', '=', 'watchCoursePermissionId')
                .getMany(),
            createBridge: courseId => ({
                assigneeCompanyId: companyId,
                assigneeGroupId: null,
                assigneeUserId: null,
                contextCompanyId: null,
                contextCourseId: courseId,
                permissionId: watchCoursePermissionId
            })
        });
    }
    async createCompanyActivationCodesAsync(activationCodeCount: number, companyId: Id<'Company'>) {

        throw throwNotImplemented();
    }
}