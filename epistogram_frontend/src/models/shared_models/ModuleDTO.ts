import { CourseItemDTO } from "./CourseItemDTO";
import { CourseItemStateType } from "./types/sharedTypes";

export type ModuleDTO = {
    id: number;
    name: string;
    orderIndex: number;
    items: CourseItemDTO[];
    state: CourseItemStateType;
    code: string;
}