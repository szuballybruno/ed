import { CourseAdminItemShortDTO } from "./CourseAdminItemShortDTO";

export class ModuleAdminShortDTO {
    id: number;
    name: string;
    orderIndex: number;
    items: CourseAdminItemShortDTO[];
    code: string;
}