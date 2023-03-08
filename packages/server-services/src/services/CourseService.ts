import { instantiate } from '@episto/commonlogic';
import { CourseVisibilityType, ErrorWithCode, Id, OrderType } from '@episto/commontypes';
import { AvailableCourseDTO, CompanyAssociatedCourseDTO, CourseAdminListItemDTO, CourseBriefData, CourseCategoryDTO, CourseContentAdminDTO, CourseContentItemAdminDTO, CourseDetailsDTO, CourseDetailsEditDataDTO, CourseStartDTO, CreateCourseDTO, GreetingsDataDTO, ModuleEditDTO, Mutation, PlaylistModuleDTO } from '@episto/communication';
import { PrincipalId } from '@thinkhub/x-core';
import { UploadedFile } from 'express-fileupload';
import { CompanyService, PermissionService, TempomatService } from '..';
import { Course } from '../models/tables/Course';
import { CourseData } from '../models/tables/CourseData';
import { CourseVersion } from '../models/tables/CourseVersion';
import { Exam } from '../models/tables/Exam';
import { ExamData } from '../models/tables/ExamData';
import { ExamVersion } from '../models/tables/ExamVersion';
import { CourseAccessBridge } from '../models/tables/CourseAccessBridge';
import { CourseCategory } from '../models/tables/CourseCategory';
import { TeacherInfo } from '../models/tables/TeacherInfo';
import { User } from '../models/tables/User';
import { UserCourseBridge } from '../models/tables/UserCourseBridge';
import { Module } from '../models/tables/Module';
import { ModuleData } from '../models/tables/ModuleData';
import { ModuleVersion } from '../models/tables/ModuleVersion';
import { AvailableCourseView } from '../models/views/AvailableCourseView';
import { CourseAdminContentView } from '../models/views/CourseAdminContentView';
import { CourseAdminDetailedView } from '../models/views/CourseAdminDetailedView';
import { CourseAdminListView } from '../models/views/CourseAdminListView';
import { CourseDetailsView } from '../models/views/CourseDetailsView';
import { LatestCourseVersionView } from '../models/views/LatestCourseVersionView';
import { UserPlaylistView } from '../models/views/UserPlaylistView';
import { filterByProperty, orderByProperty, newNotImplemented } from '../utilities/helpers';
import { VersionMigrationContainer } from '../utilities/misc';
import { AuthorizationService } from './AuthorizationService';
import { FileService } from './FileService';
import { MapperService } from './MapperService';
import { FilesObjectType } from './misc/FilesObjectType';
import { createCharSeparatedList } from './misc/mappings';
import { ModuleService } from './ModuleService';
import { ORMConnectionService } from './ORMConnectionService';
import { PlayerService } from './PlayerService';
import { UserCourseBridgeService } from './UserCourseBridgeService';
import { VersionCreateService } from './VersionCreateService';
import { PermissionAssignmentBridge } from '../models/tables/PermissionAssignmentBridge';
import { Permission } from '../models/tables/Permission';

export class CourseService {

    constructor(
        private _tempomatService: TempomatService,
        private _moduleService: ModuleService,
        private _ormService: ORMConnectionService,
        private _mapperService: MapperService,
        private _fileService: FileService,
        private _userCourseBridgeService: UserCourseBridgeService,
        private _authorizationService: AuthorizationService,
        private _verisonCreateService: VersionCreateService,
        private _companyService: CompanyService,
        private _playerService: PlayerService) {
    }

    /**
     * Returns courses that the principal can use as context
     * when assigning permissions to a user
     */
    async getPermissionAssignCoursesAsync(principalId: PrincipalId, userId: Id<'User'>) {

        // TODO: CourseDataId is not CourseId
        newNotImplemented();
        return Promise.resolve(1 as any);
    }

    /**
     * Reruns a course view
     */
    async getCourseViewAsync(userId: Id<'User'>, courseId: Id<'Course'>) {

        const view = await this._ormService
            .query(AvailableCourseView, { courseId, userId })
            .where('courseId', '=', 'courseId')
            .and('userId', '=', 'courseId')
            .getSingle();

        return view;
    }

    /**
     * Returns course brief data async
     */
    async getCourseBriefDataAsync(
        principalId: PrincipalId,
        courseId: Id<'Course'>
    ) {

        const course = await this._ormService
            .getSingleById(CourseData, courseId);

        return this._mapperService
            .mapTo(CourseBriefData, [course, courseId]);
    }

    /**
     * Returns course detals
     */
    async getCourseDetailsAsync(
        principalId: PrincipalId,
        courseId: Id<'Course'>
    ) {

        const courseDetailsView = await this._ormService
            .query(CourseDetailsView, { userId: principalId.getId(), courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getSingle();

        const moduleViews = await this._ormService
            .query(UserPlaylistView, { userId: principalId.getId(), courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getMany();

        const playlistModuleDTOs = this._mapperService
            .mapTo(PlaylistModuleDTO, [moduleViews]);

        return this._mapperService
            .mapTo(CourseDetailsDTO, [courseDetailsView, playlistModuleDTOs]);
    }

    /**
     * Creates a new course
     */
    async createCourseAsync(userId: PrincipalId, dto: CreateCourseDTO) {

        const { companyId } = await this._ormService
            .query(User, { userId })
            .where('id', '=', 'userId')
            .getSingle();

        /*  await this._authorizationService
             .checkPermissionAsync(userId, 'CREATE_COMPANY_COURSES', { companyId }); */

        // create course 
        const { versionId: courseVersionId } = await this
            ._verisonCreateService
            .createVersionAsync({
                entity: Course,
                data: CourseData,
                version: CourseVersion,
                createEntity: () => ({
                    deletionDate: null
                }),
                createData: () => ({
                    title: dto.title,
                    teacherId: Id.create<'User'>(1),
                    categoryId: Id.create<'CourseCategory'>(1),
                    subCategoryId: Id.create<'CourseCategory'>(1),
                    difficulty: 0,
                    benchmark: 0,
                    description: '',
                    shortDescription: '',
                    language: 'magyar',
                    previouslyCompletedCount: 0,
                    visibility: 'private' as CourseVisibilityType,
                    technicalRequirements: '',
                    humanSkillBenefits: '',
                    humanSkillBenefitsDescription: '',
                    requirementsDescription: '',
                    skillBenefits: '',
                    coverFileId: null,
                    isFeatured: false,
                    modificationDate: new Date(),
                    isPrecourseSurveyRequired: true
                }),
                createVersion: ({ entityId, dataId }) => ({
                    courseDataId: dataId,
                    courseId: entityId
                })
            });

        const { courseId } = await this._ormService
            .query(CourseVersion, { courseVersionId })
            .where('id', '=', 'courseVersionId')
            .getSingle()

        // create pretest module 
        const { versionId: moduleVersionId } = await this
            ._verisonCreateService
            .createVersionAsync({
                entity: Module,
                data: ModuleData,
                version: ModuleVersion,
                createEntity: () => ({
                    isPretestModule: true
                }),
                createData: () => ({
                    description: '',
                    imageFileId: null,
                    name: 'New pretest module',
                    orderIndex: 0
                }),
                createVersion: ({ entityId, dataId }) => ({
                    courseVersionId,
                    moduleDataId: dataId,
                    moduleId: entityId
                })
            });

        // create pretest exam 
        await this
            ._verisonCreateService
            .createVersionAsync({
                entity: Exam,
                data: ExamData,
                version: ExamVersion,
                createEntity: () => ({
                    isPretest: true,
                    isSignup: false
                }),
                createData: () => ({
                    acceptanceThreshold: null,
                    description: '',
                    isFinal: false,
                    orderIndex: 0,
                    retakeLimit: 0,
                    subtitle: '',
                    thumbnailUrl: null,
                    title: ''
                }),
                createVersion: ({ entityId, dataId }) => ({
                    examDataId: dataId,
                    examId: entityId,
                    moduleVersionId
                })
            });

        await this._companyService
            .createCompanyAssociatedCourseAsync(companyId, courseId);
    }

    /**
     * Save course thumbnail.
     */
    async saveCourseThumbnailAsync(
        userId: PrincipalId,
        file: UploadedFile,
        courseId: Id<'Course'>
    ) {

        const { companyId } = await this._ormService
            .query(User, { userId })
            .where('id', '=', 'userId')
            .getSingle();

        await this._authorizationService
            .checkPermissionAsync(userId, 'EDIT_COMPANY_COURSES', { companyId });

        return this._fileService
            .uploadAssigendFileAsync({
                entitySignature: CourseData,
                entityId: courseId,
                fileBuffer: file.data,
                fileCode: 'course_cover',
                storageFileIdField: 'coverFileId'
            });
    }

    /**
     * Gets the course details edit DTO.
     */
    async getCourseDetailsEditDataAsync(
        userId: PrincipalId,
        courseId: number
    ) {

        const { companyId } = await this._ormService
            .query(User, { userId })
            .where('id', '=', 'userId')
            .getSingle();

        const { id: editCoursePermissionId } = await this
            ._ormService
            .query(Permission, { code: 'EDIT_COURSE' })
            .where('code', '=', 'code')
            .getSingle();

        const hasPermission = await this
            ._ormService
            .query(PermissionAssignmentBridge, { companyId, courseId, editCoursePermissionId })
            .where('assigneeCompanyId', '=', 'companyId')
            .and('contextCourseId', '=', 'courseId')
            .and('permissionId', '=', 'editCoursePermissionId')
            .getOneOrNull()

        if (!hasPermission)
            throw new ErrorWithCode('no permission')

        // get course
        const view = await this._ormService
            .query(CourseAdminDetailedView, { courseId })
            .where('courseId', '=', 'courseId')
            .getSingle();

        const categories = await this._ormService
            .query(CourseCategory)
            .getMany();

        const teachers = await this._ormService
            .query(User)
            .innerJoin(TeacherInfo, x => x
                .on('userId', '=', 'id', User))
            .getMany();

        return this._mapperService
            .mapTo(CourseDetailsEditDataDTO, [view, categories, teachers]);
    }

    /**
     * Start course 
     */
    async startCourseAsync({
        principalId,
        courseId,
        currentItemCode,
        stageName
    }: {
        principalId: PrincipalId
    } & CourseStartDTO) {

        const alreadyCreated = await this
            ._ormService
            .query(UserCourseBridge, { principalId, courseId })
            .where('userId', '=', 'principalId')
            .and('courseId', '=', 'courseId')
            .getOneOrNull();

        if (alreadyCreated)
            return;

        await this
            ._userCourseBridgeService
            .createUserCourseBridgeAsync({
                courseId,
                currentItemCode,
                stageName,
                userId: principalId.getId(),
                startDate: stageName === 'watch' ? new Date() : null
            });
    }

    /**
     * getGreetingDataAsync
     */
    async getGreetingDataAsync(principalId: PrincipalId, courseId: Id<'Course'>) {

        const { isPrecourseSurveyRequired, title } = await this
            ._ormService
            .withResType<CourseData>()
            .query(LatestCourseVersionView, { courseId })
            .select(CourseData)
            .leftJoin(CourseVersion, x => x
                .on('id', '=', 'versionId', LatestCourseVersionView))
            .leftJoin(CourseData, x => x
                .on('id', '=', 'courseDataId', CourseVersion))
            .where('courseId', '=', 'courseId')
            .getSingle();

        /**
         * Get first item playlist code 
         */
        const { firstItemPlaylistCode } = await this
            ._playerService
            .getFirstPlaylistItemCodeAsync(courseId);

        return instantiate<GreetingsDataDTO>({
            isPrecourseSurveyRequired,
            firstItemPlaylistCode,
            courseName: title
        });
    }

    /**
     * Saves the course details
     * without incrementing version
     * version incrementation is only necessary when
     * adding breaking changes, like modifying exams,
     * or playlist order indices. Changing the course name, or description etc.
     * is not considered a breaking change.
     */
    async saveCourseDetailsAsync(
        userId: PrincipalId,
        dto: CourseDetailsEditDataDTO
    ) {

        const cv = await this._ormService
            .withResType<CourseVersion>()
            .query(LatestCourseVersionView, { courseId: dto.courseId })
            .select(CourseVersion)
            .leftJoin(CourseVersion, x => x
                .on('id', '=', 'versionId', LatestCourseVersionView))
            .where('courseId', '=', 'courseId')
            .getSingle();

        const courseDataId = cv.courseDataId;

        // save basic info
        await this._ormService
            .save(CourseData, {
                id: courseDataId,
                title: dto.title,
                teacherId: dto.teacherId,
                categoryId: dto.category.id,
                subCategoryId: dto.subCategory.id,
                benchmark: dto.benchmark,
                description: dto.description,
                difficulty: dto.difficulty,
                language: dto.language,
                shortDescription: dto.shortDescription,
                previouslyCompletedCount: dto.previouslyCompletedCount,
                humanSkillBenefitsDescription: dto.humanSkillBenefitsDescription,
                skillBenefits: createCharSeparatedList(dto.skillBenefits ?? []),
                technicalRequirements: createCharSeparatedList(dto.technicalRequirements ?? []),
                requirementsDescription: dto.technicalRequirementsDescription,
                humanSkillBenefits: createCharSeparatedList(dto
                    .humanSkillBenefits
                    .map(x => `${x.text}: ${x.value}`)),
                visibility: dto.visibility,
                isPrecourseSurveyRequired: dto.isPrecourseSurveyRequired
            });
    }

    /**
     * Gets the course content edit DTO.
     */
    async getCourseContentAdminDataAsync(
        userId: PrincipalId,
        courseId: Id<'Course'>,
        loadDeleted: boolean
    ) {

        const views = await this._ormService
            .query(CourseAdminContentView, { courseId })
            .where('courseId', '=', 'courseId')
            .getMany();

        const courseVersionId = (await this._ormService
            .query(LatestCourseVersionView, { courseId })
            .where('courseId', '=', 'courseId')
            .getSingle())
            .versionId;

        const modules = await this._moduleService
            .getModuleEditDTOsAsync(userId, courseVersionId);

        const items = this._mapperService
            .mapTo(CourseContentItemAdminDTO, [views]);

        return {
            items,
            modules
        } as CourseContentAdminDTO;
    }

    /**
     * Saves the course content
     */
    async saveCourseContentAsync(
        userId: PrincipalId,
        courseId: Id<'Course'>,
        itemMutations: Mutation<CourseContentItemAdminDTO, 'versionCode'>[],
        moduleMutations: Mutation<ModuleEditDTO, 'moduleVersionId'>[],
        files: FilesObjectType
    ) {

        if (itemMutations.length === 0 && moduleMutations.length === 0)
            return;

        // save course
        const { courseVersionMigrations } = await this
            ._saveCourseVersionAsync(courseId);

        // save modules
        await this
            ._moduleService
            .saveModulesAsync({
                courseVersionMigrations,
                moduleMutations,
                itemMutations,
                files
            });
    }

    /**
     * Returns admin list items
     */
    async getAdminCoursesAsync(
        principalId: PrincipalId,
        companyId: Id<'Company'>
    ) {

        const courseAdminShortViews = await this._ormService
            .query(CourseAdminListView, { companyId })
            .where('companyId', '=', 'companyId')
            .getMany();

        return this._mapperService
            .mapTo(CourseAdminListItemDTO, [courseAdminShortViews]);
    }

    /**
     * Soft delete course.
     */
    async softDeleteCourseAsync(
        userId: PrincipalId,
        courseId: Id<'Course'>
    ) {

        const { companyId } = await this._ormService
            .query(User, { userId })
            .where('id', '=', 'userId')
            .getSingle();

        await this._authorizationService
            .checkPermissionAsync(userId, 'EDIT_COMPANY_COURSES', { companyId });


        await this._ormService
            .softDelete(Course, [courseId]);
    }

    /**
     * Returns the currently available courses.
     */
    async getAvailableCoursesAsync(
        principalId: PrincipalId,
        searchTerm: string | null,
        filterCategoryId: number | null,
        isFeatured: boolean | null,
        isRecommended: boolean | null,
        orderBy: OrderType | null
    ) {

        const courses = await this._ormService
            .query(AvailableCourseView, { principalId })
            .where('userId', '=', 'principalId')
            .and('canView', '=', 'true')
            .getMany();

        // TODO refactor
        const filteredCoursesBySearchTerm =
            filterByProperty(courses, 'title', searchTerm);

        const filteredCoursesByCategoryId =
            filterByProperty(filteredCoursesBySearchTerm, 'categoryId', filterCategoryId);

        const filteredCoursesByIsFeatured =
            filterByProperty(filteredCoursesByCategoryId, 'isFeatured', isFeatured);

        const filteredCoursesByIsRecommended =
            filterByProperty(filteredCoursesByIsFeatured, 'isFeatured', isRecommended);

        const orderedCourses = (() => {

            if (orderBy === 'nameASC')
                return orderByProperty(filteredCoursesByIsRecommended, 'title', 'asc');

            if (orderBy === 'nameDESC')
                return orderByProperty(filteredCoursesByIsRecommended, 'title', 'desc');

            return filteredCoursesByIsRecommended;
        })();

        return this._mapperService
            .mapTo(AvailableCourseDTO, [orderedCourses]);
    }

    /**
     * Creates a course access bridge,
     * which opens access to a course for a specified user.
     * This can be used to dinamically allow or disallow access to a course, by the user.
     * Like when purchased from the shop, or got limited access etc...
     */
    async createCourseAccessBridge(
        userId: Id<'User'>,
        courseId: Id<'Course'>
    ) {

        await this._ormService
            .createAsync(CourseAccessBridge, {
                courseId,
                userId
            } as CourseAccessBridge);
    }

    async getAvailableCourseCategoriesAsync(principalId: PrincipalId) {

        const courseCategories = await this._ormService
            .query(CourseCategory)
            .getMany();

        return this._mapperService
            .mapTo(CourseCategoryDTO, [courseCategories]);
    }

    /**
     * --------------- PRIVATE
     */

    /**
     * Save course version
     * TODO use version save service
     * @deprecated
     */
    private async _saveCourseVersionAsync(courseId: Id<'Course'>) {

        // get old version id
        const oldCourseVersionId = (await this._ormService
            .query(LatestCourseVersionView, { courseId })
            .where('courseId', '=', 'courseId')
            .getSingle())
            .versionId;

        // create new version
        const { id: newCourseVersionId } = await this
            ._createNewCourseVersionAsync(courseId, oldCourseVersionId);

        const courseVersionMigrations = new VersionMigrationContainer([oldCourseVersionId], [newCourseVersionId], ['Course']);

        return { courseVersionMigrations };
    }

    /**
     * TODO use version save service
     * @deprecated
     */
    private async _createNewCourseVersionAsync(courseId: Id<'Course'>, oldVersionId: Id<'CourseVersion'>) {

        const oldDataId = (await this._ormService
            .query(CourseVersion, { oldVersionId })
            .where('id', '=', 'oldVersionId')
            .getSingle())
            .courseDataId;

        const newVersionId = await this._ormService
            .createAsync(CourseVersion, {
                courseId,
                courseDataId: oldDataId
            });

        return newVersionId;
    }
}
