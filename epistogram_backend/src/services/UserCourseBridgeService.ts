import { Exam } from "../models/entity/Exam";
import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { Video } from "../models/entity/Video";
import { CourseItemDTO } from "../shared/dtos/CourseItemDTO";
import { CourseModeType, CourseStageNameType } from "../shared/types/sharedTypes";
import { CourseItemsService } from "./CourseItemsService";
import { MapperService } from "./MapperService";
import { getItemCode } from "./misc/encodeService";
import { QueryServiceBase } from "./misc/ServiceBase";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class UserCourseBridgeService extends QueryServiceBase<UserCourseBridge> {

    private _courseItemsService: CourseItemsService;

    constructor(
        courseItemsService: CourseItemsService,
        ormService: ORMConnectionService,
        mapperService: MapperService) {

        super(mapperService, ormService, UserCourseBridge);
        this._courseItemsService = courseItemsService;
    }

    /**
     * Set current course and course current item code.
     * 
     * @param userId 
     * @param courseId 
     * @param itemCode 
     */
    async setCurrentCourse(
        userId: number,
        courseId: number,
        stageName: CourseStageNameType,
        itemCode: string | null) {

        const currentCourseBridge = await this.getUserCourseBridgeAsync(userId, courseId);

        // insert new bridge
        if (!currentCourseBridge) {

            await this.createNewCourseBridge(courseId, userId, itemCode, stageName);
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

    async createNewCourseBridge(
        courseId: number,
        userId: number,
        currentItemCode: string | null,
        stageName: CourseStageNameType,
    ) {

        await this._ormService
            .getRepository(UserCourseBridge)
            .insert({
                courseId: courseId,
                userId: userId,
                courseMode: "advanced",
                currentItemCode,
                stageName,
                isCurrent: true,
                tempomatMode: "auto"
            } as UserCourseBridge);
    }

    /**
     * Deletes all course bridges associated with the specified course  
     * @param courseId 
     */
    async deleteAllBridgesAsync(courseId: number) {

        await this._ormService
            .getOrmConnection()
            .createQueryBuilder()
            .delete()
            .from(UserCourseBridge)
            .where("courseId = :courseId", { courseId })
            .execute();
    }

    /**
     * Sets the course mode (beginner / advanced).
     * 
     * @param userId 
     * @param courseId 
     * @param mode 
     */
    async setCourseModeAsync(userId: number, courseId: number, mode: CourseModeType) {

        const userCourseBridge = await this.getUserCourseBridgeAsync(userId, courseId);

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

    getCurrentItemCodeOrFailAsync = async (userId: number) => {

        const currentItemCode = await this.getCurrentItemCodeAsync(userId);

        if (!currentItemCode)
            throw new Error("Course has no current item!");

        return currentItemCode;
    }

    getCurrentItemCodeAsync = async (userId: number) => {

        const currentBridge = await this._ormService
            .getRepository(UserCourseBridge)
            .findOne({
                where: {
                    userId,
                    isCurrent: true
                }
            });

        return currentBridge?.currentItemCode ?? null;
    }

    getUserCourseBridgeAsync = async (userId: number, courseId: number) => {

        const userCourseBridge = await this._ormService
            .getRepository(UserCourseBridge)
            .findOne({
                where: {
                    userId: userId,
                    courseId: courseId
                }
            });

        return userCourseBridge;
    }

    getUserCourseBridgeOrFailAsync = async (userId: number, courseId: number) => {

        const userCourseBridge = await this.getUserCourseBridgeAsync(userId, courseId);
        if (!userCourseBridge)
            throw new Error("User course bridge not found, maybe the course is not yet started!");

        return userCourseBridge;
    }

    unsetUsersCurrentCourseItemAsync = async (examId?: number, videoId?: number) => {

        const isExam = !!examId;

        // unset user current course item
        const item = isExam
            ? await this._ormService
                .getSingleById(Exam, examId!)

            : await this._ormService
                .getSingleById(Video, videoId!)

        const currentItemDTO = isExam
            ? this._mapperService.map(Exam, CourseItemDTO, item)
            : this._mapperService.map(Video, CourseItemDTO, item);

        const currentItemCode = getItemCode(isExam ? examId! : videoId!, isExam ? "exam" : "video");

        const courseId = item.courseId;

        const courseItemListDTO = await this._courseItemsService
            .getCourseItemDTOs(courseId);

        const prevIndex = courseItemListDTO
            .courseItems
            .findIndex(x => x.descriptorCode === currentItemDTO.descriptorCode) - 1;

        const courseItemsWithoutCurrent = courseItemListDTO
            .courseItems
            .filter(x => x.descriptorCode !== currentItemDTO.descriptorCode);

        const previousCourseItem = prevIndex > 0
            ? courseItemListDTO.courseItems[prevIndex - 1]
            : courseItemsWithoutCurrent.length > 0
                ? courseItemsWithoutCurrent[0]
                : null;

        // update bridges
        const courseBridges = await this._ormService
            .getRepository(UserCourseBridge)
            .find({
                where: {
                    currentItemCode: currentItemCode,
                    courseId
                }
            });

        courseBridges
            .forEach(x => x.currentItemCode = previousCourseItem?.descriptorCode ?? null);

        await this._ormService
            .getRepository(UserCourseBridge)
            .save(courseBridges);

        // remove current course bridge
        if (!previousCourseItem)
            await this._ormService
                .getOrmConnection()
                .createQueryBuilder()
                .delete()
                .from(UserCourseBridge)
                .where("courseId = :courseId", { courseId })
                .execute();
    }
}