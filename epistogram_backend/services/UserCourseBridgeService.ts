import { Exam } from "../models/entity/Exam";
import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { Video } from "../models/entity/Video";
import { staticProvider } from "../staticProvider";
import { CourseItemsService } from "./CourseItemsService";
import { getItemCode } from "./encodeService";
import { toCourseItemDTOExam, toCourseItemDTOVideo } from "./mappings";

export class UserCourseBridgeService {

    private _courseItemsService: CourseItemsService;

    constructor(courseItemsService: CourseItemsService) {

        this._courseItemsService = courseItemsService;
    }

    getUserCourseBridgeAsync = async (userId: number, courseId: number) => {

        const userCourseBridge = await staticProvider
            .ormConnection
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
            ? await staticProvider
                .ormConnection
                .getRepository(Exam)
                .findOneOrFail(examId)

            : await staticProvider
                .ormConnection
                .getRepository(Video)
                .findOneOrFail(videoId);

        const currentItemDTO = isExam
            ? toCourseItemDTOExam(item as Exam)
            : toCourseItemDTOVideo(item as Video);

        const currentItemCode = getItemCode(isExam ? examId! : videoId!, isExam ? "exam" : "video");

        const courseId = item.courseId;

        const courseItemDTOs = await this._courseItemsService
            .getSimpleCourseItemDTOs(courseId);

        const prevIndex = courseItemDTOs
            .findIndex(x => x.descriptorCode === currentItemDTO.descriptorCode) - 1;

        const courseItemsWithoutCurrent = courseItemDTOs
            .filter(x => x.descriptorCode !== currentItemDTO.descriptorCode);

        const previousCourseItem = prevIndex > 0
            ? courseItemDTOs[prevIndex - 1]
            : courseItemsWithoutCurrent.length > 0
                ? courseItemsWithoutCurrent[0]
                : null;

        // update bridges
        const courseBridges = await staticProvider
            .ormConnection
            .getRepository(UserCourseBridge)
            .find({
                where: {
                    currentItemCode: currentItemCode,
                    courseId
                }
            });

        courseBridges
            .forEach(x => x.currentItemCode = previousCourseItem?.descriptorCode ?? null);

        await staticProvider
            .ormConnection
            .getRepository(UserCourseBridge)
            .save(courseBridges);

        // remove current course bridge
        if (!previousCourseItem)
            await staticProvider
                .ormConnection
                .createQueryBuilder()
                .delete()
                .from(UserCourseBridge)
                .where("courseId = :courseId", { courseId })
                .execute();
    }
}