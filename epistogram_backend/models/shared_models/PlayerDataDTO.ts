import { ExamDTO } from "./ExamDTO";
import { ModuleDTO } from "./ModuleDTO";
import { CourseModeType } from "./types/sharedTypes";
import { VideoDTO } from "./VideoDTO";

export type PlayerDataDTO = {
    video: VideoDTO | null;
    exam: ExamDTO | null;
    answerSessionId: number | null;
    mode: CourseModeType;
    courseId: number;
    courseItemCode: string;
    modules: ModuleDTO[];
    nextItemCode: string | null;
}