import { GetUserCoursesDTO } from "../models/shared_models/GetUserCoursesDTO";
import { CourseView } from "../models/views/CourseView";
import { staticProvider } from "../staticProvider";
import { toCourseShortDTO } from "./mappings";
import { getUserDTOById } from "./userService";

export const getAvailableCoursesAsync = async (userId: number, dto: GetUserCoursesDTO) => {

    const user = (await getUserDTOById(userId))!;
    const organizationId = user.organizationId;
    const isRecommended = dto.isRecommended;
    const isFeatured = dto.isFeatured;
    const searchText = dto.searchText;
    const searchCategory = dto.searchCategory;

    const courses = await staticProvider
        .ormConnection
        .getRepository(CourseView)
        .createQueryBuilder("cv")
        .where("cv.userId = :userId", { userId })
        .leftJoinAndSelect("cv.teacher", "t")
        .getMany();

    return courses
        .map(course => toCourseShortDTO(course));
}
