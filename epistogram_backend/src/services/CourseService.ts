import { query } from 'express';
import { UploadedFile } from 'express-fileupload';
import { CourseData } from '../models/entity/course/CourseData';
import { CourseVersion } from '../models/entity/course/CourseVersion';
import { CourseAccessBridge } from '../models/entity/CourseAccessBridge';
import { CourseCategory } from '../models/entity/CourseCategory';
import { Module } from '../models/entity/module/Module';
import { ModuleData } from '../models/entity/module/ModuleData';
import { ModuleVersion } from '../models/entity/module/ModuleVersion';
import { TeacherInfo } from '../models/entity/TeacherInfo';
import { User } from '../models/entity/User';
import { AvailableCourseView } from '../models/views/AvailableCourseView';
import { CourseAdminContentView } from '../models/views/CourseAdminContentView';
import { CourseAdminDetailedView } from '../models/views/CourseAdminDetailedView';
import { CourseAdminShortView } from '../models/views/CourseAdminShortView';
import { CourseDetailsView } from '../models/views/CourseDetailsView';
import { CourseItemPlaylistView } from '../models/views/CourseItemStateView';
import { CourseLearningStatsView } from '../models/views/CourseLearningStatsView';
import { CourseModuleOverviewView } from '../models/views/CourseModuleOverviewView';
import { CourseProgressView } from '../models/views/CourseProgressView';
import { LatestCourseVersionView } from '../models/views/LatestCourseVersionView';
import { ModuleListView } from '../models/views/ModuleListView';
import { CourseAdminListItemDTO } from '../shared/dtos/admin/CourseAdminListItemDTO';
import { CourseContentAdminDTO } from '../shared/dtos/admin/CourseContentAdminDTO';
import { CourseContentItemAdminDTO } from '../shared/dtos/admin/CourseContentItemAdminDTO';
import { CourseModuleShortDTO } from '../shared/dtos/admin/CourseModuleShortDTO';
import { CourseBriefData } from '../shared/dtos/CourseBriefData';
import { CourseDetailsDTO } from '../shared/dtos/CourseDetailsDTO';
import { CourseDetailsEditDataDTO } from '../shared/dtos/CourseDetailsEditDataDTO';
import { CourseItemDTO } from '../shared/dtos/CourseItemDTO';
import { CourseLearningDTO } from '../shared/dtos/CourseLearningDTO';
import { CoursePermissionAssignDTO } from '../shared/dtos/CoursePermissionAssignDTO';
import { CourseProgressDTO } from '../shared/dtos/CourseProgressDTO';
import { CourseProgressShortDTO } from '../shared/dtos/CourseProgressShortDTO';
import { CourseShortDTO } from '../shared/dtos/CourseShortDTO';
import { CreateCourseDTO } from '../shared/dtos/CreateCourseDTO';
import { ModuleDTO } from '../shared/dtos/ModuleDTO';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { UserCoursesDataDTO } from '../shared/dtos/UserCoursesDataDTO';
import { PrincipalId } from '../utilities/ActionParams';
import { throwNotImplemented } from '../utilities/helpers';
import { InsertEntity, VersionMigrationResult } from '../utilities/misc';
import { CourseItemService } from './CourseItemService';
import { ExamService } from './ExamService';
import { FileService } from './FileService';
import { MapperService } from './MapperService';
import { readItemCode } from './misc/encodeService';
import { createCharSeparatedList } from './misc/mappings';
import { XMutatorHelpers } from './misc/XMutatorHelpers_a';
import { ModuleService } from './ModuleService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { PretestService } from './PretestService';
import { UserCourseBridgeService } from './UserCourseBridgeService';
import { VideoService } from './VideoService';

export class CourseService {

    private _moduleService: ModuleService;
    private _userCourseBridgeService: UserCourseBridgeService;
    private _videoService: VideoService;
    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _fileService: FileService;
    private _examService: ExamService;
    private _pretestService: PretestService;

    constructor(
        moduleService: ModuleService,
        userCourseBridgeService: UserCourseBridgeService,
        videoService: VideoService,
        ormService: ORMConnectionService,
        mapperService: MapperService,
        fileService: FileService,
        examService: ExamService,
        pretestService: PretestService,
        private _courseItemService: CourseItemService) {

        this._moduleService = moduleService;
        this._userCourseBridgeService = userCourseBridgeService;
        this._videoService = videoService;
        this._ormService = ormService;
        this._mapperService = mapperService;
        this._fileService = fileService;
        this._examService = examService;
        this._pretestService = pretestService;
    }

    /**
     * Returns courses that the principal can use as context
     * when assigning permissions to a user 
     */
    async getPermissionAssignCoursesAsync(principalId: PrincipalId, userId: number) {

        const courses = await this._ormService
            .query(CourseData)
            .getMany();

        return courses
            .map((x): CoursePermissionAssignDTO => ({
                id: x.id,
                title: x.title
            }));
    }

    /**
     * Returns a course progress short view
     * 
     * @param userId 
     * @returns 
     */
    async getCourseProgressShortAsync(userId: PrincipalId) {

        const views = await this._ormService
            .query(CourseProgressView, { userId: userId.toSQLValue() })
            .where('userId', '=', 'userId')
            .getMany();

        return this._mapperService
            .mapMany(CourseProgressView, CourseProgressShortDTO, views);
    }

    /**
     * Reruns a course view
     * 
     * @param userId 
     * @param courseId 
     * @returns 
     */
    async getCourseViewAsync(userId: number, courseId: number) {

        const view = await this._ormService
            .query(AvailableCourseView, { courseId, userId })
            .where('courseId', '=', 'courseId')
            .and('userId', '=', 'courseId')
            .getSingle();

        return view;
    }

    /**
     * Returns course brief data async 
     * @param courseId 
     * @returns 
     */
    async getCourseBriefDataAsync(courseId: number) {

        const course = await this._ormService
            .getSingleById(CourseData, courseId);

        return this._mapperService
            .map(CourseData, CourseBriefData, course);
    }

    /**
     * Returns course detals 
     * 
     * @param userId 
     * @param courseId 
     * @returns 
     */
    async getCourseDetailsAsync(userId: PrincipalId, courseId: number) {

        const courseDetailsView = await this._ormService
            .query(CourseDetailsView, { userId: userId.toSQLValue(), courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getSingle();

        const moduleViews = await this._ormService
            .query(CourseModuleOverviewView, { courseId })
            .where('courseId', '=', 'courseId')
            .getMany();

        return this._mapperService
            .map(CourseDetailsView, CourseDetailsDTO, courseDetailsView, moduleViews);
    }

    /**
     * Creates a new course 
     * 
     * @param dto 
     */
    async createCourseAsync(dto: CreateCourseDTO) {

        const newCourse = {
            title: dto.title,
            teacherId: 1,
            categoryId: 1,
            subCategoryId: 1,
            difficulty: 0,
            benchmark: 0,
            description: '',
            shortDescription: '',
            language: 'magyar',
            previouslyCompletedCount: 0,
            visibility: 'private',
            technicalRequirements: '',
            humanSkillBenefits: '',
            humanSkillBenefitsDescription: '',
            requirementsDescription: '',
            skillBenefits: ''
        } as CourseData;

        await this._ormService
            .createAsync(CourseData, newCourse);

        await this._pretestService
            .createPretestExamAsync(newCourse.id);
    }

    /**
     * Returns the /learning/courses data.  
     * 
     * @param userId 
     * @returns 
     */
    async getCourseProgressDataAsync(userId: PrincipalId) {

        const courses = await this._ormService
            .query(CourseLearningStatsView, { userId })
            .where('userId', '=', 'userId')
            .getMany();

        // in progress courses 
        const inProgressCourses = courses
            .filter(x => x.isStarted && !x.isCompleted);

        const inProgressCoursesAsCourseShortDTOs = this._mapperService
            .mapMany(CourseLearningStatsView, CourseLearningDTO, inProgressCourses);

        // completed corurses
        const completedCourses = courses
            .filter(x => x.isCompleted);

        const completedCoursesAsCourseShortDTOs = this._mapperService
            .mapMany(CourseLearningStatsView, CourseLearningDTO, completedCourses);

        return {
            isAnyCoursesComplete: completedCourses.any(x => true),
            isAnyCoursesInProgress: inProgressCourses.any(x => true),
            completedCourses: completedCoursesAsCourseShortDTOs,
            inProgressCourses: inProgressCoursesAsCourseShortDTOs
        } as UserCoursesDataDTO;
    }

    /**
     * Returns the progress of the current active course, or null.
     * @returns 
     */
    async getCurrentCourseProgressAsync(userId: number) {

        // get current course id 
        const currentCourseId = await this._userCourseBridgeService
            .getCurrentCourseId(userId);

        if (!currentCourseId)
            return null;

        // get course progress
        const courseProgress = await this._ormService
            .query(CourseProgressView, { courseId: currentCourseId, userId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getSingle();

        if (!courseProgress)
            return null;

        // get next items 
        const nextItems = await this.getCourseNextItemsAsync(userId, currentCourseId);

        return {
            title: courseProgress.courseTitle,
            totalCourseItemCount: courseProgress.totalCourseItemCount,
            completedCourseItemCount: courseProgress.completedCourseItemCount,
            progressPercentage: courseProgress.progressPercentage,
            continueItemCode: courseProgress.continueItemCode,
            nextItems
        } as CourseProgressDTO;
    }

    /**
     * Returns the next items in course 
     * 
     * @param userId 
     * @param courseId 
     * @returns 
     */
    async getCourseNextItemsAsync(userId: number, courseId: number) {

        const modules = await this.getCourseModulesAsync(userId, courseId);

        const currentModule = modules
            .firstOrNull(x => x.state === 'current') ?? modules.first();

        const nextOrCurrentModules = modules
            .filter(x => x.orderIndex >= currentModule.orderIndex);

        const currentItemOrderIndex = currentModule
            .items
            .filter(x => x.state === 'current')[0]?.orderIndex ?? -1;

        const nextItems = nextOrCurrentModules
            .flatMap(module => module
                .items
                .filter(item => item.orderIndex > currentItemOrderIndex))
            .slice(0, 3);

        return nextItems;
    }

    /**
     * Save course thumbnail.
     * 
     * @param file 
     * @param courseId 
     * @returns 
     */
    async saveCourseThumbnailAsync(file: UploadedFile, courseId: number) {

        const getCourseAsync = () => this._ormService
            .getSingleById(CourseData, courseId);

        const setCourseThumbnailIdAsync = (thumbnailFileId: number) => this._ormService
            .save(CourseData, {
                id: courseId,
                coverFileId: thumbnailFileId
            });

        return this._fileService
            .uploadAssigendFileAsync<CourseData>(
                this._fileService.getFilePath('courseCoverImages', 'courseCoverImage', courseId, 'jpg'),
                getCourseAsync,
                setCourseThumbnailIdAsync,
                course => course.coverFileId,
                file.data);
    }

    /**
     * Get the current course modules with items.
     * 
     */
    async getCurrentCourseModulesAsync(userId: PrincipalId) {

        const courseId = await this._userCourseBridgeService
            .getCurrentCourseId(userId.toSQLValue());

        if (!courseId)
            throw new Error('There\'s no current course!');

        return await this.getCourseModulesAsync(userId.toSQLValue(), courseId);
    }

    /**
     * Get the course modules with items.
     * 
     * @param userId 
     * @param courseId 
     * @returns 
     */
    async getCourseModulesAsync(userId: number, courseId: number) {

        const views = await this._ormService
            .query(CourseItemPlaylistView, { courseId, userId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getMany();

        const modules = views
            .groupBy(x => x.moduleId)
            .map(x => {

                const viewAsModule = x.items.first();
                const isLockedModule = x.items[0]?.itemState === 'locked';
                const isCompletedModule = x.items.all(x => x.itemState === 'completed');
                const isCurrentModule = x.items.some(x => x.itemState === 'current') || viewAsModule.moduleIsCurrent;
                const items = this._mapperService
                    .mapMany(CourseItemPlaylistView, CourseItemDTO, x.items);

                return {
                    id: viewAsModule.moduleId,
                    name: viewAsModule.moduleName,
                    orderIndex: viewAsModule.moduleOrderIndex,
                    code: viewAsModule.moduleCode,
                    items: items,
                    state: isCurrentModule
                        ? 'current'
                        : isLockedModule
                            ? 'locked'
                            : isCompletedModule
                                ? 'completed'
                                : 'available'
                } as ModuleDTO;
            });

        return modules;
    }

    /**
     * Returns the course id from an item code.
     * 
     * @param descriptorCode 
     * @returns 
     */
    async getCourseVersionIdByItemCodeAsync(descriptorCode: string) {

        const { itemVersionId, itemType } = readItemCode(descriptorCode);

        if (itemType === 'video')
            return (await this._videoService.getVideoByVersionIdAsync(itemVersionId)).courseVersionId;

        if (itemType === 'exam')
            return (await this._examService.getExamByIdAsync(itemVersionId)).courseVersionId;

        return (await this._ormService
            .getSingleById(ModuleVersion, itemVersionId))
            .courseVersionId;
    }

    /**
     * Gets the course details edit DTO.
     * @param courseId 
     * @returns 
     */
    async getCourseDetailsEditDataAsync(courseId: number) {

        // get course 
        const view = await this._ormService
            .query(CourseAdminDetailedView, { courseId })
            .where('courseId', '=', 'courseId')
            .getSingle()

        const categories = await this._ormService
            .getRepository(CourseCategory)
            .createQueryBuilder('cc')
            .leftJoinAndSelect('cc.childCategories', 'ccc')
            .where('cc.parentCategoryId IS NULL')
            .getMany()

        const teachers = await this._ormService
            .query(User)
            .innerJoin(TeacherInfo, x => x
                .on('userId', '=', 'id', User))
            .getMany();

        return this._mapperService
            .map(CourseAdminDetailedView, CourseDetailsEditDataDTO, view, { categories, teachers });
    }

    /**
     * Saves the course details.
     */
    async saveCourseDetailsAsync(dto: CourseDetailsEditDataDTO) {

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
                visibility: dto.visibility
            });
    }

    /**
     * Gets the course content edit DTO. TODO: REVIEW COURSEID OR COURSE_VERSION_ID
     * @param courseId 
     * @returns 
     */
    async getCourseContentAdminDataAsync(courseId: number, loadDeleted: boolean) {

        const views = await this._ormService
            .query(CourseAdminContentView, { courseId })
            .where('courseId', '=', 'courseId')
            .getMany();

        const courseVersionId = (await this._ormService
            .query(LatestCourseVersionView, { courseId })
            .where('courseId', '=', 'courseId')
            .getSingle())
            .versionId;

        const moduleViews = await this._ormService
            .query(ModuleListView, { courseVersionId })
            .where('courseVersionId', '=', 'courseVersionId')
            .getMany();

        const moduleDtos = moduleViews
            .map(x => ({
                id: x.moduleVersionId,
                name: x.name,
                orderIndex: x.orderIndex
            } as CourseModuleShortDTO));

        const items = this._mapperService
            .mapMany(CourseAdminContentView, CourseContentItemAdminDTO, views);

        return {
            items,
            modules: moduleDtos
        } as CourseContentAdminDTO;
    }

    /**
     * Saves the course content 
     */
    async saveCourseContentAsync(courseId: number, mutations: Mutation<CourseContentItemAdminDTO, 'versionCode'>[]) {

        if (mutations.length === 0)
            return;

        // get old version id 
        const oldCourseVersionId = (await this._ormService
            .query(LatestCourseVersionView, { courseId })
            .where('courseId', '=', 'courseId')
            .getSingle())
            .versionId;

        // create new version
        const newCourseVersionId = await this
            ._createNewCourseVersionAsync(courseId, oldCourseVersionId);

        // increment module versions 
        const moduleVersionMigrations = await this
            ._incrementModuleVersionsAsync(oldCourseVersionId, newCourseVersionId);

        // update items 
        // await this.saveUpdatedCourseItemsAsync(mutations);

        await this._courseItemService
            .incrementUnmodifiedCourseItemVersions(moduleVersionMigrations, mutations);

        // save new items 
        // await this._courseItemService
        //     .saveNewCourseItemsAsync(moduleVersionMigrations, mutations);

        // delete items 
        // await this.saveDeletedCourseItemsAsync(mutations);
    }

    private async _incrementModuleVersionsAsync(oldCourseVersionId: number, newCourseVersionId: number) {

        // const oldModuleVersionIds = mutations
        //     .filter(x => x.action !== 'delete')
        //     .map(x => XMutatorHelpers.getFieldValue(x)('moduleVersionId')!);

        const oldModuleVersions = await this._ormService
            .query(ModuleVersion, { oldCourseVersionId })
            .where('courseVersionId', '=', 'oldCourseVersionId')
            .getMany();

        const newModuleVersions = oldModuleVersions
            .map(oldModuleVersion => {

                const newModule: InsertEntity<ModuleVersion> = {
                    courseVersionId: newCourseVersionId,
                    moduleDataId: oldModuleVersion.moduleDataId,
                    moduleId: oldModuleVersion.moduleId
                };

                return newModule;
            });

        const newModuleVersionIds = await this._ormService
            .createManyAsync(ModuleVersion, newModuleVersions);

        return newModuleVersionIds
            .map((x, i): VersionMigrationResult => ({
                oldVersionId: oldModuleVersions[i].id,
                newVersionId: x
            }));
    }

    private async _createNewCourseVersionAsync(courseId: number, oldVersionId: number) {

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

    private async saveUpdatedCourseItemsAsync(mutations: Mutation<CourseContentItemAdminDTO, 'versionCode'>[]) {

        throwNotImplemented();
        // const updateMuts = mutations
        //     .filter(x => x.action === 'update')
        //     .map(x => ({ ...x, ...readItemCode(x.key) }))
        //     .groupBy(x => x.itemType);

        // const videos = updateMuts
        //     .filter(x => x.key === 'video')
        //     .flatMap(x => x.items)
        //     .map(updateMut => {

        //         const updateDto = mapMutationToPartialObject(updateMut);

        //         const video: Partial<VideoData> = {
        //             id: updateMut.itemId,
        //             moduleId: updateDto.moduleId,
        //             title: updateDto.itemTitle,
        //             subtitle: updateDto.itemSubtitle,
        //             orderIndex: updateDto.itemOrderIndex
        //         };

        //         return video;
        //     });

        // const exams = updateMuts
        //     .filter(x => x.key === 'exam')
        //     .flatMap(x => x.items)
        //     .map(updateMut => {

        //         const updateDto = mapMutationToPartialObject(updateMut);

        //         const exam: Partial<ExamData> = {
        //             id: updateMut.itemId,
        //             moduleId: updateDto.moduleId,
        //             title: updateDto.itemTitle,
        //             subtitle: updateDto.itemSubtitle,
        //             orderIndex: updateDto.itemOrderIndex
        //         };

        //         return exam;
        //     });

        // await this._ormService
        //     .save(VideoData, videos);

        // await this._ormService
        //     .save(ExamData, exams);
    }

    private async saveDeletedCourseItemsAsync(mutations: Mutation<CourseContentItemAdminDTO, 'versionCode'>[]) {

        const itemCodes = mutations
            .filter(x => x.action === 'delete')
            .map(x => x.key)
            .map(x => readItemCode(x))
            .groupBy(x => x.itemType);

        const deletedExamIds = itemCodes
            .filter(x => x.key === 'exam')
            .flatMap(x => x.items)
            .map(x => x.itemVersionId);

        const deletedVideoIds = itemCodes
            .filter(x => x.key === 'video')
            .flatMap(x => x.items)
            .map(x => x.itemVersionId);

        this._examService
            .softDeleteExamsAsync(deletedExamIds, true);

        this._videoService
            .softDeleteVideosAsync(deletedVideoIds, true);
    }

    /**
     * Returns admin list items 
     * @returns 
     */
    async getAdminCoursesAsync() {

        const courseAdminShortViews = await this._ormService
            .query(CourseAdminShortView)
            .getMany();

        return this._mapperService
            .mapMany(CourseAdminShortView, CourseAdminListItemDTO, courseAdminShortViews);
    }

    /**
     * Soft delete course.
     * 
     * @param courseId 
     */
    async softDeleteCourseAsync(courseId: number) {



        await this._ormService
            .softDelete(CourseData, [courseId]);
    }

    /**
     * Returns the currently available courses. 
     * 
     * @param userId 
     * @returns 
     */
    async getAvailableCoursesAsync(userId: PrincipalId) {

        const courses = await this._ormService
            .query(AvailableCourseView, { userId })
            .where('userId', '=', 'userId')
            .and('canView', '=', 'true')
            .getMany();

        return this._mapperService
            .mapMany(AvailableCourseView, CourseShortDTO, courses);
    }

    /**
     * Creates a course access bridge, 
     * which opens access to a course for a specified user.
     * This can be used to dinamically allow or disallow access to a course, by the user.
     * Like when purchased from the shop, or got limited access etc... 
     * 
     * @param userId 
     * @param courseId 
     */
    async createCourseAccessBridge(userId: number, courseId: number) {

        await this._ormService
            .createAsync(CourseAccessBridge, {
                courseId,
                userId
            } as CourseAccessBridge);
    }
}