import { Course } from "../../models/entity/course/Course";
import { Id } from "../types/versionId";

export class UserActiveCourseDTO {
    courseId: Id<Course>;
    title: string;
    coverFilePath: string;
}