import { CourseItemType, IdType } from "./types/sharedTypes";

export type CourseItemShortDTO = {
    thumbnailUrl: string;
    title: string;
    subTitle: string;
    type: CourseItemType;
    id: IdType;
}