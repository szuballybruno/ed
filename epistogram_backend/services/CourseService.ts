import { Course } from "../models/entity/Course";
import { CourseCategory } from "../models/entity/CourseCategory";
import { CourseModule } from "../models/entity/CourseModule";
import { Exam } from "../models/entity/Exam";
import { UserCourseAccessBridge } from "../models/entity/UserCourseAccessBridge";
import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { ModuleDTO } from "../models/shared_models/ModuleDTO";
import { TextDTO } from "../models/shared_models/TextDTO";
import { CourseModeType } from "../models/shared_models/types/sharedTypes";
import { UserCoursesDataDTO } from "../models/shared_models/UserCoursesDataDTO";
import { CourseAdminDetailedView } from "../models/views/CourseAdminDetailedView";
import { CourseAdminShortView } from "../models/views/CourseAdminShortView";
import { CourseItemStateView } from "../models/views/CourseItemStateView";
import { CourseView } from "../models/views/CourseView";
import { getItemCode, readItemCode } from "./encodeService";
import { toCourseAdminShortDTO, toCourseEditDataDTO, toCourseItemDTO, toCourseShortDTO } from "./mappings";
import { ModuleService } from "./ModuleService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";
import { UserCourseBridgeService } from "./UserCourseBridgeService";
import { VideoService } from "./VideoService";

export class CourseService {

    private _moduleService: ModuleService;
    private _userCourseBridgeService: UserCourseBridgeService;
    private _videoService: VideoService;
    private _ormService: ORMConnectionService;

    constructor(
        moduleService: ModuleService,
        userCourseBridgeService: UserCourseBridgeService,
        videoService: VideoService,
        ormService: ORMConnectionService) {

        this._moduleService = moduleService;
        this._userCourseBridgeService = userCourseBridgeService;
        this._videoService = videoService;
        this._ormService = ormService;
    }

    getCourseProgressDataAsync = async (userId: number) => {

        const courses = await this._ormService
            .getRepository(CourseView)
            .createQueryBuilder("cv")
            .leftJoinAndSelect("cv.teacher", "t")
            .where("cv.userId = :userId", { userId })
            .getMany();

        const inProgressCourses = courses
            .filter(x => x.isStarted && !x.isCompleted);

        const completedCourses = courses
            .filter(x => x.isCompleted);

        const inProgressCoursesAsCourseShortDTOs = inProgressCourses
            .map(x => toCourseShortDTO(x));

        const completedCoursesAsCourseShortDTOs = completedCourses
            .map(x => toCourseShortDTO(x));


        return {
            isAnyCoursesComplete: completedCourses.any(x => true),
            isAnyCoursesInProgress: inProgressCourses.any(x => true),

            completedCourses: completedCoursesAsCourseShortDTOs,

            inProgressCourses: inProgressCoursesAsCourseShortDTOs
        } as UserCoursesDataDTO;
    }

    getCourseItemsDescriptorCodesAsync = async (userId: number, courseId: number) => {

        const course = await this._ormService
            .getRepository(Course)
            .createQueryBuilder("c")
            .where("c.id = :courseId", { courseId })
            .leftJoinAndSelect("c.videos", "v")
            .leftJoinAndSelect("c.exams", "e")
            .getOneOrFail();

        const codes = course
            .videos
            .map(x => ({ code: getItemCode(x.id, "video"), order: x.orderIndex }))
            .concat(course
                .exams
                .map(e => ({ code: getItemCode(e.id, "exam"), order: e.orderIndex })));

        return codes.orderBy(x => x.order).map(x => x.code);
    }

    getCurrentCourseItemsAsync = async (userId: number) => {

        // get current item 
        const courseBridge = await this._ormService
            .getRepository(UserCourseBridge)
            .findOne({
                where: {
                    userId,
                    isCurrent: true
                }
            });

        if (!courseBridge)
            return [];

        if (!courseBridge.currentItemCode)
            return [];

        const { itemType } = readItemCode(courseBridge.currentItemCode);

        // get course items 
        const modules = await this.getCourseModulesAsync(userId, courseBridge.courseId);

        if (itemType !== "module") {

            // set current item's state to 'current'
            let currentItem = modules
                .flatMap(x => x.items)
                .single(item => item.descriptorCode === courseBridge.currentItemCode);

            currentItem.state = "current";

            // set current module 
            const currentModule = modules
                .single(x => x.items
                    .any(x => x.descriptorCode === currentItem.descriptorCode));

            currentModule.state = "current";
        }
        else {

            const module = modules
                .single(x => x.code === courseBridge.currentItemCode);

            module.state = "current";
        }

        return modules;
    }

    getCourseModulesAsync = async (userId: number, courseId: number) => {

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

                return {
                    id: viewAsModule.moduleId,
                    name: viewAsModule.moduleName,
                    orderIndex: viewAsModule.moduleOrderIndex,
                    code: viewAsModule.moduleCode,
                    items: x
                        .items
                        .map(x => toCourseItemDTO(x)),
                    state: isLockedModule
                        ? "locked"
                        : isCompletedModule
                            ? "completed"
                            : "available"
                } as ModuleDTO;
            });

        return modules;
    }

    getCourseIdByItemCodeAsync = async (descriptorCode: string) => {

        const { itemId, itemType } = readItemCode(descriptorCode);

        if (itemType === "video")
            return (await this._videoService.getVideoByIdAsync(itemId)).courseId;

        if (itemType === "exam")
            return (await this.getExamByIdAsync(itemId)).courseId;

        return (await this._ormService
            .getRepository(CourseModule)
            .findOneOrFail(itemId)).courseId;
    }

    getCourseItemCode = (videoId?: number | null, examId?: number | null) => {

        if (videoId)
            return getItemCode(videoId, "video");

        if (examId)
            return getItemCode(examId, "exam");

        throw new Error("Arguments are null or undefined");
    }

    startCourseAsync = async (userId: number, courseId: number) => {

        const module = await this._ormService
            .getRepository(CourseModule)
            .findOne({
                where: {
                    courseId,
                    orderIndex: 0
                }
            });

        const moduleCode = module ? getItemCode(module.id, "module") : null;

        if (moduleCode)
            await this.setCurrentCourse(userId, courseId, moduleCode);

        return {
            text: moduleCode
        } as TextDTO;
    }

    setCurrentCourse = async (
        userId: number,
        courseId: number,
        itemCode: string) => {

        const currentCourseBridge = await this._userCourseBridgeService
            .getUserCourseBridgeAsync(userId, courseId);

        // insert new bridge
        if (!currentCourseBridge) {

            await this._ormService
                .getRepository(UserCourseBridge)
                .insert({
                    courseId: courseId,
                    userId: userId,
                    courseMode: "beginner",
                    currentItemCode: itemCode
                } as UserCourseBridge);
        }

        // update current video/exam id 
        else {

            await this._ormService
                .getRepository(UserCourseBridge)
                .save({
                    id: currentCourseBridge.id,
                    currentItemCode: itemCode
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

    setCourseTypeAsync = async (userId: number, courseId: number, mode: CourseModeType) => {

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

    getExamByIdAsync = (examId: number) => {

        return this._ormService
            .getRepository(Exam)
            .findOneOrFail(examId);
    }

    getCourseEditDataAsync = async (courseId: number) => {

        // get course 
        const views = await this._ormService
            .getRepository(CourseAdminDetailedView)
            .createQueryBuilder("course")
            .where("course.id = :courseId", { courseId: courseId })
            .getMany();

        const categories = await this._ormService
            .getRepository(CourseCategory)
            .createQueryBuilder("cc")
            .leftJoinAndSelect("cc.childCategories", "ccc")
            .where("cc.parentCategoryId IS NULL")
            .getMany();

        return toCourseEditDataDTO(views, categories);
    }

    getAdminCoursesAsync = async () => {

        const courseAdminShortViews = await this._ormService
            .getRepository(CourseAdminShortView)
            .createQueryBuilder()
            .getMany();

        return courseAdminShortViews
            .map(casv => toCourseAdminShortDTO(casv));
    }

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

    getAvailableCoursesAsync = async (userId: number) => {

        const courses = await this._ormService
            .getRepository(CourseView)
            .createQueryBuilder("cv")
            .where("cv.userId = :userId", { userId })
            .andWhere("cv.canView = true")
            .leftJoinAndSelect("cv.teacher", "t")
            .getMany();

        return courses
            .map(course => toCourseShortDTO(course));
    }

    async createCourseAccessBridge(userId: number, courseId: number) {

        await this._ormService
            .getRepository(UserCourseAccessBridge)
            .insert({
                courseId,
                userId
            });
    }
}