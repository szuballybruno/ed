import { Course } from "../models/entity/Course";
import { toSimpleCourseItemDTOs } from "./mappings";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class CourseItemsService {

    private _ormService: ORMConnectionService;

    constructor(ormService: ORMConnectionService) {

        this._ormService = ormService;
    }

    getSimpleCourseItemDTOs = async (courseId: number) => {

        const course = await this._ormService
            .getRepository(Course)
            .createQueryBuilder("c")
            .leftJoinAndSelect("c.videos", "v")
            .leftJoinAndSelect("c.exams", "e")
            .where("c.id = :courseId", { courseId })
            .getOneOrFail();

        const courseItemDTOs = toSimpleCourseItemDTOs(course);

        return courseItemDTOs;
    }
}