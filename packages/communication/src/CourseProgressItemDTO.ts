import { CourseItemStateType, CourseItemType } from '@episto/commontypes';

export class CourseItemProgressDTO {
    id: number;
    title: string;
    subTitle: string;
    state: CourseItemStateType;
    itemCode: string;
    startCode: string;
    type: CourseItemType;
}