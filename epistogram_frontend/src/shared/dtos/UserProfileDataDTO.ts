import { AvailableCourseDTO } from './AvailableCourseDTO';

export type UserProfileDataDTO = {
    favoriteCourses: AvailableCourseDTO[];
    completedCourses: AvailableCourseDTO[];
}