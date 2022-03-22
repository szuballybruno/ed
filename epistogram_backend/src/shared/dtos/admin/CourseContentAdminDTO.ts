import { CourseContentItemAdminDTO } from "./CourseContentItemAdminDTO";
import { CourseModuleShortDTO } from "./CourseModuleShortDTO";

export class CourseContentAdminDTO {
    modules: CourseModuleShortDTO[];
    items: CourseContentItemAdminDTO[];
}