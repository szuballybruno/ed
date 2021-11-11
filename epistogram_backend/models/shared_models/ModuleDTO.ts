import { CourseItemDTO } from "./CourseItemDTO";

export type ModuleDTO = {
    id: number;
    name: string;
    orderIndex: number;
    items: CourseItemDTO[];
}