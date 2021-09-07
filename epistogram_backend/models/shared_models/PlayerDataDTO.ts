import { CourseItemDTO } from "./CourseItemDTO";
import { ExamDTO } from "./ExamDTO";
import { VideoDTO } from "./VideoDTO";

export type PlayerDataDTO = {

    courseItems: CourseItemDTO[];
    video: VideoDTO | null;
    exam: ExamDTO | null;
    answerSessionId: number | null
}