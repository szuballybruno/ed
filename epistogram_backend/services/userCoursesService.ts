import { Course } from "../models/entity/Course";
import { CourseShortDTO } from "../models/shared_models/CourseShortDTO";
import { GetUserCoursesDTO } from "../models/shared_models/GetUserCoursesDTO";
import { staticProvider } from "../staticProvider";
import { getCourseItemsDescriptorCodesAsync, getCurrentCourseItemDescriptorCodeAsync } from "./courseService";
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

    const currentCourseItemCode = await getCurrentCourseItemDescriptorCodeAsync(userId);
    const courseShortDTOs = [] as CourseShortDTO[];

    for (let index = 0; index < courses.length; index++) {

        const course = courses[index];

        const descriptorCodes = await getCourseItemsDescriptorCodesAsync(userId, course.id);
        let itemCode = descriptorCodes.filter(x => x == currentCourseItemCode)[0];
        if (!itemCode)
            itemCode = descriptorCodes[0];

        courseShortDTOs.push(toCourseShortDTO(course, itemCode));
    }

    return courseShortDTOs;
}
