import { CourseItemState, CourseItemType } from "./types/sharedTypes";

export type CourseItemDTO = {
    title: string;
    subTitle: string;
    thumbnailUrl: string;
    orderIndex: number;
    state: CourseItemState;
    descriptorCode: string;
}