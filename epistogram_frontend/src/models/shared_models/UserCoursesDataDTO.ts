import { CourseShortDTO } from "./CourseShortDTO";
import { CourseStatDTO } from "./CourseStatDTO";

export type UserCoursesDataDTO = {
    isAnyCoursesComplete: boolean,
    isAnyCoursesInProgress: boolean,
    completedCourses: CourseShortDTO[],
    inProgressCourses: CourseShortDTO[]
}