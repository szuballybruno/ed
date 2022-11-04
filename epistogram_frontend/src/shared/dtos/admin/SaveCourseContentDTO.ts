import { Id } from "../../types/versionId";
import { ModuleEditDTO } from "../ModuleEditDTO";
import { Mutation } from "../mutations/Mutation";
import { CourseContentItemAdminDTO } from "./CourseContentItemAdminDTO";

export class SaveCourseContentDTO {
    courseId: Id<'Course'>;
    itemMutations: Mutation<CourseContentItemAdminDTO, 'versionCode'>[];
    moduleMutations: Mutation<ModuleEditDTO, 'moduleVersionId'>[];
};