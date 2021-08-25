import { User } from "../models/entities/User";
import { CourseItemShortDTO } from "../models/shared_models/CourseItemShortDTO";
import { CourseShortDTO } from "../models/shared_models/CourseShortDTO";
import { UserDTO } from "../models/shared_models/UserDTO";
import { globalConfig } from "../server";
import { Course } from "./userCoursesService";
import { CurrentItem, Item } from "./userDataService";
import {CourseAdminDTO} from "../models/shared_models/CourseAdminDTO";

export const toUserDTO = (user: User) => new UserDTO(
    user._id,
    user.userData.organizationId,
    user.userData.firstName,
    user.userData.lastName,
    user.userData.role,
    user.userData.innerRole);

export const toCourseItemShortDTO = (item: Item) => {

    return {
        id: item._id,
        subTitle: item.subTitle,
        title: item.title,
        type: item.type,
        thumbnailUrl: item.thumbnailUrl
    } as CourseItemShortDTO;
}

export const toCourseItemShortDTO2 = (item: CurrentItem) => {

    return {
        id: item._id,
        subTitle: item.subTitle,
        title: item.title,
        type: "video",
        thumbnailUrl: item.thumbnailUrl
    } as CourseItemShortDTO;
}

export const toCourseShortDTO = (course: Course) => {

    return {
        title: course.name,
        category: course.category,
        courseId: course._id,
        firstVideoId: course.items[0]._id,
        teacherName: "Mr. Teacher Name",
        thumbnailImageURL: globalConfig.misc.assetStoreUrl + `/courses/${course._id}.png`
    } as CourseShortDTO;
}
export const toCourseAdminDTO = (course: Course) => {

    return {
        title: course.name,
        category: course.category,
        courseId: course._id,
        teacherName: "Mr. Teacher Name",
        videosCount: 0,
        thumbnailImageURL: globalConfig.misc.assetStoreUrl + `/courses/${course._id}.png`
    } as CourseAdminDTO;
}