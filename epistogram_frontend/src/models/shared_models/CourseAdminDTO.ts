import {IdType} from "./types/sharedTypes";

export type CourseAdminDTO = {
    courseId: IdType,
    title: string,
    thumbnailImageURL: string,
    category: string,
    teacherName: string,
    videosCount: number
}