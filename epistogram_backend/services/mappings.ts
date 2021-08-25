import { Course } from "../models/entity/Course";
import { User } from "../models/entity/User";
import { CourseItemShortDTO } from "../models/shared_models/CourseItemShortDTO";
import { CourseShortDTO } from "../models/shared_models/CourseShortDTO";
import { UserDTO } from "../models/shared_models/UserDTO";
import { globalConfig } from "../server";
import { CurrentItem, Item } from "./userDataService";

export const toUserDTO = (user: User) => new UserDTO(
    user.id,
    user.organizationId,
    user.firstName,
    user.lastName,
    user.role,
    user.innerRole);

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

    const thumbnailImageURL = globalConfig.misc.assetStoreUrl + `/courses/${course.id}.png`;

    return {
        courseId: course.id,
        title: course.title,
        category: course.category,
        firstVideoId: course.videos[0].id,
        teacherName: "Mr. Teacher Name",
        thumbnailImageURL: thumbnailImageURL
    } as CourseShortDTO;
}