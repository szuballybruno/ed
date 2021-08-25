import { IdType } from "./types/sharedTypes";

export type CourseShortDTO = {
    courseId: IdType;
    firstVideoId: IdType;
    thumbnailImageURL: string; //globalConfig.assetStorageUrl + `/courses/${course.courseId}.${"png" || "jpg"}`
    colorOne: any;
    colorTwo: any;
    title: string;
    teacherName: string;
    category: string;
}