import { CourseStageNameType, Id, PlaylistItemCode } from "@episto/commontypes";

export class CurrentCourseDataDTO {
    courseId: Id<'Course'>;
    stageName: CourseStageNameType;
    currentItemCode: PlaylistItemCode | null;
}