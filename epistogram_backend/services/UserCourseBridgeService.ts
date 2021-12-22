import { Exam } from "../models/entity/Exam";
import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { Video } from "../models/entity/Video";
import { CourseItemDTO } from "../models/shared_models/CourseItemDTO";
import { CourseItemsService } from "./CourseItemsService";
import { MapperService } from "./MapperService";
import { getItemCode } from "./misc/encodeService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class UserCourseBridgeService {

    private _courseItemsService: CourseItemsService;
    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;

    constructor(
        courseItemsService: CourseItemsService,
        ormService: ORMConnectionService,
        mapperService: MapperService) {

        this._courseItemsService = courseItemsService;
        this._ormService = ormService;
        this._mapperService = mapperService;
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
                .getRepository(Exam)
                .findOneOrFail(examId)

            : await this._ormService
                .getRepository(Video)
                .findOneOrFail(videoId);

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