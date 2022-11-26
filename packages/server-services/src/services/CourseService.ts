import { UploadedFile } from 'express-fileupload';
import { Course } from '../models/entity/course/Course';
import { CourseData } from '../models/entity/course/CourseData';
import { CourseVersion } from '../models/entity/course/CourseVersion';
import { Exam } from '../models/entity/exam/Exam';
import { ExamData } from '../models/entity/exam/ExamData';
import { ExamVersion } from '../models/entity/exam/ExamVersion';
import { CourseAccessBridge } from '../models/entity/misc/CourseAccessBridge';
import { CourseCategory } from '../models/entity/misc/CourseCategory';
import { TeacherInfo } from '../models/entity/misc/TeacherInfo';
import { User } from '../models/entity/misc/User';
import { Module } from '../models/entity/module/Module';
import { ModuleData } from '../models/entity/module/ModuleData';
import { ModuleVersion } from '../models/entity/module/ModuleVersion';
import { AvailableCourseView } from '../models/views/AvailableCourseView';
import { CourseAdminContentView } from '../models/views/CourseAdminContentView';
import { CourseAdminDetailedView } from '../models/views/CourseAdminDetailedView';
import { CourseAdminShortView } from '../models/views/CourseAdminShortView';
import { CourseDetailsView } from '../models/views/CourseDetailsView';
import { LatestCourseVersionView } from '../models/views/LatestCourseVersionView';
import { UserPlaylistView } from '../models/views/UserPlaylistView';
import { CourseAdminListItemDTO, GreetingsDataDTO } from '@episto/communication';
import { CourseContentAdminDTO } from '@episto/communication';
import { CourseContentItemAdminDTO } from '@episto/communication';
import { AvailableCourseDTO } from '@episto/communication';
import { CourseBriefData } from '@episto/communication';
import { CourseCategoryDTO } from '@episto/communication';
import { CourseDetailsDTO } from '@episto/communication';
import { CourseDetailsEditDataDTO } from '@episto/communication';
import { CourseStartDTO } from '@episto/communication';
import { CreateCourseDTO } from '@episto/communication';
import { ModuleEditDTO } from '@episto/communication';
import { Mutation } from '@episto/communication';
import { PlaylistModuleDTO } from '@episto/communication';
import { CourseVisibilityType, OrderType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { filterByProperty, orderByProperty, throwNotImplemented } from '../utilities/helpers';
import { VersionMigrationContainer } from '../utilities/misc';
import { PrincipalId } from '@episto/xcore';
import { AuthorizationService } from './AuthorizationService';
import { FileService } from './FileService';
import { MapperService } from './MapperService';
import { FilesObjectType } from './misc/FilesObjectType';
import { createCharSeparatedList } from './misc/mappings';
import { ModuleService } from './ModuleService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { PlayerService } from './PlayerService';
import { UserCourseBridgeService } from './UserCourseBridgeService';
import { VersionCreateService } from './VersionCreateService';
import { UserCourseBridge } from '../models/entity/misc/UserCourseBridge';
import { instantiate } from '@episto/commonlogic';

export class CourseService {

    constructor(
        private _moduleService: ModuleService,
        private _ormService: ORMConnectionService,
        private _mapperService: MapperService,
        private _fileService: FileService,
        private _userCourseBridgeService: UserCourseBridgeService,
        private _authorizationService: AuthorizationService,
        private _verisonCreateService: VersionCreateService,
        private _playerService: PlayerService) {
    }

    /**
     * Returns courses that the principal can use as context
     * when assigning permissions to a user
     */
    async getPermissionAssignCoursesAsync(principalId: PrincipalId, userId: Id<'User'>) {

        // TODO: CourseDataId is not CourseId
        throwNotImplemented();
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

        await this._authorizationService
            .checkPermissionAsync(userId, 'EDIT_COMPANY_COURSES', { companyId });

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
        userId: PrincipalId
    ) {

        const courseAdminShortViews = await this._ormService
            .query(CourseAdminShortView)
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
            .softDelete(CourseData, [courseId]);
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
