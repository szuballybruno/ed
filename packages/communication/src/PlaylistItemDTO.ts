import { CourseItemStateType, CourseItemType } from "@episto/commontypes";

export class PlaylistItemDTO {
    title: string;
    subTitle: string;
    thumbnailUrl: string;
    orderIndex: number;
    state: CourseItemStateType;
    playlistItemCode: string;
    type: CourseItemType;
    shouldRepeatVideo: boolean | null;
    correctAnswerRate: number | null;
}