import { CourseAdminItemShortDTO } from "./CourseAdminItemShortDTO";

export type ModuleAdminShortDTO = {
    id: number;
    name: string;
    orderIndex: number;
    items: CourseAdminItemShortDTO[];
    code: string;
}