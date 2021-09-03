import {TagView} from "./TagDTO";
import {CourseItemDTO} from "./CourseItemDTO";

export type AdminPageEditCourseView = {
    courseId: number,
    title: string,
    category: string,
    courseGroup: string,
    permissionLevel: string,
    colorOne: string,
    colorTwo: string,
    thumbnailURL: string,

    courseItems: CourseItemDTO[]

    // User groups where the course is visible
    groups: {
        id: number,
        name: string,
        checked: boolean
    }[],

    // Teacher of the course who recorded the videos
    teachers: {
        id: number
        name: string
        checked: boolean
    }[],

    // Organization where the course is visible

    organizations: {
        id: number,
        name: string,
        checked: boolean
    }[]

    tags: {
        id: number,
        name: string,
        checked: boolean
    }[]
}