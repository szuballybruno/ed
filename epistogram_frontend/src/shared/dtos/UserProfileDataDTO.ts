import { CourseShortDTO } from './CourseShortDTO';

export type UserProfileDataDTO = {
    favoriteCourses: CourseShortDTO[];
    completedCourses: CourseShortDTO[];
}