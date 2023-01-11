import { Id } from "@episto/commontypes";

export class AdminCourseCarouselDataDTO {
    courseId: Id<'Course'>;
    courseTitle: string;
    coverFilePath: string;
    courseCompletionCount: number;
    activeUserCount: number;
}