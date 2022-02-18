import { CourseLearningDTO } from "./CourseLearningDTO";

export type UserCoursesDataDTO = {
    isAnyCoursesComplete: boolean,
    isAnyCoursesInProgress: boolean,
    completedCourses: CourseLearningDTO[],
    inProgressCourses: CourseLearningDTO[]
}