import { UploadedFile } from "express-fileupload";
import { Course } from "../models/entity/Course";
import { CourseCategory } from "../models/entity/CourseCategory";
import { CourseModule } from "../models/entity/CourseModule";
import { Exam } from "../models/entity/Exam";
import { User } from "../models/entity/User";
import { UserCourseAccessBridge } from "../models/entity/UserCourseAccessBridge";
import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { Video } from "../models/entity/Video";
import { CourseContentEditDataDTO } from "../models/shared_models/CourseContentEditDataDTO";
import { CourseDetailsDTO } from "../models/shared_models/CourseDetailsDTO";
import { CourseDetailsEditDataDTO } from "../models/shared_models/CourseDetailsEditDataDTO";
import { CourseLearningDTO } from "../models/shared_models/CourseLearningDTO";
import { CourseProgressShortDTO } from "../models/shared_models/CourseProgressShortDTO";
import { ModuleDTO } from "../models/shared_models/ModuleDTO";
import { TextDTO } from "../models/shared_models/TextDTO";
import { CourseModeType, CourseStageNameType } from "../models/shared_models/types/sharedTypes";
import { UserCoursesDataDTO } from "../models/shared_models/UserCoursesDataDTO";
import { CourseAdminContentView } from "../models/views/CourseAdminContentView";
import { CourseAdminDetailedView } from "../models/views/CourseAdminDetailedView";
import { CourseAdminShortView } from "../models/views/CourseAdminShortView";
import { CourseDetailsView } from "../models/views/CourseDetailsView";
import { CourseItemStateView } from "../models/views/CourseItemStateView";
import { CourseLearningStatsView } from "../models/views/CourseLearningStatsView";
import { CourseModuleOverviewView } from "../models/views/CourseModuleOverviewView";
import { CourseProgressView } from "../models/views/CourseProgressView";
import { CourseView } from "../models/views/CourseView";
import { getItemCode, readItemCode } from "./misc/encodeService";
import { FileService } from "./FileService";
import { MapperService } from "./MapperService";
import { ModuleService } from "./ModuleService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";
import { UserCourseBridgeService } from "./UserCourseBridgeService";
import { VideoService } from "./VideoService";
import { CreateCourseDTO } from "../models/shared_models/CreateCourseDTO";
import { CourseBriefData } from "../models/shared_models/CourseBriefData";
import { CourseItemDTO } from "../models/shared_models/CourseItemDTO";
import { CourseAdminListItemDTO } from "../models/shared_models/CourseAdminListItemDTO";
import { CourseShortDTO } from "../models/shared_models/CourseShortDTO";
import { ExamService } from "./ExamService";
import { CourseProgressDTO } from "../models/shared_models/CourseProgressDTO";
import { createCharSeparatedList } from "./misc/mappings";
import { ModuleAdminShortDTO } from "../models/shared_models/ModuleAdminShortDTO";
import { CourseAdminItemShortDTO } from "../models/shared_models/CourseAdminItemShortDTO";
import { CourseAdminItemQuestionDTO } from "../models/shared_models/CourseAdminItemQuestionDTO";
import { CourseAdminItemQuestionAnswerDTO } from "../models/shared_models/CourseAdminItemQuestionAnswerDTO";

export class CourseService {

    private _moduleService: ModuleService;
    private _userCourseBridgeService: UserCourseBridgeService;
    private _videoService: VideoService;
    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _fileService: FileService;
    private _examService: ExamService;

    constructor(
        moduleService: ModuleService,
        userCourseBridgeService: UserCourseBridgeService,
        videoService: VideoService,
        ormService: ORMConnectionService,
        mapperService: MapperService,
        fileService: FileService,
        examService: ExamService) {

        this._moduleService = moduleService;
        this._userCourseBridgeService = userCourseBridgeService;
        this._videoService = videoService;
        this._ormService = ormService;
        this._mapperService = mapperService;
        this._fileService = fileService;
        this._examService = examService;
    }

    async getCourseProgressShortAsync(userId: number) {

        const views = await this._ormService
            .getRepository(CourseProgressView)
            .createQueryBuilder("cpv")
            .where("cpv.userId = :userId", { userId })
            .getMany();

        return this._mapperService
            .mapMany(CourseProgressView, CourseProgressShortDTO, views);
    }

    async getFirstItemCodeById(userId: number, courseId: number) {

        const view = await this._ormService
            .getRepository(CourseView)
            .findOneOrFail({
                where: {
                    id: courseId,
                    userId
                }
            });

        return view.firstItemCode;
    }

    async getCourseBriefDataAsync(courseId: number) {

        const course = await this._ormService
            .getRepository(Course)
            .findOneOrFail(courseId);

        return this._mapperService
            .map(Course, CourseBriefData, course);
    }

    async getCourseDetailsAsync(userId: number, courseId: number) {

        const courseDetailsView = await this._ormService
            .getRepository(CourseDetailsView)
            .createQueryBuilder("cdv")
            .where("cdv.courseId = :courseId", { courseId })
            .andWhere("cdv.userId = :userId", { userId })
            .getOneOrFail();

        const moduleViews = await this._ormService
            .getRepository(CourseModuleOverviewView)
            .createQueryBuilder("v")
            .where("v.courseId = :courseId", { courseId })
            .getMany();

        return this._mapperService
            .map(CourseDetailsView, CourseDetailsDTO, courseDetailsView, moduleViews);
    }

    async createCourseAsync(dto: CreateCourseDTO) {

        await this._ormService
            .getRepository(Course)
            .insert({
                title: dto.title,
                teacherId: 1,
                categoryId: 1,
                subCategoryId: 1,
                difficulty: 0,
                benchmark: 0,
                description: "",
                shortDescription: "",
                language: "magyar",
                previouslyCompletedCount: 0,
                visibility: "private",
                technicalRequirements: "",
                humanSkillBenefits: "",
                humanSkillBenefitsDescription: "",
                requirementsDescription: "",
                skillBenefits: ""
            });
    }

    /**
     * Returns the /learning/courses data.  
     * 
     * @param userId 
     * @returns 
     */
    async getCourseProgressDataAsync(userId: number) {

        const courses = await this._ormService
            .getRepository2(CourseLearningStatsView)
            .createQueryBuilder("clsv")
            .where("clsv.userId = :userId", { userId })
            .getManyAsync();

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
        const currentCourseId = await this.getCurrentCourseId(userId);
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

    async getCourseNextItemsAsync(userId: number, courseId: number) {

        const modules = await this.getCourseModulesAsync(userId, courseId);

        const currentModule = modules
            .single(x => x.state === "current");

        const nextOrCurrentModules = modules
            .filter(x => x.orderIndex >= currentModule.orderIndex);

        const currentItemOrderIndex = currentModule
            .items
            .filter(x => x.state === "current")[0]?.orderIndex ?? -1;

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
            .getRepository(Course)
            .findOneOrFail(courseId);

        const setCourseThumbnailIdAsync = (thumbnailFileId: number) => this._ormService
            .getRepository(Course)
            .save({
                id: courseId,
                coverFileId: thumbnailFileId
            });

        return this._fileService
            .uploadAssigendFileAsync<Course>(
                this._fileService.getFilePath("courseCoverImages", "courseCoverImage", courseId, "jpg"),
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

        const courseId = await this.getCurrentCourseId(userId);
        if (!courseId)
            throw new Error("There's no current course!");

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
            .createQueryBuilder("cisv")
            .where("cisv.courseId = :courseId", { courseId })
            .andWhere("cisv.userId = :userId", { userId })
            .getMany();

        const modules = views
            .groupBy(x => x.moduleId)
            .map(x => {

                const viewAsModule = x.items.first();
                const isLockedModule = x.items[0]?.state === "locked";
                const isCompletedModule = x.items.all(x => x.state === "completed");
                const isCurrentModule = x.items.some(x => x.state === "current") || viewAsModule.isModuleCurrent;
                const items = this._mapperService
                    .mapMany(CourseItemStateView, CourseItemDTO, x.items);

                return {
                    id: viewAsModule.moduleId,
                    name: viewAsModule.moduleName,
                    orderIndex: viewAsModule.moduleOrderIndex,
                    code: viewAsModule.moduleCode,
                    items: items,
                    state: isCurrentModule
                        ? "current"
                        : isLockedModule
                            ? "locked"
                            : isCompletedModule
                                ? "completed"
                                : "available"
                } as ModuleDTO;
            });

        return modules;
    }

    /**
     * Returns the current course id 
     */
    async getCurrentCourseId(userId: number) {

        const courseBridge = await this._ormService
            .getRepository(UserCourseBridge)
            .findOne({
                where: {
                    userId,
                    isCurrent: true
                }
            });

        return courseBridge?.courseId ?? null;
    }

    /**
     * Returns the current course id 
     */
    async getCurrentCourseIdOrFail(userId: number) {

        const id = await this.getCurrentCourseId(userId)
        if (!id)
            throw new Error("Accessing current course, but none found.");

        return id;
    };

    /**
     * Returns the course id from an item code.
     * 
     * @param descriptorCode 
     * @returns 
     */
    async getCourseIdByItemCodeAsync(descriptorCode: string) {

        const { itemId, itemType } = readItemCode(descriptorCode);

        if (itemType === "video")
            return (await this._videoService.getVideoByIdAsync(itemId)).courseId;

        if (itemType === "exam")
            return (await this._examService.getExamByIdAsync(itemId)).courseId;

        return (await this._ormService
            .getRepository(CourseModule)
            .findOneOrFail(itemId)).courseId;
    }

    /**
     * Set current course and course current item code.
     * 
     * @param userId 
     * @param courseId 
     * @param itemCode 
     */
    setCurrentCourse = async (
        userId: number,
        courseId: number,
        stageName: CourseStageNameType,
        itemCode: string | null) => {

        const currentCourseBridge = await this._userCourseBridgeService
            .getUserCourseBridgeAsync(userId, courseId);

        // insert new bridge
        if (!currentCourseBridge) {

            await this._ormService
                .getRepository(UserCourseBridge)
                .insert({
                    courseId: courseId,
                    userId: userId,
                    courseMode: "advanced",
                    currentItemCode: itemCode,
                    stageName,
                    isCurrent: true
                } as UserCourseBridge);
        }

        // update current video/exam id 
        else {

            await this._ormService
                .getRepository(UserCourseBridge)
                .save({
                    id: currentCourseBridge.id,
                    currentItemCode: itemCode,
                    stageName,
                    isCurrent: true
                } as UserCourseBridge);
        }

        // get all bridges for user 
        const bridges = await this._ormService
            .getRepository(UserCourseBridge)
            .find({
                where: {
                    userId
                }
            });

        // update current bridge 
        await this._ormService
            .getRepository(UserCourseBridge)
            .save(bridges
                .map(bridge => ({
                    id: bridge.id,
                    isCurrent: bridge.courseId === courseId,
                } as UserCourseBridge)));
    }

    /**
     * Sets the course mode (beginner / advanced).
     * 
     * @param userId 
     * @param courseId 
     * @param mode 
     */
    setCourseModeAsync = async (userId: number, courseId: number, mode: CourseModeType) => {

        const userCourseBridge = await this._userCourseBridgeService
            .getUserCourseBridgeAsync(userId, courseId);

        if (!userCourseBridge)
            throw new Error("User course bridge not found!");

        await this._ormService
            .getRepository(UserCourseBridge)
            .save({
                courseId: courseId,
                userId: userId,
                id: userCourseBridge.id,
                courseMode: mode
            } as UserCourseBridge);
    }

    /**
     * Gets the course details edit DTO.
     * @param courseId 
     * @returns 
     */
    getCourseDetailsEditDataAsync = async (courseId: number) => {

        // get course 
        const view = await this._ormService
            .getRepository(CourseAdminDetailedView)
            .createQueryBuilder("c")
            .where("c.courseId = :courseId", { courseId: courseId })
            .getOneOrFail();

        const categories = await this._ormService
            .getRepository(CourseCategory)
            .createQueryBuilder("cc")
            .leftJoinAndSelect("cc.childCategories", "ccc")
            .where("cc.parentCategoryId IS NULL")
            .getMany();

        const teachers = await this._ormService
            .getRepository(User)
            .createQueryBuilder("u")
            .leftJoinAndSelect("u.teacherInfo", "te")
            .where("te IS NOT NULL")
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
    async getCourseContentEditDataAsync(courseId: number) {

        // get views 
        const views = await this._ormService
            .getRepository(CourseAdminContentView)
            .createQueryBuilder("c")
            .where("c.courseId = :courseId", { courseId: courseId })
            .getMany();

        // first view as admin data 
        const viewAsAdmin = views
            .first();

        // modules
        const modules = views
            .groupBy(x => x.moduleId)
            .map(moduleGroup => {

                const viewAsModule = moduleGroup.first;

                // items
                const items = moduleGroup
                    .items
                    .filter(x => !!x.itemId)
                    .groupBy(x => x.itemCode)
                    .map(itemGroup => {

                        const viewAsItem = itemGroup.first;

                        // questions
                        const questions = itemGroup
                            .items
                            .groupBy(x => x.questionId)
                            .map(questionGroup => {

                                const viewAsQuestion = questionGroup
                                    .items
                                    .first();

                                // answers
                                const answers = this._mapperService
                                    .mapMany(CourseAdminContentView, CourseAdminItemQuestionAnswerDTO, questionGroup.items);

                                return this._mapperService
                                    .map(CourseAdminContentView, CourseAdminItemQuestionDTO, viewAsQuestion, answers);
                            });

                        return this._mapperService
                            .map(CourseAdminContentView, CourseAdminItemShortDTO, viewAsItem, questions);
                    });

                return this._mapperService
                    .map(CourseAdminContentView, ModuleAdminShortDTO, viewAsModule, items);
            });

        return this._mapperService
            .map(CourseAdminContentView, CourseContentEditDataDTO, viewAsAdmin, modules);
    }

    /**
     * Saves the course content 
     */
    async saveCourseContentAsync(dto: CourseContentEditDataDTO) {

        // save module order index 
        await this._ormService
            .getRepository(CourseModule)
            .save(dto
                .modules
                .map(x => ({
                    id: x.id,
                    orderIndex: x.orderIndex
                } as CourseModule)));

        // save video orders
        await this._ormService
            .getRepository(Video)
            .save(dto
                .modules
                .flatMap(x => x.items)
                .filter(x => x.type === "video")
                .map(x => ({
                    id: x.id,
                    orderIndex: x.orderIndex,
                    moduleId: x.moduleId
                } as Video)));

        // save exam orders
        await this._ormService
            .getRepository(Exam)
            .save(dto
                .modules
                .flatMap(x => x.items)
                .filter(x => x.type === "exam")
                .map(x => ({
                    id: x.id,
                    orderIndex: x.orderIndex,
                    moduleId: x.moduleId
                } as Video)));
    }

    getAdminCoursesAsync = async () => {

        const courseAdminShortViews = await this._ormService
            .getRepository(CourseAdminShortView)
            .createQueryBuilder()
            .getMany();

        return this._mapperService
            .mapMany(CourseAdminShortView, CourseAdminListItemDTO, courseAdminShortViews);
    }

    /**
     * Delete course.
     * 
     * @param courseId 
     */
    deleteCourseAsync = async (courseId: number) => {

        // delete user course bridges
        await this._ormService
            .getOrmConnection()
            .createQueryBuilder()
            .delete()
            .from(UserCourseBridge)
            .where("courseId = :courseId", { courseId })
            .execute();

        // delete modules 
        const modules = await this._ormService
            .getRepository(CourseModule)
            .createQueryBuilder("m")
            .where('"m"."course_id" = :courseId', { courseId })
            .getMany();

        await this._moduleService
            .deleteModulesAsync(modules.map(x => x.id));

        // delete course 
        await this._ormService
            .getRepository(Course)
            .delete(courseId);

    }

    /**
     * Returns the currently available courses. 
     * 
     * @param userId 
     * @returns 
     */
    async getAvailableCoursesAsync(userId: number) {

        const courses = await this._ormService
            .getRepository(CourseView)
            .createQueryBuilder("cv")
            .where("cv.userId = :userId", { userId })
            .andWhere("cv.canView = true")
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