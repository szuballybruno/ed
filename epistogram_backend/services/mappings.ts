import { User } from "../models/entities/User";
import { CourseItemShortDTO } from "../models/shared_models/CourseItemShortDTO";
import { UserDTO } from "../models/shared_models/UserDTO";
import { CurrentItem, Item } from "./userDataService";

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