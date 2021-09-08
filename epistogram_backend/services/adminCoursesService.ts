import { GetUserCoursesDTO } from "../models/shared_models/GetUserCoursesDTO";
import { toCourseAdminDTO } from "./mappings";
import { Course } from "../models/entity/Course";
import { staticProvider } from "../staticProvider";

export const getAdminCoursesAsync = async (userId: number, dto: GetUserCoursesDTO) => {
    const aggregatedCourses = await staticProvider
        .ormConnection
        .getRepository(Course)
        .createQueryBuilder("c")
        .leftJoinAndSelect("c.coverFile", "cf")
        .getMany()
    return aggregatedCourses.map(course => toCourseAdminDTO(course));
}
