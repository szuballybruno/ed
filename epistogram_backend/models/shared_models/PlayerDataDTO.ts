import { CourseItemDTO } from "./CourseItemDTO";
import { ExamDTO } from "./ExamDTO";
import { CourseModeType } from "./types/sharedTypes";
import { VideoDTO } from "./VideoDTO";

export type PlayerDataDTO = {

    courseItems: CourseItemDTO[];
    video: VideoDTO | null;
    exam: ExamDTO | null;
    answerSessionId: number | null;
    mode: CourseModeType;
    courseId: number;
}