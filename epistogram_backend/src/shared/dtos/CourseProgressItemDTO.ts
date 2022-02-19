import { CourseItemStateType, CourseItemType } from "../types/sharedTypes";

export class CourseItemProgressDTO {
    id: number;
    title: string;
    subTitle: string;
    state: CourseItemStateType;
    itemCode: string;
    startCode: string;
    type: CourseItemType;
}