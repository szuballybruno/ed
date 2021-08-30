import {TagView} from "./TagDTO";

export type AdminPageEditVideoView = {
    id: number,
    name: string,
    category: string,
    courseGroup: string,
    permissionLevel: string,
    colorOne: string,
    colorTwo: string,
    thumbnailURL: string,

    /* TODO:
    *   - Do or do not separate the videos from exams here
    * */
    courseVideos: [],
    courseExams: []

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