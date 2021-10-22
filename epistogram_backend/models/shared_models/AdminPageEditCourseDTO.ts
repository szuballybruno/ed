import { CourseItemDTO } from "./CourseItemDTO";

export type EditListItemDTO = {
    id: number,
    name: string,
    checked: boolean
}

export type EditCourseDataDTO = {
    courseId: number,
    title: string,
    category: string,
    courseGroup: string,
    permissionLevel: string,
    colorOne: string,
    colorTwo: string,
    thumbnailURL: string,

    courseItems: CourseItemDTO[]

    groups: EditListItemDTO[],
    teachers: EditListItemDTO[],
    organizations: EditListItemDTO[],
    tags: EditListItemDTO[],
}