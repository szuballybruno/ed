import { ExamPlayerDataDTO } from "./ExamPlayerDataDTO";
import { ModuleDetailedDTO } from "./ModuleDetailedDTO";
import { ModuleDTO } from "./ModuleDTO";
import { CourseModeType } from "../types/sharedTypes";
import { VideoDTO } from "./VideoDTO";

export type PlayerDataDTO = {
    video: VideoDTO | null;
    exam: ExamPlayerDataDTO | null;
    module: ModuleDetailedDTO;
    answerSessionId: number | null;
    mode: CourseModeType;
    courseId: number;
    courseItemCode: string;
    modules: ModuleDTO[];
    nextItemCode: string | null;
}