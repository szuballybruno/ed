import { Course } from "../models/entity/Course";
import { GetUserCoursesDTO } from "../models/shared_models/GetUserCoursesDTO";
import { toCourseShortDTO } from "./mappings";
import { getUserDTOById } from "./userService";
import { staticProvider } from "../staticProvider";

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
        .find();

    return courses.map(course => toCourseShortDTO(course));
}
