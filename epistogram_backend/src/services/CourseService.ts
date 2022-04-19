import { UploadedFile } from 'express-fileupload';
import { DeepPartial } from 'typeorm';
import { Course } from '../models/entity/Course';
import { CourseCategory } from '../models/entity/CourseCategory';
import { CourseModule } from '../models/entity/CourseModule';
import { Exam } from '../models/entity/Exam';
import { User } from '../models/entity/User';
import { UserCourseAccessBridge } from '../models/entity/UserCourseAccessBridge';
import { Video } from '../models/entity/Video';
import { CourseAdminContentView } from '../models/views/CourseAdminContentView';
import { CourseAdminDetailedView } from '../models/views/CourseAdminDetailedView';
import { CourseAdminShortView } from '../models/views/CourseAdminShortView';
import { CourseDetailsView } from '../models/views/CourseDetailsView';
import { CourseItemStateView } from '../models/views/CourseItemStateView';
import { CourseLearningStatsView } from '../models/views/CourseLearningStatsView';
import { CourseModuleOverviewView } from '../models/views/CourseModuleOverviewView';
import { CourseProgressView } from '../models/views/CourseProgressView';
import { CourseView } from '../models/views/CourseView';
import { CourseAdminListItemDTO } from '../shared/dtos/admin/CourseAdminListItemDTO';
import { CourseContentAdminDTO } from '../shared/dtos/admin/CourseContentAdminDTO';
import { CourseContentItemAdminDTO } from '../shared/dtos/admin/CourseContentItemAdminDTO';
import { CourseModuleShortDTO } from '../shared/dtos/admin/CourseModuleShortDTO';
import { CourseBriefData } from '../shared/dtos/CourseBriefData';
import { CourseContentEditDataDTO } from '../shared/dtos/CourseContentEditDataDTO';
import { CourseDetailsDTO } from '../shared/dtos/CourseDetailsDTO';
import { CourseDetailsEditDataDTO } from '../shared/dtos/CourseDetailsEditDataDTO';
import { CourseItemDTO } from '../shared/dtos/CourseItemDTO';
import { CourseLearningDTO } from '../shared/dtos/CourseLearningDTO';
import { CourseProgressDTO } from '../shared/dtos/CourseProgressDTO';
import { CourseProgressShortDTO } from '../shared/dtos/CourseProgressShortDTO';
import { CourseShortDTO } from '../shared/dtos/CourseShortDTO';
import { CreateCourseDTO } from '../shared/dtos/CreateCourseDTO';
import { ModuleDTO } from '../shared/dtos/ModuleDTO';
import { FieldMutation } from '../shared/dtos/mutations/FieldMutation';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { UserCoursesDataDTO } from '../shared/dtos/UserCoursesDataDTO';
import { CourseItemType } from '../shared/types/sharedTypes';
import { ExamService } from './ExamService';
import { FileService } from './FileService';
import { MapperService } from './MapperService';
import { readItemCode } from './misc/encodeService';
import { createCharSeparatedList } from './misc/mappings';
import { mapMutationToPartialObject } from './misc/xmutatorHelpers';
import { ModuleService } from './ModuleService';
import { PretestService } from './PretestService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
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
        pretestService: PretestService) {

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
     * Returns a course progress short view
     * 
     * @param userId 
     * @returns 
     */
    async getCourseProgressShortAsync(userId: number) {

        const views = await this._ormService
            .getRepository(CourseProgressView)
            .createQueryBuilder('cpv')
            .where('cpv.userId = :userId', { userId })
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
            .getRepository(CourseView)
            .findOneOrFail({
                where: {
                    id: courseId,
                    userId
                }
            });

        return view;
    }

    /**
     * Returns course brief data async 
     * @param courseId 
     * @returns 
     */
    async getCourseBriefDataAsync(courseId: number) {

        const course = await this._ormService
            .getSingleById(Course, courseId);

        return this._mapperService
            .map(Course, CourseBriefData, course);
    }

    /**
     * Returns course detals 
     * 
     * @param userId 
     * @param courseId 
     * @returns 
     */
    async getCourseDetailsAsync(userId: number, courseId: number) {

        const courseDetailsView = await this._ormService
            .getRepository(CourseDetailsView)
            .createQueryBuilder('cdv')
            .where('cdv.courseId = :courseId', { courseId })
            .andWhere('cdv.userId = :userId', { userId })
            .getOneOrFail();

        const moduleViews = await this._ormService
            .getRepository(CourseModuleOverviewView)
            .createQueryBuilder('v')
            .where('v.courseId = :courseId', { courseId })
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
        } as Course;

        await this._ormService
            .getRepository(Course)
            .insert(newCourse);

        await this._pretestService
            .createPretestExamAsync(newCourse.id);
    }

    /**
     * Returns the /learning/courses data.  
     * 
     * @param userId 
     * @returns 
     */
    async getCourseProgressDataAsync(userId: number) {

        const courses = await this._ormService
            .query(CourseLearningStatsView, {userId})
            .leftJoin(Course, CourseLearningStatsView)
            .on('id', '=', 'courseId')
            .where('userId', '=', 'userId')
            .and(Course, 'deletionDate', 'IS', 'NULL')
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
            .getRepository(CourseProgressView)
            .findOne({
                where: {
                    courseId: currentCourseId,
                    userId
                }
            });

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
            .getSingleById(Course, courseId);

        const setCourseThumbnailIdAsync = (thumbnailFileId: number) => this._ormService
            .getRepository(Course)
            .save({
                id: courseId,
                coverFileId: thumbnailFileId
            });

        return this._fileService
            .uploadAssigendFileAsync<Course>(
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
    async getCurrentCourseModulesAsync(userId: number) {

        const courseId = await this._userCourseBridgeService
            .getCurrentCourseId(userId);

        if (!courseId)
            throw new Error('There\'s no current course!');

        return await this.getCourseModulesAsync(userId, courseId);
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
            .getRepository(CourseItemStateView)
            .createQueryBuilder('cisv')
            .where('cisv.courseId = :courseId', { courseId })
            .andWhere('cisv.userId = :userId', { userId })
            .getMany();

        const modules = views
            .groupBy(x => x.moduleId)
            .map(x => {

                const viewAsModule = x.items.first();
                const isLockedModule = x.items[0]?.state === 'locked';
                const isCompletedModule = x.items.all(x => x.state === 'completed');
                const isCurrentModule = x.items.some(x => x.state === 'current') || viewAsModule.isModuleCurrent;
                const items = this._mapperService
                    .mapMany(CourseItemStateView, CourseItemDTO, x.items);

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
    async getCourseIdByItemCodeAsync(descriptorCode: string) {

        const { itemId, itemType } = readItemCode(descriptorCode);

        if (itemType === 'video')
            return (await this._videoService.getVideoByIdAsync(itemId)).courseId;

        if (itemType === 'exam')
            return (await this._examService.getExamByIdAsync(itemId)).courseId;

        return (await this._ormService
            .getSingleById(CourseModule, itemId))
            .courseId;
    }

    /**
     * Gets the course details edit DTO.
     * @param courseId 
     * @returns 
     */
    async getCourseDetailsEditDataAsync(courseId: number) {

        // get course 
        const view = await this._ormService
            .getRepository(CourseAdminDetailedView)
            .createQueryBuilder('c')
            .where('c.courseId = :courseId', { courseId: courseId })
            .getOneOrFail();

        const categories = await this._ormService
            .getRepository(CourseCategory)
            .createQueryBuilder('cc')
            .leftJoinAndSelect('cc.childCategories', 'ccc')
            .where('cc.parentCategoryId IS NULL')
            .getMany();

        const teachers = await this._ormService
            .getRepository(User)
            .createQueryBuilder('u')
            .leftJoinAndSelect('u.teacherInfo', 'te')
            .where('te IS NOT NULL')
            .getMany();

        return this._mapperService
            .map(CourseAdminDetailedView, CourseDetailsEditDataDTO, view, { categories, teachers });
    }

    /**
     * Saves the course details.
     */
    async saveCourseDetailsAsync(dto: CourseDetailsEditDataDTO) {

        // save basic info
        await this._ormService
            .getRepository(Course)
            .save({
                id: dto.courseId,
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
     * Gets the course content edit DTO.
     * @param courseId 
     * @returns 
     */
    async getCourseContentAdminDataAsync(courseId: number, loadDeleted: boolean) {

        const views = await this._ormService
            .query(CourseAdminContentView, { courseId, loadDeleted })
            .where('courseId', '=', 'courseId')
            .and('itemIsDeleted', '=', 'loadDeleted')
            .getMany();

        const modules = await this._ormService
            .getRepository(CourseModule)
            .createQueryBuilder('mo')
            .where('mo.courseId = :courseId', { courseId })
            .getMany();

        const moduleDtos = modules
            .map(x => ({
                id: x.id,
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
    async saveCourseContentAsync(mutations: Mutation<CourseContentItemAdminDTO, 'itemCode'>[]) {

        // update items 
        await this.saveUpdatedCourseItems(mutations);

        // save new items 
        await this.saveNewCourseItems(mutations);

        // delete items 
        await this.saveDeletedCourseItems(mutations);
    }

    private async saveUpdatedCourseItems(mutations: Mutation<CourseContentItemAdminDTO, 'itemCode'>[]) {

        const updateMuts = mutations
            .filter(x => x.action === 'update')
            .map(x => ({ ...x, ...readItemCode(x.key) }))
            .groupBy(x => x.itemType);

        const videos = updateMuts
            .filter(x => x.key === 'video')
            .flatMap(x => x.items)
            .map(updateMut => {

                const updateDto = mapMutationToPartialObject(updateMut);

                const video: Partial<Video> = {
                    id: updateMut.itemId,
                    moduleId: updateDto.moduleId,
                    title: updateDto.itemTitle,
                    subtitle: updateDto.itemSubtitle,
                    orderIndex: updateDto.itemOrderIndex
                };

                return video;
            });

        const exams = updateMuts
            .filter(x => x.key === 'exam')
            .flatMap(x => x.items)
            .map(updateMut => {

                const updateDto = mapMutationToPartialObject(updateMut);

                const exam: Partial<Exam> = {
                    id: updateMut.itemId,
                    moduleId: updateDto.moduleId,
                    title: updateDto.itemTitle,
                    subtitle: updateDto.itemSubtitle,
                    orderIndex: updateDto.itemOrderIndex
                };

                return exam;
            });

        await this._ormService
            .save(Video, videos);

        await this._ormService
            .save(Exam, exams);
    }

    private async saveDeletedCourseItems(mutations: Mutation<CourseContentItemAdminDTO, 'itemCode'>[]) {

        const itemCodes = mutations
            .filter(x => x.action === 'delete')
            .map(x => x.key)
            .map(x => readItemCode(x))
            .groupBy(x => x.itemType);

        const deletedExamIds = itemCodes
            .filter(x => x.key === 'exam')
            .flatMap(x => x.items)
            .map(x => x.itemId);

        const deletedVideoIds = itemCodes
            .filter(x => x.key === 'video')
            .flatMap(x => x.items)
            .map(x => x.itemId);

        this._examService
            .softDeleteExamsAsync(deletedExamIds, true);

        this._videoService
            .softDeleteVideosAsync(deletedVideoIds, true);
    }

    private async saveNewCourseItems(mutations: Mutation<CourseContentItemAdminDTO, 'itemCode'>[]) {

        const checkMutationItemType = (
            mutation: Mutation<CourseContentItemAdminDTO, 'itemCode'>,
            itemType: CourseItemType) => {

            return mutation
                .fieldMutators
                .some(fm => fm.field === 'itemType' && fm.value === itemType);
        };

        //
        // insert new videos
        //
        const newVideos = mutations
            .filter(x => x.action === 'add')
            .filter(x => checkMutationItemType(x, 'video'))
            .map((x): Partial<Video> => {

                const mutObject = mapMutationToPartialObject(x);

                return {
                    courseId: mutObject.courseId,
                    moduleId: mutObject.moduleId,
                    title: mutObject.itemTitle,
                    subtitle: mutObject.itemSubtitle,
                    orderIndex: mutObject.itemOrderIndex,
                    description: '',
                    lengthSeconds: 0
                };
            });

        // insert new videos
        const newExams = mutations
            .filter(x => x.action === 'add')
            .filter(x => checkMutationItemType(x, 'exam'))
            .map((x): Partial<Exam> => {

                const mutObject = mapMutationToPartialObject(x);

                return {
                    courseId: mutObject.courseId,
                    moduleId: mutObject.moduleId,
                    title: mutObject.itemTitle,
                    subtitle: mutObject.itemSubtitle,
                    orderIndex: mutObject.itemOrderIndex,
                    description: '',
                    type: 'normal'
                };
            });

        await this._examService
            .insertBulkAsync(newExams);

        await this._videoService
            .insertBulkAsync(newVideos);
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
            .softDelete(Course, [courseId]);
    }

    /**
     * Returns the currently available courses. 
     * 
     * @param userId 
     * @returns 
     */
    async getAvailableCoursesAsync(userId: number) {

        const courses = await this._ormService
            .query(CourseView, { userId })
            .where('userId', '=', 'userId')
            .and('canView', '=', 'true')
            .getMany();

        return this._mapperService
            .mapMany(CourseView, CourseShortDTO, courses);
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
            .getRepository(UserCourseAccessBridge)
            .insert({
                courseId,
                userId
            });
    }
}