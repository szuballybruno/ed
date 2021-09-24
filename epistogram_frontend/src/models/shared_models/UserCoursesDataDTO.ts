import { CourseStatDTO } from "./CourseStatDTO";

export type UserCoursesDataDTO = {
    isAnyCoursesComplete: boolean,
    isAnyCoursesInProgress: boolean,
    completedCourses: CourseStatDTO[],
    inProgressCourses: CourseStatDTO[]
}