
export type CourseShortDTO = {
    courseId: number;
    firstVideoId: number;
    thumbnailImageURL: string; //globalConfig.assetStorageUrl + `/courses/${course.courseId}.${"png" || "jpg"}`
    colorOne: any;
    colorTwo: any;
    title: string;
    teacherName: string;
    category: string;
}