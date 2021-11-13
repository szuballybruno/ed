import { CourseAdminItemShortDTO } from "./CourseAdminItemShortDTO";

export type ModuleEditDTO = {
    id: number;
    name: string;
    orderIndex: number;
    items: CourseAdminItemShortDTO[];
    code: string;
}