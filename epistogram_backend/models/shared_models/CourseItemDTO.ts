import { CourseItemStateType, CourseItemType } from "./types/sharedTypes";

export type CourseItemDTO = {
    id: number;
    title: string;
    subTitle: string;
    thumbnailUrl: string;
    orderIndex: number;
    state: CourseItemStateType;
    descriptorCode: string;
    type: CourseItemType;
}