import { CourseItemType } from "./types/sharedTypes";

export type CourseItemDTO = {
    id: number;
    title: string;
    subTitle: string;
    type: CourseItemType;
    thumbnailUrl: string;
}