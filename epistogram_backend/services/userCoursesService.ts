import { Course } from "../models/entity/Course";
import { GetUserCoursesDTO } from "../models/shared_models/GetUserCoursesDTO";
import { staticProvider } from "../staticProvider";
import { toCourseShortDTO } from "./mappings";
import { getUserDTOById } from "./userService";

export const getUserCoursesAsync = async (userId: number, dto: GetUserCoursesDTO) => {

    const user = (await getUserDTOById(userId))!;
    const organizationId = user.organizationId;
    const isRecommended = dto.isRecommended;
    const isFeatured = dto.isFeatured;
    const searchText = dto.searchText;
    const searchCategory = dto.searchCategory;

    const courses = await staticProvider
        .ormConnection
        .getRepository(Course)
        .createQueryBuilder("c")
        .leftJoinAndSelect("c.videos", "v")
        .leftJoinAndSelect("c.exams", "e")
        .getMany();

    return courses.map(course => toCourseShortDTO(course));
}
