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
    courseGroups: {
        id: number
        name: string
    },
    allGroups: {
        id: number,
        name: string
    }[]

    // Teacher of the course who recorded the videos
    courseTeacher: {
        id: number
        name: string
    },
    allTeachers: {
        id: number,
        name: string
    }[]

    // Organization where the course is visible

    courseOrganizations: {
        id: number,
        name: string
    }

    // ONLY IF THE PERMISSION IS ADMIN
    allOrganizations: {
        id: number,
        name: string
    }[]

    courseTags: TagView[]
    allTags: TagView[]
}